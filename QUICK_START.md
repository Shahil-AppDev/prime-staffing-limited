# 🚀 QUICK START - DEMO READY IN 5 MINUTES

## ⚡ Emergency Setup for Client Demo

### Prerequisites
- Node.js 20+
- pnpm installed (`npm install -g pnpm`)
- PostgreSQL running (or use Docker)

---

## 🔥 FASTEST PATH - Local Development

### Step 1: Clone & Install (2 minutes)
```bash
git clone https://github.com/Shahil-AppDev/prime-concept-decors.git
cd prime-concept-decors
pnpm install
```

### Step 2: Setup Environment (1 minute)

**Backend (.env):**
```bash
cd apps/backend
cp .env.example .env
```

Edit `apps/backend/.env`:
```env
DATABASE_URL="postgresql://postgres:Sha742445!!@localhost:5432/rajiv_platform?schema=public"
JWT_SECRET="demo-secret-key-change-in-production-12345678"
JWT_REFRESH_SECRET="demo-refresh-secret-key-change-in-production-12345678"
NEXT_PUBLIC_API_URL="http://localhost:4000/api"
```

**Frontend (.env.local):**
```bash
cd apps/frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
```

**Admin (.env.local):**
```bash
cd apps/admin
echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > .env.local
```

### Step 3: Start PostgreSQL (if not running)
```bash
# Option 1: Docker
docker run -d \
  --name prime-staffing-db \
  -e POSTGRES_PASSWORD=Sha742445!! \
  -e POSTGRES_DB=rajiv_platform \
  -p 5432:5432 \
  postgres:16-alpine

# Option 2: Use existing PostgreSQL
# Just make sure it's running on port 5432
```

### Step 4: Setup Database (1 minute)
```bash
cd apps/backend
pnpm prisma generate
pnpm prisma db push
pnpm prisma db seed
```

### Step 5: Start All Services (1 minute)
```bash
# Terminal 1 - Backend
cd apps/backend
pnpm dev

# Terminal 2 - Frontend
cd apps/frontend
pnpm dev

# Terminal 3 - Admin
cd apps/admin
pnpm dev
```

---

## ✅ DEMO READY!

### Access Points:
- **Frontend:** http://localhost:3000
- **Admin:** http://localhost:3001
- **API Docs:** http://localhost:4000/api/docs

### Admin Login:
- **Email:** admin@primestaffing.com
- **Password:** Admin123!

---

## 🎯 What Works (Demo Features)

### Frontend (Public Site)
✅ Homepage with modern 2026 design
✅ About page - Company story
✅ Services page - Staffing services
✅ Success Stories (Portfolio) - With mock data
✅ Blog - With mock articles
✅ Contact form - Logs submissions
✅ Dark mode toggle
✅ Smooth animations
✅ Responsive design

### Admin Dashboard
✅ Login with JWT auth
✅ Dashboard with analytics
✅ Project management
✅ Blog post management
✅ Social media scheduler
✅ User management (Admin only)
✅ Modern glassmorphism UI

### Backend API
✅ Full REST API (40+ endpoints)
✅ Swagger documentation
✅ JWT authentication
✅ Role-based access control
✅ PostgreSQL database
✅ Prisma ORM

---

## 🔧 Troubleshooting

### Port Already in Use
```bash
# Kill process on port
# Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux:
lsof -ti:3000 | xargs kill -9
```

### Database Connection Error
```bash
# Check PostgreSQL is running
# Windows:
services.msc (look for PostgreSQL)

# Mac/Linux:
sudo service postgresql status

# Docker:
docker ps | grep postgres
```

### Prisma Errors
```bash
cd apps/backend
rm -rf node_modules
pnpm install
pnpm prisma generate
pnpm prisma db push
```

---

## 📦 Alternative: Docker (All-in-One)

```bash
# Start everything with Docker
docker-compose -f docker-compose.dev.yml up -d

# Wait 30 seconds for services to start
# Then run migrations
docker-compose exec backend pnpm prisma db push
docker-compose exec backend pnpm prisma db seed
```

---

## 🎨 Demo Script

### 1. Show Frontend (5 minutes)
- Navigate through all pages
- Show dark mode toggle
- Submit contact form
- Show responsive design (resize browser)

### 2. Show Admin Dashboard (5 minutes)
- Login with credentials
- Show dashboard analytics
- Create a blog post
- Schedule a social media post
- Show user management

### 3. Show API (2 minutes)
- Open http://localhost:4000/api/docs
- Show Swagger documentation
- Test an endpoint

---

## 🚀 Next Steps (Post-Demo)

1. **Add Real Content**
   - Replace placeholder images
   - Write real blog posts
   - Add client testimonials

2. **Connect Real APIs**
   - Social media (Instagram, Facebook)
   - Email service (SendGrid)
   - Analytics (Google Analytics)

3. **Deploy to Production**
   - Set up Hetzner VPS
   - Configure SSL
   - Set up domain

---

## 📞 Support

If something breaks during demo:
1. Check all 3 terminals are running
2. Check database is connected
3. Refresh browser (Ctrl+Shift+R)
4. Restart services if needed

**Emergency fallback:** Show mock data (already built-in for Portfolio and Blog)

---

**Platform is DEMO-READY! 🎉**
