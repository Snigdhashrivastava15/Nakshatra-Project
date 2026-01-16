import { Controller, Get, Post, Body, Param, Query, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { GetAvailabilityDto } from './dto/availability.dto';

@Controller('api/bookings')
export class BookingsController {
  private readonly logger = new Logger(BookingsController.name);

  constructor(private readonly bookingsService: BookingsService) {}

  @Post()
  async create(@Body() createBookingDto: CreateBookingDto) {
    try {
      this.logger.log(`Creating booking for ${createBookingDto.userEmail}`);
      const booking = await this.bookingsService.create(createBookingDto);
      this.logger.log(`Booking created successfully: ${booking.id}`);
      return booking;
    } catch (error) {
      this.logger.error('Error creating booking:', error);
      // Let service exceptions bubble up (BadRequestException, ConflictException, etc.)
      throw error;
    }
  }

  @Get('availability')
  async getAvailability(@Query() query: GetAvailabilityDto) {
    try {
      this.logger.log(`Fetching availability for date: ${query.date}, service: ${query.serviceId}`);
      const availability = await this.bookingsService.getAvailability(query.date, query.serviceId);
      return availability;
    } catch (error) {
      this.logger.error('Error fetching availability:', error);
      throw new HttpException(
        'Failed to fetch availability',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all bookings');
      return await this.bookingsService.findAll();
    } catch (error) {
      this.logger.error('Error fetching bookings:', error);
      throw new HttpException(
        'Failed to fetch bookings',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching booking with ID: ${id}`);
      return await this.bookingsService.findOne(id);
    } catch (error) {
      this.logger.error(`Error fetching booking ${id}:`, error);
      throw error;
    }
  }
}
