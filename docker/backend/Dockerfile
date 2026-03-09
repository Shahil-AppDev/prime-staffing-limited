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

COPY --from=builder /app/package*.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/prisma ./prisma

EXPOSE 4000

CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/main"]
