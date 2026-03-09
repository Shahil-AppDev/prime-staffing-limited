# Deployment Guide

Complete guide for deploying the Rajiv Social Media Marketing Platform to production.

## Table of Contents

1. [Server Requirements](#server-requirements)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Environment Configuration](#environment-configuration)
4. [Database Setup](#database-setup)
5. [Docker Deployment](#docker-deployment)
6. [Nginx & SSL Configuration](#nginx--ssl-configuration)
7. [n8n Configuration](#n8n-configuration)
8. [Monitoring & Maintenance](#monitoring--maintenance)
9. [Backup Strategy](#backup-strategy)
10. [Troubleshooting](#troubleshooting)

## Server Requirements

### Minimum Specifications

- **CPU**: 2 cores
- **RAM**: 4GB
- **Storage**: 40GB SSD
- **OS**: Ubuntu 22.04 LTS (recommended)
- **Network**: Static IP address

### Recommended Specifications

- **CPU**: 4 cores
- **RAM**: 8GB
- **Storage**: 80GB SSD
- **Bandwidth**: 100Mbps

## Pre-Deployment Checklist

- [ ] Domain name registered and DNS configured
- [ ] Server provisioned with SSH access
- [ ] SSL certificate obtained (Let's Encrypt)
- [ ] Cloudinary account created
- [ ] OpenAI API key obtained
- [ ] Social media API credentials ready
- [ ] Email SMTP configured
- [ ] Backup strategy planned

## Environment Configuration

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# Install Docker Compose
sudo apt install docker-compose -y

# Install Node.js (for local development)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm
```

### 2. Clone Repository

```bash
cd /var/www
git clone <repository-url> rajiv-platform
cd rajiv-platform
```

### 3. Configure Environment

```bash
cp .env.example .env
nano .env
```

**Production Environment Variables:**

```env
# Database
DATABASE_URL="postgresql://postgres:STRONG_PASSWORD@postgres:5432/rajiv_platform?schema=public"
POSTGRES_PASSWORD=STRONG_PASSWORD

# Backend
NODE_ENV=production
BACKEND_PORT=4000

# JWT (Generate with: openssl rand -base64 32)
JWT_SECRET=<generated-secret>
JWT_REFRESH_SECRET=<generated-secret>

# URLs
NEXT_PUBLIC_API_URL=https://api.yourdomain.com/api
NEXT_PUBLIC_FRONTEND_URL=https://yourdomain.com
NEXT_PUBLIC_ADMIN_URL=https://admin.yourdomain.com

# Cloudinary
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# n8n
N8N_HOST=n8n.yourdomain.com
N8N_USER=admin
N8N_PASSWORD=<strong-password>
N8N_API_KEY=<generated-api-key>

# OpenAI
OPENAI_API_KEY=sk-...

# Social Media
INSTAGRAM_ACCESS_TOKEN=...
FACEBOOK_ACCESS_TOKEN=...
FACEBOOK_PAGE_ID=...
TIKTOK_ACCESS_TOKEN=...
PINTEREST_ACCESS_TOKEN=...

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
EMAIL_FROM=noreply@yourdomain.com

# Security
CORS_ORIGIN=https://yourdomain.com,https://admin.yourdomain.com
BCRYPT_SALT_ROUNDS=12
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

## Database Setup

### Option 1: Docker PostgreSQL (Included)

Database runs automatically with Docker Compose.

### Option 2: Managed Database (Recommended for Production)

Use managed PostgreSQL from:
- **Supabase** (free tier available)
- **Railway** (developer-friendly)
- **DigitalOcean Managed Database**
- **AWS RDS**

Update `DATABASE_URL` in `.env` with managed database connection string.

### Initialize Database

```bash
cd apps/backend

# Generate Prisma client
pnpm prisma generate

# Run migrations
pnpm prisma migrate deploy

# Seed database
pnpm prisma db seed
```

## Docker Deployment

### 1. Build Images

```bash
docker-compose -f docker-compose.prod.yml build
```

### 2. Start Services

```bash
docker-compose -f docker-compose.prod.yml up -d
```

### 3. Verify Services

```bash
# Check running containers
docker-compose ps

# View logs
docker-compose logs -f

# Check specific service
docker-compose logs backend
```

### 4. Service URLs

- Backend API: `http://localhost:4000`
- Frontend: `http://localhost:3000`
- Admin: `http://localhost:3001`
- n8n: `http://localhost:5678`
- PostgreSQL: `localhost:5432`

## Nginx & SSL Configuration

### 1. Install Certbot

```bash
sudo apt install certbot python3-certbot-nginx -y
```

### 2. Obtain SSL Certificate

```bash
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
sudo certbot --nginx -d admin.yourdomain.com
sudo certbot --nginx -d api.yourdomain.com
sudo certbot --nginx -d n8n.yourdomain.com
```

### 3. Update Nginx Configuration

Edit `/etc/nginx/sites-available/rajiv-platform`:

```nginx
# Frontend
server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin
server {
    listen 443 ssl http2;
    server_name admin.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/admin.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/admin.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# API
server {
    listen 443 ssl http2;
    server_name api.yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/api.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/api.yourdomain.com/privkey.pem;

    location / {
        proxy_pass http://localhost:4000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com admin.yourdomain.com api.yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

### 4. Enable and Restart Nginx

```bash
sudo ln -s /etc/nginx/sites-available/rajiv-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

## n8n Configuration

### 1. Access n8n

Navigate to `https://n8n.yourdomain.com`

### 2. Import Workflows

1. Login with credentials from `.env`
2. Go to **Workflows** → **Import from File**
3. Import each workflow from `n8n/workflows/`:
   - `auto-publish-posts.json`
   - `ai-caption-generator.json`
   - `lead-notification.json`
   - `social-analytics.json`

### 3. Configure Credentials

Add credentials for:
- **OpenAI API**
- **Instagram/Facebook OAuth**
- **SMTP Email**
- **HTTP Header Auth** (for backend API)

### 4. Activate Workflows

Enable all imported workflows.

## Monitoring & Maintenance

### Health Checks

Create a monitoring script `/usr/local/bin/health-check.sh`:

```bash
#!/bin/bash

# Check services
services=("backend" "frontend" "admin" "postgres" "n8n")

for service in "${services[@]}"; do
    if ! docker-compose ps | grep -q "$service.*Up"; then
        echo "⚠️  $service is down!"
        # Send alert (email, Slack, etc.)
    fi
done
```

### Automated Backups

Create backup script `/usr/local/bin/backup-db.sh`:

```bash
#!/bin/bash

BACKUP_DIR="/var/backups/rajiv-platform"
DATE=$(date +%Y%m%d_%H%M%S)

mkdir -p $BACKUP_DIR

# Backup PostgreSQL
docker-compose exec -T postgres pg_dump -U postgres rajiv_platform > $BACKUP_DIR/db_$DATE.sql

# Compress
gzip $BACKUP_DIR/db_$DATE.sql

# Keep only last 30 days
find $BACKUP_DIR -name "*.sql.gz" -mtime +30 -delete

echo "Backup completed: db_$DATE.sql.gz"
```

### Cron Jobs

```bash
sudo crontab -e
```

Add:

```cron
# Daily backup at 2 AM
0 2 * * * /usr/local/bin/backup-db.sh

# Health check every 5 minutes
*/5 * * * * /usr/local/bin/health-check.sh

# SSL renewal check
0 0 1 * * certbot renew --quiet
```

## Backup Strategy

### What to Backup

1. **Database**: PostgreSQL dumps
2. **Media Files**: Cloudinary (automatic)
3. **Environment Files**: `.env`
4. **n8n Workflows**: Export regularly
5. **Code**: Git repository

### Backup Locations

- **Primary**: Server local storage
- **Secondary**: Cloud storage (S3, Backblaze)
- **Tertiary**: Off-site backup

### Restore Procedure

```bash
# Restore database
gunzip < backup.sql.gz | docker-compose exec -T postgres psql -U postgres rajiv_platform

# Restart services
docker-compose restart
```

## Troubleshooting

### Service Won't Start

```bash
# Check logs
docker-compose logs <service-name>

# Restart service
docker-compose restart <service-name>

# Rebuild if needed
docker-compose up -d --build <service-name>
```

### Database Connection Issues

```bash
# Check PostgreSQL logs
docker-compose logs postgres

# Test connection
docker-compose exec postgres psql -U postgres -d rajiv_platform
```

### High Memory Usage

```bash
# Check resource usage
docker stats

# Restart services
docker-compose restart
```

### SSL Certificate Issues

```bash
# Test SSL
sudo certbot certificates

# Renew manually
sudo certbot renew --force-renewal
```

## Performance Optimization

### 1. Enable Caching

Add Redis for session storage and API caching.

### 2. CDN Configuration

Use Cloudflare or similar CDN for static assets.

### 3. Database Optimization

```sql
-- Add indexes for frequently queried fields
CREATE INDEX idx_social_posts_status ON social_posts(status);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
```

### 4. Docker Resource Limits

Edit `docker-compose.prod.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '2'
          memory: 2G
```

## Security Hardening

1. **Firewall**: Configure UFW
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Fail2Ban**: Install for SSH protection
   ```bash
   sudo apt install fail2ban -y
   ```

3. **Regular Updates**:
   ```bash
   sudo apt update && sudo apt upgrade -y
   docker-compose pull
   docker-compose up -d
   ```

4. **Environment Security**: Never expose `.env` files

---

**Deployment Complete! 🎉**

Your platform is now live and ready for production use.
