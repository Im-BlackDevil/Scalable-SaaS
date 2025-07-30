import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { GetAnalyticsDto } from './dto/get-analytics.dto';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getLinkAnalytics(linkId: string, userId: string, query: GetAnalyticsDto) {
    // Verify link belongs to user
    const link = await this.prisma.link.findFirst({
      where: { id: linkId, userId },
    });

    if (!link) {
      throw new Error('Link not found');
    }

    const { startDate, endDate, groupBy = 'day' } = query;

    // Get clicks with filters
    const clicks = await this.prisma.click.findMany({
      where: {
        linkId,
        timestamp: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    // Aggregate data
    const analytics = {
      totalClicks: clicks.length,
      uniqueClicks: new Set(clicks.map(c => c.ipAddress)).size,
      countries: this.aggregateByField(clicks, 'country'),
      browsers: this.aggregateByField(clicks, 'browser'),
      devices: this.aggregateByField(clicks, 'device'),
      referrers: this.aggregateByField(clicks, 'referer'),
      timeSeries: this.generateTimeSeries(clicks, groupBy, startDate, endDate),
      recentClicks: clicks.slice(0, 10),
    };

    return analytics;
  }

  async getUserAnalytics(userId: string, query: GetAnalyticsDto) {
    const { startDate, endDate, groupBy = 'day' } = query;

    // Get all user's links
    const links = await this.prisma.link.findMany({
      where: { userId },
      include: {
        _count: {
          select: { clicks: true },
        },
      },
    });

    // Get all clicks for user's links
    const clicks = await this.prisma.click.findMany({
      where: {
        link: { userId },
        timestamp: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      include: {
        link: {
          select: {
            id: true,
            originalUrl: true,
            shortCode: true,
            title: true,
          },
        },
      },
      orderBy: { timestamp: 'desc' },
    });

    const analytics = {
      totalLinks: links.length,
      totalClicks: clicks.length,
      uniqueClicks: new Set(clicks.map(c => c.ipAddress)).size,
      topLinks: links
        .sort((a, b) => b._count.clicks - a._count.clicks)
        .slice(0, 10),
      countries: this.aggregateByField(clicks, 'country'),
      browsers: this.aggregateByField(clicks, 'browser'),
      devices: this.aggregateByField(clicks, 'device'),
      referrers: this.aggregateByField(clicks, 'referer'),
      timeSeries: this.generateTimeSeries(clicks, groupBy, startDate, endDate),
      recentClicks: clicks.slice(0, 20),
    };

    return analytics;
  }

  private aggregateByField(clicks: any[], field: string) {
    const aggregation = {};
    clicks.forEach(click => {
      const value = click[field] || 'Unknown';
      aggregation[value] = (aggregation[value] || 0) + 1;
    });
    return aggregation;
  }

  private generateTimeSeries(clicks: any[], groupBy: string, startDate?: string, endDate?: string) {
    const timeSeries = {};
    const start = startDate ? new Date(startDate) : new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const end = endDate ? new Date(endDate) : new Date();

    // Generate date range
    const dates: Date[] = [];
    let current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      if (groupBy === 'day') {
        current.setDate(current.getDate() + 1);
      } else if (groupBy === 'hour') {
        current.setHours(current.getHours() + 1);
      }
    }

    // Initialize time series with zeros
    dates.forEach(date => {
      const key = groupBy === 'day' 
        ? date.toISOString().split('T')[0]
        : date.toISOString().slice(0, 13) + ':00:00.000Z';
      timeSeries[key] = 0;
    });

    // Fill in actual click data
    clicks.forEach(click => {
      const clickDate = new Date(click.timestamp);
      const key = groupBy === 'day'
        ? clickDate.toISOString().split('T')[0]
        : clickDate.toISOString().slice(0, 13) + ':00:00.000Z';
      
      if (timeSeries[key] !== undefined) {
        timeSeries[key]++;
      }
    });

    return timeSeries;
  }
} 