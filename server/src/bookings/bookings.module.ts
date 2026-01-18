import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { GoogleCalendarModule } from '../google-calendar/google-calendar.module';
import { EmailModule } from '../email/email.module';

@Module({
  imports: [PrismaModule, GoogleCalendarModule, EmailModule],
  controllers: [BookingsController],
  providers: [BookingsService],
})
export class BookingsModule {}
