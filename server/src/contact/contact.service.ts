import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactService {
  constructor(private prisma: PrismaService) {}

  async create(createContactDto: CreateContactDto) {
    // Find or create user
    let user = await this.prisma.user.findUnique({
      where: { email: createContactDto.email },
    });

    if (!user) {
      user = await this.prisma.user.create({
        data: {
          email: createContactDto.email,
          name: createContactDto.name,
          phone: createContactDto.phone,
        },
      });
    }

    // Create contact inquiry
    return this.prisma.contactInquiry.create({
      data: {
        userId: user.id,
        name: createContactDto.name,
        email: createContactDto.email,
        phone: createContactDto.phone,
        message: createContactDto.message,
        status: 'NEW',
      },
      include: {
        user: true,
      },
    });
  }

  async findAll() {
    return this.prisma.contactInquiry.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
