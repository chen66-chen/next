"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/SearchBar"
import { MessageForm } from "@/components/MessageForm"
import React, { useEffect, useLayoutEffect, useRef, useState, useCallback } from "react"
import { SnakeGame } from "@/components/SnakeGame"
import { ProfileCard } from "@/components/ProfileCard"
import KaliTerminal from "@/components/KaliTerminal"
import { useRouter } from "next/navigation"

interface Post {
  id: string
  title: string
  description: string
  date: string
  author: string
  coverImage: string
  category: string
  tags: string[]
}

// Mock data for posts
export const posts: Post[] = [
  {
    id: "linux-1",
    title: "Linux基础入门指南",
    description: "从零开始学习Linux的基础知识，包括常用命令、文件系统和基本操作。",
    date: "2025-03-18",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2117173837/4046808622.webp",
    category: "Linux",
    tags: ["Linux", "入门", "命令行"]
  },
  {
    id: "linux-2",
    title: "Linux文件系统详解",
    description: "深入理解Linux文件系统的结构、类型和管理方法，掌握文件操作的核心概念。",
    date: "2025-03-20",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1824305649/3628065475.webp",
    category: "Linux",
    tags: ["Linux", "文件系统", "存储"]
  },
  {
    id: "linux-3",
    title: "Linux Shell脚本编程精通",
    description: "学习Shell脚本编程的核心概念和技巧，提高自动化能力和工作效率。",
    date: "2025-03-22",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2570740104/2633335979.webp",
    category: "Linux",
    tags: ["Linux", "Shell", "Bash", "脚本编程"]
  },
  {
    id: "post11",
    title: "操作系统学习总结",
    description: "本文涵盖操作系统安全核心知识、实战案例及关键命令，给出密码管理、权限控制等安全建议。",
    date: "2025-03-25",
    author: "Chryssolion Chen2",
    coverImage: "/images/7.png",
    category: "网络安全",
    tags: ["操作系统", "网络安全", "配置"]
  },
  {
    id: "post1",
    title: "2025年的某一天",
    description: "2025年的某一天，天空格外湛蓝，仿佛被水洗过一般",
    date: "2025-1-15",
    author: "Chryssolion Chen",
    coverImage: "/images/2774141023.jpeg",
    category: "思考",
    tags: ["天空", "随笔", "生活", "感悟"]
  },
  {
    id: "post2",
    title: "LS-NET-009-如何配置基于手动匹配的ACL",
    description: "网络工程师必须掌握的基础知识",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/851502839/2441392336.png",
    category: "网工笔记",
    tags: ["ACL", "网络配置"]
  },
  {
    id: "post3",
    title: "安全运营中心（SOC）核心要素解析",
    description: "详细介绍SOC的核心职责、数据源体系和服务矩阵，帮助企业构建高效安全防御体系。",
    date: "2022-11-08",
    author: "Chryssolion Chen",
    coverImage: "/images/5.jpg",
    category: "安全",
    tags: ["SOC", "网络安全"]
  },
  {
    id: "post4",
    title: "渗透测试实战总结",
    description: "详细介绍SSH登录提权流程、NMAP扫描+FTP提权流程、防火墙实战案例等渗透测试技术",
    date: "2025-03-03",
    author: "Chryssolion Chen",
    coverImage: "/images/3.jpg",
    category: "渗透",
    tags: ["网络"]
  },
  {
    id: "post5",
    title: "网络安全入门",
    description: "网络安全Namp",
    date: "2025-01-13",
    author: "Chryssolion Chen",
    coverImage: "/images/1.webp",
    category: "网络安全",
    tags: ["网络安全", "入门","Nmap"]
  },
  {
    id: "post6",
    title: "WordPress博客主题Kratos",
    description: "一个简洁优雅的WordPress主题",
    date: "2024-09-28",
    author: "Echo",
    coverImage: "https://ext.same-assets.com/1727594840/896323414.png",
    category: "Learn",
    tags: ["WordPress", "主题"]
  },
  {
    id: "post7",
    title: "minio使用指南",
    description: "MinIO 是一款高性能、分布式的对象存储系统",
    date: "2025-02-15",
    author: "昆昆鱼",
    coverImage: "https://ext.same-assets.com/1310289913/40117092.png",
    category: "技术",
    tags: ["minio", "教程"]
  },
  {
    id: "post8",
    title: "2021年的某一天",
    description: "2021年的某一天，天空格外湛蓝，仿佛被水洗过一般",
    date: "2023-12-10",
    author: "昆昆鱼",
    coverImage: "https://ext.same-assets.com/2189857954/3060987925.webp",
    category: "生活随笔",
    tags: ["天空", "随笔"]
  },
  {
    id: "post10",
    title: "TCP/IP网络协议详解",
    description: "TCP/IP是互联网的基础协议，本文深入剖析TCP/IP的工作原理及其在网络中的核心作用。",
    date: "2025-03-22",
    author: "Chryssolion Chen2",
    coverImage: "https://ext.same-assets.com/279446216/849153819.webp",
    category: "网络协议",
    tags: ["TCP/IP", "网络"]
  }
]

// 每种风格的配置
const styleConfigs = [
  {
    id: 'style1',
    name: '技术风格',
    description: '简约、清新的设计风格，以蓝色云彩为主题，给人一种宁静舒适的感觉。',
    authorFilter: 'Chryssolion Chen',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    buttonBgColor: 'border-site1-accent text-site1-primary hover:bg-site1-accent/10',
    route: '/style1',
    cardClass: 'post-card post-card-site1 group h-full'
  },
  {
    id: 'style2',
    name: '小臣のWeb风格',
    description: '优雅、精致的卡片设计，色彩丰富，适合技术内容的展示。',
    authorFilter: 'Chryssolion Chen',
    bgColor: 'bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-950/20 dark:to-pink-900/20',
    borderColor: 'border-pink-200 dark:border-pink-800',
    buttonBgColor: 'border-site2-accent text-site2-primary hover:bg-site2-accent/10',
    route: '/style2',
    cardClass: 'post-card post-card-site2 group h-full'
  },
  {
    id: 'style3',
    name: '小臣小窝风格',
    description: '深色系设计，简洁且专注于内容的呈现，适合程序员和开发者阅读。',
    authorFilter: 'Echo',
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/50 dark:to-gray-800/50',
    borderColor: 'border-gray-300 dark:border-gray-700',
    buttonBgColor: 'border-site3-accent text-site3-primary hover:bg-site3-accent/10',
    route: '/style3',
    cardClass: 'post-card post-card-site3 group h-full'
  },
  {
    id: 'style4',
    name: '臣风格',
    description: '简约大方的云朵设计，清新自然的配色，展现博客的独特魅力。',
    authorFilter: '昆昆鱼',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30',
    borderColor: 'border-slate-200 dark:border-slate-700',
    buttonBgColor: 'border-site4-accent text-site4-primary hover:bg-site4-accent/10',
    route: '/style4',
    cardClass: 'post-card-site4 group h-full'
  },
  {
    id: 'style5',
    name: '2.0风格',
    description: '全屏动漫背景，文章内容卡片式布局，清新自然的UI设计。',
    authorFilter: 'Chryssolion Chen2',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/20 dark:to-purple-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    buttonBgColor: 'border-[#8897a3] text-[#213b53] hover:bg-[#8897a3]/10',
    route: '/style5',
    cardClass: 'bg-white/90 shadow-md rounded-lg overflow-hidden h-full'
  }
];

export default function Home() {
  const router = useRouter();
  // 记录滚动位置
  const scrollPosition = useRef(0);
  const [hasScrollRestored, setHasScrollRestored] = useState(false);
  
  // 使用useCallback创建保存滚动位置的函数，以便在多个地方重用
  const saveScrollPosition = useCallback(() => {
    scrollPosition.current = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.current.toString());
  }, []);
  
  // 使用useCallback创建恢复滚动位置的函数
  const restoreScrollPosition = useCallback(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (!isNaN(position) && position > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: position,
            behavior: 'auto'
          });
        });
      }
    }
  }, []);
  
  // 使用useLayoutEffect提前处理滚动位置
  useLayoutEffect(() => {
    // 初始滚动位置恢复
    if (!hasScrollRestored) {
      restoreScrollPosition();
      setHasScrollRestored(true);
    }
  }, [hasScrollRestored, restoreScrollPosition]);
  
  // 监听滚动和点击事件
  useEffect(() => {
    // 获取初始滚动位置
    const initialScrollPosition = window.scrollY;
    scrollPosition.current = initialScrollPosition;
    
    // 监听滚动，保存位置
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPosition.current.toString());
    };
    
    // 处理全局点击事件
    const handleDocumentClick = (e: MouseEvent) => {
      // 保存当前滚动位置
      saveScrollPosition();
      
      const target = e.target as HTMLElement;
      const linkOrButton = target.closest('a, button');
      
      // 处理空链接或占位符链接
      if (linkOrButton instanceof HTMLAnchorElement) {
        const href = linkOrButton.getAttribute('href');
        if (href === '#' || href === '' || href === 'javascript:void(0)') {
          e.preventDefault();
        }
      }
    };
    
    // 处理表单提交
    const handleFormSubmit = (e: SubmitEvent) => {
      saveScrollPosition();
    };
    
    // 监听路由变化前
    const beforeUnload = () => {
      saveScrollPosition();
    };
    
    // 添加各种事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('submit', handleFormSubmit);
    window.addEventListener('beforeunload', beforeUnload);
    
    // 在组件卸载时清除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [saveScrollPosition]);
  
  // 添加自定义的处理点击事件的函数，用于各种交互元素
  const handleInteractionWithoutScroll = (e: React.MouseEvent) => {
    // 保存当前滚动位置
    saveScrollPosition();
    // 阻止默认行为和事件冒泡
    e.preventDefault();
    e.stopPropagation();
  };
  
  // 选择多篇文章展示（这里展示所有文章或前5篇）
  const featuredPosts = posts.slice(0, 5);
  
  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    // 保存筛选条件和滚动位置
    sessionStorage.setItem('categoryFilter', category);
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    // 跳转到分类页面，这里可以根据实际路由结构调整
    router.push(`/posts?category=${encodeURIComponent(category)}`);
  };

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    // 保存筛选条件和滚动位置
    sessionStorage.setItem('tagFilter', tag);
    sessionStorage.setItem('scrollPosition', window.scrollY.toString());
    // 跳转到标签页面，这里可以根据实际路由结构调整
    router.push(`/posts?tag=${encodeURIComponent(tag)}`);
  };
  
  return (
    <div className="min-h-screen relative">
      {/* 背景图层 */}
      <div className="fixed inset-0 -z-10">
        <Image
          src="/images/hero-pattern.jpeg"
          alt="网站背景"
          fill
          className="object-cover"
          priority
        />
      </div>
      
      {/* 搜索栏固定在右上角，避免遮挡导航按钮 */}
      <div className="fixed top-4 right-4 z-50">
        <SearchBar />
      </div>
      
      <div className="mx-auto pb-10">
        {/* 顶部空白区域，为背景图提供空间 */}
        <div className="h-[500px] mt-10">
          {/* 移除这里的搜索栏 */}
        </div>
        
        {/* 文章容器 */}
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* 个人资料卡片 - 左侧 */}
            <div className="w-full lg:w-64 order-2 lg:order-1">
              <ProfileCard />
            </div>
            
            {/* 文章区域 - 中间 */}
            <div className="flex-1 max-w-3xl mx-auto order-1 lg:order-2 relative">
              {/* 页面装饰元素 - 左侧垂直装饰 */}
              <div className="hidden lg:block absolute -left-16 top-20 bottom-20 w-0.5 bg-gradient-to-b from-transparent via-blue-300/50 dark:via-blue-500/30 to-transparent"></div>
              
              {/* 标题装饰元素 */}
              <div className="relative mb-12">
                <h1 className="text-3xl font-bold mb-2 text-center font-['KuaiKanShiJieTi'] relative z-10">最新文章</h1>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"></div>
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-300/50 to-transparent rounded-full"></div>
              </div>

              {/* 文章卡片列表 */}
              {featuredPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <Link 
                    href={`/posts/${post.id}`} 
                    className="block mb-8 group relative"
                    onClick={saveScrollPosition}
                  >
                    {/* 装饰性元素 - 左侧垂直线 */}
                    <div className="absolute left-[-20px] top-[30px] bottom-[30px] w-[3px] bg-gradient-to-b from-blue-400 to-purple-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* 装饰性元素 - 右上角装饰点 */}
                    <div className="absolute right-[-8px] top-[-8px] w-6 h-6 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 opacity-0 group-hover:opacity-80 transition-all duration-300 group-hover:scale-110 shadow-lg"></div>
                    
                    {/* 卡片容器 - 添加精致边框效果 */}
                    <div className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-800 group-hover:border-blue-200 dark:group-hover:border-blue-900">
                      {/* 渐变色背景封面图 */}
                      <div className="relative h-44 md:h-48 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        
                        {/* 装饰性角标 - 分类标识 */}
                        <div className="absolute top-3 left-3 px-2 py-1 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-md text-xs font-medium shadow-sm border-l-2 border-blue-500">
                          {post.category}
                        </div>
                        
                        {/* 标题和描述覆盖在图片上 */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
                          <h2 className="text-xl font-bold text-white mb-1 group-hover:text-blue-200 transition-colors duration-300 font-['KuaiKanShiJieTi']">
                            {post.title}
                          </h2>
                          <p className="text-white/90 text-xs">{post.date} · {post.author}</p>
                        </div>
                      </div>
                      
                      {/* 文章摘要 */}
                      <div className="p-4 relative">
                        {/* 装饰性引号 */}
                        <div className="absolute top-2 left-2 text-4xl text-blue-100 dark:text-gray-800 opacity-30 font-serif">"</div>
                        
                        <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2 text-sm pl-3 relative z-10">
                          {post.description}
                        </p>
                        
                        {/* 标签 */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags.map((tag, i) => (
                            <span
                              key={i}
                              className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 rounded-full hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-colors duration-200"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* 阅读更多 */}
                        <div className="flex justify-end items-center">
                          <span className="text-xs text-blue-500 dark:text-blue-400 group-hover:underline inline-flex items-center gap-1">
                            阅读更多 
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* 装饰性元素 - 右侧垂直线 */}
                    <div className="absolute right-[-20px] top-[30px] bottom-[30px] w-[3px] bg-gradient-to-b from-purple-500 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                  
                  {/* 在卡片之间添加装饰分隔线 */}
                  <div className={index < featuredPosts.length - 1 ? "w-full h-[1px] my-8 bg-gradient-to-r from-transparent via-gray-200 dark:via-gray-700 to-transparent" : ""}></div>
                </React.Fragment>
              ))}
              
              {/* 页面装饰元素 - 底部装饰点 */}
              <div className="flex justify-center gap-1 my-8">
                <div className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500 opacity-70"></div>
                <div className="w-1 h-1 rounded-full bg-purple-400 dark:bg-purple-500 opacity-70"></div>
                <div className="w-1 h-1 rounded-full bg-blue-400 dark:bg-blue-500 opacity-70"></div>
              </div>
            
              {/* 其他文章卡片网格 - 标题样式优化 */}
              <div className="relative">
                <h2 className="text-xl font-bold mb-8 font-['KuaiKanShiJieTi'] text-center relative">
                  <span className="relative z-10 px-4 bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text">更多精彩内容</span>
                  <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent -z-10"></div>
                </h2>
              </div>
              
              {/* 装饰性角标效果优化 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 mx-auto relative">
                {posts.slice(5, 9).map((post) => (
                  <Link 
                    href={`/posts/${post.id}`} 
                    key={post.id}
                    className="block group relative"
                    onClick={(e) => {
                      // 保存当前滚动位置到sessionStorage
                      sessionStorage.setItem('scrollPosition', window.scrollY.toString());
                    }}
                  >
                    {/* 装饰性角标 */}
                    <div className="absolute top-0 right-0 w-8 h-8 bg-gradient-to-br from-blue-400 to-indigo-600 transform rotate-45 translate-x-[14px] translate-y-[-14px] z-10 shadow-md transition-transform duration-300 group-hover:scale-110"></div>
                    
                    <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 h-full transform group-hover:-translate-y-1 group-hover:border-blue-200 dark:group-hover:border-blue-900">
                      <div className="relative h-32 overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="text-sm font-bold text-white mb-0.5 line-clamp-1 group-hover:text-blue-200 transition-colors duration-300">
                            {post.title}
                          </h3>
                          <p className="text-white/80 text-xs flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {post.date}
                          </p>
                        </div>
                      </div>
                      <div className="p-3">
                        <p className="text-gray-700 dark:text-gray-300 text-xs line-clamp-2 mb-2">
                          {post.description}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                          <span className="flex items-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {post.author}
                          </span>
                          <span className="px-1.5 py-0.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 rounded text-[10px]">
                            {post.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            
            {/* 贪吃蛇游戏区域 - 右侧 */}
            <div className="w-full lg:w-64 order-3 lg:self-start">
              <div className="mb-6">
                <SnakeGame />
              </div>
              
              {/* Kali Linux终端界面 */}
              <div className="mb-6">
                <KaliTerminal />
              </div>
            </div>
          </div>
        </div>
        
        {/* 留言区 - 保持一致的宽度 */}
        <div className="container mx-auto px-4 mt-16 mb-20 max-w-3xl">
          <div 
            id="message-section"
            onClick={(e) => {
              // 阻止事件冒泡以防止全局点击事件处理
              e.stopPropagation();
              // 保存当前滚动位置
              saveScrollPosition();
            }}
          >
            <MessageForm 
              onMessageSent={() => {
                // 处理留言发送成功后的回调
                // 确保滚动位置不变
                setTimeout(restoreScrollPosition, 100);
              }} 
            />
          </div>
        </div>
        
        {/* 底部小组件 - 减小最大宽度保持一致 */}
        <section className="max-w-4xl mx-auto px-4 mb-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 分类模块 */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">文章分类</h3>
              <ul className="space-y-2">
                {Array.from(new Set(posts.map(post => post.category))).map((category, i) => (
                  <li key={i} className="flex justify-between items-center">
                    <span 
                      className="text-gray-700 dark:text-gray-300 cursor-pointer hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </span>
                    <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 px-2 py-1 rounded-full">
                      {posts.filter(post => post.category === category).length}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* 标签云 */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">标签云</h3>
              <div className="flex flex-wrap gap-2">
                {Array.from(new Set(posts.flatMap(post => post.tags))).map((tag, i) => (
                  <span 
                    key={i}
                    className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm cursor-pointer hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    onClick={() => handleTagClick(tag)}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 关于模块 */}
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm shadow p-6 rounded-xl">
              <h3 className="text-xl font-bold mb-4 border-b pb-2 font-['KuaiKanShiJieTi']">关于博主</h3>
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="https://ext.same-assets.com/279446216/849153819.webp"
                    alt="博主头像"
                    width={64}
                    height={64}
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">Chryssolion Chen</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">网络工程师 / 写作爱好者</p>
                </div>
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                记录技术、生活和随想，分享有趣的发现和经验。
              </p>
            </div>
          </div>
        </section>

        {/* 页脚 - 减小最大宽度保持一致 */}
        <footer className="bg-white/70 dark:bg-gray-900/70 shadow-inner py-6 mt-10 backdrop-blur-sm">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-600 dark:text-gray-400">
              © 2025 小臣の Web · 基于 Next.js 构建
            </p>
            <div className="mt-4">
              <Link href="/demo" className="text-blue-500 hover:text-blue-600 transition-colors">
                查看内容展示创新演示 &rarr;
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
