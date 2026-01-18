import { Controller, Get, Post, Body, Param, Patch, Delete, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Controller('api/services')
export class ServicesController {
  private readonly logger = new Logger(ServicesController.name);

  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all services');
      const services = await this.servicesService.findAll();
      this.logger.log(`Successfully fetched ${services.length} services`);
      // Return empty array if no services (database might not be configured yet)
      return services || [];
    } catch (error: any) {
      this.logger.error('Error fetching services:', error);
      // If database connection issue, return empty array instead of error
      if (error.code === 'P1001' || error.code === 'P1000' || error.message?.includes('DATABASE_URL')) {
        this.logger.warn('Database not configured - returning empty services array');
        return [];
      }
      throw new HttpException(
        'Failed to fetch services',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      this.logger.log(`Fetching service with ID: ${id}`);
      return await this.servicesService.findOne(id);
    } catch (error) {
      this.logger.error(`Error fetching service ${id}:`, error);
      throw error; // Let NestJS handle the exception (NotFoundException, etc.)
    }
  }

  @Post()
  async create(@Body() createServiceDto: CreateServiceDto) {
    try {
      this.logger.log('Creating new service');
      return await this.servicesService.create(createServiceDto);
    } catch (error) {
      this.logger.error('Error creating service:', error);
      throw new HttpException(
        'Failed to create service',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateServiceDto: Partial<CreateServiceDto>) {
    try {
      this.logger.log(`Updating service with ID: ${id}`);
      return await this.servicesService.update(id, updateServiceDto);
    } catch (error) {
      this.logger.error(`Error updating service ${id}:`, error);
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      this.logger.log(`Removing service with ID: ${id}`);
      return await this.servicesService.remove(id);
    } catch (error) {
      this.logger.error(`Error removing service ${id}:`, error);
      throw error;
    }
  }
}
