import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateServiceDto } from './dto/create-service.dto';

@Injectable()
export class ServicesService {
  private readonly logger = new Logger(ServicesService.name);

  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const services = await this.prisma.service.findMany({
        where: { active: true },
        orderBy: { createdAt: 'asc' },
      });
      return services || [];
    } catch (error) {
      this.logger.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOne(id: string) {
    const service = await this.prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      throw new NotFoundException(`Service with ID ${id} not found`);
    }

    return service;
  }

  async create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  async update(id: string, updateServiceDto: Partial<CreateServiceDto>) {
    const service = await this.findOne(id);
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.service.update({
      where: { id },
      data: { active: false },
    });
  }
}
