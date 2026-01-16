import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google, calendar_v3 } from 'googleapis';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class GoogleCalendarService {
  private readonly logger = new Logger(GoogleCalendarService.name);
  private calendar: calendar_v3.Calendar;
  private oauth2Client: OAuth2Client;
  private calendarId: string;

  constructor(private configService: ConfigService) {
    this.initializeClient();
  }

  private initializeClient() {
    const clientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    const clientSecret = this.configService.get<string>('GOOGLE_CLIENT_SECRET');
    const refreshToken = this.configService.get<string>('GOOGLE_REFRESH_TOKEN');
    const redirectUri = this.configService.get<string>('GOOGLE_REDIRECT_URI');
    this.calendarId = this.configService.get<string>('GOOGLE_CALENDAR_ID') || 'primary';

    if (!clientId || !clientSecret) {
      this.logger.warn('Google Calendar credentials not configured. Calendar features will be disabled.');
      return;
    }

    this.oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri);

    if (refreshToken) {
      this.oauth2Client.setCredentials({
        refresh_token: refreshToken,
      });
    }

    this.calendar = google.calendar({ version: 'v3', auth: this.oauth2Client });
  }

  async createEvent(eventData: {
    summary: string;
    description: string;
    startTime: Date;
    endTime: Date;
    attendeeEmail?: string;
    attendeeName?: string;
  }): Promise<string> {
    try {
      if (!this.calendar) {
        throw new Error('Google Calendar not initialized. Please configure credentials.');
      }

      const event: calendar_v3.Schema$Event = {
        summary: eventData.summary,
        description: eventData.description,
        start: {
          dateTime: eventData.startTime.toISOString(),
          timeZone: 'Asia/Kolkata', // IST timezone
        },
        end: {
          dateTime: eventData.endTime.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
      };

      if (eventData.attendeeEmail) {
        event.attendees = [
          {
            email: eventData.attendeeEmail,
            displayName: eventData.attendeeName,
          },
        ];
        event.sendUpdates = 'all';
      }

      const response = await this.calendar.events.insert({
        calendarId: this.calendarId,
        requestBody: event,
      });

      this.logger.log(`Event created: ${response.data.id}`);
      return response.data.id || '';
    } catch (error) {
      this.logger.error('Error creating Google Calendar event:', error);
      throw error;
    }
  }

  async getBusySlots(startDate: Date, endDate: Date): Promise<Array<{ start: Date; end: Date }>> {
    try {
      if (!this.calendar) {
        return [];
      }

      const response = await this.calendar.freebusy.query({
        requestBody: {
          timeMin: startDate.toISOString(),
          timeMax: endDate.toISOString(),
          items: [{ id: this.calendarId }],
        },
      });

      const busySlots = response.data.calendars?.[this.calendarId]?.busy || [];
      return busySlots.map((slot) => ({
        start: new Date(slot.start || ''),
        end: new Date(slot.end || ''),
      }));
    } catch (error) {
      this.logger.error('Error fetching busy slots:', error);
      return [];
    }
  }

  async deleteEvent(eventId: string): Promise<void> {
    try {
      if (!this.calendar) {
        return;
      }

      await this.calendar.events.delete({
        calendarId: this.calendarId,
        eventId,
      });

      this.logger.log(`Event deleted: ${eventId}`);
    } catch (error) {
      this.logger.error('Error deleting Google Calendar event:', error);
      throw error;
    }
  }
}
