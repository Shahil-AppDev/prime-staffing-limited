import { IsString, IsArray, IsOptional, IsEnum, IsDate, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { SocialPlatform, PostStatus } from '@prisma/client';

export class CreateSocialPostDto {
  @ApiProperty({ example: 'Check out our latest interior design project! 🏡✨' })
  @IsString()
  caption: string;

  @ApiProperty({ enum: SocialPlatform, isArray: true, example: ['INSTAGRAM', 'FACEBOOK'] })
  @IsArray()
  @IsEnum(SocialPlatform, { each: true })
  platforms: SocialPlatform[];

  @ApiProperty({ enum: PostStatus, example: PostStatus.DRAFT, required: false })
  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @ApiProperty({ example: '2024-03-15T10:00:00Z', required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  scheduledFor?: Date;

  @ApiProperty({ example: ['interiordesign', 'homedecor', 'modernliving'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hashtags?: string[];

  @ApiProperty({ example: ['https://example.com/image1.jpg'], required: false })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mediaUrls?: string[];

  @ApiProperty({ example: false, required: false })
  @IsOptional()
  @IsBoolean()
  aiGenerated?: boolean;
}
