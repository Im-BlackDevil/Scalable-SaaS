import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Patch, 
  Param, 
  Delete, 
  UseGuards, 
  Request,
  Query,
  Res,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { Response } from 'express';
import { LinksService } from './links.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { UpdateLinkDto } from './dto/update-link.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('links')
@Controller('links')
export class LinksController {
  constructor(private readonly linksService: LinksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new link' })
  @ApiResponse({ status: 201, description: 'Link created successfully' })
  @ApiResponse({ status: 409, description: 'Custom alias already exists' })
  create(@Body() createLinkDto: CreateLinkDto, @Request() req) {
    return this.linksService.create(createLinkDto, req.user.id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all user links' })
  @ApiResponse({ status: 200, description: 'Links retrieved successfully' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  findAll(@Request() req, @Query('page') page?: number, @Query('limit') limit?: number) {
    return this.linksService.findAll(req.user.id, page, limit);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get link by ID' })
  @ApiResponse({ status: 200, description: 'Link retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  findOne(@Param('id') id: string, @Request() req) {
    return this.linksService.findOne(id, req.user.id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update link' })
  @ApiResponse({ status: 200, description: 'Link updated successfully' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto, @Request() req) {
    return this.linksService.update(id, updateLinkDto, req.user.id);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete link' })
  @ApiResponse({ status: 200, description: 'Link deleted successfully' })
  @ApiResponse({ status: 404, description: 'Link not found' })
  remove(@Param('id') id: string, @Request() req) {
    return this.linksService.remove(id, req.user.id);
  }

  @Get('redirect/:shortCode')
  @ApiOperation({ summary: 'Redirect to original URL' })
  @ApiResponse({ status: 302, description: 'Redirect to original URL' })
  @ApiResponse({ status: 404, description: 'Link not found or expired' })
  @HttpCode(HttpStatus.FOUND)
  async redirect(@Param('shortCode') shortCode: string, @Res() res: Response, @Request() req) {
    const link = await this.linksService.findByShortCode(shortCode);
    
    // Track click
    await this.linksService.trackClick(link.id, {
      ipAddress: req.ip,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer'),
      // TODO: Add geolocation and device detection
    });

    // Build redirect URL with UTM parameters
    let redirectUrl = link.originalUrl;
    if (link.utmParams) {
      const url = new URL(link.originalUrl);
      if (link.utmParams.source) url.searchParams.set('utm_source', link.utmParams.source);
      if (link.utmParams.medium) url.searchParams.set('utm_medium', link.utmParams.medium);
      if (link.utmParams.campaign) url.searchParams.set('utm_campaign', link.utmParams.campaign);
      if (link.utmParams.term) url.searchParams.set('utm_term', link.utmParams.term);
      if (link.utmParams.content) url.searchParams.set('utm_content', link.utmParams.content);
      redirectUrl = url.toString();
    }

    res.redirect(redirectUrl);
  }
} 