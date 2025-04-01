FROM node:18-alpine AS base

# 1. 安装依赖
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# 复制package.json和package-lock.json
COPY package.json package-lock.json* ./
RUN npm ci

# 2. 构建应用
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# 环境变量会在构建时使用
ENV NEXT_TELEMETRY_DISABLED 1

RUN npm run build

# 3. 生产环境
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Prisma需要这个目录
RUN mkdir -p ./prisma
COPY --from=builder /app/prisma/schema.prisma ./prisma/

# 设置正确的权限
RUN mkdir .next
RUN chown nextjs:nodejs .next

# 自动复制构建输出内容
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# 健康检查
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 CMD curl -f http://localhost:3000/api/health || exit 1

CMD ["node", "server.js"] 