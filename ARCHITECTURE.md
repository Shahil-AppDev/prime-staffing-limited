# Social Media Marketing Platform - Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
├──────────────────────────┬──────────────────────────────────────┤
│   Public Website         │      Admin Dashboard                 │
│   (Next.js 14)          │      (Next.js 14)                    │
│   - Home, About         │      - Analytics Dashboard           │
│   - Portfolio           │      - Content Manager               │
│   - Blog, Contact       │      - Social Media Scheduler        │
└──────────────────────────┴──────────────────────────────────────┘
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BACKEND API LAYER                          │
│                      (NestJS + Express)                         │
├─────────────────────────────────────────────────────────────────┤
│  Auth Service  │  Content Service  │  Media Service             │
│  User Service  │  Social Service   │  Analytics Service         │
└─────────────────────────────────────────────────────────────────┘
                              ▼
┌──────────────────┬──────────────────┬─────────────────────────┐
│   PostgreSQL     │   Cloudinary     │      n8n Automation     │
│   (Prisma ORM)   │   (Media CDN)    │   - Auto Publishing     │
│                  │                  │   - AI Captions         │
│                  │                  │   - Social Analytics    │
└──────────────────┴──────────────────┴─────────────────────────┘
```

## Tech Stack Summary

### Frontend
- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + shadcn/ui
- **State**: Zustand + React Query
- **Animation**: Framer Motion
- **Forms**: React Hook Form + Zod

### Backend
- **Framework**: NestJS
- **Runtime**: Node.js 20+
- **API**: REST + WebSockets
- **Auth**: JWT + Refresh Tokens
- **Validation**: class-validator + class-transformer

### Database
- **Primary DB**: PostgreSQL 16
- **ORM**: Prisma
- **Cache**: Redis (optional)
- **Migrations**: Prisma Migrate

### Infrastructure
- **Containerization**: Docker + Docker Compose
- **Reverse Proxy**: Nginx
- **Media Storage**: Cloudinary
- **Automation**: n8n (self-hosted)

## Core Features

### 1. Public Website
- SEO-optimized pages
- Dynamic portfolio gallery
- Blog with CMS
- Contact form with lead capture
- Responsive design + dark mode

### 2. Admin Dashboard
- Role-based access (Admin, Editor, Social Media Manager)
- Analytics dashboard
- Content management system
- Social media post scheduler
- Client/Project CRM
- Media library manager

### 3. Social Media Automation
- Multi-platform publishing (Instagram, Facebook, TikTok, Pinterest)
- Post scheduling with calendar view
- AI-powered caption generation
- Automated hashtag suggestions
- Performance analytics

### 4. Authentication & Security
- JWT-based authentication
- Refresh token rotation
- Role-based access control (RBAC)
- Password hashing (bcrypt)
- Rate limiting
- CORS protection
- Helmet security headers

## Database Schema

### Core Entities
- **Users**: Admin users with roles
- **Roles**: Permission-based roles
- **Clients**: CRM client database
- **Projects**: Interior design projects
- **PortfolioItems**: Showcase projects
- **BlogPosts**: Content marketing
- **SocialPosts**: Social media content
- **Media**: Image/video assets
- **Analytics**: Performance metrics

## API Endpoints

### Authentication
- POST `/api/auth/login`
- POST `/api/auth/register`
- POST `/api/auth/refresh`
- POST `/api/auth/logout`

### Users
- GET `/api/users`
- GET `/api/users/:id`
- PATCH `/api/users/:id`
- DELETE `/api/users/:id`

### Projects
- GET `/api/projects`
- POST `/api/projects`
- GET `/api/projects/:id`
- PATCH `/api/projects/:id`
- DELETE `/api/projects/:id`

### Social Posts
- GET `/api/social-posts`
- POST `/api/social-posts`
- POST `/api/social-posts/:id/schedule`
- POST `/api/social-posts/:id/publish`
- GET `/api/social-posts/analytics`

### Media
- POST `/api/media/upload`
- GET `/api/media`
- DELETE `/api/media/:id`

### Blog
- GET `/api/blog`
- POST `/api/blog`
- GET `/api/blog/:slug`
- PATCH `/api/blog/:id`
- DELETE `/api/blog/:id`

## n8n Workflows

### Workflow 1: Auto-Publish Scheduled Posts
- Trigger: Cron (every 5 minutes)
- Check for posts scheduled for current time
- Publish to each platform via API
- Update post status
- Send notification

### Workflow 2: AI Caption Generator
- Trigger: Webhook from backend
- Analyze image using Vision API
- Generate caption using GPT-4
- Return optimized caption + hashtags

### Workflow 3: Social Analytics Collector
- Trigger: Cron (daily)
- Fetch metrics from each platform
- Store in database
- Generate weekly report

### Workflow 4: Lead Notification
- Trigger: Webhook (new contact form)
- Send email to admin
- Create CRM entry
- Send auto-response to client

## Security Best Practices

1. **Environment Variables**: All secrets in .env files
2. **Password Hashing**: bcrypt with salt rounds 10
3. **JWT Security**: Short-lived access tokens (15min), long-lived refresh tokens (7d)
4. **CORS**: Whitelist specific origins
5. **Rate Limiting**: Prevent brute force attacks
6. **Input Validation**: DTO validation on all endpoints
7. **SQL Injection**: Prisma ORM prevents SQL injection
8. **XSS Protection**: Helmet middleware
9. **HTTPS**: SSL/TLS in production
10. **Secrets Management**: Never commit .env files

## Deployment Strategy

### Development
```bash
docker-compose -f docker-compose.dev.yml up
```

### Production
```bash
docker-compose -f docker-compose.prod.yml up -d
```

### Services
- Frontend: Port 3000
- Admin: Port 3001
- Backend: Port 4000
- PostgreSQL: Port 5432
- n8n: Port 5678
- Nginx: Port 80/443

## Scalability Considerations

1. **Horizontal Scaling**: Stateless backend allows multiple instances
2. **Database**: Connection pooling with Prisma
3. **Caching**: Redis for session storage and API caching
4. **CDN**: Cloudinary for media delivery
5. **Load Balancing**: Nginx reverse proxy
6. **Queue System**: Bull/BullMQ for background jobs

## Monitoring & Logging

- **Application Logs**: Winston logger
- **Error Tracking**: Sentry integration ready
- **Performance**: Built-in analytics dashboard
- **Health Checks**: `/health` endpoint
- **Database Monitoring**: Prisma query logging
