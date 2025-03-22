"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Search, X } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// 模拟文章数据接口
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

// 静态文章数据（实际应用中可能从API获取）
const allPosts: Post[] = [
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
    id: "post1",
    title: "2025年的某一天",
    description: "今天的天气很不错",
    date: "2025-1-10",
    author: "Chryssolion Chen",
    coverImage: "/images/2774141023.jpeg",
    category: "scene",
    tags: ["天空"]
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
    title: "个人博客主题分享(WordPress)",
    description: "前言 下面的主题都是我在网络上搜寻到的，具体好不好用需要自己尝试。",
    date: "2022-11-08",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/3883899639/2284524433.png",
    category: "Learn",
    tags: ["front-end"]
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
    title: "网络安全学习总结",
    description: "网络安全学习总结",
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
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1727594840/896323414.png",
    category: "Learn",
    tags: ["WordPress", "主题"]
  }
]

export function SearchDialog() {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState<Post[]>([])

  // 搜索函数
  useEffect(() => {
    if (!searchTerm) {
      setSearchResults([])
      return
    }

    const term = searchTerm.toLowerCase()
    const filteredPosts = allPosts.filter(
      (post) =>
        post.title.toLowerCase().includes(term) ||
        post.description.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term) ||
        post.tags.some((tag) => tag.toLowerCase().includes(term)) ||
        post.author.toLowerCase().includes(term)
    )

    setSearchResults(filteredPosts)
  }, [searchTerm])

  // 清除搜索
  const clearSearch = () => {
    setSearchTerm('')
    setSearchResults([])
  }

  // 点击结果后关闭对话框
  const handleResultClick = () => {
    setOpen(false)
    clearSearch()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Search className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">搜索</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-['NotoSerifSC'] text-xl">搜索文章</DialogTitle>
          <DialogDescription>
            在所有文章中搜索标题、内容、标签或作者
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="输入关键词搜索..."
              className="pl-10 pr-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
            />
            {searchTerm && (
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                onClick={clearSearch}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">清除搜索</span>
              </Button>
            )}
          </div>

          <div className="mt-6 space-y-4">
            {searchResults.length > 0 ? (
              <>
                <p className="text-sm text-muted-foreground">
                  找到 {searchResults.length} 个结果
                </p>
                <div className="space-y-4">
                  {searchResults.map((post) => (
                    <Link
                      key={post.id}
                      href={`/posts/${post.id}`}
                      onClick={handleResultClick}
                      className="flex gap-4 p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                    >
                      <div className="flex-shrink-0 w-16 h-16 relative rounded overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium truncate">{post.title}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-1">
                          {post.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-700">
                            {post.category}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {post.author}
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </>
            ) : searchTerm ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">未找到匹配的结果</p>
              </div>
            ) : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
