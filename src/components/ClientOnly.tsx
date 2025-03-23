"use client";

import { ReactNode, useEffect, useState } from "react";

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * 通用客户端包装器组件
 * 用于确保组件只在客户端渲染，避免服务器端渲染错误
 */
export default function ClientOnly({ 
  children, 
  fallback = null 
}: ClientOnlyProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
} 