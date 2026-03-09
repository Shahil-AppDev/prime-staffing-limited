# 🏗️ Architecture - Prime Concept Decor Platform

## System Overview

Prime Concept Decor is a full-stack monorepo platform for interior design business management, featuring:

- **Public Website** (Next.js)
- **Admin Dashboard** (Next.js)
- **Backend API** (NestJS + PostgreSQL)
- **Automation System** (n8n)
- **Infrastructure** (Docker + Nginx)

## Technology Stack

### Frontend Stack
- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript 5.9
- **Styling:** TailwindCSS 3.4
- **Animations:** Framer Motion 11
- **State Management:** Zustand 4.5
- **Data Fetching:** React Query 5.90
- **Forms:** React Hook Form 7.71
- **Icons:** Lucide React

### Backend Stack
- **Framework:** NestJS 10.3
- **Language:** TypeScript 5.3
- **Database:** PostgreSQL 16
- **ORM:** Prisma 5.9
- **Authentication:** JWT + Passport.js
- **Validation:** Class Validator
- **Documentation:** Swagger/OpenAPI
- **Security:** Helmet, CORS, Rate Limiting

### Infrastructure
- **Containerization:** Docker + Docker Compose
- **Reverse Proxy:** Nginx
- **Automation:** n8n
- **Cache:** Redis (optional)
- **File Storage:** Cloudinary

## Project Structure

```
prime-concept-decors/
├── apps/
│   ├── backend/              # NestJS API
│   │   ├── src/
│   │   │   ├── auth/         # Authentication module
│   │   │   ├── users/        # User management
│   │   │   ├── projects/     # Portfolio projects
│   │   │   ├── clients/      # Client CRM
│   │   │   ├── blog/         # Blog system
│   │   │   ├── social-posts/ # Social media posts
│   │   │   ├── media/        # Media management
│   │   │   ├── analytics/    # Analytics tracking
│   │   │   ├── n8n/          # n8n integration
│   │   │   ├── prisma/       # Database service
│   │   │   └── health/       # Health checks
│   │   ├── prisma/
│   │   │   ├── schema.prisma # Database schema
│   │   │   └── seed.ts       # Seed data
│   │   └── test/
│   │
│   ├── frontend/             # Public website
│   │   ├── src/
│   │   │   ├── app/          # Next.js pages
│   │   │   │   ├── page.tsx  # Home
│   │   │   │   ├── about/    # About page
│   │   │   │   ├── services/ # Services page
│   │   │   │   ├── portfolio/# Portfolio page
│   │   │   │   ├── blog/     # Blog page
│   │   │   │   └── contact/  # Contact page
│   │   │   ├── components/
│   │   │   │   └── layout/   # Header, Footer
│   │   │   └── lib/          # API client, utils
│   │   └── public/
│   │
│   └── admin/                # Admin dashboard
│       ├── src/
│       │   ├── app/
│       │   │   ├── login/    # Login page
│       │   │   └── dashboard/# Dashboard pages
│       │   ├── components/
│       │   │   └── layout/   # Sidebar
│       │   ├── lib/          # API client
│       │   └── store/        # Zustand stores
│       └── public/
│
├── n8n/
│   └── workflows/            # n8n workflow JSONs
│       ├── schedule-social-post.json
│       ├── publish-social-post.json
│       ├── generate-ai-caption.json
│       └── lead-notification.json
│
├── docker/
│   ├── backend/
│   │   └── Dockerfile
│   ├── frontend/
│   │   └── Dockerfile
│   ├── admin/
│   │   └── Dockerfile
│   └── nginx/
│       ├── Dockerfile
│       └── nginx.conf
│
├── docs/
│   ├── INSTALLATION.md
│   ├── ARCHITECTURE.md
│   ├── API.md
│   └── DEPLOYMENT.md
│
├── docker-compose.yml        # Production
├── docker-compose.dev.yml    # Development
├── package.json              # Workspace root
├── pnpm-workspace.yaml       # pnpm workspace
├── .gitignore
└── README.md
```

## Database Schema

### Core Tables

#### Users
```prisma
model User {
  id        String   @id @default(uuid())
  email     String   @unique
  password  String
  firstName String
  lastName  String
  role      Role     @default(EDITOR)
  isActive  Boolean  @default(true)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

enum Role {
  ADMIN
  EDITOR
  SOCIAL_MEDIA_MANAGER
}
```

#### Projects (Portfolio)
```prisma
model Project {
  id          String        @id @default(uuid())
  title       String
  description String
  category    String
  location    String?
  area        Float?
  budget      Float?
  status      ProjectStatus @default(PLANNING)
  startDate   DateTime?
  endDate     DateTime?
  clientId    String?
  images      ProjectImage[]
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
}
```

#### Blog Posts
```prisma
model BlogPost {
  id          String     @id @default(uuid())
  title       String
  slug        String     @unique
  content     String
  excerpt     String?
  coverImage  String?
  status      PostStatus @default(DRAFT)
  authorId    String
  publishedAt DateTime?
  createdAt   DateTime   @default(now())
  updatedAt   DateTime   @updatedAt
}
```

#### Social Posts
```prisma
model SocialPost {
  id          String         @id @default(uuid())
  caption     String
  platforms   SocialPlatform[]
  mediaUrls   String[]
  scheduledAt DateTime?
  publishedAt DateTime?
  status      PostStatus     @default(DRAFT)
  createdAt   DateTime       @default(now())
  updatedAt   DateTime       @updatedAt
}
```

#### Leads
```prisma
model Lead {
  id        String     @id @default(uuid())
  name      String
  email     String
  phone     String?
  message   String
  source    String?
  status    LeadStatus @default(NEW)
  createdAt DateTime   @default(now())
  updatedAt DateTime   @updatedAt
}
```

## API Architecture

### REST API Endpoints

#### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login (returns JWT)
- `POST /api/auth/logout` - Logout
- `POST /api/auth/refresh` - Refresh access token

#### Projects
- `GET /api/projects` - List all projects
- `GET /api/projects/:id` - Get project details
- `POST /api/projects` - Create project (Auth)
- `PATCH /api/projects/:id` - Update project (Auth)
- `DELETE /api/projects/:id` - Delete project (Auth)

#### Blog
- `GET /api/blog` - List published posts
- `GET /api/blog/:slug` - Get post by slug
- `POST /api/blog` - Create post (Auth)
- `PATCH /api/blog/:id` - Update post (Auth)
- `DELETE /api/blog/:id` - Delete post (Auth)

#### Social Posts
- `GET /api/social-posts` - List posts
- `GET /api/social-posts/scheduled` - Scheduled posts
- `POST /api/social-posts` - Create post (Auth)
- `POST /api/social-posts/:id/publish` - Publish immediately
- `POST /api/social-posts/generate-caption` - AI caption generation

#### Analytics
- `GET /api/analytics/dashboard` - Dashboard stats
- `GET /api/analytics/social` - Social media stats

#### Media
- `POST /api/media/upload` - Upload file (Cloudinary)
- `GET /api/media` - List media files
- `DELETE /api/media/:id` - Delete media

### Authentication Flow

1. User logs in with email/password
2. Backend validates credentials
3. JWT access token (15min) + refresh token (7d) returned
4. Frontend stores tokens in localStorage
5. Access token sent in Authorization header for protected routes
6. Refresh token used to get new access token when expired

### Authorization (RBAC)

**Roles:**
- **ADMIN** - Full access to all features
- **EDITOR** - Manage content (blog, projects)
- **SOCIAL_MEDIA_MANAGER** - Manage social posts

**Guards:**
- `JwtAuthGuard` - Validates JWT token
- `RolesGuard` - Checks user role
- `@Roles()` decorator - Specifies required roles

## Frontend Architecture

### Next.js App Router

```
app/
├── layout.tsx          # Root layout (Header, Footer)
├── page.tsx            # Home page
├── about/
│   └── page.tsx        # About page
├── services/
│   └── page.tsx        # Services page
├── portfolio/
│   └── page.tsx        # Portfolio grid
├── blog/
│   ├── page.tsx        # Blog list
│   └── [slug]/
│       └── page.tsx    # Blog post
└── contact/
    └── page.tsx        # Contact form
```

### State Management

- **React Query** - Server state (API data)
- **Zustand** - Client state (auth, UI)
- **React Hook Form** - Form state

### Data Fetching

```typescript
// React Query example
const { data, isLoading } = useQuery({
  queryKey: ['projects'],
  queryFn: projectsApi.getAll,
})
```

## Admin Dashboard Architecture

### Pages

```
dashboard/
├── page.tsx            # Analytics overview
├── projects/
│   ├── page.tsx        # Projects list
│   ├── new/
│   │   └── page.tsx    # Create project
│   └── [id]/
│       └── page.tsx    # Edit project
├── blog/
│   ├── page.tsx        # Posts list
│   ├── new/
│   │   └── page.tsx    # Create post
│   └── [id]/
│       └── page.tsx    # Edit post
├── social/
│   └── page.tsx        # Social posts
├── users/
│   └── page.tsx        # User management (Admin only)
└── settings/
    └── page.tsx        # Settings
```

### Components

- **Sidebar** - Navigation menu
- **DataTable** - Reusable table component
- **Forms** - Project form, Blog form, etc.
- **Charts** - Analytics visualizations (Recharts)

## n8n Automation Workflows

### 1. Schedule Social Post
**Trigger:** Webhook from admin dashboard
**Actions:**
1. Receive post data (caption, media, platforms, schedule time)
2. Store in database
3. Schedule publication
4. Send confirmation email

### 2. Publish Social Post
**Trigger:** Scheduled time or manual trigger
**Actions:**
1. Fetch post from database
2. Post to Instagram API
3. Post to Facebook API
4. Post to TikTok API
5. Update post status
6. Send success notification

### 3. Generate AI Caption
**Trigger:** Webhook with image URL
**Actions:**
1. Analyze image with OpenAI GPT-4 Vision
2. Generate caption
3. Generate hashtags
4. Return formatted caption

### 4. Lead Notification
**Trigger:** New lead from contact form
**Actions:**
1. Receive lead data
2. Store in database
3. Send email to sales team
4. Send auto-reply to lead
5. Create CRM task

## Security

### Backend Security

- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing
- **Rate Limiting** - 100 requests/minute per IP
- **JWT** - Secure token-based auth
- **bcrypt** - Password hashing (10 rounds)
- **Class Validator** - Input validation
- **Prisma** - SQL injection protection

### Frontend Security

- **Environment Variables** - Sensitive data in .env
- **HTTPS** - Enforced in production
- **CSP** - Content Security Policy
- **XSS Protection** - React auto-escaping
- **CSRF Protection** - SameSite cookies

## Performance Optimization

### Backend
- **Compression** - gzip compression
- **Caching** - Redis for frequently accessed data
- **Database Indexing** - Optimized queries
- **Pagination** - Limit response sizes

### Frontend
- **Code Splitting** - Next.js automatic splitting
- **Image Optimization** - Next.js Image component
- **Lazy Loading** - Dynamic imports
- **CDN** - Static assets on CDN
- **SSR/SSG** - Server-side rendering where appropriate

## Deployment Architecture

### Production Stack

```
Internet
    ↓
Nginx (Port 80/443)
    ├── /          → Frontend (Next.js)
    ├── /admin     → Admin (Next.js)
    ├── /api       → Backend (NestJS)
    └── /n8n       → n8n
    ↓
Docker Network
    ├── frontend:3000
    ├── admin:3001
    ├── backend:4000
    ├── postgres:5432
    ├── redis:6379
    └── n8n:5678
```

### Scaling Strategy

- **Horizontal Scaling** - Multiple backend instances
- **Load Balancing** - Nginx load balancer
- **Database Replication** - Read replicas
- **CDN** - Cloudflare for static assets
- **Caching** - Redis for sessions and data

## Monitoring & Logging

- **Application Logs** - Winston logger
- **Error Tracking** - Sentry (optional)
- **Performance Monitoring** - New Relic (optional)
- **Uptime Monitoring** - UptimeRobot (optional)
- **Analytics** - Google Analytics

## Development Workflow

1. **Feature Branch** - Create from `main`
2. **Development** - Code and test locally
3. **Linting** - ESLint + Prettier
4. **Type Checking** - TypeScript
5. **Testing** - Unit + Integration tests
6. **Pull Request** - Code review
7. **CI/CD** - Automated tests
8. **Merge** - To `main` branch
9. **Deploy** - Automatic deployment

## Future Enhancements

- [ ] Mobile app (React Native)
- [ ] Real-time chat (Socket.io)
- [ ] Payment integration (Stripe)
- [ ] Multi-language support (i18n)
- [ ] Advanced analytics dashboard
- [ ] AI-powered design suggestions
- [ ] Customer portal
- [ ] Appointment booking system
- [ ] E-commerce for decor items
- [ ] AR visualization (3D room preview)

---

**Last Updated:** March 2026  
**Version:** 1.0.0  
**Status:** Production Ready
