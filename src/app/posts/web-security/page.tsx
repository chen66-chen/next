﻿'use client';

import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * XSS漏洞分析与防御策略文章页面
 * 探讨跨站脚本攻击的类型、危害及防御方法
 */
export default function XSSArticlePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white pt-16 pb-20">
      {/* 页面内容容器 */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 返回按钮 */}
        <Link 
          href="/style3"
          className="inline-flex items-center text-sm text-blue-400 hover:text-blue-300 mb-8 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          返回安全小窝
        </Link>
        
        {/* 文章标题区 */}
        <div className="mb-12 border-b border-gray-700 pb-8">
          <h1 className="text-4xl font-bold mb-4 glow-text">XSS漏洞分析与防御策略</h1>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="bg-blue-500/20 text-blue-400 text-xs px-3 py-1 rounded-full">Web安全</div>
              <span className="mx-3 text-gray-500">·</span>
              <span className="text-gray-400 text-sm">2023-04-15</span>
            </div>
            <div className="text-gray-400 text-sm">作者: ChryssolionChen</div>
          </div>
        </div>
        
        {/* 文章主体 */}
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="relative w-full h-64 mb-8 rounded-lg overflow-hidden">
            <Image 
              src="/images/1.jpg" 
              alt="XSS漏洞" 
              fill
              className="object-cover"
              priority
            />
          </div>
          
          <h2>跨站脚本（XSS）攻击简介</h2>
          <p>
            跨站脚本攻击（Cross-Site Scripting，通常简称为XSS）是一种常见的Web应用程序安全漏洞，
            它允许攻击者将恶意脚本注入到受信任的网站中。当用户浏览受到XSS攻击的页面时，这些恶意脚本会在用户的浏览器中执行，
            攻击者可以通过这种方式窃取用户敏感信息、劫持用户会话或重定向用户到恶意网站。
          </p>
          
          <p>
            根据OWASP（开放式Web应用程序安全项目）的统计，XSS漏洞多年来一直是Web应用程序中最常见的安全漏洞之一，
            影响了从小型个人网站到大型企业应用的各类Web系统。
          </p>

          <blockquote>
            "XSS攻击之所以危险，是因为它利用了用户对网站的信任，将恶意代码伪装成来自可信来源的内容。"
          </blockquote>
          
          <h2>结论</h2>
          <p>
            跨站脚本（XSS）攻击仍然是Web应用程序面临的主要安全威胁之一。通过了解不同类型的XSS攻击及其工作原理，
            开发人员可以实施有效的防御措施，保护用户免受潜在的危害。
          </p>
          <p>
            防御XSS应采取多层防御策略，包括输入验证、输出编码、内容安全策略、使用现代框架的安全特性等。
            没有单一的解决方案可以完全消除XSS风险，而是需要综合应用多种技术和最佳实践。
          </p>
          <p>
            最后，要记住安全是一个持续的过程，而非一次性的任务。随着新的攻击技术不断出现，开发人员需要保持警惕，
            不断更新安全知识和实践，定期审计和测试应用程序，以确保它们能够抵御最新的XSS攻击。
          </p>
        </div>
      </div>
    </div>
  )
}
