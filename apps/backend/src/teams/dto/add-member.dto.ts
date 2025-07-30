import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class AddMemberDto {
  @ApiProperty({ example: 'user-id-123' })
  @IsString()
  userId: string;

  @ApiProperty({ enum: ['OWNER', 'ADMIN', 'MEMBER'], default: 'MEMBER' })
  @IsOptional()
  @IsString()
  role?: string;
} 