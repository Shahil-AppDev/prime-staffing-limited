#!/bin/bash

echo "========================================"
echo "Prime Staffing Ltd - Demo Startup"
echo "========================================"
echo ""

echo "[1/5] Checking environment..."
if [ ! -f "apps/backend/.env" ]; then
    echo "Creating backend .env from demo template..."
    cp apps/backend/.env.demo apps/backend/.env
fi

if [ ! -f "apps/frontend/.env.local" ]; then
    echo "Creating frontend .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > apps/frontend/.env.local
fi

if [ ! -f "apps/admin/.env.local" ]; then
    echo "Creating admin .env.local..."
    echo "NEXT_PUBLIC_API_URL=http://localhost:4000/api" > apps/admin/.env.local
fi

echo ""
echo "[2/5] Starting PostgreSQL (Docker)..."
if ! docker ps | grep -q prime-staffing-db; then
    echo "Starting PostgreSQL container..."
    docker run -d \
        --name prime-staffing-db \
        -e POSTGRES_PASSWORD=Sha742445!! \
        -e POSTGRES_DB=rajiv_platform \
        -p 5432:5432 \
        postgres:16-alpine
    sleep 5
else
    echo "PostgreSQL already running"
fi

echo ""
echo "[3/5] Setting up database..."
cd apps/backend
pnpm prisma generate
pnpm prisma db push --accept-data-loss
pnpm prisma db seed
cd ../..

echo ""
echo "[4/5] Starting services..."
echo "Opening 3 terminal windows..."

# macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/apps/backend && pnpm dev"'
    sleep 2
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/apps/frontend && pnpm dev"'
    sleep 2
    osascript -e 'tell app "Terminal" to do script "cd '"$(pwd)"'/apps/admin && pnpm dev"'
# Linux
else
    gnome-terminal -- bash -c "cd apps/backend && pnpm dev; exec bash" &
    sleep 2
    gnome-terminal -- bash -c "cd apps/frontend && pnpm dev; exec bash" &
    sleep 2
    gnome-terminal -- bash -c "cd apps/admin && pnpm dev; exec bash" &
fi

echo ""
echo "[5/5] Demo Ready!"
echo ""
echo "========================================"
echo "Access Points:"
echo "========================================"
echo "Frontend:  http://localhost:3000"
echo "Admin:     http://localhost:3001"
echo "API Docs:  http://localhost:4000/api/docs"
echo ""
echo "Admin Login:"
echo "Email:     admin@primestaffing.com"
echo "Password:  Admin123!"
echo "========================================"
echo ""
echo "Opening browser in 5 seconds..."
sleep 5

# Open browser
if [[ "$OSTYPE" == "darwin"* ]]; then
    open http://localhost:3000
    open http://localhost:3001
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    xdg-open http://localhost:3000
    xdg-open http://localhost:3001
fi

echo ""
echo "Demo is running! Press Ctrl+C to stop."
wait
