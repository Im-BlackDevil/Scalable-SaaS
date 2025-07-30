import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { CreateWebhookDto } from './dto/create-webhook.dto';
import { UpdateWebhookDto } from './dto/update-webhook.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('webhooks')
@Controller('webhooks')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new webhook' })
  @ApiResponse({ status: 201, description: 'Webhook created successfully' })
  create(@Body() createWebhookDto: CreateWebhookDto, @Request() req) {
    return this.webhooksService.create(createWebhookDto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all user webhooks' })
  @ApiResponse({ status: 200, description: 'Webhooks retrieved successfully' })
  findAll(@Request() req) {
    return this.webhooksService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get webhook by ID' })
  @ApiResponse({ status: 200, description: 'Webhook retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.webhooksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update webhook' })
  @ApiResponse({ status: 200, description: 'Webhook updated successfully' })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  update(@Param('id') id: string, @Body() updateWebhookDto: UpdateWebhookDto, @Request() req) {
    return this.webhooksService.update(id, updateWebhookDto, req.user.id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete webhook' })
  @ApiResponse({ status: 200, description: 'Webhook deleted successfully' })
  @ApiResponse({ status: 404, description: 'Webhook not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.webhooksService.remove(id, req.user.id);
  }
} 