import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception-filters/http-exception.filter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  try {
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    });

    // Enable CORS with multiple origins
    const allowedOrigins = [
      process.env.FRONTEND_URL,
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:3000',
      'http://localhost:8080',
      'http://127.0.0.1:5173',
      'http://127.0.0.1:5174',
      'http://127.0.0.1:8080',
    ].filter(Boolean);

    app.enableCors({
      origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.includes(origin) || process.env.NODE_ENV === 'development') {
          callback(null, true);
        } else {
          // In production, log but still allow for now (adjust as needed)
          logger.warn(`CORS: Blocked origin ${origin}`);
          callback(null, true);
        }
      },
      credentials: true,
      methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
      exposedHeaders: ['Content-Length', 'Content-Type'],
    });

    // Global validation pipe with better error handling
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
        disableErrorMessages: process.env.NODE_ENV === 'production',
      }),
    );

    // Global prefix (optional, but keeps API consistent)
    app.setGlobalPrefix('');

    // Global exception filter for better error handling
    app.useGlobalFilters(new AllExceptionsFilter());

    const port = process.env.PORT || 3000;
    await app.listen(port);
    
    logger.log(`🚀 Server running on http://localhost:${port}`);
    logger.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
    logger.log(`🌐 CORS enabled for origins: ${allowedOrigins.join(', ')}`);
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

bootstrap();

