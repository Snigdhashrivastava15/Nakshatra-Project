import { IsDateString, IsOptional, IsUUID } from 'class-validator';

export class GetAvailabilityDto {
  @IsDateString()
  @IsOptional()
  date?: string; // ISO date string

  @IsUUID()
  @IsOptional()
  serviceId?: string;
}
