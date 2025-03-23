"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// 使用dynamic导入，关闭服务器端渲染
const BiometricAuthDemoClient = dynamic(
  () => import('./BiometricAuthDemo'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[200px] bg-black/30 rounded-lg flex items-center justify-center">
        <div className="space-y-3 w-[90%] mx-auto text-center">
          <Skeleton className="h-8 w-1/2 mx-auto bg-gray-700/40" />
          <Skeleton className="h-12 w-12 rounded-full mx-auto bg-gray-700/30" />
          <Skeleton className="h-6 w-3/4 mx-auto bg-gray-700/20" />
        </div>
      </div>
    )
  }
);

/**
 * 安全的生物识别验证组件
 * 使用动态导入确保仅在客户端渲染
 */
export default function SafeBiometricAuthDemo(props: any) {
  return <BiometricAuthDemoClient {...props} />;
} 