# 部署指南

本文档提供如何将博客系统部署到生产环境的详细说明。

## 部署选项

您可以选择以下几种方式部署：

1. Docker 容器部署
2. 传统服务器部署
3. Vercel 云服务部署

## 1. Docker 容器部署

### 前提条件

- Docker 和 Docker Compose
- 数据库服务 (PostgreSQL/MongoDB)

### 构建和运行

1. 修改环境变量：

   ```
   cp .env.production .env
   ```

   编辑 `.env` 文件，设置正确的数据库连接和密钥。

2. 构建 Docker 镜像：

   ```
   docker build -t blog-app .
   ```

3. 运行容器：

   ```
   docker run -p 3000:3000 --env-file .env blog-app
   ```

### 使用 Docker Compose

创建 `docker-compose.yml` 文件：

```yaml
version: '3'

services:
  web:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://username:password@db:5432/blog_db
      - NEXTAUTH_URL=https://yourdomain.com
      - NEXTAUTH_SECRET=your-secret-key
    depends_on:
      - db
    restart: always

  db:
    image: postgres:14
    environment:
      - POSTGRES_USER=username
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=blog_db
    volumes:
      - postgres_data:/var/lib/postgresql/data
    restart: always

volumes:
  postgres_data:
```

然后运行：

```
docker-compose up -d
```

## 2. 传统服务器部署

### 前提条件

- Node.js 18+
- npm 或 yarn
- 数据库 (PostgreSQL/MongoDB)

### 部署步骤

1. 克隆代码：

   ```
   git clone <仓库URL> blog-app
   cd blog-app
   ```

2. 安装依赖：

   ```
   npm install
   ```

3. 配置环境变量：

   ```
   cp .env.production .env
   ```

   编辑 `.env` 文件设置数据库和密钥。

4. 构建应用：

   ```
   npm run build
   ```

5. 启动应用：

   ```
   npm start
   ```

6. 使用 PM2 保持应用运行：

   ```
   npm install -g pm2
   pm2 start npm --name "blog-app" -- start
   ```

## 3. Vercel 部署

1. 在 Vercel 上创建新项目
2. 链接到 Git 仓库
3. 在环境变量设置中添加：
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
4. 部署项目

## 数据库准备

无论您选择哪种部署方法，都需要先准备数据库：

1. 创建数据库
2. 运行数据库迁移：

   ```
   npx prisma migrate deploy
   ```

3. 创建管理员用户：

   ```
   npx ts-node scripts/create-admin.ts admin@example.com yoursecurepassword "管理员"
   ```

## 安全注意事项

1. 确保使用强密码
2. 配置 HTTPS
3. 定期备份数据库
4. 更新依赖包：`npm audit fix`

## 问题排查

如果遇到问题，请检查：

1. 日志文件
2. 数据库连接
3. 环境变量设置

## 更多资源

- [Next.js 部署文档](https://nextjs.org/docs/deployment)
- [Prisma 部署文档](https://www.prisma.io/docs/guides/deployment)
- [NextAuth.js 文档](https://next-auth.js.org/) 