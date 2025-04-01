This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## GitHub风格评论系统

本博客支持GitHub风格的评论系统，基于[Giscus](https://giscus.app/zh-CN)实现。若要启用此功能，请按照以下步骤进行配置：

1. 创建一个公开的GitHub仓库
2. 在仓库设置中启用Discussions功能
3. 安装[Giscus GitHub App](https://github.com/apps/giscus)到该仓库
4. 访问[Giscus配置页面](https://giscus.app/zh-CN)获取配置信息
5. 复制`.env.local.example`为`.env.local`并填写配置信息
6. 重启开发服务器

配置完成后，博客文章页面的评论区将自动使用GitHub风格界面。默认支持中英文切换、夜间模式适配和表情反应功能。
