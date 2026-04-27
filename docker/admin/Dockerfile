FROM node:20-alpine AS base
WORKDIR /app
RUN apk add --no-cache openssl libc6-compat
RUN npm install -g pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/admin/package.json ./apps/admin/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/admin/node_modules ./apps/admin/node_modules
COPY apps/admin ./apps/admin
ARG NEXT_PUBLIC_API_URL
ARG NEXT_PUBLIC_ADMIN_URL
ENV NEXT_PUBLIC_API_URL=${NEXT_PUBLIC_API_URL}
ENV NEXT_PUBLIC_ADMIN_URL=${NEXT_PUBLIC_ADMIN_URL}
ENV NEXT_TELEMETRY_DISABLED=1
RUN pnpm --filter @rajiv/admin build

FROM base AS runner
WORKDIR /app
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=dependencies /app/node_modules ./node_modules
COPY --from=dependencies /app/apps/admin/node_modules ./apps/admin/node_modules
COPY --from=builder /app/apps/admin/public ./apps/admin/public
COPY --from=builder --chown=nextjs:nodejs /app/apps/admin/.next ./apps/admin/.next
COPY --from=builder /app/apps/admin/package.json ./apps/admin/package.json
USER nextjs
WORKDIR /app/apps/admin
EXPOSE 3000
ENV NODE_ENV=production
CMD ["pnpm", "start"]
