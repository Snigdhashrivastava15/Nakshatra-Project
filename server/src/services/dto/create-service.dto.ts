import { IsString, IsNotEmpty, IsInt, IsOptional, IsBoolean, Min } from 'class-validator';

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  shortDescription?: string;

  @IsString()
  @IsOptional()
  fullDescription?: string;

  @IsString()
  @IsNotEmpty()
  category: string;

  @IsString()
  @IsOptional()
  iconName?: string;

  @IsInt()
  @Min(15)
  duration: number;

  @IsOptional()
  price?: number;

  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
