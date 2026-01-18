import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HealthService {
  private readonly logger = new Logger(HealthService.name);

  constructor(private prisma: PrismaService) {}

  async check() {
    try {
      // Test database connection
      await this.prisma.$queryRaw`SELECT 1`;
      
      return {
        status: 'ok',
        timestamp: new Date().toISOString(),
        database: 'connected',
        uptime: process.uptime(),
      };
    } catch (error: any) {
      // Don't log as error - database might not be configured yet
      this.logger.warn('Database connection check failed:', error.message);
      return {
        status: 'degraded',
        timestamp: new Date().toISOString(),
        database: 'disconnected',
        message: 'Server is running but database is not available. API endpoints may not work correctly.',
        uptime: process.uptime(),
      };
    }
  }
}
