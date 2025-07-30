import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { nanoid } from 'nanoid';

@Injectable()
export class LinksService {
  constructor(private prisma: PrismaService) {}

  async create(createLinkDto: CreateLinkDto, userId: string) {
    const { customAlias, utmParams, ...linkData } = createLinkDto;

    // Check if custom alias is already taken
    if (customAlias) {
      const existingLink = await this.prisma.link.findUnique({
        where: { customAlias },
      });
      if (existingLink) {
        throw new ConflictException('Custom alias already exists');
      }
    }

    // Generate short code if not provided
    const shortCode = customAlias || this.generateShortCode();

    // Create link with UTM parameters
    const link = await this.prisma.link.create({
      data: {
        ...linkData,
        shortCode,
        customAlias,
        userId,
        utmParams: utmParams ? {
          create: utmParams,
        } : undefined,
      },
      include: {
        utmParams: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return link;
  }

  async findAll(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [links, total] = await Promise.all([
      this.prisma.link.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          utmParams: true,
          _count: {
            select: { clicks: true },
          },
        },
      }),
      this.prisma.link.count({
        where: { userId },
      }),
    ]);

    return {
      links,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  async findOne(id: string, userId: string) {
    const link = await this.prisma.link.findFirst({
      where: { id, userId },
      include: {
        utmParams: true,
        clicks: {
          orderBy: { timestamp: 'desc' },
          take: 10,
        },
        _count: {
          select: { clicks: true },
        },
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found');
    }

    return link;
  }

  async findByShortCode(shortCode: string) {
    const link = await this.prisma.link.findFirst({
      where: {
        OR: [
          { shortCode },
          { customAlias: shortCode },
        ],
        isActive: true,
        AND: [
          {
            OR: [
              { expiresAt: null },
              { expiresAt: { gt: new Date() } },
            ],
          },
        ],
      },
      include: {
        utmParams: true,
      },
    });

    if (!link) {
      throw new NotFoundException('Link not found or expired');
    }

    return link;
  }

  async update(id: string, updateLinkDto: UpdateLinkDto, userId: string) {
    await this.findOne(id, userId);

    const { utmParams, ...linkData } = updateLinkDto as any;

    return this.prisma.link.update({
      where: { id },
      data: {
        ...linkData,
        utmParams: utmParams ? {
          upsert: {
            create: utmParams,
            update: utmParams,
          },
        } : undefined,
      },
      include: {
        utmParams: true,
      },
    });
  }

  async remove(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.link.update({
      where: { id },
      data: { isActive: false },
    });
  }

  async trackClick(linkId: string, clickData: any) {
    return this.prisma.click.create({
      data: {
        linkId,
        ...clickData,
      },
    });
  }

  private generateShortCode(): string {
    return nanoid(8);
  }
} 