import { Post } from '@/interfaces/post';

// 示例文章数据
const dummyPosts: Post[] = [
  {
    slug: 'react-hooks',
    title: 'React Hooks 完全指南',
    date: '2023-06-15',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: 'React Hooks 为函数组件赋予了类组件的能力，本文详细介绍常用的Hooks及其使用场景。',
    content: '# React Hooks 完全指南\n\n## 什么是Hooks？\n\nHooks是React 16.8引入的新特性，允许在不编写类的情况下使用状态和其他React特性...',
    category: '技术',
    tags: ['React', 'JavaScript', '前端'],
    coverImage: '/images/blog/react-hooks.jpg'
  },
  {
    slug: 'typescript-tips',
    title: 'TypeScript高级技巧与最佳实践',
    date: '2023-07-20',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '掌握这些TypeScript技巧，让你的代码更加健壮、可维护，并充分利用类型系统的优势。',
    content: '# TypeScript高级技巧与最佳实践\n\n## 类型推断\n\nTypeScript拥有强大的类型推断系统，可以减少很多显式类型注解...',
    category: '技术',
    tags: ['TypeScript', '编程语言', '前端'],
    coverImage: '/images/blog/typescript.jpg'
  },
  {
    slug: 'nextjs-introduction',
    title: 'Next.js入门与实践',
    date: '2023-08-10',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: 'Next.js是构建现代React应用的流行框架，本文介绍其核心概念和实际项目中的应用。',
    content: '# Next.js入门与实践\n\n## 什么是Next.js？\n\nNext.js是一个轻量级的React框架，专注于构建高性能的服务器渲染应用...',
    category: '技术',
    tags: ['Next.js', 'React', '服务端渲染', '前端框架'],
    coverImage: '/images/blog/nextjs.jpg'
  },
  {
    slug: 'ai-tools-programming',
    title: 'AI辅助编程工具盘点',
    date: '2023-09-05',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '人工智能正在改变我们的编程方式，本文盘点了当下最受欢迎的AI辅助编程工具及其使用体验。',
    content: '# AI辅助编程工具盘点\n\n## GitHub Copilot\n\nGitHub Copilot是由GitHub和OpenAI合作开发的AI编程助手...',
    category: '技术',
    tags: ['AI', '开发工具', '编程效率'],
    coverImage: '/images/blog/ai-programming.jpg'
  },
  {
    slug: 'css-modern-layout',
    title: '现代CSS布局技术详解',
    date: '2023-10-12',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '从Flexbox到Grid，再到新兴的Container Queries，现代CSS布局技术让网页设计更加灵活强大。',
    content: '# 现代CSS布局技术详解\n\n## Flexbox\n\nFlexbox是一维布局模型，特别适合于在一行或一列中排列项目...',
    category: '技术',
    tags: ['CSS', '前端', '网页设计'],
    coverImage: '/images/blog/css-layout.jpg'
  },
  {
    slug: 'books-programming',
    title: '程序员必读的10本经典书籍',
    date: '2023-11-08',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '这些经典著作不仅能提升你的编程技能，更能塑造你的思维方式和解决问题的能力。',
    content: '# 程序员必读的10本经典书籍\n\n## 《代码大全》\n\n这本书被誉为软件构建的百科全书，涵盖了从变量命名到架构设计的各个方面...',
    category: '思考',
    tags: ['编程', '书籍推荐', '学习成长'],
    coverImage: '/images/blog/programming-books.jpg'
  },
  {
    slug: 'productivity-tips',
    title: '提高工作效率的5个实用技巧',
    date: '2023-12-01',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '在信息爆炸的时代，如何保持专注和高效至关重要，这里分享几个简单但有效的方法。',
    content: '# 提高工作效率的5个实用技巧\n\n## 番茄工作法\n\n将工作时间分割成25分钟的专注工作段，中间穿插短暂休息...',
    category: '生活',
    tags: ['效率', '时间管理', '工作方法'],
    coverImage: '/images/blog/productivity.jpg'
  },
  {
    slug: 'web-performance',
    title: 'Web性能优化全指南',
    date: '2024-01-15',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '从网络请求到渲染性能，全方位提升你的Web应用速度，提供更好的用户体验。',
    content: '# Web性能优化全指南\n\n## 网络优化\n\n减少HTTP请求次数、使用CDN加速静态资源、合理设置缓存策略...',
    category: '技术',
    tags: ['性能优化', 'Web开发', '前端'],
    coverImage: '/images/blog/web-performance.jpg'
  },
  {
    slug: 'network-security',
    title: '网络安全基础知识',
    date: '2024-02-10',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '了解常见的网络安全威胁和防护措施，保护你的网站和用户数据免受攻击。',
    content: '# 网络安全基础知识\n\n## XSS攻击\n\nXSS（跨站脚本攻击）是一种常见的网络安全漏洞，攻击者通过注入恶意脚本...',
    category: '网工笔记',
    tags: ['安全', '网络', 'XSS', 'CSRF'],
    coverImage: '/images/blog/security.jpg'
  },
  {
    slug: 'career-path',
    title: '程序员职业发展路径探讨',
    date: '2024-03-05',
    author: {
      name: '小臣',
      picture: '/images/authors/admin.png'
    },
    excerpt: '从初级到高级，再到管理岗位或独立开发者，程序员的职业道路有哪些可能性？',
    content: '# 程序员职业发展路径探讨\n\n## 技术专家路线\n\n不断深耕技术领域，成为特定技术栈或领域的专家是很多程序员的选择...',
    category: '随笔',
    tags: ['职业发展', '程序员', '思考'],
    coverImage: '/images/blog/career.jpg'
  }
];

// 获取所有文章
export async function getAllPosts(): Promise<Post[]> {
  // 在实际应用中，这里应该从API或数据库获取数据
  // 这里使用模拟数据
  return dummyPosts;
}

// 获取某篇文章详情
export async function getPostBySlug(slug: string): Promise<Post | null> {
  // 查找匹配slug的文章
  const post = dummyPosts.find(p => p.slug === slug);
  return post || null;
}

// 搜索文章
export async function searchPosts(query: string): Promise<Post[]> {
  const searchTerm = query.toLowerCase();
  
  return dummyPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.excerpt?.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm)) ||
    post.category?.toLowerCase().includes(searchTerm)
  );
} 