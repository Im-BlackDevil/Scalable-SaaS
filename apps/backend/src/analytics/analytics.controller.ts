import { Controller, Get, Param, Query, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { AnalyticsService } from './analytics.service';
import { GetAnalyticsDto } from './dto/get-analytics.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('analytics')
@Controller('analytics')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('user')
  @ApiOperation({ summary: 'Get user analytics' })
  @ApiResponse({ status: 200, description: 'Analytics retrieved successfully' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'groupBy', required: false, enum: ['day', 'hour'] })
  getUserAnalytics(@Request() req, @Query() query: GetAnalyticsDto) {
    return this.analyticsService.getUserAnalytics(req.user.id, query);
  }

  @Get('link/:id')
  @ApiOperation({ summary: 'Get link analytics' })
  @ApiResponse({ status: 200, description: 'Link analytics retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  @ApiQuery({ name: 'startDate', required: false, type: String })
  @ApiQuery({ name: 'endDate', required: false, type: String })
  @ApiQuery({ name: 'groupBy', required: false, enum: ['day', 'hour'] })
  getLinkAnalytics(@Param('id') id: string, @Request() req, @Query() query: GetAnalyticsDto) {
    return this.analyticsService.getLinkAnalytics(id, req.user.id, query);
  }
} 