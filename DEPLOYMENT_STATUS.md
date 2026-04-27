# 🚀 DEPLOYMENT STATUS - Prime Staffing Ltd

**Server:** 65.21.104.251  
**Domain:** primestaffingltd.com  
**Date:** April 27, 2026

---

## ✅ COMPLETED STEPS

### 1. SSH Connection ✅
- Successfully connected to server
- Server: Ubuntu 24.04.3 LTS
- IP: 65.21.104.251

### 2. Directory Structure Created ✅
```
/var/www/primestaffing/
├── app/          (project files)
├── nginx/        (nginx configs)
├── docker/       (docker files)
└── data/
    └── postgres/ (database data)
```

### 3. Files Transferred ✅
- All project files copied to `/var/www/primestaffing/app/`
- Total size: ~3.8 MB (compressed)
- Excludes: node_modules, .next, dist, .git

### 4. Production Environment Created ✅
**File:** `/var/www/primestaffing/app/.env.production`

Contains:
- Database credentials
- JWT secrets
- API URLs
- CORS configuration
- Rate limiting settings

### 5. Docker Compose Configuration ✅
**File:** `/var/www/primestaffing/app/docker-compose.prod.yml`

**Ports Allocated (No Conflicts):**
- Backend: 4012 → 4000
- Frontend: 3009 → 3000
- Admin: 3010 → 3000
- PostgreSQL: Internal only

---

## ⏳ REMAINING STEPS

### STEP 1: Install Dependencies on Server

```bash
# SSH to server
ssh root@65.21.104.251

# Navigate to project
cd /var/www/primestaffing/app

# Install pnpm globally
npm install -g pnpm@latest

# Install project dependencies
pnpm install

# Build backend
cd apps/backend
pnpm build

# Generate Prisma client
npx prisma generate

# Build frontend
cd ../frontend
pnpm build

# Build admin
cd ../admin
pnpm build
```

### STEP 2: Setup Database

```bash
cd /var/www/primestaffing/app/apps/backend

# Push database schema
npx prisma db push

# Seed database with initial data
npx prisma db seed
```

### STEP 3: Start Services with PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start backend
cd /var/www/primestaffing/app/apps/backend
pm2 start npm --name "primestaffing-backend" -- run start:prod
pm2 save

# Start frontend
cd ../frontend
pm2 start npm --name "primestaffing-frontend" -- start
pm2 save

# Start admin
cd ../admin
pm2 start npm --name "primestaffing-admin" -- start
pm2 save

# Set PM2 to start on boot
pm2 startup
pm2 save
```

### STEP 4: Configure Nginx

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/primestaffingltd.com
```

**Paste this configuration:**

```nginx
# Frontend - primestaffingltd.com
server {
    listen 80;
    server_name primestaffingltd.com www.primestaffingltd.com;

    location / {
        proxy_pass http://localhost:3009;
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
        proxy_pass http://localhost:3010;
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
        proxy_pass http://localhost:4012;
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
```

**Enable the site:**

```bash
# Create symbolic link
ln -s /etc/nginx/sites-available/primestaffingltd.com /etc/nginx/sites-enabled/

# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx
```

### STEP 5: Setup SSL with Let's Encrypt

```bash
# Install Certbot
apt update
apt install certbot python3-certbot-nginx -y

# Generate SSL certificates
certbot --nginx -d primestaffingltd.com -d www.primestaffingltd.com -d admin.primestaffingltd.com -d api.primestaffingltd.com

# Follow prompts:
# - Enter email address
# - Agree to terms
# - Choose redirect HTTP to HTTPS (option 2)
```

### STEP 6: Verify Deployment

```bash
# Check PM2 processes
pm2 status

# Check logs
pm2 logs primestaffing-backend
pm2 logs primestaffing-frontend
pm2 logs primestaffing-admin

# Test URLs
curl -I https://primestaffingltd.com
curl -I https://admin.primestaffingltd.com
curl -I https://api.primestaffingltd.com/api/health
```

---

## 📊 PORT ALLOCATION

| Service | Internal Port | External Port | URL |
|---------|---------------|---------------|-----|
| Backend | 4000 | 4012 | api.primestaffingltd.com |
| Frontend | 3000 | 3009 | primestaffingltd.com |
| Admin | 3000 | 3010 | admin.primestaffingltd.com |

**These ports do NOT conflict with existing projects.**

---

## 🔧 USEFUL COMMANDS

### PM2 Management
```bash
# View all processes
pm2 status

# View logs
pm2 logs

# Restart a service
pm2 restart primestaffing-backend

# Stop a service
pm2 stop primestaffing-backend

# Delete a service
pm2 delete primestaffing-backend
```

### Database Management
```bash
cd /var/www/primestaffing/app/apps/backend

# View database
npx prisma studio

# Reset database
npx prisma db push --force-reset

# Seed database
npx prisma db seed
```

### Nginx Management
```bash
# Test configuration
nginx -t

# Reload Nginx
systemctl reload nginx

# Restart Nginx
systemctl restart nginx

# View error logs
tail -f /var/log/nginx/error.log
```

---

## 🎯 FINAL URLS

After completing all steps, your platform will be live at:

- **Frontend:** https://primestaffingltd.com
- **Admin:** https://admin.primestaffingltd.com
- **API:** https://api.primestaffingltd.com

**Default Admin Login:**
- Email: admin@primestaffing.com
- Password: Admin123!

⚠️ **Change password immediately after first login!**

---

## 📝 NOTES

1. **DNS Configuration:** Ensure these A records point to 65.21.104.251:
   - primestaffingltd.com
   - www.primestaffingltd.com
   - admin.primestaffingltd.com
   - api.primestaffingltd.com

2. **Firewall:** Ensure ports 80, 443, 3009, 3010, 4012 are open

3. **Database:** PostgreSQL is not exposed externally (secure)

4. **Isolation:** This deployment is completely isolated from other projects on the server

---

## ✅ DEPLOYMENT CHECKLIST

- [x] SSH connection established
- [x] Directory structure created
- [x] Files transferred
- [x] Environment file configured
- [x] Docker Compose created
- [ ] Dependencies installed
- [ ] Apps built
- [ ] Database setup
- [ ] Services started with PM2
- [ ] Nginx configured
- [ ] SSL certificates installed
- [ ] Deployment verified

---

**Complete the remaining steps above to finish the deployment!**
