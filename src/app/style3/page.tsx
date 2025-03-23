"use client"

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from "@/components/ui/button";
import SafeVulnerabilityDemo from "@/components/SafeVulnerabilityDemo";
import SafeBiometricAuthDemo from "@/components/SafeBiometricAuthDemo";
import SafeNetworkTopology from "@/components/SafeNetworkTopology";
import SafeCTFChallenge from "@/components/SafeCTFChallenge";
import SafePentestTerminal from "@/components/SafePentestTerminal";
import SafeAISecurityAssistant from "@/components/SafeAISecurityAssistant";
import SafeDigitalForensicsLab from "@/components/SafeDigitalForensicsLab";
import { useState, useEffect } from "react";
import { 
  ChevronRight, Shield, Code, Monitor, Eye, Cpu, Lock, User, Database, ArrowUp, Sun, Moon, Zap, Search, X, Menu, Filter,
  Bug, Wifi, Award, Terminal, Brain, FileDigit, ArrowRight, Circle
} from "lucide-react";
import ClientOnly from "@/components/ClientOnly";

// 博客文章数据
const blogPosts = [
  {
    id: 1,
    title: "XSS漏洞分析与防御策略",
    description: "深入探讨跨站脚本攻击的原理与现代防御技术",
    date: "2023-04-15",
    author: "ChryssolionChen",
    coverImage: "/images/1.jpg",
    category: "Web安全",
    tags: ["XSS", "Web安全", "防御策略"]
  },
  {
    id: 2,
    title: "构建安全的CI/CD流水线",
    description: "如何在DevOps流程中集成安全实践，实现安全与效率的平衡",
    date: "2023-05-22",
    author: "ChryssolionChen",
    coverImage: "/images/2.jpg",
    category: "DevSecOps",
    tags: ["CI/CD", "DevSecOps", "流水线安全"]
  },
  {
    id: 3,
    title: "零信任架构实施指南",
    description: "从传统安全模型迁移到零信任架构的实践经验分享",
    date: "2023-06-10",
    author: "ChryssolionChen",
    coverImage: "/images/3.jpg", 
    category: "网络安全",
    tags: ["零信任", "安全架构", "最佳实践"]
  }
];

/**
 * 安全工具分类
 * 将各种安全工具按功能和用途进行分组展示
 */
const securityTools = [
  {
    id: 'defense',
    title: '防御工具',
    description: '提升系统安全性的工具与技术',
    icon: <Shield className="w-6 h-6 text-blue-400" />,
    color: 'blue'
  },
  {
    id: 'analysis',
    title: '分析工具',
    description: '安全数据收集与分析平台',
    icon: <Database className="w-6 h-6 text-purple-400" />,
    color: 'purple'
  },
  {
    id: 'training',
    title: '学习平台',
    description: '安全技能提升与知识学习',
    icon: <Cpu className="w-6 h-6 text-green-400" />,
    color: 'green'
  }
];

/**
 * 自定义布局组件
 * 提供不包含Footer的布局，用于安全小窝页面
 */
const CustomLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <div className="flex flex-col flex-1 transition-all duration-300 main-content">
        <main className="flex-1 px-4 md:px-8 pb-4 md:pb-8 transition-all">
          {children}
        </main>
        {/* 页面底部的版权信息，替代了完整的Footer */}
        <div className="text-center py-4 text-gray-400 text-sm">
          小臣 (Blog) © {new Date().getFullYear()} - Chryssolion Chen
        </div>
      </div>
    </div>
  );
};

/**
 * 安全小窝主页组件
 * 提供生物识别登录和安全工具展示功能
 */
export default function Style3Blog() {
  // 添加客户端渲染检查
  const [isClient, setIsClient] = useState(false);
  
  // 添加认证状态管理
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // 添加活跃工具类别状态
  const [activeToolCategory, setActiveToolCategory] = useState('all');
  // 添加页面滚动位置
  const [scrollPosition, setScrollPosition] = useState(0);
  // 添加暗色模式状态
  const [darkMode, setDarkMode] = useState(true);
  // 添加工具栏状态
  const [showFloatingTools, setShowFloatingTools] = useState(false);
  // 添加移动端菜单显示状态
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 添加搜索栏状态
  const [searchOpen, setSearchOpen] = useState(false);
  // 添加当前活跃区域
  const [activeSection, setActiveSection] = useState('hero');
  // 添加工具提示状态
  const [toolTip, setToolTip] = useState({ show: false, text: '', x: 0, y: 0 });
  // 添加搜索查询状态
  const [searchQuery, setSearchQuery] = useState('');
  // 添加加载状态
  const [loading, setLoading] = useState(true);
  
  // 处理认证成功回调
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };
  
  // 设置客户端渲染标志
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // 使用ClientOnly包装window操作
  const useWindowScrollEffect = () => {
    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      const handleScroll = () => {
        const position = window.scrollY;
        setScrollPosition(position);
        
        // 根据滚动位置显示/隐藏工具栏
        if (position > 300 && !showFloatingTools) {
          setShowFloatingTools(true);
        } else if (position <= 300 && showFloatingTools) {
          setShowFloatingTools(false);
        }
        
        // 根据滚动位置判断当前活跃区域
        const sections = [
          { id: 'hero', position: 0 },
          { id: 'tools', position: window.innerHeight * 0.9 },
          { id: 'articles', position: document.body.scrollHeight - window.innerHeight * 1.5 }
        ];
        
        for (let i = sections.length - 1; i >= 0; i--) {
          if (position >= sections[i].position) {
            setActiveSection(sections[i].id);
            break;
          }
        }
      };
      
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, [showFloatingTools]);
  };
  
  // 使用ClientOnly包装DOM操作
  const useHideFooterEffect = () => {
    useEffect(() => {
      if (typeof window === 'undefined') return;
      
      // 找到并隐藏父级布局中的Footer
      const footer = document.querySelector('footer');
      if (footer) {
        footer.style.display = 'none';
      }
      
      // 组件卸载时恢复Footer
      return () => {
        const footer = document.querySelector('footer');
        if (footer) {
          footer.style.display = 'block';
        }
      };
    }, []);
  };
  
  // 平滑滚动到特定区域 - 客户端安全
  const scrollToSectionSafe = (sectionId: string) => {
    if (typeof window === 'undefined') return;
    
    let scrollPosition = 0;
    
    switch (sectionId) {
      case 'hero':
        scrollPosition = 0;
        break;
      case 'tools':
        scrollPosition = window.innerHeight;
        break;
      case 'articles':
        const articlesSection = document.querySelector('.articles-section');
        if (articlesSection instanceof HTMLElement) {
          scrollPosition = articlesSection.offsetTop - 80;
        }
        break;
      default:
        scrollPosition = 0;
    }
    
    window.scrollTo({
      top: scrollPosition,
      behavior: 'smooth'
    });
    
    // 如果移动菜单打开，则关闭
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };
  
  // 客户端浏览器加载状态
  useEffect(() => {
    // 在客户端执行时，设置loading为false
    if (typeof window !== 'undefined') {
      setLoading(false);
    }
  }, []);
  
  // 服务器端渲染时的加载状态
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600">加载中...</p>
      </div>
    );
  }
  
  // 认证检查
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white flex items-center justify-center">
        {/* 半透明代码背景图案 */}
        <div className="absolute inset-0 code-pattern opacity-20 z-0"></div>
        
        <div className="max-w-2xl w-full mx-auto px-4 relative z-10">
          {/* 动态背景元素 */}
          <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-[-30px] right-[-20px] w-72 h-72 bg-purple-500/10 rounded-full blur-3xl"></div>
          
          <div className="bg-black/20 backdrop-blur-xl p-10 rounded-2xl border border-gray-800/80 shadow-2xl animate-fade-in-up">
            <h1 className="text-center text-4xl md:text-5xl font-bold mb-8 text-white">
              <span className="text-blue-400 glow-text-blue">安全小窝</span> 登录
            </h1>
            <p className="text-center text-gray-300 mb-8">
              需要进行生物识别验证才能访问 Chryssolion Chen 安全小窝
            </p>
            <div className="mb-4">
              <SafeBiometricAuthDemo onAuthSuccess={handleAuthSuccess} />
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // 使用ClientOnly包装器激活客户端效果
  const ClientSideEffects = () => {
    useWindowScrollEffect();
    useHideFooterEffect();
    return null;
  }
  
  // 认证成功后展示页面内容
  return (
    <CustomLayout>
      <ClientOnly>
        <ClientSideEffects />
      </ClientOnly>
      
      <div className={`min-h-screen transition-colors duration-500 text-white overflow-hidden ${darkMode ? 'bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900' : 'bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200 text-gray-800'}`}>
        {/* 半透明代码背景图案 */}
        <div className={`absolute inset-0 code-pattern z-0 ${darkMode ? 'opacity-20' : 'opacity-10'}`}></div>
        
        {/* 动态背景元素 */}
        <div className="absolute top-[20%] left-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-[40%] right-[10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[10%] left-[30%] w-[400px] h-[400px] bg-green-500/5 rounded-full blur-3xl"></div>
        
        {/* 浮动工具栏 */}
        <ClientOnly>
          <div className={`fixed bottom-8 right-8 z-50 transition-all duration-500 ${showFloatingTools ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
            <div className="flex flex-col items-center gap-3">
              {/* 主工具按钮 */}
              <button 
                className="w-12 h-12 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg shadow-blue-900/30 hover:bg-blue-500 transition-all border border-blue-400/30 backdrop-blur-md"
                onClick={() => scrollToSectionSafe('hero')}
                onMouseEnter={() => setToolTip({ show: true, text: '返回顶部', x: -70, y: 0 })}
                onMouseLeave={() => setToolTip({ show: false, text: '', x: 0, y: 0 })}
              >
                <ArrowUp className="w-5 h-5" />
              </button>
              
              {/* 暗色/亮色模式切换 */}
              <button 
                className={`w-10 h-10 rounded-full ${darkMode ? 'bg-gray-800 text-yellow-400' : 'bg-slate-100 text-blue-800'} flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-gray-700/30 backdrop-blur-md`}
                onClick={() => setDarkMode(!darkMode)}
                onMouseEnter={() => setToolTip({ show: true, text: darkMode ? '切换亮色模式' : '切换暗色模式', x: -90, y: 0 })}
                onMouseLeave={() => setToolTip({ show: false, text: '', x: 0, y: 0 })}
              >
                {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
              
              {/* 快速工具筛选 */}
              <button 
                className="w-10 h-10 rounded-full bg-purple-700/80 text-white flex items-center justify-center shadow-lg hover:scale-110 transition-all border border-purple-400/30 backdrop-blur-md"
                onClick={() => setActiveToolCategory(activeToolCategory === 'all' ? 'defense' : 'all')}
                onMouseEnter={() => setToolTip({ show: true, text: '工具筛选', x: -70, y: 0 })}
                onMouseLeave={() => setToolTip({ show: false, text: '', x: 0, y: 0 })}
              >
                <Filter className="w-4 h-4" />
              </button>
              
              {/* 工具提示 */}
              {toolTip.show && (
                <div 
                  className="absolute right-12 bg-black/80 text-white text-xs py-1 px-2 rounded pointer-events-none backdrop-blur-md animate-fade-in whitespace-nowrap"
                  style={{ transform: `translate(${toolTip.x}px, ${toolTip.y}px)` }}
                >
                  {toolTip.text}
                </div>
              )}
            </div>
          </div>
        </ClientOnly>
        
        <div className="relative z-10">
          {/* 英雄区 - 页面头部展示区域 */}
          <div id="hero-section" className="h-screen flex items-center justify-center relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[700px] h-[700px]">
                <div className={`absolute inset-0 bg-gradient-to-r ${darkMode ? 'from-blue-500/20 to-purple-500/20' : 'from-blue-600/20 to-purple-600/20'} rounded-full animate-pulse-slow blur-xl`}></div>
                {/* 圆环效果 */}
                <div className={`absolute inset-0 border-4 ${darkMode ? 'border-blue-500/20' : 'border-blue-600/20'} rounded-full animate-spin-slow`}></div>
                <div className={`absolute inset-[40px] border-2 border-dashed ${darkMode ? 'border-purple-500/30' : 'border-purple-600/40'} rounded-full animate-spin-reverse-slow`}></div>
                <div className={`absolute inset-[80px] border ${darkMode ? 'border-green-500/20' : 'border-green-600/30'} rounded-full animate-pulse-slow`}></div>
              </div>
            </div>
            
            <div className="container mx-auto px-4 z-10">
              <div className="max-w-4xl mx-auto text-center">
                <div className="relative mb-6">
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight glow-text-strong animate-float">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${darkMode ? 'from-blue-400 via-purple-400 to-blue-400' : 'from-blue-600 via-purple-600 to-blue-600'}`}>
                      Chryssolion Chen
                    </span>
                  </h1>
                  <div className="absolute -right-12 top-0 text-blue-400 rotate-12 text-xs font-mono">
                    <span className="opacity-70">v2.1.0</span>
                  </div>
                </div>
                
                <h2 className={`text-3xl md:text-4xl font-bold mb-8 glow-text ${darkMode ? '' : 'text-gray-800'}`}>
                  安全<span className={darkMode ? "text-blue-400" : "text-blue-600"}>小窝</span>
                </h2>
                <p className={`text-xl ${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-10 max-w-2xl mx-auto`}>
                  探索网络安全的未知领域，分享技术与思考，构建更安全的数字世界
                </p>
                
                <div className="flex flex-wrap gap-4 justify-center mb-10 fade-in-up">
                  <Button 
                    variant="default" 
                    size="lg" 
                    className={`px-8 py-6 ${darkMode 
                      ? 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 border border-blue-400/20' 
                      : 'bg-gradient-to-r from-blue-700 to-blue-600 hover:from-blue-600 hover:to-blue-500 border border-blue-500/20'} shadow-lg shadow-blue-900/20 animate-float-delay-1`}
                    onClick={() => scrollToSectionSafe('tools')}
                  >
                    <Shield className="mr-2 h-5 w-5" /> 安全工具
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className={`px-8 py-6 ${darkMode 
                      ? 'border-gray-700 bg-black/20 backdrop-blur-md hover:bg-black/40 hover:border-gray-600' 
                      : 'border-gray-300 bg-white/40 text-gray-800 backdrop-blur-md hover:bg-white/60 hover:border-gray-400'} animate-float-delay-2`}
                  >
                    <User className="mr-2 h-5 w-5" /> 关于我
                  </Button>
                  <Button 
                    variant={darkMode ? "destructive" : "secondary"} 
                    size="lg"
                    onClick={() => setIsAuthenticated(false)}
                    className="px-8 py-6 animate-float-delay-3"
                  >
                    <Lock className="mr-2 h-5 w-5" /> 登出
                  </Button>
                </div>

                <div className="relative mt-8">
                  <div className="absolute left-1/2 transform -translate-x-1/2 h-16 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent opacity-60"></div>
                </div>

                <div className="mt-4 animate-bounce">
                  <button 
                    className={`${darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}
                    onClick={() => scrollToSectionSafe('tools')}
                  >
                    <ChevronRight className="w-10 h-10 transform rotate-90" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          <ClientOnly>
            {/* 固定导航栏 - 在滚动时显示 */}
            <div className={`fixed top-0 left-0 right-0 ${darkMode ? 'bg-black/80' : 'bg-white/80'} backdrop-blur-lg z-50 transition-all duration-500 ${scrollPosition > 100 ? 'translate-y-0 opacity-100' : 'translate-y-[-100%] opacity-0'}`}>
              <div className="container mx-auto px-4 py-3 flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`text-xl font-bold ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-4`}>安全小窝</span>
                  <div className="hidden md:flex space-x-4">
                    <button 
                      className={`px-3 py-1 rounded-full ${activeToolCategory === 'all' 
                        ? darkMode ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-500/30 text-blue-700' 
                        : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`} 
                      onClick={() => setActiveToolCategory('all')}
                    >
                      所有工具
                    </button>
                    {securityTools.map(category => (
                      <button 
                        key={category.id}
                        className={`px-3 py-1 rounded-full ${activeToolCategory === category.id 
                          ? darkMode ? `bg-${category.color}-500/20 text-${category.color}-400` : `bg-${category.color}-500/30 text-${category.color}-700`
                          : darkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'}`}
                        onClick={() => setActiveToolCategory(category.id)}
                      >
                        {category.title}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  {/* 搜索按钮 */}
                  <button
                    className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
                    onClick={() => setSearchOpen(!searchOpen)}
                  >
                    {searchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
                  </button>
                  
                  {/* 暗色模式切换 */}
                  <button 
                    className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
                    onClick={() => setDarkMode(!darkMode)}
                  >
                    {darkMode ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5 text-blue-800" />}
                  </button>
                  
                  {/* 移动端菜单按钮 */}
                  <button 
                    className={`md:hidden p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-colors`}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  >
                    {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                  </button>
                  
                  <Button 
                    variant={darkMode ? "destructive" : "secondary"} 
                    size="sm"
                    onClick={() => setIsAuthenticated(false)}
                    className="px-4 hidden md:flex"
                  >
                    <Lock className="mr-2 h-4 w-4" /> 登出
                  </Button>
                </div>
              </div>
            </div>
          </ClientOnly>
          
          <div id="tools-section" className="max-w-7xl mx-auto px-4 pt-20 pb-20">
            {/* 安全工具导航和分类 */}
            <div className="mb-16 animate-fade-in">
              <h2 className={`text-3xl font-bold mb-8 inline-block ${darkMode ? 'glow-text-blue' : ''}`}>
                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-blue-400 to-purple-400' : 'from-blue-600 to-purple-600'}`}>安全工具集</span>
              </h2>
              <div className="flex flex-wrap gap-4 mb-10">
                <button 
                  className={`px-4 py-2 rounded-full transition-all ${
                    activeToolCategory === 'all' 
                      ? darkMode 
                        ? 'bg-gray-800 text-white border border-gray-700' 
                        : 'bg-gray-200 text-gray-800 border border-gray-300'
                      : darkMode
                        ? 'text-gray-400 hover:text-white'
                        : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveToolCategory('all')}
                >
                  所有工具
                </button>
                {securityTools.map(category => (
                  <button 
                    key={category.id}
                    className={`px-4 py-2 rounded-full flex items-center transition-all ${
                      activeToolCategory === category.id 
                        ? darkMode
                          ? `bg-${category.color}-900/30 text-${category.color}-400 border border-${category.color}-700/50` 
                          : `bg-${category.color}-100 text-${category.color}-700 border border-${category.color}-300/50`
                        : darkMode
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                    onClick={() => setActiveToolCategory(category.id)}
                  >
                    {category.icon}
                    <span className="ml-2">{category.title}</span>
                  </button>
                ))}
              </div>
            </div>
          
            {/* 安全工具展示区 - 使用网格布局 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* 左栏 */}
              <div className="space-y-8">
                {/* 网络拓扑分析 - 交互式网络结构可视化工具 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'analysis' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 shadow-lg backdrop-blur-sm group">
                    {/* 背景装饰 */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Monitor className="w-6 h-6 text-blue-400 mr-3" />
                        <h2 className="text-2xl font-bold text-blue-300 glow-text-blue">网络拓扑分析</h2>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        通过交互式网络拓扑分析工具，可视化网络架构和潜在的攻击路径。此工具帮助安全分析师识别网络中的关键节点和可能的漏洞点。
                      </p>
                      <div className="h-[350px] bg-black/30 rounded-lg mb-4 overflow-hidden border border-blue-700/20">
                        <SafeNetworkTopology />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 漏洞演示组件 - 展示常见Web安全漏洞 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'training' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/30 to-red-800/10 border border-red-700/30 shadow-lg backdrop-blur-sm">
                    {/* 背景装饰 */}
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Code className="w-6 h-6 text-red-400 mr-3" />
                        <h2 className="text-2xl font-bold text-red-300 glow-text-red">漏洞演示平台</h2>
                      </div>
                      <p className="text-gray-300 mb-4">
                        交互式漏洞演示环境，展示并讲解常见Web安全漏洞的攻击原理与防御方法。帮助开发者理解如何构建更安全的应用。
                      </p>
                      <div className="bg-black/30 rounded-lg overflow-hidden border border-red-700/20">
                        <SafeVulnerabilityDemo />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* 数字取证实验室 - 交互式数字取证模拟环境 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'analysis' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/30 to-blue-800/10 border border-blue-700/30 shadow-lg backdrop-blur-sm group hover:shadow-blue-900/20">
                    {/* 背景装饰 */}
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Database className="w-6 h-6 text-blue-400 mr-3" />
                        <h2 className="text-2xl font-bold text-blue-300 glow-text-blue">数字取证实验室</h2>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        探索数字取证的奥秘，发现被隐藏的证据。通过分析数字媒体、恢复删除的文件、查看元数据和解密隐写内容，提升您的取证技能。实验室提供不同难度的挑战，帮助您掌握专业的数字取证技术。
                      </p>
                      <div className="bg-black/30 rounded-lg overflow-hidden border border-blue-700/20">
                        <SafeDigitalForensicsLab />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 右栏 */}
              <div className="space-y-8">
                {/* 生物识别验证组件 - 展示指纹和面部识别安全技术 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'defense' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 shadow-lg backdrop-blur-sm">
                    {/* 背景装饰 */}
                    <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Eye className="w-6 h-6 text-purple-400 mr-3" />
                        <h2 className="text-2xl font-bold text-purple-300 glow-text-purple">生物识别验证</h2>
                      </div>
                      <p className="text-gray-300 mb-4">
                        体验现代生物识别技术在安全验证中的应用。通过指纹和面部识别等多种生物特征，实现更安全的身份验证方式。
                      </p>
                      <div className="bg-black/30 rounded-lg overflow-hidden border border-purple-700/20">
                        <SafeBiometricAuthDemo onAuthSuccess={handleAuthSuccess} />
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* CTF挑战区 - 安全技能挑战与练习 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'training' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/30 to-purple-800/10 border border-purple-700/30 shadow-lg backdrop-blur-sm group hover:shadow-purple-900/20">
                    {/* 背景装饰 */}
                    <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Shield className="w-6 h-6 text-purple-400 mr-3" />
                        <h2 className="text-2xl font-bold text-purple-300 glow-text-purple">CTF挑战区</h2>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        挑战自我，提升安全技能。在这里，您可以尝试解决各种网络安全挑战，包括密码破解、隐写术、Web漏洞利用等。每个挑战都模拟了真实世界中的安全场景。
                      </p>
                      <div className="bg-black/30 rounded-lg overflow-hidden border border-purple-700/20">
                        <SafeCTFChallenge />
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI安全助手 - 智能安全咨询与学习 */}
                <div className={`transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'defense' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
                  <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/30 to-cyan-800/10 border border-cyan-700/30 shadow-lg backdrop-blur-sm group hover:shadow-cyan-900/20">
                    {/* 背景装饰 */}
                    <div className="absolute -left-20 -top-20 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl"></div>
                    
                    <div className="p-6">
                      <div className="flex items-center mb-4">
                        <Cpu className="w-6 h-6 text-cyan-400 mr-3" />
                        <h2 className="text-2xl font-bold text-cyan-300 glow-text-cyan">AI安全助手</h2>
                      </div>
                      <p className="text-gray-300 mb-4 line-clamp-2 group-hover:line-clamp-none transition-all duration-300">
                        您的专属网络安全智能顾问。无论您有什么安全问题，从基础概念到高级防御策略，AI助手都能提供专业解答，帮助您更好地理解网络安全知识，提高安全意识。
                      </p>
                      <div className="h-[350px] bg-black/30 rounded-lg overflow-hidden border border-cyan-700/20">
                        <SafeAISecurityAssistant />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 渗透测试模拟终端 - 交互式安全工具演示（全宽度组件） */}
            <div className={`mt-8 transform transition-all duration-500 ${activeToolCategory !== 'all' && activeToolCategory !== 'analysis' ? 'opacity-50 scale-95' : 'opacity-100 scale-100'}`}>
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/30 to-green-800/10 border border-green-700/30 shadow-lg backdrop-blur-sm">
                {/* 背景装饰 */}
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-green-500/10 rounded-full blur-3xl"></div>
                
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <Monitor className="w-6 h-6 text-green-400 mr-3" />
                    <h2 className="text-2xl font-bold text-green-300 glow-text-green">渗透测试模拟终端</h2>
                  </div>
                  <p className="text-gray-300 mb-4 max-w-3xl">
                    交互式的渗透测试模拟终端，展示常见渗透测试工具的使用方法和输出结果。您可以尝试运行各种命令，如nmap扫描、Metasploit利用、SQL注入检测等，体验真实的网络安全评估流程。
                  </p>
                  <p className="text-sm text-gray-400 mb-4">
                    提示：点击终端区域激活，可尝试命令：<code className="bg-black/60 px-2 py-0.5 rounded text-green-400">tools</code>、<code className="bg-black/60 px-2 py-0.5 rounded text-green-400">nmap 192.168.1.100</code>、<code className="bg-black/60 px-2 py-0.5 rounded text-green-400">msfconsole</code> 等
                  </p>
                  <div className="bg-black/30 rounded-lg overflow-hidden border border-green-700/20">
                    <SafePentestTerminal />
                  </div>
                </div>
              </div>
            </div>

            {/* 最新安全文章区域 */}
            <section className="mt-16 mb-8 articles-section animate-fade-in">
              <h2 className="text-3xl font-bold mb-8 inline-block glow-text">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-400">最新安全文章</span>
              </h2>
              
              {/* 卡片样式优化 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* 文章1：XSS漏洞分析 */}
                <Link href="/posts/web-security-new" className="group">
                  <div className="relative bg-gray-900/60 hover:bg-gray-800/80 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-blue-900/20 hover:border-blue-700/30 hover:translate-y-[-4px]">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src="/images/1.jpg"
                        alt="XSS漏洞分析"
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="bg-blue-500/20 text-blue-400 text-xs px-2 py-1 rounded-full w-fit mb-3">Web安全</div>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-blue-400 transition-colors">XSS漏洞分析与防御策略</h3>
                      <p className="text-gray-400 text-sm flex-1">深入探讨跨站脚本攻击的类型、危害以及有效的防御技术，包含实际案例与代码示例。</p>
                      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                        <span>2023-04-15</span>
                        <span className="text-blue-400 group-hover:translate-x-1 transition-transform duration-300">阅读全文 →</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 文章2：CI/CD安全 */}
                <Link href="/posts/devsecops" className="group">
                  <div className="relative bg-gray-900/60 hover:bg-gray-800/80 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-purple-900/20 hover:border-purple-700/30 hover:translate-y-[-4px]">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src="/images/2.jpg"
                        alt="CI/CD安全"
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="bg-purple-500/20 text-purple-400 text-xs px-2 py-1 rounded-full w-fit mb-3">DevSecOps</div>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-purple-400 transition-colors">构建安全的CI/CD流水线</h3>
                      <p className="text-gray-400 text-sm flex-1">探索如何将安全实践集成到DevOps流程中，打造更安全的持续集成和持续部署流程。</p>
                      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                        <span>2023-05-22</span>
                        <span className="text-purple-400 group-hover:translate-x-1 transition-transform duration-300">阅读全文 →</span>
                      </div>
                    </div>
                  </div>
                </Link>

                {/* 文章3：零信任架构 */}
                <Link href="/posts/zero-trust" className="group">
                  <div className="relative bg-gray-900/60 hover:bg-gray-800/80 rounded-xl overflow-hidden border border-gray-800 transition-all duration-300 h-full flex flex-col shadow-lg hover:shadow-green-900/20 hover:border-green-700/30 hover:translate-y-[-4px]">
                    <div className="relative w-full h-48 overflow-hidden">
                      <Image
                        src="/images/3.jpg"
                        alt="零信任架构"
                        fill
                        className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70"></div>
                    </div>
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded-full w-fit mb-3">网络安全</div>
                      <h3 className="text-lg font-semibold mb-3 group-hover:text-green-400 transition-colors">零信任架构实施指南</h3>
                      <p className="text-gray-400 text-sm flex-1">从传统安全模型迁移到零信任架构的实践经验，包括核心原则、技术选型与落地案例。</p>
                      <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                        <span>2023-06-10</span>
                        <span className="text-green-400 group-hover:translate-x-1 transition-transform duration-300">阅读全文 →</span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>
          </div>
        </div>
      </div>
      
      {/* 全局样式定义 */}
      <style jsx global>{`
        /* 文本发光效果 */
        .glow-text {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5);
        }
        
        /* 增强文本发光效果 */
        .glow-text-strong {
          text-shadow: 0 0 15px rgba(59, 130, 246, 0.7), 0 0 30px rgba(59, 130, 246, 0.4);
        }
        
        /* 较小的文本发光效果 */
        .glow-text-sm {
          text-shadow: 0 0 5px rgba(59, 130, 246, 0.5);
        }
        
        /* 蓝色文本发光效果 */
        .glow-text-blue {
          text-shadow: 0 0 8px rgba(59, 130, 246, 0.6);
        }
        
        /* 琥珀色文本发光效果 */
        .glow-text-amber {
          text-shadow: 0 0 8px rgba(245, 158, 11, 0.6);
        }
        
        /* 绿色文本发光效果 */
        .glow-text-green {
          text-shadow: 0 0 8px rgba(34, 197, 94, 0.6);
        }
        
        /* 红色文本发光效果 */
        .glow-text-red {
          text-shadow: 0 0 8px rgba(239, 68, 68, 0.6);
        }
        
        /* 青色文本发光效果 */
        .glow-text-cyan {
          text-shadow: 0 0 8px rgba(34, 211, 238, 0.6);
        }
        
        /* 紫色文本发光效果 */
        .glow-text-purple {
          text-shadow: 0 0 8px rgba(192, 132, 252, 0.6);
        }
        
        /* 代码模式背景 */
        .code-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%232563EB' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        /* 自定义动画 */
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }
        
        @keyframes spin-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse-slow {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(-360deg);
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }
        
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 10s infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 30s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 40s linear infinite;
        }
        
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
        
        .animate-float-delay-1 {
          animation: float 5s ease-in-out 0.1s infinite;
        }
        
        .animate-float-delay-2 {
          animation: float 5s ease-in-out 0.2s infinite;
        }
        
        .animate-float-delay-3 {
          animation: float 5s ease-in-out 0.3s infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }
      `}</style>
    </CustomLayout>
  );
} 