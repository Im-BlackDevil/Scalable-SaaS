import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl, IsOptional, IsArray, IsDateString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UTMParamsDto {
  @ApiProperty({ example: 'google', required: false })
  @IsOptional()
  @IsString()
  source?: string;

  @ApiProperty({ example: 'cpc', required: false })
  @IsOptional()
  @IsString()
  medium?: string;

  @ApiProperty({ example: 'summer_sale', required: false })
  @IsOptional()
  @IsString()
  campaign?: string;

  @ApiProperty({ example: 'running+shoes', required: false })
  @IsOptional()
  @IsString()
  term?: string;

  @ApiProperty({ example: 'logo', required: false })
  @IsOptional()
  @IsString()
  content?: string;
}

export class CreateLinkDto {
  @ApiProperty({ example: 'https://example.com/very-long-url' })
  @IsUrl()
  originalUrl: string;

  @ApiProperty({ example: 'my-custom-alias', required: false })
  @IsOptional()
  @IsString()
  customAlias?: string;

  @ApiProperty({ example: 'My Awesome Link', required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'A description of my link', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: ['marketing', 'social'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiProperty({ example: '2024-12-31T23:59:59Z', required: false })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({ example: 'password123', required: false })
  @IsOptional()
  @IsString()
  password?: string;

  @ApiProperty({ type: UTMParamsDto, required: false })
  @IsOptional()
  @ValidateNested()
  @Type(() => UTMParamsDto)
  utmParams?: UTMParamsDto;
} 