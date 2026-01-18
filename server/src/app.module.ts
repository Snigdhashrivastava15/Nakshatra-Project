import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaModule } from './prisma/prisma.module';
import { ServicesModule } from './services/services.module';
import { BookingsModule } from './bookings/bookings.module';
import { ContactModule } from './contact/contact.module';
import { GoogleCalendarModule } from './google-calendar/google-calendar.module';
import { HealthModule } from './health/health.module';
import { EmailModule } from './email/email.module';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.local'],
      cache: true,
      expandVariables: true,
    }),
    ScheduleModule.forRoot(),
    PrismaModule,
    ServicesModule,
    BookingsModule,
    ContactModule,
    GoogleCalendarModule,
    HealthModule,
    EmailModule,
    BlogsModule,
  ],
})
export class AppModule {}

