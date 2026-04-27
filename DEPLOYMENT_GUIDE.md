# 🚀 PRODUCTION DEPLOYMENT GUIDE
## Prime Staffing Ltd - VPS Deployment

**Server:** 65.21.104.251 (Hetzner)  
**Domain:** primestaffingltd.com  
**Project:** Prime Staffing Ltd Platform

---

## ⚠️ IMPORTANT: ISOLATED DEPLOYMENT

This deployment is designed to **NOT interfere** with existing projects on your server.

**Isolation Strategy:**
- Separate folder: `/var/www/primestaffing`
- Unique Docker network: `primestaffing_network`
- Non-conflicting ports: 8080, 8081, 8082, 8083
- Separate Nginx configs
- Isolated database container

---

## 📋 PRE-DEPLOYMENT CHECKLIST

- [ ] Server access: SSH to 65.21.104.251
- [ ] GitHub repository ready
- [ ] Domain DNS configured (A records pointing to 65.21.104.251)
- [ ] Docker and Docker Compose installed on server
- [ ] Nginx installed on server
- [ ] Certbot installed for SSL

---

## 🔧 STEP 1: PUSH TO GITHUB

**On your local machine:**

```bash
# Navigate to project
cd "G:\Desktop\Projet Web\Rajiv"

# Initialize git if needed
git init

# Add all files
git add .

# Commit
git commit -m "Production ready version - Prime Staffing Ltd"

# Add remote (replace with your repo URL)
git remote add origin https://github.com/Shahil-AppDev/prime-concept-decors.git

# Push to main branch
git push -u origin main
```

**Alternative using GitHub CLI:**
```bash
gh repo create prime-staffing-ltd --public --source=. --remote=origin --push
```

---

## 🔧 STEP 2: SSH INTO SERVER

```bash
ssh root@65.21.104.251
```

Or if using a specific user:
```bash
ssh your-username@65.21.104.251
```

---

## 🔧 STEP 3: CREATE PROJECT STRUCTURE

```bash
# Create main project directory
sudo mkdir -p /var/www/primestaffing

# Create subdirectories
sudo mkdir -p /var/www/primestaffing/app
sudo mkdir -p /var/www/primestaffing/nginx
sudo mkdir -p /var/www/primestaffing/docker
sudo mkdir -p /var/www/primestaffing/data/postgres

# Set permissions
sudo chown -R $USER:$USER /var/www/primestaffing
```

---

## 🔧 STEP 4: CLONE REPOSITORY

```bash
# Navigate to project folder
cd /var/www/primestaffing

# Clone repository
git clone https://github.com/Shahil-AppDev/prime-concept-decors.git app

# Navigate into app
cd app
```

---

## 🔧 STEP 5: CREATE PRODUCTION ENVIRONMENT

**Create `.env.production` in project root:**

```bash
nano /var/www/primestaffing/app/.env.production
```

**Paste this content (MODIFY VALUES):**

```env
# ================================
# PRODUCTION ENVIRONMENT
# Prime Staffing Ltd
# ================================

# Database Configuration
DATABASE_URL="postgresql://primestaffing_user:CHANGE_THIS_PASSWORD@postgres:5432/primestaffing_db?schema=public"
POSTGRES_USER=primestaffing_user
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD
POSTGRES_DB=primestaffing_db

# Backend API Configuration
NODE_ENV=production
PORT=4000
API_URL=https://api.primestaffingltd.com

# JWT Configuration (GENERATE NEW SECRETS!)
JWT_SECRET=CHANGE_THIS_TO_RANDOM_64_CHAR_STRING
JWT_REFRESH_SECRET=CHANGE_THIS_TO_DIFFERENT_64_CHAR_STRING
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URLs
NEXT_PUBLIC_API_URL=https://api.primestaffingltd.com/api
NEXT_PUBLIC_SITE_URL=https://primestaffingltd.com

# Admin URLs
NEXT_PUBLIC_ADMIN_URL=https://admin.primestaffingltd.com

# Bcrypt
BCRYPT_SALT_ROUNDS=10

# CORS
CORS_ORIGIN=https://primestaffingltd.com,https://admin.primestaffingltd.com

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100

# Optional: Cloudinary (if using)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Email (if using)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
SMTP_FROM=noreply@primestaffingltd.com

# Optional: OpenAI (if using)
OPENAI_API_KEY=your_openai_key
```

**Generate secure JWT secrets:**
```bash
# Generate JWT_SECRET
openssl rand -base64 64

# Generate JWT_REFRESH_SECRET
openssl rand -base64 64
```

**Save and exit:** Ctrl+X, Y, Enter

---

## 🔧 STEP 6: CREATE PRODUCTION DOCKER COMPOSE

**Create `docker-compose.prod.yml`:**

```bash
nano /var/www/primestaffing/app/docker-compose.prod.yml
```

**Paste this content:**

```yaml
version: '3.8'

services:
  # PostgreSQL Database
  postgres:
    image: postgres:16-alpine
    container_name: primestaffing_db
    restart: always
    environment:
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
      POSTGRES_DB: ${POSTGRES_DB}
    volumes:
      - /var/www/primestaffing/data/postgres:/var/lib/postgresql/data
    networks:
      - primestaffing_network
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER}"]
      interval: 10s
      timeout: 5s
      retries: 5

  # Backend API
  backend:
    build:
      context: ./apps/backend
      dockerfile: ../../docker/backend/Dockerfile
    container_name: primestaffing_backend
    restart: always
    env_file:
      - .env.production
    ports:
      - "8080:4000"  # Non-conflicting port
    depends_on:
      postgres:
        condition: service_healthy
    networks:
      - primestaffing_network
    command: sh -c "npx prisma migrate deploy && npx prisma db seed && npm run start:prod"

  # Frontend
  frontend:
    build:
      context: ./apps/frontend
      dockerfile: ../../docker/frontend/Dockerfile
      args:
        NEXT_PUBLIC_API_URL: https://api.primestaffingltd.com/api
    container_name: primestaffing_frontend
    restart: always
    ports:
      - "8081:3000"  # Non-conflicting port
    networks:
      - primestaffing_network
    depends_on:
      - backend

  # Admin Dashboard
  admin:
    build:
      context: ./apps/admin
      dockerfile: ../../docker/admin/Dockerfile
      args:
        NEXT_PUBLIC_API_URL: https://api.primestaffingltd.com/api
    container_name: primestaffing_admin
    restart: always
    ports:
      - "8082:3000"  # Non-conflicting port
    networks:
      - primestaffing_network
    depends_on:
      - backend

networks:
  primestaffing_network:
    name: primestaffing_network
    driver: bridge

volumes:
  postgres_data:
```

**Save and exit:** Ctrl+X, Y, Enter

---

## 🔧 STEP 7: BUILD AND DEPLOY

```bash
# Navigate to app directory
cd /var/www/primestaffing/app

# Load environment variables
export $(cat .env.production | xargs)

# Build and start containers
docker-compose -f docker-compose.prod.yml up -d --build

# Check status
docker-compose -f docker-compose.prod.yml ps

# View logs
docker-compose -f docker-compose.prod.yml logs -f
```

**Wait for all services to be healthy (may take 5-10 minutes for first build)**

---

## 🔧 STEP 8: NGINX REVERSE PROXY CONFIGURATION

### Create Nginx Config for Main Domain

```bash
sudo nano /etc/nginx/sites-available/primestaffingltd.com
```

**Paste this content:**

```nginx
# Frontend - primestaffingltd.com
server {
    listen 80;
    server_name primestaffingltd.com www.primestaffingltd.com;

    location / {
        proxy_pass http://localhost:8081;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Admin - admin.primestaffingltd.com
server {
    listen 80;
    server_name admin.primestaffingltd.com;

    location / {
        proxy_pass http://localhost:8082;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}

# Backend API - api.primestaffingltd.com
server {
    listen 80;
    server_name api.primestaffingltd.com;

    location / {
        proxy_pass http://localhost:8080;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        
        # CORS headers
        add_header 'Access-Control-Allow-Origin' 'https://primestaffingltd.com' always;
        add_header 'Access-Control-Allow-Methods' 'GET, POST, PUT, DELETE, PATCH, OPTIONS' always;
        add_header 'Access-Control-Allow-Headers' 'Authorization, Content-Type' always;
    }
}
```

**Save and exit:** Ctrl+X, Y, Enter

### Enable the site

```bash
# Create symbolic link
sudo ln -s /etc/nginx/sites-available/primestaffingltd.com /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

---

## 🔧 STEP 9: SSL CERTIFICATES (Let's Encrypt)

```bash
# Install Certbot if not already installed
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# Generate SSL certificates for all domains
sudo certbot --nginx -d primestaffingltd.com -d www.primestaffingltd.com -d admin.primestaffingltd.com -d api.primestaffingltd.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

**Certbot will automatically:**
- Generate SSL certificates
- Update Nginx config to use HTTPS
- Set up auto-renewal

**Test auto-renewal:**
```bash
sudo certbot renew --dry-run
```

---

## 🔧 STEP 10: VERIFY DEPLOYMENT

### Check Docker Containers

```bash
docker ps | grep primestaffing
```

**Expected output:**
```
primestaffing_frontend   Up   0.0.0.0:8081->3000/tcp
primestaffing_admin      Up   0.0.0.0:8082->3000/tcp
primestaffing_backend    Up   0.0.0.0:8080->4000/tcp
primestaffing_db         Up   5432/tcp
```

### Check Nginx

```bash
sudo nginx -t
sudo systemctl status nginx
```

### Test URLs

```bash
# Test frontend
curl -I https://primestaffingltd.com

# Test admin
curl -I https://admin.primestaffingltd.com

# Test API
curl -I https://api.primestaffingltd.com/api/health
```

### Access in Browser

- **Frontend:** https://primestaffingltd.com
- **Admin:** https://admin.primestaffingltd.com
- **API Docs:** https://api.primestaffingltd.com/api/docs

---

## 📊 PORT ALLOCATION

**To avoid conflicts with existing projects:**

| Service | Internal Port | External Port | URL |
|---------|---------------|---------------|-----|
| Backend | 4000 | 8080 | api.primestaffingltd.com |
| Frontend | 3000 | 8081 | primestaffingltd.com |
| Admin | 3000 | 8082 | admin.primestaffingltd.com |
| PostgreSQL | 5432 | (internal only) | - |

**These ports (8080-8082) should not conflict with other projects.**

---

## 🔧 MAINTENANCE COMMANDS

### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f admin
```

### Restart Services

```bash
# Restart all
docker-compose -f docker-compose.prod.yml restart

# Restart specific service
docker-compose -f docker-compose.prod.yml restart backend
```

### Update Deployment

```bash
# Pull latest code
cd /var/www/primestaffing/app
git pull origin main

# Rebuild and restart
docker-compose -f docker-compose.prod.yml up -d --build

# Reload Nginx
sudo systemctl reload nginx
```

### Database Backup

```bash
# Backup database
docker exec primestaffing_db pg_dump -U primestaffing_user primestaffing_db > backup_$(date +%Y%m%d).sql

# Restore database
docker exec -i primestaffing_db psql -U primestaffing_user primestaffing_db < backup_20260427.sql
```

---

## 🐛 TROUBLESHOOTING

### Containers won't start

```bash
# Check logs
docker-compose -f docker-compose.prod.yml logs

# Check specific service
docker logs primestaffing_backend
```

### Port conflicts

```bash
# Check what's using a port
sudo lsof -i :8080
sudo lsof -i :8081
sudo lsof -i :8082

# Change ports in docker-compose.prod.yml if needed
```

### Nginx errors

```bash
# Test config
sudo nginx -t

# Check error logs
sudo tail -f /var/log/nginx/error.log
```

### SSL certificate issues

```bash
# Renew certificates manually
sudo certbot renew

# Check certificate status
sudo certbot certificates
```

### Database connection issues

```bash
# Check database is running
docker exec primestaffing_db pg_isready -U primestaffing_user

# Connect to database
docker exec -it primestaffing_db psql -U primestaffing_user -d primestaffing_db
```

---

## 🔒 SECURITY CHECKLIST

- [ ] Changed default JWT secrets
- [ ] Strong database password set
- [ ] Firewall configured (UFW)
- [ ] SSL certificates installed
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Database not exposed externally
- [ ] Regular backups scheduled

---

## 📝 POST-DEPLOYMENT TASKS

1. **Test all functionality:**
   - Login to admin panel
   - Create test content
   - Test contact form
   - Verify API endpoints

2. **Monitor logs for errors:**
   ```bash
   docker-compose -f docker-compose.prod.yml logs -f
   ```

3. **Set up monitoring:**
   - Install monitoring tools (optional)
   - Set up uptime monitoring
   - Configure error alerts

4. **Create backup script:**
   - Automate database backups
   - Set up cron job for daily backups

---

## ✅ DEPLOYMENT COMPLETE

Your Prime Staffing Ltd platform should now be live at:

- **Frontend:** https://primestaffingltd.com
- **Admin:** https://admin.primestaffingltd.com  
- **API:** https://api.primestaffingltd.com

**Default Admin Credentials:**
- Email: admin@primestaffing.com
- Password: Admin123!

**⚠️ IMPORTANT:** Change admin password immediately after first login!

---

**Need help? Check logs or contact support.**
