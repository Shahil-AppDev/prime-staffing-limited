import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Health')
@Controller()
export class HealthController {
  @Get()
  @ApiOperation({ summary: 'Root endpoint - API status' })
  getRoot() {
    return {
      status: 'ok',
      message: 'Rajiv Social Media Marketing Platform API',
      version: '1.0.0',
      documentation: '/api/docs',
      endpoints: {
        auth: '/api/auth',
        users: '/api/users',
        projects: '/api/projects',
        clients: '/api/clients',
        blog: '/api/blog',
        socialPosts: '/api/social-posts',
        media: '/api/media',
        analytics: '/api/analytics',
      },
    };
  }

  @Get('health')
  @ApiOperation({ summary: 'Health check endpoint' })
  getHealth() {
    return {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
