"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Lightbulb, BookOpen, History, ChevronRight, ChevronDown } from 'lucide-react';

interface AIAssistantProps {
  content: string;
  currentReadingPosition?: number;
}

interface Concept {
  term: string;
  explanation: string;
}

interface ReadingPath {
  title: string;
  description: string;
  link: string;
}

// 添加一个新的接口，用于实际应用时处理关键词高亮
interface KeywordHighlightProps {
  content: string;
  keywords: Array<{term: string, explanation: string}>;
}

// 内部组件：自动高亮关键词的组件
const KeywordHighlighter: React.FC<KeywordHighlightProps> = ({ content, keywords }) => {
  // 如果没有关键词，直接返回原内容
  if (!keywords || keywords.length === 0) {
    return <>{content}</>;
  }
  
  // 构建正则表达式用于匹配所有关键词
  // 将关键词按长度降序排序，确保优先匹配更长的词语
  const sortedKeywords = [...keywords].sort((a, b) => b.term.length - a.term.length);
  const keywordPattern = new RegExp(`\\b(${sortedKeywords.map(k => k.term).join('|')})\\b`, 'g');
  
  // 分割内容并高亮关键词
  const parts = content.split(keywordPattern);
  
  return (
    <>
      {parts.map((part, index) => {
        // 如果是关键词，添加高亮效果
        const keyword = sortedKeywords.find(k => k.term === part);
        if (keyword) {
          return (
            <span 
              key={index} 
              className="bg-yellow-100 dark:bg-yellow-800/30 px-1 rounded cursor-help border-b border-dashed border-yellow-400"
              title={keyword.explanation}
            >
              {part}
            </span>
          );
        }
        // 否则直接返回文本
        return part;
      })}
    </>
  );
};

// 当AI助手面板关闭时，这个组件将用于在文章中渲染关键词高亮
export const ContentWithHighlights: React.FC<{ content: string, concepts: Concept[] }> = ({ content, concepts }) => {
  // 在实际应用中，我们可能需要根据内容类型（HTML或Markdown）来决定如何应用高亮
  // 这里简化处理，假设content是纯文本
  return <KeywordHighlighter content={content} keywords={concepts} />;
};

const AIAssistant: React.FC<AIAssistantProps> = ({ content, currentReadingPosition = 0 }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'insights' | 'concepts' | 'paths'>('insights');
  const [insights, setInsights] = useState<string[]>([]);
  const [keyConcepts, setKeyConcepts] = useState<Concept[]>([]);
  const [readingPaths, setReadingPaths] = useState<ReadingPath[]>([]);
  const [loadingInsights, setLoadingInsights] = useState(false);
  const [loadingConcepts, setLoadingConcepts] = useState(false);
  const [loadingPaths, setLoadingPaths] = useState(false);
  const [expandedConcepts, setExpandedConcepts] = useState<Set<number>>(new Set());
  
  const assistantRef = useRef<HTMLDivElement>(null);
  
  // 模拟AI生成见解的函数
  const generateInsights = async (content: string, position: number) => {
    setLoadingInsights(true);
    
    // 实际应用中，这里应该调用AI API来分析内容
    // 这里使用模拟数据
    await new Promise(resolve => setTimeout(resolve, 1500)); // 模拟API延迟
    
    // 基于内容生成洞见
    const contentSnippet = content.substring(
      Math.max(0, position - 500), 
      Math.min(content.length, position + 500)
    );
    
    // 简单的基于关键词的模拟见解生成
    const generatedInsights = [];
    
    if (contentSnippet.includes('Linux')) {
      generatedInsights.push("Linux是一个开源操作系统内核，由Linus Torvalds在1991年创建，是目前最广泛使用的服务器操作系统基础。");
    }
    
    if (contentSnippet.includes('文件系统')) {
      generatedInsights.push("Linux文件系统采用树状结构，'/'是根目录，所有其他目录和文件都是从这里延伸出来的。");
    }
    
    if (contentSnippet.includes('命令')) {
      generatedInsights.push("Linux命令行是与系统交互的强大方式，掌握基本命令如ls、cd和grep可显著提高工作效率。");
    }
    
    if (contentSnippet.includes('Shell')) {
      generatedInsights.push("Shell不仅是命令解释器，也是一种编程语言，通过Shell脚本可以自动化系统管理任务。");
    }
    
    if (contentSnippet.includes('权限')) {
      generatedInsights.push("Linux权限系统使用用户、组和其他类别的读(r)、写(w)、执行(x)权限组合保护文件安全。");
    }
    
    // 如果没有生成足够的见解，添加一些通用的见解
    if (generatedInsights.length < 2) {
      generatedInsights.push("当前段落讨论的概念是计算机科学中的基础知识，理解它有助于构建更深入的技术知识体系。");
      generatedInsights.push("尝试将这些知识应用到实际项目中，这样可以加深理解并巩固学习成果。");
    }
    
    setInsights(generatedInsights);
    setLoadingInsights(false);
  };
  
  // 模拟提取关键概念的函数
  const extractKeyConcepts = async (content: string) => {
    setLoadingConcepts(true);
    
    // 实际应用中，这里应该调用AI API来提取概念
    await new Promise(resolve => setTimeout(resolve, 1200)); // 模拟API延迟
    
    // 基于内容识别关键概念
    const concepts: Concept[] = [];
    
    if (content.includes('Linux')) {
      concepts.push({
        term: 'Linux',
        explanation: 'Linux是一个类UNIX的开源操作系统内核，由Linus Torvalds于1991年创建。它是自由软件和开源软件发展中最著名的例子之一，是目前世界上应用最广泛的服务器操作系统内核。'
      });
    }
    
    if (content.includes('Ext4')) {
      concepts.push({
        term: 'Ext4文件系统',
        explanation: 'Ext4是第四代扩展文件系统，是Linux系统中最常用的文件系统之一。它支持更大的单个文件和总文件系统大小，有更好的性能和可靠性特性，如日志功能、快速fsck，以及延迟分配等技术减少磁盘碎片。'
      });
    }
    
    if (content.includes('Shell')) {
      concepts.push({
        term: 'Shell',
        explanation: 'Shell是一个命令行解释器，提供了用户与操作系统内核交互的接口。它接收用户命令，然后调用相应程序执行。常见的Shell包括Bash、Zsh、Fish等。Shell也可以执行脚本文件，实现自动化操作。'
      });
    }
    
    if (content.includes('chmod')) {
      concepts.push({
        term: 'chmod命令',
        explanation: 'chmod是change mode的缩写，用于改变文件或目录的访问权限。在Linux系统中，每个文件都有三组权限设置：所有者权限、组权限和其他用户权限，每组包含读(r)、写(w)和执行(x)三种权限。'
      });
    }
    
    // 添加更多通用概念
    concepts.push({
      term: '文件系统层次结构标准(FHS)',
      explanation: 'FHS定义了Linux系统中主要目录的用途和内容类型，确保软件能够预测文件位置。例如，/bin用于存放基本命令，/etc存放系统配置文件，/home包含用户主目录等。'
    });
    
    concepts.push({
      term: '进程管理',
      explanation: '进程是Linux中运行程序的实例。Linux提供了多种工具管理进程，如ps显示当前进程，top实时监控系统资源使用，kill终止进程等。每个进程有唯一的PID(进程ID)用于标识。'
    });
    
    setKeyConcepts(concepts);
    setLoadingConcepts(false);
  };
  
  // 模拟生成阅读路径的函数
  const generateReadingPaths = async () => {
    setLoadingPaths(true);
    
    // 实际应用中，这里应该调用AI API来生成阅读路径
    await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟API延迟
    
    // 模拟基于用户阅读历史的推荐
    const paths: ReadingPath[] = [
      {
        title: "Linux文件系统详解",
        description: "深入理解Linux文件系统的结构、类型和管理方法",
        link: "/posts/linux-2"
      },
      {
        title: "Linux Shell脚本编程精通",
        description: "学习Shell脚本编程的核心概念和技巧",
        link: "/posts/linux-3"
      },
      {
        title: "Linux基础入门指南",
        description: "从零开始学习Linux的基本概念和命令",
        link: "/posts/linux-1"
      },
      {
        title: "网络安全基础教程",
        description: "了解网络安全基础知识，包括常见攻击方式和防御策略",
        link: "/posts/post10"
      }
    ];
    
    setReadingPaths(paths);
    setLoadingPaths(false);
  };
  
  // 当内容或阅读位置变化时，重新生成见解
  useEffect(() => {
    if (isOpen && activeTab === 'insights') {
      generateInsights(content, currentReadingPosition);
    }
  }, [content, currentReadingPosition, isOpen, activeTab]);
  
  // 当用户打开概念标签时，提取关键概念
  useEffect(() => {
    if (isOpen && activeTab === 'concepts' && keyConcepts.length === 0) {
      extractKeyConcepts(content);
    }
  }, [isOpen, activeTab, content, keyConcepts.length]);
  
  // 当用户打开阅读路径标签时，生成推荐
  useEffect(() => {
    if (isOpen && activeTab === 'paths' && readingPaths.length === 0) {
      generateReadingPaths();
    }
  }, [isOpen, activeTab, readingPaths.length]);
  
  // 处理概念展开/折叠
  const toggleConcept = (index: number) => {
    const newExpanded = new Set(expandedConcepts);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedConcepts(newExpanded);
  };
  
  // 点击外部关闭助手
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (assistantRef.current && !assistantRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="fixed bottom-4 right-4 z-50" ref={assistantRef}>
      {/* AI助手图标按钮 */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#21252b] hover:bg-[#1e2127] text-white shadow-lg transition-all duration-300 transform hover:scale-105 ai-assistant-button"
        title="AI阅读助手"
      >
        <Bot size={24} />
      </button>
      
      {/* AI助手面板 - Mac风格终端设计 */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[400px] bg-[#1e2127] text-white rounded-lg shadow-xl border border-gray-700 overflow-hidden transition-all duration-300">
          {/* 头部 - 类似Mac终端的标题栏 */}
          <div className="relative h-8 bg-[#21252b] flex items-center justify-center border-b border-gray-700">
            {/* 窗口控制按钮 */}
            <div className="absolute left-3 top-[10px] flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
              <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
              <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
            </div>
            
            <div className="text-sm text-gray-400 font-medium">AI阅读助手</div>
            
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute right-3 text-gray-400 hover:text-white"
            >
              <X size={16} />
            </button>
          </div>
          
          {/* 选项卡 - 命令行风格 */}
          <div className="flex border-b border-gray-700 bg-[#282c34]">
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center gap-1 text-sm ${
                activeTab === 'insights' 
                  ? 'text-[#ffbd2e] border-b border-[#ffbd2e] font-medium' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('insights')}
            >
              <Lightbulb size={14} />
              <span>见解</span>
            </button>
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center gap-1 text-sm ${
                activeTab === 'concepts' 
                  ? 'text-[#27c93f] border-b border-[#27c93f] font-medium' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('concepts')}
            >
              <BookOpen size={14} />
              <span>关键概念</span>
            </button>
            <button
              className={`flex-1 py-2 px-3 flex items-center justify-center gap-1 text-sm ${
                activeTab === 'paths' 
                  ? 'text-[#2ea8ff] border-b border-[#2ea8ff] font-medium' 
                  : 'text-gray-400 hover:text-gray-200'
              }`}
              onClick={() => setActiveTab('paths')}
            >
              <History size={14} />
              <span>阅读路径</span>
            </button>
          </div>
          
          {/* 内容区域 - 终端样式 */}
          <div className="max-h-[400px] overflow-y-auto p-4 font-mono text-sm">
            {/* 见解标签内容 */}
            {activeTab === 'insights' && (
              <div>
                <div className="text-[#ffbd2e] mb-3 flex items-center">
                  <span className="text-gray-400">$</span>
                  <span className="ml-2">insights --position {currentReadingPosition}</span>
                </div>
                
                {loadingInsights ? (
                  <div className="flex items-center h-32 text-gray-400">
                    <span className="animate-pulse">正在分析内容...</span>
                  </div>
                ) : insights.length > 0 ? (
                  <ul className="space-y-3">
                    {insights.map((insight, index) => (
                      <li key={index} className="border-l-2 border-[#ffbd2e] pl-3 py-1 text-gray-300">
                        {insight}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 py-4">
                    等待内容分析...
                  </p>
                )}
              </div>
            )}
            
            {/* 关键概念标签内容 */}
            {activeTab === 'concepts' && (
              <div>
                <div className="text-[#27c93f] mb-3 flex items-center">
                  <span className="text-gray-400">$</span>
                  <span className="ml-2">extract-concepts --from current-article</span>
                </div>
                
                {loadingConcepts ? (
                  <div className="flex items-center h-32 text-gray-400">
                    <span className="animate-pulse">提取关键概念中...</span>
                  </div>
                ) : keyConcepts.length > 0 ? (
                  <ul className="space-y-2">
                    {keyConcepts.map((concept, index) => (
                      <li key={index} className="bg-[#282c34] rounded overflow-hidden">
                        <button
                          onClick={() => toggleConcept(index)}
                          className="w-full px-3 py-2 flex justify-between items-center text-left"
                        >
                          <span className="text-[#27c93f]">{concept.term}</span>
                          {expandedConcepts.has(index) ? 
                            <span className="text-gray-400">▼</span> : 
                            <span className="text-gray-400">▶</span>}
                        </button>
                        
                        {expandedConcepts.has(index) && (
                          <div className="px-3 py-2 text-gray-300 bg-[#2d313a] border-t border-gray-700">
                            {concept.explanation}
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 py-4">
                    未找到关键概念
                  </p>
                )}
              </div>
            )}
            
            {/* 阅读路径标签内容 */}
            {activeTab === 'paths' && (
              <div>
                <div className="text-[#2ea8ff] mb-3 flex items-center">
                  <span className="text-gray-400">$</span>
                  <span className="ml-2">suggest-paths --based-on history</span>
                </div>
                
                {loadingPaths ? (
                  <div className="flex items-center h-32 text-gray-400">
                    <span className="animate-pulse">生成推荐阅读路径...</span>
                  </div>
                ) : readingPaths.length > 0 ? (
                  <ul className="space-y-3">
                    {readingPaths.map((path, index) => (
                      <li key={index}>
                        <a 
                          href={path.link}
                          className="block p-3 bg-[#282c34] border border-gray-700 rounded hover:bg-[#2d313a] transition-colors"
                        >
                          <h5 className="font-medium text-[#2ea8ff]">{path.title}</h5>
                          <p className="text-gray-400 mt-1">
                            {path.description}
                          </p>
                          <div className="text-xs text-gray-500 mt-2">
                            {"cd " + path.link}
                          </div>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500 py-4">
                    分析阅读历史中...
                  </p>
                )}
              </div>
            )}
          </div>
          
          {/* 底部 - 命令行提示符 */}
          <div className="bg-[#21252b] border-t border-gray-700 px-4 py-2 text-xs text-gray-500 flex items-center">
            <span className="text-[#ffbd2e]">ai-assistant</span>
            <span className="mx-1">:</span>
            <span className="text-[#2ea8ff]">~</span>
            <span className="ml-1">$</span>
            <span className="ml-2 animate-pulse">_</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAssistant; 