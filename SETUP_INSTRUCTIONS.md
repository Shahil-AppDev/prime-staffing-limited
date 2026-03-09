# Quick Setup Instructions

## Prerequisites

You need either:
- **Option A**: Docker Desktop running (recommended for quick start)
- **Option B**: PostgreSQL installed locally

## Setup Steps

### Option A: Using Docker (Recommended)

1. **Start Docker Desktop**
   - Open Docker Desktop application
   - Wait for it to fully start (whale icon should be steady)

2. **Start PostgreSQL with Docker Compose**
   ```bash
   cd G:/Desktop/Projet Web/Rajiv
   docker-compose -f docker-compose.dev.yml up -d postgres
   ```

3. **Wait for PostgreSQL to be ready** (about 10 seconds)

4. **Run database migrations**
   ```bash
   cd apps/backend
   pnpm prisma migrate dev --name init
   ```

5. **Seed the database**
   ```bash
   pnpm prisma db seed
   ```

6. **Start the backend server**
   ```bash
   pnpm dev
   ```

7. **Test with Puppeteer** (in a new terminal)
   ```bash
   cd G:/Desktop/Projet Web/Rajiv
   node test-api.js
   ```

### Option B: Using Local PostgreSQL

1. **Install PostgreSQL 16**
   - Download from: https://www.postgresql.org/download/windows/
   - Install with default settings
   - Remember the password you set for the `postgres` user

2. **Create the database**
   ```bash
   psql -U postgres
   CREATE DATABASE rajiv_platform;
   \q
   ```

3. **Update .env file**
   ```bash
   cd G:/Desktop/Projet Web/Rajiv/apps/backend
   # Edit .env and update DATABASE_URL with your postgres password
   ```

4. **Run migrations and seed**
   ```bash
   pnpm prisma migrate dev --name init
   pnpm prisma db seed
   ```

5. **Start the backend**
   ```bash
   pnpm dev
   ```

6. **Test with Puppeteer**
   ```bash
   cd G:/Desktop/Projet Web/Rajiv
   node test-api.js
   ```

## Quick Test Commands

Once the backend is running:

```bash
# Test API health
curl http://localhost:4000/api/docs

# Test login
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d "{\"email\":\"admin@rajivinteriors.com\",\"password\":\"Admin123!\"}"

# Run Puppeteer tests
node test-api.js
```

## Default Credentials

After seeding:
- **Email**: admin@rajivinteriors.com
- **Password**: Admin123!

## Troubleshooting

### Docker not starting
- Make sure Docker Desktop is installed and running
- Check if WSL 2 is enabled (required for Docker Desktop on Windows)

### Port 4000 already in use
```bash
# Find and kill the process using port 4000
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

### Database connection error
- Verify PostgreSQL is running: `docker ps` or check Windows Services
- Check DATABASE_URL in .env file
- Ensure port 5432 is not blocked

### Prisma migration fails
```bash
# Reset database
pnpm prisma migrate reset
# Then run migrations again
pnpm prisma migrate dev
```

## Next Steps

1. ✅ Start Docker Desktop
2. ✅ Run PostgreSQL container
3. ✅ Run migrations
4. ✅ Seed database
5. ✅ Start backend server
6. ✅ Run Puppeteer tests
7. 🎉 API is ready!
