import { Controller, Get, Param, NotFoundException, Logger } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller('api/blogs')
export class BlogsController {
  private readonly logger = new Logger(BlogsController.name);

  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all blogs');
      const blogs = await this.blogsService.findAll();
      this.logger.log(`Successfully fetched ${blogs.length} blogs`);
      return blogs;
    } catch (error) {
      this.logger.error('Error fetching blogs:', error);
      throw error;
    }
  }

  @Get(':slug')
  async findOne(@Param('slug') slug: string) {
    try {
      this.logger.log(`Fetching blog with slug: ${slug}`);
      const blog = await this.blogsService.findOneBySlug(slug);
      
      if (!blog) {
        this.logger.warn(`Blog with slug ${slug} not found`);
        throw new NotFoundException(`Blog with slug ${slug} not found`);
      }

      return blog;
    } catch (error) {
      this.logger.error(`Error fetching blog ${slug}:`, error);
      throw error;
    }
  }
}
