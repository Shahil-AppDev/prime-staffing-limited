import { IsString, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GenerateCaptionDto {
  @ApiProperty({ example: 'https://example.com/image.jpg' })
  @IsString()
  @IsUrl()
  imageUrl: string;
}
