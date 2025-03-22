"use client"

import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface BodyClassProviderProps {
  children: React.ReactNode;
  className?: string;
}

export default function BodyClassProvider({ 
  children,
  className
}: BodyClassProviderProps) {
  // 获取当前路径
  const pathname = usePathname();
  
  // 根据路径设置相应的类名
  let bodyClassName = '';
  if (pathname?.startsWith('/style1')) {
    bodyClassName = 'style1-body';
  } else if (pathname?.startsWith('/style2')) {
    bodyClassName = 'style2-body';
  } else if (pathname?.startsWith('/style3')) {
    bodyClassName = 'style3-body';
  } else if (pathname?.startsWith('/style4')) {
    bodyClassName = 'style4-body';
  } else if (pathname?.startsWith('/style5')) {
    bodyClassName = 'style5-body';
  }

  return (
    <div className={cn(bodyClassName, className)}>
      {children}
    </div>
  );
} 