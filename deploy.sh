#!/bin/bash

# ================================
# AUTOMATED DEPLOYMENT SCRIPT
# Prime Staffing Ltd - VPS Deployment
# ================================

set -e  # Exit on error

echo "🚀 Starting Prime Staffing Ltd Deployment..."
echo "Server: 65.21.104.251"
echo "Domain: primestaffingltd.com"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_DIR="/var/www/primestaffing"
APP_DIR="$PROJECT_DIR/app"
REPO_URL="https://github.com/Shahil-AppDev/prime-concept-decors.git"

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

# Check if running as root or with sudo
if [ "$EUID" -ne 0 ]; then 
    print_error "Please run with sudo or as root"
    exit 1
fi

# Step 1: Create project structure
print_info "Creating project structure..."
mkdir -p $PROJECT_DIR/{app,nginx,docker,data/postgres}
print_success "Project structure created"

# Step 2: Clone repository
print_info "Cloning repository..."
if [ -d "$APP_DIR/.git" ]; then
    print_info "Repository already exists, pulling latest changes..."
    cd $APP_DIR
    git pull origin main
else
    git clone $REPO_URL $APP_DIR
fi
print_success "Repository cloned/updated"

# Step 3: Check for .env.production
cd $APP_DIR
if [ ! -f ".env.production" ]; then
    print_error ".env.production file not found!"
    print_info "Please create .env.production file with production configuration"
    print_info "See DEPLOYMENT_GUIDE.md for template"
    exit 1
fi
print_success ".env.production found"

# Step 4: Install dependencies (if needed)
print_info "Checking Docker installation..."
if ! command -v docker &> /dev/null; then
    print_error "Docker not installed. Installing..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    systemctl start docker
    systemctl enable docker
    print_success "Docker installed"
else
    print_success "Docker already installed"
fi

if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose not installed. Installing..."
    curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
    chmod +x /usr/local/bin/docker-compose
    print_success "Docker Compose installed"
else
    print_success "Docker Compose already installed"
fi

# Step 5: Build and deploy containers
print_info "Building and deploying Docker containers..."
docker-compose -f docker-compose.prod.yml down 2>/dev/null || true
docker-compose -f docker-compose.prod.yml up -d --build

print_success "Containers deployed"

# Step 6: Wait for services to be healthy
print_info "Waiting for services to be healthy..."
sleep 10

# Check container status
if docker ps | grep -q "primestaffing_backend"; then
    print_success "Backend container running"
else
    print_error "Backend container not running"
    docker logs primestaffing_backend
    exit 1
fi

if docker ps | grep -q "primestaffing_frontend"; then
    print_success "Frontend container running"
else
    print_error "Frontend container not running"
    docker logs primestaffing_frontend
    exit 1
fi

if docker ps | grep -q "primestaffing_admin"; then
    print_success "Admin container running"
else
    print_error "Admin container not running"
    docker logs primestaffing_admin
    exit 1
fi

# Step 7: Configure Nginx
print_info "Configuring Nginx..."

# Check if Nginx is installed
if ! command -v nginx &> /dev/null; then
    print_info "Installing Nginx..."
    apt update
    apt install nginx -y
    systemctl start nginx
    systemctl enable nginx
    print_success "Nginx installed"
fi

# Create Nginx config
cat > /etc/nginx/sites-available/primestaffingltd.com << 'EOF'
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
    }
}
EOF

# Enable site
ln -sf /etc/nginx/sites-available/primestaffingltd.com /etc/nginx/sites-enabled/

# Test Nginx config
if nginx -t; then
    print_success "Nginx configuration valid"
    systemctl reload nginx
    print_success "Nginx reloaded"
else
    print_error "Nginx configuration invalid"
    exit 1
fi

# Step 8: SSL Setup (optional, requires manual confirmation)
print_info "SSL Setup:"
print_info "Run the following command to set up SSL certificates:"
echo ""
echo "sudo certbot --nginx -d primestaffingltd.com -d www.primestaffingltd.com -d admin.primestaffingltd.com -d api.primestaffingltd.com"
echo ""

# Final status
echo ""
echo "================================"
print_success "DEPLOYMENT COMPLETE!"
echo "================================"
echo ""
echo "Services running on:"
echo "  Backend:  http://localhost:8080 → https://api.primestaffingltd.com"
echo "  Frontend: http://localhost:8081 → https://primestaffingltd.com"
echo "  Admin:    http://localhost:8082 → https://admin.primestaffingltd.com"
echo ""
echo "Next steps:"
echo "  1. Run SSL setup command above"
echo "  2. Test URLs in browser"
echo "  3. Login to admin panel and change default password"
echo ""
echo "View logs: docker-compose -f $APP_DIR/docker-compose.prod.yml logs -f"
echo ""
