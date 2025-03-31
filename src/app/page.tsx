"use client";

import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/SearchBar"
import { MessageForm } from "@/components/MessageForm"
import React, { useEffect, useState } from "react"
import { SnakeGame } from "@/components/SnakeGame"
import { ProfileCard } from "@/components/ProfileCard"
import KaliTerminal from "@/components/KaliTerminal"
import { useRouter } from "next/navigation"

// 导入重构后的组件和数据
import { PostCard, CategoryList, TagCloud, Author, Footer } from "@/components"
import { posts } from "@/data/posts"
import { styleConfigs } from "@/data/siteConfig"
import { useScrollPosition } from "@/hooks/useScrollPosition"

export default function Home() {
  const router = useRouter();
  const { saveScrollPosition, restoreScrollPosition } = useScrollPosition();
  
  // 选择多篇文章展示
  const featuredPosts = posts.slice(0, 5);
  
  // 处理分类点击
  const handleCategoryClick = (category: string) => {
    // 保存筛选条件和滚动位置
    sessionStorage.setItem('categoryFilter', category);
    saveScrollPosition();
    // 跳转到分类页面
    router.push(`/posts?category=${encodeURIComponent(category)}`);
  };

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    // 保存筛选条件和滚动位置
    sessionStorage.setItem('tagFilter', tag);
    saveScrollPosition();
    // 跳转到标签页面
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
      
      {/* 搜索栏固定在右上角 */}
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

              {/* 文章卡片列表 - 使用PostCard组件 */}
              {featuredPosts.map((post, index) => (
                <React.Fragment key={post.id}>
                  <PostCard 
                    post={post} 
                    saveScrollPosition={saveScrollPosition}
                    featured={true}
                  />
                  
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
              
              {/* 使用PostCard组件显示更多文章 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10 mx-auto relative">
                {posts.slice(5, 9).map((post) => (
                  <PostCard 
                    key={post.id}
                    post={post} 
                    saveScrollPosition={saveScrollPosition}
                    featured={false}
                  />
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
            {/* 分类模块 - 使用CategoryList组件 */}
            <CategoryList 
              posts={posts} 
              onCategoryClick={handleCategoryClick} 
            />

            {/* 标签云 - 使用TagCloud组件 */}
            <TagCloud 
              posts={posts} 
              onTagClick={handleTagClick} 
            />

            {/* 关于博主 - 使用Author组件 */}
            <Author 
              name="Chryssolion Chen"
              avatarUrl="https://ext.same-assets.com/279446216/849153819.webp"
              role="网络安全 / 写作爱好者"
              description="记录技术、生活和随想，分享有趣的发现和经验。"
            />
          </div>
        </section>

        {/* 页脚 - 使用Footer组件 */}
        <Footer />
      </div>
    </div>
  )
}
