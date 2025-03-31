# 项目结构说明

本项目采用模块化的目录结构，使代码组织更清晰、可维护性更高。以下是主要目录说明：

## 目录结构

```
/src
  /app                  # Next.js 页面路由
  /components           # UI组件
    /core               # 基础UI组件
    /layout             # 布局组件
    /blog               # 博客相关组件
    /widgets            # 小部件
    index.ts            # 导出组件
  /hooks                # 自定义钩子
  /data                 # 静态数据
  /services             # API服务
  /types                # 类型定义
  /utils                # 工具函数
  /lib                  # 公共库
  /config               # 配置文件
```

## 主要模块说明

### 组件 (/components)

按功能分类组织的UI组件：
- `/core`: 基础UI组件，如按钮、输入框等
- `/layout`: 布局相关组件，如头部、页脚、侧边栏等
- `/blog`: 博客相关组件，如文章卡片、分类列表等
- `/widgets`: 小部件和功能性组件，如搜索栏、贪吃蛇游戏等

### 钩子 (/hooks)

自定义React钩子，提取和复用逻辑：
- `useScrollPosition.ts`: 管理和恢复滚动位置
- 其他钩子...

### 数据 (/data)

静态数据和常量：
- `posts.ts`: 博客文章数据
- `siteConfig.ts`: 网站配置
- 其他数据文件...

### 类型 (/types)

TypeScript类型定义：
- `index.ts`: 集中导出所有类型

## 开发指南

- 新组件应放在相应的组件子目录中
- 使用index.ts文件导出组件，方便导入
- 将可复用逻辑提取为自定义钩子
- 使用类型定义确保类型安全

## 文件命名约定

- 组件文件: PascalCase (例如: `PostCard.tsx`)
- 钩子文件: camelCase, 以use开头 (例如: `useScrollPosition.ts`)
- 工具/服务文件: camelCase (例如: `postService.ts`)
- 类型定义文件: index.ts 或 domainName.types.ts 