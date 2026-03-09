import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.blogPost.findMany({
      where: { published: true },
      include: { author: { select: { id: true, firstName: true, lastName: true } } },
      orderBy: { publishedAt: 'desc' },
    });
  }

  async findBySlug(slug: string) {
    return this.prisma.blogPost.findUnique({
      where: { slug },
      include: { author: { select: { id: true, firstName: true, lastName: true } } },
    });
  }
}
