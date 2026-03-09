# 🏢 Prime Concept Decor - Full-Stack Interior Design Platform

A complete production-ready monorepo platform for interior design business management. This platform features a public website, admin dashboard, backend API, and social media automation system for Prime Concept Decor.

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-10-red)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-blue)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue)](https://www.docker.com/)

## 🚀 Features

### Public Website
- SEO-optimized pages (Home, About, Services, Portfolio, Blog, Contact)
- Dynamic portfolio gallery
- Blog with CMS
- Contact form with lead capture
- Responsive design with dark mode support

### Admin Dashboard
- **Role-based access control** (Admin, Editor, Social Media Manager)
- Analytics dashboard with real-time metrics
- Content management system
- Social media post scheduler with calendar view
- Client/Project CRM
- Media library manager
- AI-powered caption generation

### Social Media Automation
- Multi-platform publishing (Instagram, Facebook, TikTok, Pinterest)
- Automated post scheduling
- AI-generated captions using GPT-4
- Performance analytics and reporting
- Hashtag suggestions

### Backend API
- RESTful API with Swagger documentation
- JWT authentication with refresh tokens
- Role-based access control
- Rate limiting and security headers
- Cloudinary integration for media storage
- n8n webhooks for automation

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router)
- **React** with TypeScript
- **TailwindCSS** for styling
- **Zustand** for state management
- **React Query** for data fetching
- **Framer Motion** for animations

### Backend
- **NestJS** framework
- **Node.js 20+**
- **PostgreSQL 16** database
- **Prisma ORM**
- **JWT** authentication
- **Cloudinary** for media storage

### Infrastructure
- **Docker** & Docker Compose
- **Nginx** reverse proxy
- **n8n** for workflow automation
- **Redis** (optional caching)

## 📋 Prerequisites

- Node.js 20+ and pnpm
- Docker and Docker Compose
- PostgreSQL 16 (or use Docker)
- Cloudinary account
- OpenAI API key (for AI features)
- Social media API credentials
htt://ghub.cm/YOUR_USERNAME/pime-conceptdecos.git
## pQmeickn et-decs

### 1. Clone the Repository

```bash
git clone <repository-url>
cd rajiv-social-platform
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Copy the example environment file and configure:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Database
DATABASE_URL="postgresql://prime_user:prime_password@localhost:5432/prime_platform?schema=public"

# JWT Secrets (generate secure random strings)
JWT_SECRET=your-super-secret-jwt-key
JWT_REFRESH_SECRET=your-super-secret-refresh-key

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Social Media
INSTAGRAM_ACCESS_TOKEN=your-instagram-token
FACEBOOK_ACCESS_TOKEN=your-facebook-token
FACEBOOK_PAGE_ID=your-page-id
```

### 4. Database Setup

```bash
# Generate Prisma client
pnpm db:generate

# Run migrations
pnpm db:migrate

# Seed database with sample data
pnpm db:seed
```

### 5. Start Development

```bash
# Start all services with Docker
pnpm docker:dev

# Or start services individually
cd apps/backend && pnpm dev
cd apps/frontend && pnpm dev
cd apps/admin && pnpm dev
```

## 🐳 Docker Deployment

### Development

```bash
docker-compose -f docker-compose.dev.yml up
```

### Production

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## 📚 API Documentation

Once the backend is running, access the Swagger documentation at:

```
http://localhost:4000/api/docs
```

## 🔐 Default Credentials

After seeding the database, use these credentials to login:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@primeconceptdecor.com | Admin123! |
| Editor | editor@primeconceptdecor.com | Admin123! |
| Social Manager | social@primeconceptdecor.com | Admin123! |

**⚠️ Change these passwords immediately in production!**

## 🔧 Configuration

### n8n Workflows

Import the pre-configured workflows:

1. Access n8n at `http://localhost:5678`
2. Login with credentials from `.env`
3. Import workflows from `n8n/workflows/`

Available workflows:
- **Auto-Publish Posts**: Automatically publishes scheduled social media posts
- **AI Caption Generator**: Generates captions using GPT-4 Vision
- **Lead Notification**: Sends email notifications for new leads
- **Social Analytics**: Collects daily analytics from social platforms

### Social Media Setup

#### Instagram
1. Create a Facebook App
2. Add Instagram Basic Display
3. Get access token
4. Add to `.env`

#### Facebook
1. Create Facebook Page
2. Get Page Access Token
3. Add to `.env`

#### TikTok & Pinterest
Follow official API documentation for setup.

## 📁 Project Structure

```
prime-concept-decors/
├── apps/
│   ├── backend/          # NestJS API (Port 4000)
│   ├── frontend/         # Public website (Port 3000)
│   └── admin/            # Admin dashboard (Port 3001)
├── docker/               # Docker configurations
│   ├── backend/          # Backend Dockerfile
│   ├── frontend/         # Frontend Dockerfile
│   ├── admin/            # Admin Dockerfile
│   └── nginx/            # Nginx config
├── n8n/                  # n8n workflows
│   └── workflows/        # Workflow JSON files
├── docs/                 # Documentation
│   ├── INSTALLATION.md   # Setup guide
│   ├── ARCHITECTURE.md   # Technical architecture
│   └── DEPLOYMENT.md     # Deployment guide
└── scripts/              # Utility scripts
```

## 🔒 Security Best Practices

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secrets**: Use strong random strings (32+ characters)
3. **Database**: Use strong passwords and restrict access
4. **HTTPS**: Always use SSL/TLS in production
5. **Rate Limiting**: Configure appropriate limits
6. **CORS**: Whitelist specific origins only
7. **Updates**: Keep dependencies updated

## 📊 Database Schema

The platform uses the following main entities:

- **Users**: Admin users with role-based permissions
- **Clients**: CRM client database
- **Projects**: Interior design projects
- **PortfolioItems**: Showcase projects
- **BlogPosts**: Content marketing
- **SocialPosts**: Social media content
- **Media**: Image/video assets
- **Analytics**: Performance metrics

View the complete schema in `apps/backend/prisma/schema.prisma`

## 🧪 Testing

```bash
# Run unit tests
pnpm test

# Run e2e tests
pnpm test:e2e

# Generate coverage report
pnpm test:cov
```

## 📈 Monitoring

### Health Checks

- Backend: `http://localhost:4000/health`
- Frontend: `http://localhost:3000`
- Admin: `http://localhost:3001`
- n8n: `http://localhost:5678`

### Logs

```bash
# View all logs
docker-compose logs -f

# View specific service
docker-compose logs -f backend
```

## 🚀 Production Deployment

### Prerequisites

- VPS or cloud server (2GB+ RAM recommended)
- Domain name
- SSL certificate (Let's Encrypt)

### Steps

1. **Clone repository on server**
2. **Configure environment variables**
3. **Set up SSL with Nginx**
4. **Start services**:
   ```bash
   docker-compose -f docker-compose.prod.yml up -d
   ```
5. **Configure domain DNS**
6. **Set up backups** for database

### Recommended Services

- **Hosting**: DigitalOcean, AWS, Hetzner
- **Database**: Managed PostgreSQL (Supabase, Railway)
- **Media**: Cloudinary CDN
- **Monitoring**: Sentry, LogRocket
- **Backups**: Automated daily backups

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## 🌐 Live URLs

Once deployed, the platform will be accessible at:

- **Public Website:** https://primeconceptdecor.com
- **Admin Dashboard:** https://admin.primeconceptdecor.com
- **API:** https://api.primeconceptdecor.com

## 🆘 Support

For issues and questions:
- Check documentation in `docs/` folder
- Review API docs at `/api/docs`
- Email: contact@primeconceptdecor.com

## 🎯 Roadmap

- [ ] Mobile app (React Native/Flutter)
- [ ] Advanced analytics dashboard
- [ ] Multi-language support (i18n)
- [ ] Video content support
- [ ] Instagram Stories automation
- [ ] Client portal with booking
- [ ] Payment integration (Stripe)
- [ ] AR room visualization
- [ ] E-commerce for decor items

## 📄 License

Proprietary - Prime Concept Decor © 2026. All rights reserved.

---

**Built with ❤️ by Prime Concept Decor Team**
