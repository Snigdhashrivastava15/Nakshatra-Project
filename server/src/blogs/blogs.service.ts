import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

export interface Blog {
  id: number;
  title: string;
  slug: string;
  thumbnail: string;
  excerpt: string;
  content: string;
  author: string;
  publishedDate: string;
  tags: string[];
  category?: string;
}

@Injectable()
export class BlogsService {
  private readonly logger = new Logger(BlogsService.name);

  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Blog[]> {
    try {
      // TODO: When Blog model is added to Prisma schema:
      // return await this.prisma.blog.findMany({
      //   where: { published: true },
      //   orderBy: { publishedDate: 'desc' },
      // });

      // For now, return empty array or static data
      // This structure allows easy migration to database later
      this.logger.warn('Blogs feature not yet implemented in database');
      return [];
    } catch (error) {
      this.logger.error('Error in findAll:', error);
      throw error;
    }
  }

  async findOneBySlug(slug: string): Promise<Blog | null> {
    try {
      // TODO: When Blog model is added to Prisma schema:
      // return await this.prisma.blog.findFirst({
      //   where: {
      //     slug,
      //     published: true,
      //   },
      // });

      // For now, return null
      this.logger.warn(`Blog lookup by slug not yet implemented: ${slug}`);
      return null;
    } catch (error) {
      this.logger.error(`Error in findOneBySlug for ${slug}:`, error);
      throw error;
    }
  }
}
