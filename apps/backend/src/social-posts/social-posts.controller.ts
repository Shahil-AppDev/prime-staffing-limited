import { Controller, Get, Post, Patch, Delete, Param, Body, Query, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiQuery } from '@nestjs/swagger';
import { SocialPostsService } from './social-posts.service';
import { CreateSocialPostDto } from './dto/create-social-post.dto';
import { UpdateSocialPostDto } from './dto/update-social-post.dto';
import { GenerateCaptionDto } from './dto/generate-caption.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PostStatus } from '@prisma/client';

@ApiTags('Social Posts')
@Controller('social-posts')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class SocialPostsController {
  constructor(private socialPostsService: SocialPostsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new social post' })
  create(@Body() createSocialPostDto: CreateSocialPostDto, @Req() req) {
    return this.socialPostsService.create(createSocialPostDto, req.user.sub);
  }

  @Get()
  @ApiOperation({ summary: 'Get all social posts' })
  @ApiQuery({ name: 'status', enum: PostStatus, required: false })
  findAll(@Query('status') status?: PostStatus) {
    return this.socialPostsService.findAll(status);
  }

  @Get('scheduled')
  @ApiOperation({ summary: 'Get scheduled posts' })
  getScheduled() {
    return this.socialPostsService.getScheduled();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get social post by ID' })
  findOne(@Param('id') id: string) {
    return this.socialPostsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update social post' })
  update(@Param('id') id: string, @Body() updateSocialPostDto: UpdateSocialPostDto) {
    return this.socialPostsService.update(id, updateSocialPostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete social post' })
  remove(@Param('id') id: string) {
    return this.socialPostsService.remove(id);
  }

  @Post(':id/publish')
  @ApiOperation({ summary: 'Publish social post immediately' })
  publish(@Param('id') id: string) {
    return this.socialPostsService.publish(id);
  }

  @Post('generate-caption')
  @ApiOperation({ summary: 'Generate AI caption for image' })
  generateCaption(@Body() generateCaptionDto: GenerateCaptionDto) {
    return this.socialPostsService.generateCaption(generateCaptionDto.imageUrl);
  }
}
