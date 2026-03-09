import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getDashboardStats() {
    const [totalProjects, totalClients, totalPosts, totalLeads] = await Promise.all([
      this.prisma.project.count(),
      this.prisma.client.count(),
      this.prisma.socialPost.count({ where: { status: 'PUBLISHED' } }),
      this.prisma.contactSubmission.count({ where: { read: false } }),
    ]);

    return {
      totalProjects,
      totalClients,
      totalPosts,
      totalLeads,
    };
  }

  async getSocialAnalytics() {
    const posts = await this.prisma.socialPost.findMany({
      where: { status: 'PUBLISHED' },
      include: { analytics: true },
      orderBy: { publishedAt: 'desc' },
      take: 10,
    });

    return posts;
  }
}
