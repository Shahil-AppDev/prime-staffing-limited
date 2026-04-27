# 🚀 GitHub Actions CI/CD Deployment

**Project:** Prime Staffing Ltd  
**Server:** Hetzner VPS (65.21.104.251)  
**Deployment:** Automated via GitHub Actions

---

## 📋 Overview

This project uses GitHub Actions for automatic deployment to the Hetzner VPS server. Every push to the `main` or `master` branch triggers an automated deployment.

**Workflow File:** `.github/workflows/deploy-hetzner.yml`

---

## 🔑 Required GitHub Secrets

Before the first deployment, you must configure these secrets in your GitHub repository:

### Setting Up Secrets

1. Go to your GitHub repository
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Add the following secrets:

| Secret Name | Description | Example Value |
|-------------|-------------|---------------|
| `HETZNER_HOST` | Server IP address | `65.21.104.251` |
| `HETZNER_USER` | SSH username | `root` |
| `HETZNER_PORT` | SSH port | `22` |
| `HETZNER_SSH_KEY` | Private SSH key | `-----BEGIN OPENSSH PRIVATE KEY-----...` |

### Generating SSH Key

If you don't have an SSH key for GitHub Actions:

```bash
# On your local machine
ssh-keygen -t ed25519 -C "github-actions@primestaffing" -f ~/.ssh/github_actions_prime_staffing

# Copy the public key to the server
ssh-copy-id -i ~/.ssh/github_actions_prime_staffing.pub root@65.21.104.251

# Copy the PRIVATE key content for GitHub secret
cat ~/.ssh/github_actions_prime_staffing
```

**⚠️ Important:** Add the **private key** content to `HETZNER_SSH_KEY` secret in GitHub.

---

## 🏗️ First Server Setup

Before the first automated deployment, prepare the server:

### 1. Create Project Directory

```bash
ssh root@65.21.104.251

# Create directory structure
mkdir -p /var/www/primestaffing/{app,data/postgres}

# Clone repository
cd /var/www/primestaffing
git clone https://github.com/Shahil-AppDev/prime-concept-decors.git app

cd app
```

### 2. Create Production Environment File

```bash
nano /var/www/primestaffing/app/.env.production
```

**Add this content (modify values):**

```env
# Production Environment
NODE_ENV=production

# Database
POSTGRES_USER=primestaffing_user
POSTGRES_PASSWORD=CHANGE_THIS_SECURE_PASSWORD
POSTGRES_DB=primestaffing_db
DATABASE_URL=postgresql://primestaffing_user:CHANGE_THIS_SECURE_PASSWORD@postgres:5432/primestaffing_db?schema=public

# Backend API
PORT=4000
API_URL=https://api.primestaffingltd.com

# JWT Secrets (generate with: openssl rand -base64 64)
JWT_SECRET=YOUR_GENERATED_SECRET_HERE
JWT_REFRESH_SECRET=YOUR_GENERATED_REFRESH_SECRET_HERE
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Frontend URLs
NEXT_PUBLIC_API_URL=https://api.primestaffingltd.com/api
NEXT_PUBLIC_SITE_URL=https://primestaffingltd.com
NEXT_PUBLIC_ADMIN_URL=https://admin.primestaffingltd.com

# Bcrypt
BCRYPT_SALT_ROUNDS=10

# CORS
CORS_ORIGIN=https://primestaffingltd.com,https://admin.primestaffingltd.com

# Rate Limiting
RATE_LIMIT_TTL=60
RATE_LIMIT_MAX=100
```

**Generate secure secrets:**
```bash
openssl rand -base64 64  # For JWT_SECRET
openssl rand -base64 64  # For JWT_REFRESH_SECRET
```

### 3. Install Docker (if not installed)

```bash
# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Verify installation
docker --version
docker-compose --version
```

### 4. Make Deployment Script Executable

```bash
cd /var/www/primestaffing/app
chmod +x scripts/deploy-production.sh
```

### 5. Test Manual Deployment

```bash
./scripts/deploy-production.sh
```

---

## 🔄 How Deployment Works

### Automatic Deployment Flow

1. **Trigger:** Push to `main` or `master` branch
2. **GitHub Actions:** Workflow starts automatically
3. **Checkout:** Code is checked out in GitHub runner
4. **SSH Setup:** SSH connection to Hetzner server is established
5. **Deploy:** Deployment script runs on the server:
   - Pull latest code from GitHub
   - Stop existing containers
   - Build new Docker images
   - Start containers with new code
   - Run database migrations
   - Verify all services are running
6. **Health Check:** Verify containers are healthy
7. **Complete:** Deployment summary is shown

### What Gets Deployed

- **Backend API** → Port 4012 → https://api.primestaffingltd.com
- **Frontend** → Port 3009 → https://primestaffingltd.com
- **Admin Panel** → Port 3010 → https://admin.primestaffingltd.com
- **Database** → Internal (PostgreSQL)

### Isolated Deployment

- Container names: `prime-staffing-*`
- Network: `prime-staffing-network`
- Ports: 3009, 3010, 4012 (no conflicts)
- Data: `/var/www/primestaffing/data/postgres`

**Other projects on the server are NOT affected.**

---

## 🔙 How to Rollback

If a deployment fails or introduces bugs:

### Option 1: Rollback via Git

```bash
# SSH to server
ssh root@65.21.104.251

cd /var/www/primestaffing/app

# Find the previous commit
git log --oneline -5

# Rollback to previous commit
git reset --hard <previous-commit-hash>

# Redeploy
./scripts/deploy-production.sh
```

### Option 2: Rollback via GitHub

1. Go to GitHub repository
2. Find the last working commit
3. Create a new commit that reverts changes
4. Push to `main` branch
5. Automatic deployment will trigger

### Option 3: Manual Container Restart

```bash
ssh root@65.21.104.251

# Restart specific container
docker restart prime-staffing-backend
docker restart prime-staffing-frontend
docker restart prime-staffing-admin

# Or restart all
docker-compose -f /var/www/primestaffing/app/docker-compose.prod.yml restart
```

---

## 📊 How to Check Logs

### View Deployment Logs

**In GitHub:**
1. Go to **Actions** tab
2. Click on the latest workflow run
3. Expand steps to see detailed logs

**On Server:**

```bash
ssh root@65.21.104.251

# View all Prime Staffing containers
docker ps --filter "name=prime-staffing"

# View logs for specific container
docker logs prime-staffing-backend -f
docker logs prime-staffing-frontend -f
docker logs prime-staffing-admin -f
docker logs prime-staffing-db -f

# View last 100 lines
docker logs prime-staffing-backend --tail 100

# View logs with timestamps
docker logs prime-staffing-backend --timestamps
```

### Check Container Status

```bash
# Status of all containers
docker ps --filter "name=prime-staffing" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Detailed container info
docker inspect prime-staffing-backend

# Resource usage
docker stats --filter "name=prime-staffing"
```

### Check Application Health

```bash
# Test API health endpoint
curl https://api.primestaffingltd.com/api/health

# Test frontend
curl -I https://primestaffingltd.com

# Test admin
curl -I https://admin.primestaffingltd.com
```

---

## 🛠️ Manual Deployment

If you need to deploy manually (without GitHub Actions):

```bash
# SSH to server
ssh root@65.21.104.251

# Navigate to project
cd /var/www/primestaffing/app

# Pull latest code
git pull origin main

# Run deployment script
./scripts/deploy-production.sh
```

---

## 🐛 Troubleshooting

### Deployment Fails

**Check GitHub Actions logs:**
1. Go to **Actions** tab
2. Click failed workflow
3. Review error messages

**Common issues:**

| Issue | Solution |
|-------|----------|
| SSH connection failed | Verify `HETZNER_SSH_KEY` secret is correct |
| Permission denied | Ensure SSH key is added to server's `~/.ssh/authorized_keys` |
| Container won't start | Check logs: `docker logs prime-staffing-backend` |
| Port already in use | Check if ports 3009, 3010, 4012 are free |
| Database connection failed | Verify `.env.production` has correct credentials |

### Container Not Running

```bash
# Check why container stopped
docker logs prime-staffing-backend --tail 100

# Check container exit code
docker inspect prime-staffing-backend --format='{{.State.ExitCode}}'

# Restart container
docker restart prime-staffing-backend
```

### Database Issues

```bash
# Access database
docker exec -it prime-staffing-db psql -U primestaffing_user -d primestaffing_db

# Run migrations manually
docker exec prime-staffing-backend sh -c "cd /app/apps/backend && npx prisma migrate deploy"

# Reset database (⚠️ DESTRUCTIVE)
docker exec prime-staffing-backend sh -c "cd /app/apps/backend && npx prisma migrate reset"
```

### Disk Space Issues

```bash
# Check disk usage
df -h

# Clean up Docker
docker system prune -a --volumes

# Remove old Prime Staffing images only
docker images | grep prime-staffing | awk '{print $3}' | xargs docker rmi -f
```

---

## 🔒 Security Best Practices

1. **Never commit `.env.production`** - It's in `.gitignore`
2. **Use strong passwords** for database and JWT secrets
3. **Rotate SSH keys** periodically
4. **Limit SSH access** - Use firewall rules
5. **Keep secrets in GitHub Secrets** - Never in code
6. **Use HTTPS only** - All domains have SSL certificates
7. **Regular updates** - Keep Docker images updated

---

## 📝 Deployment Checklist

Before first deployment:

- [ ] GitHub secrets configured
- [ ] SSH key added to server
- [ ] Project directory created on server
- [ ] `.env.production` file created with secure values
- [ ] Docker and Docker Compose installed
- [ ] Nginx configured with SSL certificates
- [ ] Deployment script is executable
- [ ] Manual deployment tested successfully

For each deployment:

- [ ] Code changes tested locally
- [ ] Commit message is descriptive
- [ ] Push to `main` branch
- [ ] Monitor GitHub Actions workflow
- [ ] Verify deployment success
- [ ] Test application in browser
- [ ] Check container logs for errors

---

## 🎯 Deployment Commands Reference

```bash
# View deployment status
docker ps --filter "name=prime-staffing"

# View logs
docker logs prime-staffing-backend -f

# Restart services
docker-compose -f /var/www/primestaffing/app/docker-compose.prod.yml restart

# Stop services
docker-compose -f /var/www/primestaffing/app/docker-compose.prod.yml down

# Start services
docker-compose -f /var/www/primestaffing/app/docker-compose.prod.yml up -d

# Rebuild and restart
docker-compose -f /var/www/primestaffing/app/docker-compose.prod.yml up -d --build

# View resource usage
docker stats --filter "name=prime-staffing"

# Clean up
docker system prune -f
```

---

## 📞 Support

**Deployment Issues:**
- Check GitHub Actions logs
- Review server logs: `docker logs prime-staffing-backend`
- Verify `.env.production` configuration
- Ensure all GitHub secrets are set correctly

**Application Issues:**
- Check container status: `docker ps`
- Review application logs
- Test API endpoints
- Verify database connection

---

**Automated deployment is now active! Every push to `main` will deploy to production.** 🚀
