"use client";

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen, User, Mail, ChevronRight, ChevronLeft,
  Moon, Sun, Menu, X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

interface SideNavProps {
  className?: string;
}

// 卡通菜单图标组件
const CartoonMenuIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <rect x="3" y="5" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="11" width="18" height="2" rx="1" fill="currentColor" />
    <rect x="3" y="17" width="18" height="2" rx="1" fill="currentColor" />
    <circle cx="7" cy="6" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="10" cy="12" r="1.5" fill="currentColor" opacity="0.7" />
    <circle cx="6" cy="18" r="1.5" fill="currentColor" opacity="0.7" />
  </svg>
);

// 卡通关闭图标组件
const CartoonCloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
  </svg>
);

export default function SideNav({ className }: SideNavProps) {
  // 默认导航栏为隐藏状态
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // 从localStorage初始化主题
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // 获取主题设置
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          setIsDarkMode(true);
        }
      } catch (e) {
        console.error('Failed to get theme', e);
      }
    }
  }, []);

  // 当导航栏可见状态变化时，更新主内容区域的类名
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        // 通过CSS类名切换主内容区域的边距
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
          if (isVisible) {
            mainContent.classList.add('nav-expanded');
            mainContent.classList.remove('nav-collapsed');
          } else {
            mainContent.classList.remove('nav-expanded');
            mainContent.classList.add('nav-collapsed');
          }
        }
      } catch (e) {
        console.error('Failed to update nav state', e);
      }
    }
  }, [isVisible]);

  // 切换主题
  const toggleTheme = useCallback(() => {
    if (typeof window !== 'undefined') {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);

      try {
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      } catch (e) {
        console.error('Failed to set theme', e);
      }
    }
  }, [isDarkMode]);

  // 切换导航栏可见状态
  const toggleNav = useCallback(() => {
    setIsVisible(!isVisible);
  }, [isVisible]);

  const navItems = [
    { name: "首页", href: "/", icon: Home, style: "text-foreground font-['MiSans']" },
    { name: "技术支持", href: "/style1", icon: BookOpen, style: "text-site1-primary font-['KuaiKanShiJieTi']" },
    { name: "小臣のWeb", href: "/style2", icon: BookOpen, style: "text-site2-primary font-['NotoSerifSC']" },
    { name: "Chryssolion Chen安全小窝", href: "/style3", icon: BookOpen, style: "text-site3-primary font-['HanTang']" },
    { name: "Chryssolion Chen", href: "/style4", icon: BookOpen, style: "text-site4-primary font-['MiSans']" },
    { name: "Chryssolion Chen.0", href: "/style5", icon: BookOpen, style: "text-site5-primary font-noto" },
    { name: "关于", href: "/about", icon: User, style: "text-foreground font-['MiSans']" },
    { name: "联系", href: "/contact", icon: Mail, style: "text-foreground font-['MiSans']" },
  ];

  return (
    <>
      {/* 悬浮按钮 - 放置在页面左侧 */}
      <button
        onClick={toggleNav}
        className="fixed top-6 left-6 z-50 flex items-center justify-center w-10 h-10 rounded-full bg-white/40 dark:bg-gray-800/40 shadow-md backdrop-blur-sm hover:bg-white/60 dark:hover:bg-gray-700/60 transition-all duration-300"
        aria-label={isVisible ? "关闭导航栏" : "打开导航栏"}
      >
        {isVisible ? <CartoonCloseIcon /> : <CartoonMenuIcon />}
      </button>

      {/* 侧边导航栏 - 添加遮罩背景 */}
      <div 
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isVisible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
        onClick={toggleNav}
      >
        <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      </div>

      {/* 侧边导航栏 */}
      <aside
        className={cn(
          "h-screen fixed left-0 top-0 z-50 flex flex-col transition-all duration-300 border-r border-white/20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md shadow-lg",
          isVisible ? "translate-x-0" : "-translate-x-full",
          "w-64",
          className
        )}
      >
        <div className="flex items-center h-16 px-4 border-b border-white/20 dark:border-gray-700/20 justify-between">
          <Link href="/" className="flex-1">
            <div className="bg-gradient-to-r from-site1-primary via-site2-primary to-site3-primary text-transparent bg-clip-text font-['KuaiKanShiJieTi'] text-xl font-bold truncate">
              小臣
            </div>
          </Link>
          
          <button
            onClick={toggleNav}
            className="text-gray-500/70 hover:text-gray-700/90 dark:text-gray-400/70 dark:hover:text-gray-200/90"
            aria-label="关闭导航栏"
          >
            <CartoonCloseIcon />
          </button>
        </div>

        <nav className="flex-1 py-6 overflow-y-auto scrollbar-thin">
          <ul className="space-y-1 px-2">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-2 px-3 rounded-md transition-colors",
                    pathname === item.href ? "bg-white/40 dark:bg-gray-700/40" : "hover:bg-white/30 dark:hover:bg-gray-700/30",
                    item.style
                  )}
                  title={item.name}
                  onClick={() => setIsVisible(false)}
                >
                  <item.icon size={18} className="mr-3 opacity-80" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-white/20 dark:border-gray-700/20 p-4 flex justify-end">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="opacity-70 hover:opacity-100"
            aria-label={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
        </div>
      </aside>
    </>
  );
}
