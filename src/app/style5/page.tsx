"use client";

import Link from "next/link";
import Image from "next/image";
import { Search, Menu, ChevronRight, Calendar, Eye, MessageSquare, BookOpen } from "lucide-react";

// 模拟数据
const posts = [
  {
    id: "net-010",
    title: "LS-NET-010-网络安全防火墙配置实战",
    date: "2025-03-25",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/279446216/849153819.webp",
    category: "网工笔记",
    tags: ["防火墙", "网络安全", "配置"],
    views: 156,
    comments: 2
  },
  {
    id: "net-009",
    title: "LS-NET-009-如何配置基于手动匹配的ACL",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/279446216/849153819.webp",
    category: "网工笔记",
    tags: ["ACL", "网络配置", "安全"],
    views: 252,
    comments: 0
  },
  {
    id: "net-008",
    title: "LS-NET-008-OSPF、BGP、RIP三大路由协议详解",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/3831569565/2901140664.webp",
    category: "网工笔记",
    tags: ["OSPF", "BGP", "RIP", "路由协议"],
    views: 189,
    comments: 0
  },
  {
    id: "net-007",
    title: "LS-NET-007-OSPF与RIP的网络层级对比",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1180048582/735702721.webp",
    category: "网工笔记",
    tags: ["OSPF", "RIP", "网络层级"],
    views: 142,
    comments: 0
  },
  {
    id: "net-002",
    title: "LS-NET-002-H3C设备基础配置详解",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2985513517/1113551178.webp",
    category: "网工笔记",
    tags: ["H3C", "网络配置"],
    views: 278,
    comments: 0
  },
  {
    id: "net-001",
    title: "LS-NET-001-什么是核心网、接入网和骨干网",
    date: "2025-03-14",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/400199818/1223356591.webp",
    category: "网工笔记",
    tags: ["核心网", "接入网", "骨干网", "网络基础"],
    views: 320,
    comments: 0
  },
  {
    id: "md-001",
    title: "第3章：链接、图片与表格",
    date: "2025-03-03",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2117173837/4046808622.webp",
    category: "Markdown",
    tags: ["Markdown", "教程"],
    views: 176,
    comments: 0
  }
];

// 侧边栏分类
const categories = [
  { name: "网工笔记", count: 12 },
  { name: "技术笔记", count: 18 },
  { name: "主题开发", count: 6 },
  { name: "教程", count: 9 },
  { name: "Markdown", count: 4 }
];

// 热门标签
const tags = [
  { name: "网络协议", count: 7 },
  { name: "OSPF", count: 3 },
  { name: "BGP", count: 2 },
  { name: "RIP", count: 3 },
  { name: "H3C", count: 1 },
  { name: "Markdown", count: 4 },
  { name: "ACL", count: 2 },
  { name: "核心网", count: 1 },
  { name: "网络", count: 8 }
];

// 卡通菜单图标组件
const CartoonMenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" />
    <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="10" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
  </svg>
);

// 卡通搜索图标组件
const CartoonSearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

export default function SakuraovoStyle() {
  return (
    <>
      {/* 全屏背景 */}
      <div className="site5-bg"></div>

      {/* 顶部导航 */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-site5-accent/20">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <button className="p-2 md:hidden">
              <span className="h-5 w-5 text-site5-primary">
                <CartoonMenuIcon />
              </span>
            </button>
            <Link href="/style5" className="site5-brand">
              小臣のWeb
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-1">
            <Link href="/style5" className="site5-nav-link">
              首页
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="site5-nav-link">
              分类
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="site5-nav-link">
              文章归档
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="site5-nav-link">
              关于
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="site5-nav-link">
              友链
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2">
              <span className="h-5 w-5 text-site5-primary">
                <CartoonSearchIcon />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 诗句横幅 */}
      <div className="site5-poem mt-12">
        去岁千般皆如意，今年万事定称心。
      </div>

      <main className="site5-container pb-16">
        {/* 白色通知卡片 */}
        <div className="site5-card p-4 text-center text-site5-primary font-noto text-lg">
          人生若只如初见，何事秋风悲画扇。是有缘，好好发展。
        </div>

        {/* 内容区域 */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          {/* 文章列表 */}
          <div className="lg:col-span-3 space-y-6">
            {posts.map((post) => (
              <article key={post.id} className="site5-post-card overflow-hidden">
                <Link href={`/posts/${post.id}`} className="block">
                  <div className="relative h-48 w-full overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                </Link>

                <div className="p-6">
                  <h2 className="text-xl font-noto text-site5-primary font-semibold mb-3 hover:text-site5-secondary transition-colors">
                    <Link href={`/posts/${post.id}`}>{post.title}</Link>
                  </h2>

                  <div className="flex flex-wrap items-center text-site5-gray text-sm mb-4">
                    <span className="flex items-center mr-4">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </span>
                    <span className="flex items-center mr-4">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {post.category}
                    </span>
                    <span className="flex items-center mr-4">
                      <Eye className="h-4 w-4 mr-1" />
                      {post.views}
                    </span>
                    <span className="flex items-center">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      {post.comments}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <Link href={`#${tag}`} key={index} className="site5-tag">
                        #{tag}
                      </Link>
                    ))}
                  </div>

                  <div className="flex justify-end">
                    <Link
                      href={`/posts/${post.id}`}
                      className="inline-flex items-center text-site5-teal hover:text-site5-secondary transition-colors"
                    >
                      阅读全文 <ChevronRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-6">
            {/* 作者信息 */}
            <div className="site5-panel text-center">
              <div className="relative h-24 w-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-site5-light">
                <Image
                  src="https://ext.same-assets.com/867524579/1063057539.jpeg"
                  alt="Chryssolion Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-noto text-site5-primary text-lg mb-2">Chryssolion Chen</h3>
              <p className="text-site5-accent text-sm mb-4">
                深耕网络技术，热爱编程与写作
              </p>
              <div className="border-t border-site5-accent/20 pt-3 text-xs text-site5-gray">
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <div className="font-bold text-site5-primary">45</div>
                    <div>文章</div>
                  </div>
                  <div>
                    <div className="font-bold text-site5-primary">12</div>
                    <div>分类</div>
                  </div>
                  <div>
                    <div className="font-bold text-site5-primary">28</div>
                    <div>标签</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 分类 */}
            <div className="site5-panel">
              <h3 className="font-noto text-site5-primary text-lg mb-4 pb-2 border-b border-site5-accent/20">
                分类
              </h3>
              <ul className="space-y-2">
                {categories.map((category, index) => (
                  <li key={index}>
                    <Link
                      href={`#${category.name}`}
                      className="flex items-center justify-between text-site5-accent hover:text-site5-teal transition-colors py-1"
                    >
                      <span>{category.name}</span>
                      <span className="text-site5-gray text-sm">{category.count}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* 标签云 */}
            <div className="site5-panel">
              <h3 className="font-noto text-site5-primary text-lg mb-4 pb-2 border-b border-site5-accent/20">
                标签云
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Link
                    key={index}
                    href={`#${tag.name}`}
                    className="site5-tag"
                  >
                    #{tag.name} ({tag.count})
                  </Link>
                ))}
              </div>
            </div>

            {/* 最近文章 */}
            <div className="site5-panel">
              <h3 className="font-noto text-site5-primary text-lg mb-4 pb-2 border-b border-site5-accent/20">
                最近文章
              </h3>
              <ul className="space-y-3">
                {posts.slice(0, 3).map((post, index) => (
                  <li key={index}>
                    <Link
                      href={`/posts/${post.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h4 className="text-site5-primary group-hover:text-site5-teal transition-colors text-sm line-clamp-2">
                          {post.title}
                        </h4>
                        <div className="text-site5-gray text-xs mt-1">
                          {post.date}
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-site5-accent/20 py-6">
        <div className="container mx-auto px-4 text-center text-site5-gray">
          <p className="mb-2">
            © 2025 小臣のWeb - 基于 Next.js 构建
          </p>
          <p className="text-xs">
            Theme inspired by Romanticism 2.1
          </p>
        </div>
      </footer>
    </>
  );
}
