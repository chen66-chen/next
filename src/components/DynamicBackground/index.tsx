"use client";

import dynamic from 'next/dynamic';
import { getThemeColors } from './ThemeHelper';

// 使用dynamic import，防止SSR渲染Three.js
const DynamicBackground = dynamic(() => import('./DynamicBackground'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/30 -z-10" />
});

interface DynamicBackgroundWrapperProps {
  category?: string;
}

export default function DynamicBackgroundWrapper({ 
  category = '默认' 
}: DynamicBackgroundWrapperProps) {
  // 获取主题颜色
  const themeColors = getThemeColors(category);
  
  return (
    <DynamicBackground 
      category={category}
      primaryColor={themeColors.primary}
      secondaryColor={themeColors.secondary}
    />
  );
} 