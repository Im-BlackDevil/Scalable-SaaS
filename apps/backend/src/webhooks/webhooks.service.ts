import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';

@Injectable()
export class WebhooksService {
  constructor(private prisma: PrismaService) {}

  async create(createWebhookDto: CreateWebhookDto, userId: string) {
    return this.prisma.webhook.create({
      data: {
        ...createWebhookDto,
        userId,
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.webhook.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const webhook = await this.prisma.webhook.findFirst({
      where: { id, userId },
    });

    if (!webhook) {
      throw new NotFoundException('Webhook not found');
    }

    return webhook;
  }

  async update(id: string, updateWebhookDto: UpdateWebhookDto, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.webhook.update({
      where: { id },
      data: updateWebhookDto,
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.webhook.delete({
      where: { id },
    });
  }
} 