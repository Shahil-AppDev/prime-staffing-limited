FROM node:20-alpine AS base

WORKDIR /app

COPY package*.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm

FROM base AS development
RUN pnpm install
COPY . .
RUN pnpm prisma generate
EXPOSE 4000
CMD ["pnpm", "run", "dev"]

FROM base AS builder
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm prisma generate
RUN pnpm run build

FROM node:20-alpine AS production
WORKDIR /app
RUN npm install -g pnpm

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/backend/package.json ./apps/backend/
COPY apps/backend/prisma ./apps/backend/prisma
RUN pnpm install --frozen-lockfile
COPY apps/backend ./apps/backend
WORKDIR /app/apps/backend
RUN pnpm exec prisma generate
RUN pnpm build
EXPOSE 4000
CMD ["sh", "-c", "pnpm exec prisma migrate deploy && pnpm exec prisma db seed && node dist/main.js"]
