import { IsString, IsNotEmpty, IsEmail, IsDateString, IsOptional, IsUUID } from 'class-validator';

export class CreateBookingDto {
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @IsEmail()
  @IsNotEmpty()
  userEmail: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @IsOptional()
  userPhone?: string;

  @IsDateString()
  @IsNotEmpty()
  bookingDate: string; // ISO date string

  @IsString()
  @IsNotEmpty()
  bookingTime: string; // Format: "HH:mm"

  @IsString()
  @IsOptional()
  notes?: string;
}
