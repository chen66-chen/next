'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function XSSArticlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white pt-16 pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/style3"
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回安全小窝
        </Link>
        
        <h1 className="text-4xl font-bold mb-4">XSS漏洞分析与防御策略</h1>
        
        <div className="prose prose-invert prose-lg max-w-none">
          <h2>跨站脚本（XSS）攻击简介</h2>
          <p>
            跨站脚本攻击是一种常见的Web应用程序安全漏洞，它允许攻击者将恶意脚本注入到受信任的网站中。
          </p>
          
          <h2>结论</h2>
          <p>
            防御XSS应采取多层防御策略，包括输入验证、输出编码、内容安全策略等。
          </p>
        </div>
      </div>
    </div>
  );
} 