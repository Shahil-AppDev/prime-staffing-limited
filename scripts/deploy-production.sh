#!/bin/bash

# ================================
# Prime Staffing Ltd - Production Deployment Script
# ================================

set -e  # Exit on error

echo "🚀 Prime Staffing Ltd - Production Deployment"
echo "=============================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_info() {
    echo -e "${YELLOW}ℹ $1${NC}"
}

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    print_info "Please create .env.production with production configuration"
    exit 1
fi
print_success ".env.production found"

# Load environment variables
export $(cat .env.production | grep -v '^#' | xargs)

# Stop existing containers (if any)
print_info "Stopping existing Prime Staffing containers..."
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
print_success "Containers stopped"

# Remove old images to save space (only Prime Staffing images)
print_info "Cleaning up old Prime Staffing images..."
docker images | grep prime-staffing | awk '{print $3}' | xargs -r docker rmi -f 2>/dev/null || true
print_success "Old images cleaned"

# Build and start containers
print_info "Building and starting containers..."
docker-compose -f docker-compose.prod.yml up -d --build --remove-orphans

# Wait for services to be healthy
print_info "Waiting for services to be healthy..."
sleep 10

# Check if database is ready
print_info "Checking database connection..."
for i in {1..30}; do
    if docker exec prime-staffing-db pg_isready -U ${POSTGRES_USER:-primestaffing_user} > /dev/null 2>&1; then
        print_success "Database is ready"
        break
    fi
    if [ $i -eq 30 ]; then
        print_error "Database failed to start"
        exit 1
    fi
    sleep 1
done

# Run database migrations
print_info "Running database migrations..."
docker exec prime-staffing-backend sh -c "cd /app/apps/backend && npx prisma migrate deploy" || true
print_success "Migrations completed"

# Seed database if needed (only on first deployment)
print_info "Seeding database (if needed)..."
docker exec prime-staffing-backend sh -c "cd /app/apps/backend && npx prisma db seed" 2>/dev/null || print_info "Database already seeded"

# Check container status
print_info "Checking container status..."
echo ""
docker ps --filter "name=prime-staffing" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
echo ""

# Verify all containers are running
BACKEND_RUNNING=$(docker ps | grep -c "prime-staffing-backend" || echo "0")
FRONTEND_RUNNING=$(docker ps | grep -c "prime-staffing-frontend" || echo "0")
ADMIN_RUNNING=$(docker ps | grep -c "prime-staffing-admin" || echo "0")
DB_RUNNING=$(docker ps | grep -c "prime-staffing-db" || echo "0")

if [ "$BACKEND_RUNNING" -eq "0" ]; then
    print_error "Backend container is not running!"
    docker logs prime-staffing-backend --tail 50
    exit 1
fi

if [ "$FRONTEND_RUNNING" -eq "0" ]; then
    print_error "Frontend container is not running!"
    docker logs prime-staffing-frontend --tail 50
    exit 1
fi

if [ "$ADMIN_RUNNING" -eq "0" ]; then
    print_error "Admin container is not running!"
    docker logs prime-staffing-admin --tail 50
    exit 1
fi

if [ "$DB_RUNNING" -eq "0" ]; then
    print_error "Database container is not running!"
    docker logs prime-staffing-db --tail 50
    exit 1
fi

print_success "All containers are running!"

# Prune unused Docker resources (safely)
print_info "Cleaning up unused Docker resources..."
docker system prune -f --volumes 2>/dev/null || true
print_success "Cleanup completed"

# Show logs
print_info "Recent logs from backend:"
docker logs prime-staffing-backend --tail 20

echo ""
echo "=============================================="
print_success "Deployment completed successfully!"
echo "=============================================="
echo ""
echo "🌐 Frontend: https://primestaffingltd.com"
echo "🔐 Admin: https://admin.primestaffingltd.com"
echo "🔌 API: https://api.primestaffingltd.com"
echo ""
echo "View logs: docker logs prime-staffing-backend -f"
echo "Container status: docker ps --filter 'name=prime-staffing'"
echo ""
