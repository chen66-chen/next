"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home, BookOpen,
  User, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

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

// 卡通关闭图标组件
const CartoonCloseIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" opacity="0.2" />
    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
    <circle cx="16" cy="16" r="1" fill="currentColor" />
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

// 卡通太阳图标组件
const CartoonSunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="5" fill="currentColor" opacity="0.7" />
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 4" />
    <path d="M12 3V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M12 19V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M3 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M19 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3" fill="currentColor" />
  </svg>
);

// 卡通月亮图标组件
const CartoonMoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" strokeWidth="2" fill="currentColor" opacity="0.2" />
    <circle cx="9" cy="8" r="1" fill="currentColor" />
    <circle cx="16" cy="12" r="1" fill="currentColor" />
    <circle cx="12" cy="14" r="1" fill="currentColor" />
  </svg>
);

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const pathname = usePathname();

  // 主题检测
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
          setIsDarkMode(true);
        }
      } catch (e) {
        // 忽略localStorage错误
      }
    }
  }, []);

  // 切换主题
  const toggleTheme = () => {
    if (typeof window !== 'undefined') {
      try {
        const newDarkMode = !isDarkMode;
        setIsDarkMode(newDarkMode);

        if (newDarkMode) {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        }
      } catch (e) {
        // 忽略localStorage错误
      }
    }
  };

  // 切换菜单状态
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // 关闭导航菜单
  const closeMenu = () => {
    setIsOpen(false);
  };

  // 当路径改变时关闭菜单
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  const navItems = [
    { name: "首页", href: "/", icon: Home, style: "text-foreground font-['MiSans']" },
    { name: "技术支持", href: "/style1", icon: BookOpen, style: "text-site1-primary font-['KuaiKanShiJieTi']" },
    { name: "Chryssolion Chen安全小窝", href: "/style3", icon: BookOpen, style: "text-site3-primary font-['HanTang']" },
    { name: "Chryssolion Chen", href: "/style4", icon: BookOpen, style: "text-site4-primary font-['MiSans']" },
    { name: "Chryssolion Chen.0", href: "/style5", icon: BookOpen, style: "text-site5-primary font-noto" },
    { name: "关于", href: "/about", icon: User, style: "text-foreground font-['MiSans']" },
    { name: "联系", href: "/contact", icon: Mail, style: "text-foreground font-['MiSans']" },
  ];

  return (
    <>
      {/* 顶部导航栏 */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b border-border h-16 flex items-center px-4 justify-between">
        <Link href="/" className="flex-1">
          <div className="bg-gradient-to-r from-site1-primary via-site2-primary to-site3-primary text-transparent bg-clip-text font-['KuaiKanShiJieTi'] text-xl font-bold truncate">
            小臣
          </div>
        </Link>

        <div className="flex gap-2">
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="搜索">
              <CartoonSearchIcon />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label={isDarkMode ? "切换到浅色模式" : "切换到深色模式"}
          >
            {isDarkMode ? <CartoonSunIcon /> : <CartoonMoonIcon />}
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            aria-label={isOpen ? "关闭菜单" : "打开菜单"}
          >
            {isOpen ? <CartoonCloseIcon /> : <CartoonMenuIcon />}
          </Button>
        </div>
      </div>

      {/* 滑出式导航菜单 */}
      <div className={cn(
        "fixed inset-0 bg-background z-40 transition-transform duration-300 ease-in-out transform",
        isOpen ? "translate-y-16" : "-translate-y-full",
        "pt-4 pb-20 overflow-y-auto"
      )}>
        <nav className="container px-4">
          <ul className="space-y-4">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center py-3 px-4 rounded-md transition-colors",
                    pathname === item.href ? "bg-accent/50" : "hover:bg-accent/20",
                    item.style
                  )}
                  onClick={closeMenu}
                >
                  <item.icon size={20} className="mr-3" />
                  <span>{item.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* 背景遮罩 - 点击关闭菜单 */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 mt-16"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
}
