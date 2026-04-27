@echo off
echo ========================================
echo Prime Staffing Ltd - Demo Startup
echo ========================================
echo.

echo [1/5] Checking environment...
if not exist "apps\backend\.env" (
    echo Creating backend .env from demo template...
    copy apps\backend\.env.demo apps\backend\.env
)

if not exist "apps\frontend\.env.local" (
    echo Creating frontend .env.local...
    echo NEXT_PUBLIC_API_URL=http://localhost:4000/api > apps\frontend\.env.local
)

if not exist "apps\admin\.env.local" (
    echo Creating admin .env.local...
    echo NEXT_PUBLIC_API_URL=http://localhost:4000/api > apps\admin\.env.local
)

echo.
echo [2/5] Starting PostgreSQL (Docker)...
docker ps | findstr prime-staffing-db >nul 2>&1
if %errorlevel% neq 0 (
    echo Starting PostgreSQL container...
    docker run -d --name prime-staffing-db -e POSTGRES_PASSWORD=Sha742445!! -e POSTGRES_DB=rajiv_platform -p 5432:5432 postgres:16-alpine
    timeout /t 5 /nobreak >nul
) else (
    echo PostgreSQL already running
)

echo.
echo [3/5] Setting up database...
cd apps\backend
call pnpm prisma generate
call pnpm prisma db push --accept-data-loss
call pnpm prisma db seed
cd ..\..

echo.
echo [4/5] Starting services...
echo Opening 3 terminal windows...

start "Backend API" cmd /k "cd apps\backend && pnpm dev"
timeout /t 2 /nobreak >nul

start "Frontend" cmd /k "cd apps\frontend && pnpm dev"
timeout /t 2 /nobreak >nul

start "Admin Dashboard" cmd /k "cd apps\admin && pnpm dev"

echo.
echo [5/5] Demo Ready!
echo.
echo ========================================
echo Access Points:
echo ========================================
echo Frontend:  http://localhost:3000
echo Admin:     http://localhost:3001
echo API Docs:  http://localhost:4000/api/docs
echo.
echo Admin Login:
echo Email:     admin@primestaffing.com
echo Password:  Admin123!
echo ========================================
echo.
echo Press any key to open browser...
pause >nul

start http://localhost:3000
start http://localhost:3001

echo.
echo Demo is running! Close this window when done.
pause
