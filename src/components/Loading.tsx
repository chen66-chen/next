import React from 'react';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className = '' }: LoadingProps) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* 主圆环 */}
        <div className="w-16 h-16 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        
        {/* 中间的内圆 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 border-4 border-gray-300 border-b-blue-500 rounded-full animate-spin-reverse"></div>
        
        {/* 文字 */}
        <div className="mt-4 text-center text-gray-600">加载中...</div>
      </div>
    </div>
  );
} 