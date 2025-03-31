# 评论系统设置指南

本文档介绍如何设置和配置基于数据库的评论系统。

## 概述

这个评论系统基于 Next.js API 路由和 Prisma ORM，支持以下功能：

- 登录用户评论
- 访客评论（无需注册）
- 评论回复功能
- 实时刷新
- 黑暗模式支持

## 前提条件

确保已安装以下依赖项：

```json
{
  "dependencies": {
    "@auth/prisma-adapter": "^2.8.0",
    "@prisma/client": "^6.5.0",
    "next-auth": "^4.24.11",
    "date-fns": "^4.1.0",
    "bcrypt": "^5.1.1"
  }
}
```

## 设置步骤

### 1. 数据库配置

确保已正确配置 Prisma 和 MongoDB 连接：

1. 在 `.env` 文件中设置数据库连接字符串：

```
DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/your-database?retryWrites=true&w=majority"
```

2. 确保 Prisma schema 中包含必要的模型：
   - User
   - Comment
   
### 2. 运行数据库迁移

```bash
npx prisma db push
```

### 3. 配置 NextAuth

确保已正确配置 NextAuth：

1. 设置身份验证提供商
2. 配置回调函数
3. 添加必要的环境变量（用于OAuth提供商）

### 4. 使用评论组件

在文章详情页使用评论组件：

```tsx
import { Comments } from '@/components/blog';

// 在文章详情页中
<Comments postId={post.id} postSlug={post.id} />
```

## 自定义选项

### 样式自定义

评论组件使用 Tailwind CSS 进行样式设置。您可以在以下文件中自定义样式：

- `src/components/blog/CommentList.tsx`
- `src/components/blog/CommentForm.tsx`

### 功能扩展

您可以通过扩展评论服务来添加更多功能：

- 评论点赞/踩
- 评论排序
- 评论审核
- 评论通知

## 故障排除

### 常见问题

1. **评论无法提交**
   - 检查API路由是否正确配置
   - 验证数据库连接是否正常
   - 查看浏览器控制台错误

2. **无法加载评论**
   - 确保数据库中有评论数据
   - 验证API响应格式是否正确

3. **访客评论问题**
   - 确保匿名用户创建逻辑正确

### 日志记录

为便于调试，您可以在 `src/services/commentService.ts` 中添加更多日志记录：

```typescript
console.log('获取评论参数:', { postId, postSlug });
console.log('创建评论数据:', data);
```

## 安全最佳实践

1. 始终验证和净化用户输入
2. 实施速率限制防止垃圾评论
3. 考虑添加反垃圾评论措施
4. 实施CSRF保护