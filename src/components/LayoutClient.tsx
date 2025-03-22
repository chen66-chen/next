"use client";

import { useState, useEffect } from 'react';
import Footer from '@/components/Footer';
import SideNav from '@/components/SideNav';
import MobileNav from '@/components/MobileNav';

export default function LayoutClient({ children }: { children: React.ReactNode }) {
  const [isMobile, setIsMobile] = useState(false);

  // 检测移动设备
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // 初始检测
    checkIfMobile();

    // 监听窗口大小变化
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // 初始化主内容区域的样式
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mainContent = document.querySelector('.main-content');
      if (mainContent) {
        // 默认导航栏为隐藏状态
        mainContent.classList.add('nav-collapsed');
      }
    }
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* 侧边导航栏 - 在小屏幕上隐藏 */}
      <div className="hidden md:block">
        <SideNav />
      </div>

      {/* 移动端导航栏 - 仅在小屏幕上显示 */}
      <div className="block md:hidden">
        <MobileNav />
      </div>

      {/* 主内容区域 */}
      <div className="flex flex-col flex-1 transition-all duration-300 main-content">
        <main className="flex-1 px-4 md:px-8 pt-16 md:pt-6 pb-4 md:pb-8 transition-all">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}
