"use client"

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// 博客文章数据
const blogPosts = [
  {
    id: 1,
    title: "XSS漏洞分析与防御策略",
    description: "深入探讨跨站脚本攻击的原理与现代防御技术",
    date: "2023-04-15",
    author: "ChryssolionChen",
    coverImage: "/images/blog1.jpg",
    category: "Web安全",
    tags: ["XSS", "Web安全", "防御策略"]
  },
  {
    id: 2,
    title: "构建安全的CI/CD流水线",
    description: "如何在DevOps流程中集成安全实践，实现安全与效率的平衡",
    date: "2023-05-22",
    author: "ChryssolionChen",
    coverImage: "/images/blog2.jpg",
    category: "DevSecOps",
    tags: ["CI/CD", "DevSecOps", "流水线安全"]
  },
  {
    id: 3,
    title: "零信任架构实施指南",
    description: "从传统安全模型迁移到零信任架构的实践经验分享",
    date: "2023-06-10",
    author: "ChryssolionChen",
    coverImage: "/images/blog3.jpg", 
    category: "网络安全",
    tags: ["零信任", "安全架构", "最佳实践"]
  }
];

export default function Style3Blog() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white pt-16">
      {/* 半透明代码背景图案 */}
      <div className="absolute inset-0 code-pattern opacity-20 z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* 英雄区 */}
        <div className="bg-gray-800/80 backdrop-blur-md rounded-xl p-8 mt-20 shadow-2xl border border-gray-700">
          <div className="max-w-5xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
              Chryssolion <span className="text-blue-400">Chen</span> 安全小窝
            </h1>
            <p className="text-xl text-gray-300 mb-6">探索网络安全的未知领域，分享技术与思考</p>
            <div className="flex flex-wrap gap-3">
              <Button variant="default" size="lg">最新文章</Button>
              <Button variant="outline" size="lg">关于我</Button>
            </div>
          </div>
        </div>

        {/* 特性区域 */}
        <div className="mt-16 grid md:grid-cols-2 gap-6">
          {/* 设计特性 */}
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 glow-text-sm">设计特性</h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">✓</div>
                <span>深色主题设计，护眼且符合程序员审美</span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">✓</div>
                <span>响应式布局，完美适配各种设备</span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">✓</div>
                <span>优化的代码显示与语法高亮</span>
              </li>
              <li className="flex items-start">
                <div className="text-blue-500 mr-2">✓</div>
                <span>专为技术内容创作者打造的排版系统</span>
              </li>
            </ul>
          </div>

          {/* 色彩系统 */}
          <div className="bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
            <h2 className="text-2xl font-bold mb-4 glow-text-sm">色彩系统</h2>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex flex-col">
                <div className="h-8 bg-blue-500 rounded-t-md"></div>
                <div className="bg-gray-700 p-2 text-xs rounded-b-md">主色调: #3B82F6</div>
              </div>
              <div className="flex flex-col">
                <div className="h-8 bg-indigo-500 rounded-t-md"></div>
                <div className="bg-gray-700 p-2 text-xs rounded-b-md">辅助色: #6366F1</div>
              </div>
              <div className="flex flex-col">
                <div className="h-8 bg-gray-800 rounded-t-md"></div>
                <div className="bg-gray-700 p-2 text-xs rounded-b-md">背景色: #1F2937</div>
              </div>
              <div className="flex flex-col">
                <div className="h-8 bg-gray-700 rounded-t-md"></div>
                <div className="bg-gray-700 p-2 text-xs rounded-b-md">中性色: #374151</div>
              </div>
            </div>
          </div>
        </div>

        {/* 排版系统 */}
        <div className="mt-10 bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 glow-text-sm">排版系统</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">正文文字</h3>
              <p className="text-gray-300 mb-3">主要正文使用 16px Inter 字体，行高 1.6，确保长文阅读舒适。</p>
              <p className="text-gray-300">代码使用 JetBrains Mono 等宽字体，具有出色的可读性。</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-3 text-blue-400">标题层级</h3>
              <div className="space-y-2">
                <div className="text-2xl font-bold">H1: 主标题 (32px)</div>
                <div className="text-xl font-bold">H2: 副标题 (24px)</div>
                <div className="text-lg font-bold">H3: 小标题 (18px)</div>
              </div>
            </div>
          </div>
        </div>

        {/* 代码显示 */}
        <div className="mt-10 bg-gray-800/80 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg">
          <h2 className="text-2xl font-bold mb-4 glow-text-sm">代码显示</h2>
          <div className="bg-gray-900 rounded-md p-4 font-mono text-sm">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-500">xss-detection.js</span>
              <div className="flex space-x-1">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="text-gray-300 overflow-auto">
              <code>
{`function detectXSS(input) {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript\s*:/gi,
    /onerror\s*=/gi,
    /onclick\s*=/gi
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(input));
}

// 使用示例
const userInput = document.getElementById('comment').value;
if (detectXSS(userInput)) {
  console.warn('检测到潜在的XSS攻击');
  alert('请移除可能包含的恶意代码');
} else {
  submitComment(userInput);
}`}
              </code>
            </pre>
          </div>
        </div>

        {/* 最新文章 */}
        <div className="mt-16 mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center glow-text-sm">最新文章</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map(post => (
              <div key={post.id} className="bg-gray-800/80 backdrop-blur-md rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
                <div className="relative h-48">
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 z-10"></div>
                  <div className="absolute top-3 right-3 bg-blue-600 text-xs text-white px-2 py-1 rounded z-20">
                    {post.category}
                  </div>
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    className="object-cover"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-5 flex-grow">
                  <h3 className="text-xl font-bold mb-2">{post.title}</h3>
                  <p className="text-gray-300 mb-4 text-sm">{post.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map(tag => (
                      <span key={tag} className="bg-gray-700 text-blue-300 text-xs px-2 py-1 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-5 pt-0 mt-auto">
                  <div className="flex justify-between items-center text-sm text-gray-400 mb-3">
                    <span>{post.author}</span>
                    <span>{post.date}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full">
                    阅读全文
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 