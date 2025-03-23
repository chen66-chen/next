"use client";

import dynamic from 'next/dynamic';
import { Skeleton } from "@/components/ui/skeleton";

// 使用dynamic导入，关闭服务器端渲染
const NetworkTopologyClient = dynamic(
  () => import('./NetworkTopology'),
  { 
    ssr: false,
    loading: () => (
      <div className="w-full h-[350px] bg-black/30 rounded-lg flex items-center justify-center">
        <div className="space-y-4 w-[90%] mx-auto">
          <Skeleton className="h-8 w-2/3 bg-gray-700/40" />
          <Skeleton className="h-[280px] w-full bg-gray-700/20" />
        </div>
      </div>
    )
  }
);

/**
 * 安全的网络拓扑组件
 * 使用动态导入确保仅在客户端渲染
 */
export default function SafeNetworkTopology() {
  return <NetworkTopologyClient />;
} 