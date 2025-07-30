import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class TeamMemberDto {
  @ApiProperty({ example: 'user-id-123' })
  @IsString()
  userId: string;

  @ApiProperty({ enum: ['OWNER', 'ADMIN', 'MEMBER'], default: 'MEMBER' })
  @IsOptional()
  @IsString()
  role?: string;
}

export class CreateTeamDto {
  @ApiProperty({ example: 'Marketing Team' })
  @IsString()
  name: string;

  @ApiProperty({ example: 'marketing-team' })
  @IsString()
  slug: string;

  @ApiProperty({ example: 'Our marketing team', required: false })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ type: [TeamMemberDto], required: false })
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TeamMemberDto)
  members?: TeamMemberDto[];
} 