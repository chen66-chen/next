"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
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

// 卡通搜索图标组件
const CartoonSearchIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

export default function BlogStyleNav() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  // 当路径改变时关闭菜单
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      {/* 顶部导航栏 */}
      <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <button className="p-2 md:hidden" onClick={toggleMenu}>
              <span className="h-5 w-5 text-gray-700">
                <CartoonMenuIcon />
              </span>
            </button>
            <Link href="/" className="font-['NotoSerifSC'] text-xl text-gray-800">
              小臣のWeb
            </Link>
          </div>

          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-blue-500 transition-colors">
              主页
            </Link>
            <Link href="/categories" className="text-gray-700 hover:text-blue-500 transition-colors">
              分类
            </Link>
            <Link href="/archives" className="text-gray-700 hover:text-blue-500 transition-colors">
              文章归档
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-500 transition-colors">
              关于
            </Link>
            <Link href="/friends" className="text-gray-700 hover:text-blue-500 transition-colors">
              友链
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <button className="p-2">
              <span className="h-5 w-5 text-gray-700">
                <CartoonSearchIcon />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 移动端菜单 */}
      <div className={cn(
        "fixed inset-0 bg-black/50 z-40 transition-opacity md:hidden",
        isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      )}>
        <div className={cn(
          "fixed top-0 left-0 h-screen w-64 bg-white transform transition-transform",
          isMenuOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="p-4 border-b">
            <Link href="/" className="font-['NotoSerifSC'] text-xl text-gray-800">
              小臣のWeb
            </Link>
          </div>
          <nav className="p-4">
            <ul className="space-y-4">
              <li>
                <Link href="/" className="block text-gray-700 hover:text-blue-500">
                  主页
                </Link>
              </li>
              <li>
                <Link href="/categories" className="block text-gray-700 hover:text-blue-500">
                  分类
                </Link>
              </li>
              <li>
                <Link href="/archives" className="block text-gray-700 hover:text-blue-500">
                  文章归档
                </Link>
              </li>
              <li>
                <Link href="/about" className="block text-gray-700 hover:text-blue-500">
                  关于
                </Link>
              </li>
              <li>
                <Link href="/friends" className="block text-gray-700 hover:text-blue-500">
                  友链
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}