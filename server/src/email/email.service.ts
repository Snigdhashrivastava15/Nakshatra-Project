import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { format } from 'date-fns';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  private initializeTransporter() {
    const host = this.configService.get<string>('SMTP_HOST');
    const port = this.configService.get<number>('SMTP_PORT', 587);
    const secure = this.configService.get<string>('SMTP_SECURE') === 'true';
    const user = this.configService.get<string>('SMTP_USER');
    const password = this.configService.get<string>('SMTP_PASSWORD');
    const fromEmail = this.configService.get<string>('SMTP_FROM_EMAIL');
    const fromName = this.configService.get<string>('SMTP_FROM_NAME', 'Planet Nakshatra');

    // If no SMTP config, try Gmail OAuth (if Google credentials exist)
    if (!host && !user) {
      const gmailUser = this.configService.get<string>('GMAIL_USER');
      const gmailPassword = this.configService.get<string>('GMAIL_PASSWORD');
      
      if (gmailUser && gmailPassword) {
        this.transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: gmailUser,
            pass: gmailPassword,
          },
        });
        this.logger.log('Email service initialized with Gmail');
        return;
      }
    }

    if (!host || !user || !password) {
      this.logger.warn('SMTP configuration not found. Email notifications will be disabled.');
      return;
    }

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: {
        user,
        pass: password,
      },
    });

    this.logger.log(`Email service initialized with SMTP: ${host}:${port}`);
  }

  async sendEmail(options: {
    to: string;
    subject: string;
    html: string;
    text?: string;
  }): Promise<boolean> {
    if (!this.transporter) {
      this.logger.warn('Email transporter not configured. Skipping email send.');
      return false;
    }

    try {
      const fromEmail = this.configService.get<string>('SMTP_FROM_EMAIL', 'noreply@planetnakshatra.com');
      const fromName = this.configService.get<string>('SMTP_FROM_NAME', 'Planet Nakshatra');

      await this.transporter.sendMail({
        from: `"${fromName}" <${fromEmail}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || options.html.replace(/<[^>]*>/g, ''),
      });

      this.logger.log(`Email sent successfully to ${options.to}`);
      return true;
    } catch (error) {
      this.logger.error(`Failed to send email to ${options.to}:`, error);
      return false;
    }
  }

  async sendBookingConfirmation(booking: {
    userName: string;
    userEmail: string;
    service: { title: string; duration: number; price?: number };
    bookingDate: Date;
    bookingTime: string;
    notes?: string;
  }): Promise<boolean> {
    const formattedDate = format(booking.bookingDate, 'EEEE, MMMM d, yyyy');
    const formattedTime = booking.bookingTime;
    const endTime = this.calculateEndTime(booking.bookingTime, booking.service.duration);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #667eea; }
          .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🌟 Booking Confirmed</h1>
            <p>Planet Nakshatra - Vedic Astrology Consultation</p>
          </div>
          <div class="content">
            <p>Dear ${booking.userName},</p>
            <p>Thank you for booking a consultation with Planet Nakshatra. Your appointment has been confirmed!</p>
            
            <div class="booking-details">
              <h2>Booking Details</h2>
              <div class="detail-row">
                <span class="label">Service:</span> ${booking.service.title}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${formattedDate}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${formattedTime} - ${endTime}
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span> ${booking.service.duration} minutes
              </div>
              ${booking.service.price ? `
              <div class="detail-row">
                <span class="label">Price:</span> ₹${booking.service.price.toLocaleString('en-IN')}
              </div>
              ` : ''}
              ${booking.notes ? `
              <div class="detail-row">
                <span class="label">Notes:</span> ${booking.notes}
              </div>
              ` : ''}
            </div>

            <p>We look forward to providing you with insightful Vedic astrological guidance.</p>
            <p>If you need to reschedule or cancel, please contact us as soon as possible.</p>
            
            <p>Best regards,<br>Sameer<br>Planet Nakshatra</p>
          </div>
          <div class="footer">
            <p>This is an automated confirmation email. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: booking.userEmail,
      subject: `Booking Confirmed: ${booking.service.title} - ${formattedDate}`,
      html,
    });
  }

  async sendAdminNotification(booking: {
    userName: string;
    userEmail: string;
    userPhone?: string;
    service: { title: string; duration: number; price?: number };
    bookingDate: Date;
    bookingTime: string;
    notes?: string;
  }): Promise<boolean> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    
    if (!adminEmail) {
      this.logger.warn('ADMIN_EMAIL not configured. Skipping admin notification.');
      return false;
    }

    const formattedDate = format(booking.bookingDate, 'EEEE, MMMM d, yyyy');
    const formattedTime = booking.bookingTime;
    const endTime = this.calculateEndTime(booking.bookingTime, booking.service.duration);

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #dc2626; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
          .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
          .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
          .detail-row { margin: 10px 0; }
          .label { font-weight: bold; color: #dc2626; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔔 New Booking Alert</h1>
          </div>
          <div class="content">
            <p>A new booking has been created:</p>
            
            <div class="booking-details">
              <h2>Client Information</h2>
              <div class="detail-row">
                <span class="label">Name:</span> ${booking.userName}
              </div>
              <div class="detail-row">
                <span class="label">Email:</span> ${booking.userEmail}
              </div>
              ${booking.userPhone ? `
              <div class="detail-row">
                <span class="label">Phone:</span> ${booking.userPhone}
              </div>
              ` : ''}
              
              <h2 style="margin-top: 20px;">Booking Details</h2>
              <div class="detail-row">
                <span class="label">Service:</span> ${booking.service.title}
              </div>
              <div class="detail-row">
                <span class="label">Date:</span> ${formattedDate}
              </div>
              <div class="detail-row">
                <span class="label">Time:</span> ${formattedTime} - ${endTime}
              </div>
              <div class="detail-row">
                <span class="label">Duration:</span> ${booking.service.duration} minutes
              </div>
              ${booking.service.price ? `
              <div class="detail-row">
                <span class="label">Price:</span> ₹${booking.service.price.toLocaleString('en-IN')}
              </div>
              ` : ''}
              ${booking.notes ? `
              <div class="detail-row">
                <span class="label">Notes:</span> ${booking.notes}
              </div>
              ` : ''}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    return this.sendEmail({
      to: adminEmail,
      subject: `New Booking: ${booking.userName} - ${formattedDate} at ${formattedTime}`,
      html,
    });
  }

  private calculateEndTime(startTime: string, durationMinutes: number): string {
    const [hours, minutes] = startTime.split(':').map(Number);
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);
    
    const endDate = new Date(startDate.getTime() + durationMinutes * 60000);
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMins = endDate.getMinutes().toString().padStart(2, '0');
    
    return `${endHours}:${endMins}`;
  }
}
