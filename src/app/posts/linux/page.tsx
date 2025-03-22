'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

// Linux文章数据
const linuxArticles = [
  {
    id: 'linux-basics',
    title: 'Linux 基础入门指南',
    description: '从零开始学习Linux的基本概念、命令和操作',
    date: '2025-04-01',
    author: 'Chryssolion Chen',
    tags: ['Linux', '入门'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-file-system',
    title: 'Linux 文件系统详解',
    description: '深入了解Linux文件系统的结构和工作原理',
    date: '2025-04-05',
    author: 'Chryssolion Chen',
    tags: ['Linux', '文件系统'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-commands',
    title: 'Linux 常用命令大全',
    description: '最常用的Linux命令详解及实战应用',
    date: '2025-04-10',
    author: 'Chryssolion Chen',
    tags: ['Linux', '命令行'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-shell-scripting',
    title: 'Shell 脚本编程入门',
    description: '学习编写Shell脚本自动化Linux系统任务',
    date: '2025-04-15',
    author: 'Chryssolion Chen',
    tags: ['Linux', 'Shell', '脚本'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-system-admin',
    title: 'Linux 系统管理技巧',
    description: '系统管理员必备的Linux管理经验和技巧',
    date: '2025-04-20',
    author: 'Chryssolion Chen',
    tags: ['Linux', '系统管理'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-networking',
    title: 'Linux 网络配置与管理',
    description: '如何在Linux系统中配置和管理网络连接',
    date: '2025-04-25',
    author: 'Chryssolion Chen',
    tags: ['Linux', '网络'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-security',
    title: 'Linux 安全加固指南',
    description: '保护你的Linux服务器免受常见安全威胁',
    date: '2025-05-01',
    author: 'Chryssolion Chen',
    tags: ['Linux', '安全'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'kali-linux-tools',
    title: 'Kali Linux 渗透测试工具',
    description: 'Kali Linux中常用渗透测试工具的使用指南',
    date: '2025-05-05',
    author: 'Chryssolion Chen',
    tags: ['Kali', 'Linux', '安全工具'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-virtualization',
    title: 'Linux 虚拟化技术',
    description: '使用KVM、Docker等工具在Linux上实现虚拟化',
    date: '2025-05-10',
    author: 'Chryssolion Chen',
    tags: ['Linux', '虚拟化', 'Docker'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  },
  {
    id: 'linux-performance',
    title: 'Linux 性能调优实战',
    description: '如何监控和优化Linux系统性能',
    date: '2025-05-15',
    author: 'Chryssolion Chen',
    tags: ['Linux', '性能优化'],
    imageUrl: 'https://ext.same-assets.com/279446216/849153819.webp'
  }
];

export default function LinuxArticles() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* 导航栏 */}
      <nav className="bg-white dark:bg-gray-800 shadow-md py-4 sticky top-0 z-50">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-blue-600 dark:text-blue-400">
            Chryssolion Chenの Blog
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              首页
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              分类
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              标签
            </Link>
            <Link href="#" onClick={(e) => e.preventDefault()} className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400">
              关于
            </Link>
          </div>
        </div>
      </nav>

      {/* 页面内容 */}
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回首页
            </Button>
          </Link>
        </div>

        {/* Linux专题头部 */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8 relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">Linux 知识专题</h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-3xl mb-6">
              欢迎来到Linux专题区！这里收录了从基础入门到高级应用的Linux相关文章。
              无论你是Linux新手还是经验丰富的系统管理员，都能在这里找到有用的资源和指南。
            </p>
          </div>
          
          {/* 背景装饰 */}
          <div className="absolute top-0 right-0 w-64 h-full opacity-10">
            <Image 
              src="https://ext.same-assets.com/279446216/849153819.webp" 
              alt="Linux背景" 
              fill 
              className="object-cover"
            />
          </div>
          
          {/* 终端风格标签 */}
          <div className="flex flex-wrap gap-2 relative z-10">
            <span className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Linux基础</span>
            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm">系统管理</span>
            <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-sm">网络配置</span>
            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm">安全加固</span>
            <span className="bg-yellow-600 text-white px-3 py-1 rounded-full text-sm">Shell脚本</span>
          </div>
        </div>

        {/* 文章列表 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {linuxArticles.map((article) => (
            <div key={article.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              {/* 文章图片 */}
              <div className="relative h-48">
                <Image
                  src={article.imageUrl}
                  alt={article.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <div className="flex gap-2 mb-2">
                    {article.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-600/80 text-white text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 文章内容 */}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-gray-900 dark:text-white line-clamp-2">
                  {article.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {article.description}
                </p>
                <div className="flex justify-between items-center text-sm">
                  <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {article.date}
                  </div>
                  <Link 
                    href={`/posts/${article.id}`} 
                    className="text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                  >
                    阅读全文
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* 终端风格提示 */}
        <div className="mt-10 bg-gray-900 text-green-400 p-6 rounded-xl font-mono text-sm">
          <div className="mb-2 text-white">root@kali:~# ls -la /articles/linux</div>
          <div>total 10</div>
          {linuxArticles.map((article, index) => (
            <div key={article.id} className="grid grid-cols-12 gap-2">
              <span className="col-span-1">-rw-r--r--</span>
              <span className="col-span-1">1</span>
              <span className="col-span-2">root</span>
              <span className="col-span-2">root</span>
              <span className="col-span-1">{1024 * (index + 1)}</span>
              <span className="col-span-2">{article.date.replace('2025-', 'Apr ')}</span>
              <span className="col-span-3 text-blue-400">{article.id}.md</span>
            </div>
          ))}
          <div className="mt-2 flex items-center">
            <span className="text-white">root@kali:~#</span>
            <span className="w-2 h-4 bg-white ml-1 animate-pulse"></span>
          </div>
        </div>
      </main>

      {/* 页脚 */}
      <footer className="bg-white dark:bg-gray-800 shadow-inner py-6 mt-10">
        <div className="container mx-auto px-4 text-center text-gray-600 dark:text-gray-400">
          <p>© 2025 小臣の Web · 基于 Next.js 构建</p>
        </div>
      </footer>
    </div>
  )
} 