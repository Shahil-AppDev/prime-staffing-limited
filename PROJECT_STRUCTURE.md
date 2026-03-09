# Project Structure

```
rajiv-social-platform/
├── apps/
│   ├── frontend/                    # Public website (Next.js 14)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (public)/
│   │   │   │   │   ├── page.tsx           # Home
│   │   │   │   │   ├── about/
│   │   │   │   │   ├── services/
│   │   │   │   │   ├── portfolio/
│   │   │   │   │   ├── blog/
│   │   │   │   │   └── contact/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── globals.css
│   │   │   ├── components/
│   │   │   │   ├── ui/                    # shadcn components
│   │   │   │   ├── layout/
│   │   │   │   │   ├── Navbar.tsx
│   │   │   │   │   ├── Footer.tsx
│   │   │   │   │   └── Hero.tsx
│   │   │   │   ├── portfolio/
│   │   │   │   │   ├── PortfolioGrid.tsx
│   │   │   │   │   └── ProjectCard.tsx
│   │   │   │   └── forms/
│   │   │   │       └── ContactForm.tsx
│   │   │   ├── lib/
│   │   │   │   ├── api.ts
│   │   │   │   └── utils.ts
│   │   │   └── store/
│   │   │       └── useStore.ts
│   │   ├── public/
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   ├── tailwind.config.ts
│   │   └── next.config.js
│   │
│   ├── admin/                       # Admin dashboard (Next.js 14)
│   │   ├── src/
│   │   │   ├── app/
│   │   │   │   ├── (auth)/
│   │   │   │   │   └── login/
│   │   │   │   ├── (dashboard)/
│   │   │   │   │   ├── layout.tsx
│   │   │   │   │   ├── page.tsx           # Dashboard
│   │   │   │   │   ├── content/
│   │   │   │   │   ├── social/
│   │   │   │   │   ├── portfolio/
│   │   │   │   │   ├── clients/
│   │   │   │   │   ├── media/
│   │   │   │   │   ├── analytics/
│   │   │   │   │   └── settings/
│   │   │   │   └── layout.tsx
│   │   │   ├── components/
│   │   │   │   ├── ui/
│   │   │   │   ├── dashboard/
│   │   │   │   │   ├── Sidebar.tsx
│   │   │   │   │   ├── StatsCard.tsx
│   │   │   │   │   └── RecentActivity.tsx
│   │   │   │   ├── social/
│   │   │   │   │   ├── PostScheduler.tsx
│   │   │   │   │   ├── CalendarView.tsx
│   │   │   │   │   └── PostEditor.tsx
│   │   │   │   └── media/
│   │   │   │       └── MediaLibrary.tsx
│   │   │   ├── lib/
│   │   │   │   ├── api.ts
│   │   │   │   ├── auth.ts
│   │   │   │   └── utils.ts
│   │   │   ├── hooks/
│   │   │   │   ├── useAuth.ts
│   │   │   │   └── usePermissions.ts
│   │   │   └── store/
│   │   │       └── authStore.ts
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tailwind.config.ts
│   │
│   └── backend/                     # NestJS API
│       ├── src/
│       │   ├── main.ts
│       │   ├── app.module.ts
│       │   ├── auth/
│       │   │   ├── auth.module.ts
│       │   │   ├── auth.controller.ts
│       │   │   ├── auth.service.ts
│       │   │   ├── strategies/
│       │   │   │   ├── jwt.strategy.ts
│       │   │   │   └── refresh.strategy.ts
│       │   │   ├── guards/
│       │   │   │   ├── jwt-auth.guard.ts
│       │   │   │   └── roles.guard.ts
│       │   │   ├── decorators/
│       │   │   │   └── roles.decorator.ts
│       │   │   └── dto/
│       │   │       ├── login.dto.ts
│       │   │       └── register.dto.ts
│       │   ├── users/
│       │   │   ├── users.module.ts
│       │   │   ├── users.controller.ts
│       │   │   ├── users.service.ts
│       │   │   └── dto/
│       │   ├── projects/
│       │   │   ├── projects.module.ts
│       │   │   ├── projects.controller.ts
│       │   │   ├── projects.service.ts
│       │   │   └── dto/
│       │   ├── clients/
│       │   │   ├── clients.module.ts
│       │   │   ├── clients.controller.ts
│       │   │   ├── clients.service.ts
│       │   │   └── dto/
│       │   ├── blog/
│       │   │   ├── blog.module.ts
│       │   │   ├── blog.controller.ts
│       │   │   ├── blog.service.ts
│       │   │   └── dto/
│       │   ├── social-posts/
│       │   │   ├── social-posts.module.ts
│       │   │   ├── social-posts.controller.ts
│       │   │   ├── social-posts.service.ts
│       │   │   └── dto/
│       │   ├── media/
│       │   │   ├── media.module.ts
│       │   │   ├── media.controller.ts
│       │   │   ├── media.service.ts
│       │   │   └── dto/
│       │   ├── analytics/
│       │   │   ├── analytics.module.ts
│       │   │   ├── analytics.controller.ts
│       │   │   └── analytics.service.ts
│       │   ├── n8n/
│       │   │   ├── n8n.module.ts
│       │   │   └── n8n.service.ts
│       │   ├── prisma/
│       │   │   ├── prisma.module.ts
│       │   │   └── prisma.service.ts
│       │   └── common/
│       │       ├── filters/
│       │       ├── interceptors/
│       │       └── pipes/
│       ├── prisma/
│       │   ├── schema.prisma
│       │   ├── seed.ts
│       │   └── migrations/
│       ├── test/
│       ├── package.json
│       ├── tsconfig.json
│       └── nest-cli.json
│
├── packages/
│   ├── ui/                          # Shared UI components
│   │   ├── components/
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── types/                       # Shared TypeScript types
│   │   ├── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   └── config/                      # Shared configs
│       ├── eslint/
│       ├── typescript/
│       └── tailwind/
│
├── docker/
│   ├── nginx/
│   │   ├── nginx.conf
│   │   └── Dockerfile
│   ├── backend/
│   │   └── Dockerfile
│   ├── frontend/
│   │   └── Dockerfile
│   └── admin/
│       └── Dockerfile
│
├── n8n/
│   ├── workflows/
│   │   ├── auto-publish-posts.json
│   │   ├── ai-caption-generator.json
│   │   ├── social-analytics.json
│   │   └── lead-notification.json
│   └── credentials/
│
├── scripts/
│   ├── setup.sh
│   ├── seed-db.sh
│   └── deploy.sh
│
├── .github/
│   └── workflows/
│       ├── ci.yml
│       └── deploy.yml
│
├── docker-compose.yml
├── docker-compose.dev.yml
├── docker-compose.prod.yml
├── .env.example
├── .gitignore
├── package.json
├── pnpm-workspace.yaml
├── turbo.json
└── README.md
```
