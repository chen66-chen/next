"use client";

import { ReactNode, useEffect, useState } from "react";

interface ClientWindowWrapperProps {
  children: (window: Window) => ReactNode;
  fallback?: ReactNode;
}

/**
 * 客户端包装器组件，安全地处理window对象访问
 * 仅在客户端渲染时提供window对象
 */
export default function ClientWindowWrapper({ 
  children, 
  fallback = null 
}: ClientWindowWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <>{fallback}</>;
  }

  return <>{children(window)}</>;
} 