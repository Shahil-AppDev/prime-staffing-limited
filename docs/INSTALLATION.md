# 🚀 Installation Guide - Prime Concept Decor Platform

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 18.x or higher
- **pnpm** 8.x or higher
- **Docker Desktop** (for PostgreSQL and n8n)
- **Git**

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/prime-concept-decors.git
cd prime-concept-decors
```

### 2. Install Dependencies

```bash
# Install all workspace dependencies
pnpm install
```

### 3. Environment Setup

Create environment files for each application:

#### Backend (.env)
```bash
cd apps/backend
cp .env.example .env
```

Edit `apps/backend/.env` with your configuration:
```env
# Database
DATABASE_URL="postgresql://prime_user:prime_password@localhost:5432/prime_platform"

# JWT
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
JWT_REFRESH_SECRET="your-super-secret-refresh-key-change-this-in-production"
JWT_EXPIRES_IN="15m"
JWT_REFRESH_EXPIRES_IN="7d"

# Cloudinary (for media uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# n8n
N8N_WEBHOOK_URL="http://localhost:5678/webhook"

# Social Media (optional)
INSTAGRAM_ACCESS_TOKEN=""
FACEBOOK_ACCESS_TOKEN=""
TIKTOK_ACCESS_TOKEN=""

# OpenAI (for AI features)
OPENAI_API_KEY=""

# Email (SendGrid or SMTP)
EMAIL_FROM="noreply@primeconceptdecor.com"
SENDGRID_API_KEY=""

# Redis (optional, for caching)
REDIS_HOST="localhost"
REDIS_PORT="6379"

# Server
BACKEND_PORT="4000"
NODE_ENV="development"

# Security
RATE_LIMIT_TTL="60"
RATE_LIMIT_MAX="100"
CORS_ORIGIN="http://localhost:3000,http://localhost:3001"
```

#### Frontend (.env.local)
```bash
cd apps/frontend
cp .env.example .env.local
```

Edit `apps/frontend/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

#### Admin (.env.local)
```bash
cd apps/admin
cp .env.example .env.local
```

Edit `apps/admin/.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_SITE_URL=http://localhost:3001
```

### 4. Start PostgreSQL with Docker

```bash
# From project root
docker-compose -f docker-compose.dev.yml up -d postgres
```

Wait a few seconds for PostgreSQL to initialize.

### 5. Database Setup

```bash
cd apps/backend

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate dev

# Seed database with initial data
pnpm prisma db seed
```

### 6. Start Development Servers

Open **3 separate terminals**:

#### Terminal 1: Backend API
```bash
cd apps/backend
pnpm dev
# Runs on http://localhost:4000
# API Docs: http://localhost:4000/api/docs
```

#### Terminal 2: Frontend Website
```bash
cd apps/frontend
pnpm dev
# Runs on http://localhost:3000
```

#### Terminal 3: Admin Dashboard
```bash
cd apps/admin
pnpm dev
# Runs on http://localhost:3001
```

### 7. (Optional) Start n8n for Automation

```bash
docker-compose -f docker-compose.dev.yml up -d n8n
# Access n8n at http://localhost:5678
```

## Default Credentials

### Admin Dashboard
- **Email:** `admin@primeconceptdecor.com`
- **Password:** `Admin123!`

### Other Users
- **Editor:** `editor@primeconceptdecor.com` / `Admin123!`
- **Social Manager:** `social@primeconceptdecor.com` / `Admin123!`

### Database
- **Host:** `localhost`
- **Port:** `5432`
- **Database:** `prime_platform`
- **User:** `prime_user`
- **Password:** `prime_password`

## Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Public website |
| Admin | http://localhost:3001 | Admin dashboard |
| Backend API | http://localhost:4000/api | REST API |
| API Docs | http://localhost:4000/api/docs | Swagger documentation |
| n8n | http://localhost:5678 | Workflow automation |
| PostgreSQL | localhost:5432 | Database |

## Production Deployment

### Using Docker Compose

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

Services will be available at:
- Frontend: http://localhost (port 80)
- Admin: http://localhost/admin
- Backend API: http://localhost/api
- n8n: http://localhost:5678

### Environment Variables for Production

Update the following in your production `.env` files:

1. Change all secrets and passwords
2. Set `NODE_ENV=production`
3. Update `CORS_ORIGIN` with your production domains
4. Configure proper database credentials
5. Add real API keys for Cloudinary, SendGrid, OpenAI, etc.

## Troubleshooting

### Port Already in Use

If you get "port already in use" errors:

```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Linux/Mac
lsof -ti:3000 | xargs kill -9
```

### Database Connection Issues

1. Ensure Docker Desktop is running
2. Check PostgreSQL container status:
   ```bash
   docker ps
   ```
3. Restart PostgreSQL:
   ```bash
   docker-compose -f docker-compose.dev.yml restart postgres
   ```

### Prisma Issues

```bash
# Reset database (WARNING: deletes all data)
pnpm prisma migrate reset

# Regenerate Prisma client
pnpm prisma generate
```

### Module Not Found Errors

```bash
# Clean install
rm -rf node_modules
pnpm install
```

## Development Workflow

### Adding a New Feature

1. Create feature branch
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make changes and test locally

3. Run linting and type checking
   ```bash
   pnpm lint
   pnpm type-check
   ```

4. Commit and push
   ```bash
   git add .
   git commit -m "feat: your feature description"
   git push origin feature/your-feature-name
   ```

### Database Changes

1. Modify `apps/backend/prisma/schema.prisma`

2. Create migration
   ```bash
   cd apps/backend
   pnpm prisma migrate dev --name your_migration_name
   ```

3. Update seed data if needed in `apps/backend/prisma/seed.ts`

## Support

For issues and questions:
- **Email:** contact@primeconceptdecor.com
- **Documentation:** See `/docs` folder
- **API Docs:** http://localhost:4000/api/docs

## License

Proprietary - Prime Concept Decor © 2026
