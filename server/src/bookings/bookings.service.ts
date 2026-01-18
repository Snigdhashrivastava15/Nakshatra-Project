import { Injectable, BadRequestException, ConflictException, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GoogleCalendarService } from '../google-calendar/google-calendar.service';
import { EmailService } from '../email/email.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { addMinutes, isBefore, startOfDay, format } from 'date-fns';

@Injectable()
export class BookingsService {
  private readonly logger = new Logger(BookingsService.name);

  constructor(
    private prisma: PrismaService,
    private googleCalendar: GoogleCalendarService,
    private emailService: EmailService,
  ) {}

  async create(createBookingDto: CreateBookingDto) {
    // Validate service exists
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
    });

    if (!service || !service.active) {
      throw new NotFoundException('Service not found or inactive');
    }

    // Parse booking date and time
    const bookingDate = new Date(createBookingDto.bookingDate);
    const [hours, minutes] = createBookingDto.bookingTime.split(':').map(Number);
    bookingDate.setHours(hours, minutes, 0, 0);

    // Validate booking is today or in the future (compare dates at start of day)
    const today = startOfDay(new Date());
    const selectedDay = startOfDay(bookingDate);

    if (isBefore(selectedDay, today)) {
      throw new BadRequestException('Booking date must be today or in the future');
    }

    // Check for existing booking at the same time
    const existingBooking = await this.prisma.booking.findFirst({
      where: {
        bookingDate: bookingDate,
        bookingTime: createBookingDto.bookingTime,
        status: {
          not: 'CANCELLED',
        },
      },
    });

    if (existingBooking) {
      throw new ConflictException('This time slot is already booked');
    }

    // Check Google Calendar availability
    const endTime = addMinutes(bookingDate, service.duration);
    const busySlots = await this.googleCalendar.getBusySlots(bookingDate, endTime);

    if (busySlots.length > 0) {
      throw new ConflictException('This time slot is not available');
    }

    // Create or find user
    let user = await this.prisma.user.findUnique({
      where: { email: createBookingDto.userEmail },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: createBookingDto.userEmail,
          name: createBookingDto.userName,
          phone: createBookingDto.userPhone,
        },
      });
    }

    // Create booking
    const booking = await this.prisma.booking.create({
      data: {
        userId: user.id,
        userEmail: createBookingDto.userEmail,
        userName: createBookingDto.userName,
        userPhone: createBookingDto.userPhone,
        serviceId: createBookingDto.serviceId,
        bookingDate: bookingDate,
        bookingTime: createBookingDto.bookingTime,
        notes: createBookingDto.notes,
        status: 'PENDING',
      },
      include: {
        service: true,
        user: true,
      },
    });

    // Create Google Calendar event
    try {
      const googleEventId = await this.googleCalendar.createEvent({
        summary: `${service.title} - ${createBookingDto.userName}`,
        description: `Booking for ${service.title}\n\nClient: ${createBookingDto.userName}\nEmail: ${createBookingDto.userEmail}\nPhone: ${createBookingDto.userPhone || 'N/A'}\n\n${createBookingDto.notes || ''}`,
        startTime: bookingDate,
        endTime: endTime,
        attendeeEmail: createBookingDto.userEmail,
        attendeeName: createBookingDto.userName,
      });

      // Update booking with Google event ID
      const updatedBooking = await this.prisma.booking.update({
        where: { id: booking.id },
        data: {
          googleEventId,
          status: 'CONFIRMED',
        },
        include: {
          service: true,
          user: true,
        },
      });

      // Send email notifications (async, don't wait)
      this.sendEmailNotifications(updatedBooking).catch((error) => {
        this.logger.error('Failed to send email notifications:', error);
      });

      return updatedBooking;
    } catch (error) {
      // If Google Calendar fails, booking is still created but marked as PENDING
      this.logger.warn('Google Calendar event creation failed:', error);
      const updatedBooking = await this.prisma.booking.update({
        where: { id: booking.id },
        data: { status: 'PENDING' },
        include: {
          service: true,
          user: true,
        },
      });

      // Send email notifications even if Google Calendar fails
      this.sendEmailNotifications(updatedBooking).catch((error) => {
        this.logger.error('Failed to send email notifications:', error);
      });

      return updatedBooking;
    }
  }

  async getAvailability(date?: string, serviceId?: string) {
    const targetDate = date ? new Date(date) : new Date();
    targetDate.setHours(0, 0, 0, 0);

    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);

    // Get all bookings for the date
    const bookings = await this.prisma.booking.findMany({
      where: {
        bookingDate: {
          gte: targetDate,
          lte: endDate,
        },
        status: {
          not: 'CANCELLED',
        },
        ...(serviceId && { serviceId }),
      },
      include: {
        service: true,
      },
    });

    // Get busy slots from Google Calendar
    const busySlots = await this.googleCalendar.getBusySlots(targetDate, endDate);

    // Generate available time slots (9 AM to 8 PM, 30-minute intervals)
    const timeSlots: string[] = [];
    for (let hour = 9; hour < 20; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const timeStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        timeSlots.push(timeStr);
      }
    }

    // Filter out booked slots
    const bookedTimes = bookings.map((b) => b.bookingTime);
    const availableSlots = timeSlots.filter((slot) => !bookedTimes.includes(slot));

    // Filter out Google Calendar busy slots
    const finalAvailableSlots = availableSlots.filter((slot) => {
      const [hours, minutes] = slot.split(':').map(Number);
      const slotDate = new Date(targetDate);
      slotDate.setHours(hours, minutes, 0, 0);

      return !busySlots.some((busy) => {
        return slotDate >= busy.start && slotDate < busy.end;
      });
    });

    return {
      date: format(targetDate, 'yyyy-MM-dd'),
      availableSlots: finalAvailableSlots,
      bookedSlots: bookedTimes,
    };
  }

  async findAll() {
    return this.prisma.booking.findMany({
      include: {
        service: true,
        user: true,
      },
      orderBy: {
        bookingDate: 'asc',
      },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        service: true,
        user: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(`Booking with ID ${id} not found`);
    }

    return booking;
  }

  /**
   * Send email notifications for a booking
   * - Confirmation email to client
   * - Notification email to admin
   */
  private async sendEmailNotifications(booking: any): Promise<void> {
    try {
      // Send confirmation email to client
      await this.emailService.sendBookingConfirmation({
        userName: booking.userName,
        userEmail: booking.userEmail,
        service: {
          title: booking.service.title,
          duration: booking.service.duration,
          price: booking.service.price,
        },
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        notes: booking.notes,
      });

      // Send notification email to admin
      await this.emailService.sendAdminNotification({
        userName: booking.userName,
        userEmail: booking.userEmail,
        userPhone: booking.userPhone,
        service: {
          title: booking.service.title,
          duration: booking.service.duration,
          price: booking.service.price,
        },
        bookingDate: booking.bookingDate,
        bookingTime: booking.bookingTime,
        notes: booking.notes,
      });

      this.logger.log(`Email notifications sent for booking ${booking.id}`);
    } catch (error) {
      this.logger.error(`Failed to send email notifications for booking ${booking.id}:`, error);
      // Don't throw - email failures shouldn't break the booking
    }
  }
}
