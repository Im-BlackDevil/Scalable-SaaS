import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, IsOptional } from 'class-validator';

export class CreateWebhookDto {
  @ApiProperty({ example: 'https://api.example.com/webhook' })
  @IsString()
  url: string;

  @ApiProperty({ example: ['click', 'link_created'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  events: string[];
} 