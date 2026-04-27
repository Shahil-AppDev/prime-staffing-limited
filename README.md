# 🏢 Prime Staffing Ltd Platform

A modern, full-stack staffing and recruitment platform built with Next.js, NestJS, and PostgreSQL.

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

## 📁 Project Structure

```
prime-staffing-ltd/
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
- **Projects**: Staffing projects
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

- **Public Website:** https://primestaffing.com
- **Admin Dashboard:** https://admin.primestaffing.com
- **API:** https://api.primestaffing.com

## 🆘 Support

For issues and questions:
- Check documentation in `docs/` folder
- Review API docs at `/api/docs`
- **Email:** `social@primestaffing.com`

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

Proprietary - Prime Staffing Ltd. All rights reserved.

---

**Built with ❤️ by Prime Staffing Ltd Team**
