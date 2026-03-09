import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { N8nService } from '../n8n/n8n.service';
import { CreateSocialPostDto } from './dto/create-social-post.dto';
import { UpdateSocialPostDto } from './dto/update-social-post.dto';
import { PostStatus } from '@prisma/client';

@Injectable()
export class SocialPostsService {
  constructor(
    private prisma: PrismaService,
    private n8nService: N8nService,
  ) {}

  async create(createSocialPostDto: CreateSocialPostDto, authorId: string) {
    const post = await this.prisma.socialPost.create({
      data: {
        ...createSocialPostDto,
        authorId,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    if (createSocialPostDto.scheduledFor) {
      await this.n8nService.triggerSchedulePost(post);
    }

    return post;
  }

  async findAll(status?: PostStatus) {
    return this.prisma.socialPost.findMany({
      where: status ? { status } : undefined,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        analytics: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  async findOne(id: string) {
    const post = await this.prisma.socialPost.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        analytics: true,
      },
    });

    if (!post) {
      throw new NotFoundException('Social post not found');
    }

    return post;
  }

  async update(id: string, updateSocialPostDto: UpdateSocialPostDto) {
    const post = await this.prisma.socialPost.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Social post not found');
    }

    return this.prisma.socialPost.update({
      where: { id },
      data: updateSocialPostDto,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    const post = await this.prisma.socialPost.findUnique({ where: { id } });

    if (!post) {
      throw new NotFoundException('Social post not found');
    }

    await this.prisma.socialPost.delete({ where: { id } });
    return { message: 'Social post deleted successfully' };
  }

  async publish(id: string) {
    const post = await this.findOne(id);

    await this.n8nService.triggerPublishPost(post);

    return this.prisma.socialPost.update({
      where: { id },
      data: {
        status: PostStatus.PUBLISHED,
        publishedAt: new Date(),
      },
    });
  }

  async generateCaption(imageUrl: string) {
    return this.n8nService.triggerGenerateCaption(imageUrl);
  }

  async getScheduled() {
    return this.prisma.socialPost.findMany({
      where: {
        status: PostStatus.SCHEDULED,
        scheduledFor: {
          gte: new Date(),
        },
      },
      orderBy: {
        scheduledFor: 'asc',
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }
}
