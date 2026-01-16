import { Controller, Get, Post, Body, Logger, HttpException, HttpStatus } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('api/contact')
export class ContactController {
  private readonly logger = new Logger(ContactController.name);

  constructor(private readonly contactService: ContactService) {}

  @Post()
  async create(@Body() createContactDto: CreateContactDto) {
    try {
      this.logger.log(`Creating contact inquiry from ${createContactDto.email}`);
      const inquiry = await this.contactService.create(createContactDto);
      this.logger.log(`Contact inquiry created successfully: ${inquiry.id}`);
      return inquiry;
    } catch (error) {
      this.logger.error('Error creating contact inquiry:', error);
      throw new HttpException(
        'Failed to submit contact inquiry',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  async findAll() {
    try {
      this.logger.log('Fetching all contact inquiries');
      return await this.contactService.findAll();
    } catch (error) {
      this.logger.error('Error fetching contact inquiries:', error);
      throw new HttpException(
        'Failed to fetch contact inquiries',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
