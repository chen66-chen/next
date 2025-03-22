"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import CommentList from '@/components/CommentList';
import CommentForm from '@/components/CommentForm';
import { Suspense } from 'react';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import 'highlight.js/styles/atom-one-dark.css';
import AIAssistant from '@/components/AIAssistant';
import dynamic from 'next/dynamic';
import { CalligraphyTitle, MixedTextRenderer, HtmlContentProcessor } from '@/components/Typography';
import FeedbackProcessor from '@/components/Feedback/FeedbackProcessor';

// 动态导入3D背景组件
const DynamicBackgroundWrapper = dynamic(
  () => import('@/components/DynamicBackground'),
  { ssr: false }
);

// 文章类型接口
interface Post {
  id: string;
  title: string;
  date: string;
  author: string;
  category: string;
  tags: string[];
  coverImage: string;
  excerpt?: string;
  content: string;
  style?: string;
  description?: string;
}

// 组件属性接口
interface PostClientProps {
  post: Post;
}

export function PostClient({ post }: PostClientProps) {
  // 记录阅读位置
  const [readingPosition, setReadingPosition] = React.useState(0);
  
  // 设置滚动事件监听，更新阅读位置
  React.useEffect(() => {
    const handleScroll = () => {
      setReadingPosition(window.scrollY);
    };

    // 添加Mac风格到所有代码块
    const applyMacStyleToCodeBlocks = () => {
      // 查找内容区域内的代码块
      const contentArea = document.querySelector('.prose, .feedback-processor, .HtmlContentProcessor');
      if (!contentArea) return;
      
      // 只处理内容区域内的代码块
      const preElements = contentArea.querySelectorAll('pre');
      preElements.forEach(pre => {
        // 确保有窗口控件
        if (!pre.querySelector('.window-controls')) {
          const windowControls = document.createElement('div');
          windowControls.className = 'window-controls';
          pre.insertBefore(windowControls, pre.firstChild);
        }

        // 设置语言标签
        const codeElement = pre.querySelector('code');
        if (codeElement && codeElement.className) {
          const match = /language-(\w+)/.exec(codeElement.className);
          if (match) {
            pre.setAttribute('data-language', match[1]);
          }
        }

        // 添加复制按钮
        if (!pre.querySelector('.code-copy-button')) {
          const copyButton = document.createElement('button');
          copyButton.className = 'code-copy-button';
          copyButton.textContent = '复制';
          copyButton.type = 'button';
          
          copyButton.addEventListener('click', () => {
            const code = pre.querySelector('code');
            if (code) {
              const codeText = code.textContent || '';
              navigator.clipboard.writeText(codeText)
                .then(() => {
                  copyButton.textContent = '已复制！';
                  setTimeout(() => {
                    copyButton.textContent = '复制';
                  }, 2000);
                })
                .catch(err => {
                  console.error('复制失败:', err);
                });
            }
          });
          
          pre.appendChild(copyButton);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    
    // 页面加载后应用Mac风格
    applyMacStyleToCodeBlocks();
    
    // 延迟重新应用样式，以确保动态加载的内容也得到处理
    const styleTimeout = setTimeout(() => {
      applyMacStyleToCodeBlocks();
    }, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(styleTimeout);
    };
  }, []);

  // 根据风格应用不同的样式
  let containerClass = "container mx-auto px-4 py-8";
  let titleClass = "text-3xl font-bold mb-4";
  let metaClass = "text-gray-500 mb-6";
  let contentClass = "prose max-w-none";

  // 添加彗星特效
  React.useEffect(() => {
    // 创建彗星元素的函数
    const createComet = (x: number, y: number) => {
      const comet = document.createElement('div');
      comet.className = 'absolute w-[150px] h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-cyan-300 opacity-0';
      comet.style.left = `${x}px`;
      comet.style.top = `${y}px`;
      comet.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // 添加彗星尾部
      const tail = document.createElement('div');
      tail.className = 'absolute -right-1 -top-1 w-[4px] h-[4px] rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]';
      comet.appendChild(tail);
      
      // 获取容器
      const container = document.getElementById('comet-container');
      if (container) {
        container.appendChild(comet);
        
        // 动画
        setTimeout(() => {
          comet.style.transition = 'all 0.4s ease-out';
          comet.style.opacity = '1';
          comet.style.transform += ' translateX(100px)';
          
          // 动画结束后移除
          setTimeout(() => {
            comet.style.opacity = '0';
            setTimeout(() => {
              if (container.contains(comet)) {
                container.removeChild(comet);
              }
            }, 400);
          }, 200);
        }, 10);
      }
    };
    
    // 监听鼠标移动
    const handleMouseMove = (e: MouseEvent) => {
      const contentBox = document.querySelector('.relative.p-6.bg-white') as HTMLElement;
      if (contentBox) {
        const rect = contentBox.getBoundingClientRect();
        
        // 判断鼠标是否在内容区域内
        if (
          e.clientX >= rect.left && 
          e.clientX <= rect.right && 
          e.clientY >= rect.top && 
          e.clientY <= rect.bottom
        ) {
          // 计算相对位置
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          
          // 随机决定是否创建彗星，减少生成频率
          if (Math.random() < 0.1) {
            createComet(x, y);
          }
        }
      }
    };
    
    // 添加事件监听
    document.addEventListener('mousemove', handleMouseMove);
    
    // 清理函数
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (post.style === 'style1') {
    containerClass += " font-['MiSans']";
    titleClass += " font-['KuaiKanShiJieTi'] text-site1-primary";
    contentClass += " prose-site1";
  } else if (post.style === 'style2') {
    containerClass += " font-['NotoSerifSC']";
    titleClass += " font-['NotoSerifSC'] text-site2-primary";
    metaClass += " text-site2-secondary";
    contentClass += " prose-site2";
  } else if (post.style === 'style3') {
    containerClass += " font-['HanTang']";
    titleClass += " font-['HanTang'] text-site3-light";
    metaClass += " text-site3-secondary";
    contentClass += " prose-site3";
  } else if (post.style === 'style4') {
    containerClass += " font-kuaikan";
    titleClass += " font-kuaikan text-site4-primary";
    metaClass += " text-site4-secondary";
    contentClass += " site4-container";
  } else if (post.style === 'style5') {
    containerClass += " font-noto";
    titleClass += " font-noto text-[#213b53]";
    metaClass += " text-[#7f6085]";
    contentClass += " prose prose-slate";
  }

  // 检测内容是否是Markdown格式
  const isMarkdown = post.content.trim().startsWith('#') || 
                     post.content.includes('```') || 
                     post.content.includes('##');

  return (
    <>
      {/* 3D动态背景，根据文章分类变化 */}
      <DynamicBackgroundWrapper category={post.category} />
      
      <div className="container mx-auto px-4 py-16 relative z-10">
        {/* 导航链接 */}
        <Link href="/" className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-6">
          <ChevronLeft className="mr-1" size={16} /> 返回首页
        </Link>
        
        {/* 文章内容 */}
        <div className="relative p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
          {/* 彗星特效容器 */}
          <div id="comet-container" className="absolute inset-0 overflow-hidden pointer-events-none z-0 rounded-xl"></div>
          
          {/* 文章头部 */}
          <div className="relative z-10">
            {/* 使用毛笔书法效果的标题 */}
            <CalligraphyTitle 
              text={post.title}
              className={titleClass}
              modernFont={
                post.style === 'style1' ? 'font-kuaikan text-site1-primary' :
                post.style === 'style2' ? 'font-noto text-site2-primary' :
                post.style === 'style3' ? 'font-kaiti text-site3-light' :
                post.style === 'style4' ? 'font-kuaikan text-site4-primary' :
                post.style === 'style5' ? 'font-noto text-[#213b53]' :
                'font-bold'
              }
              calligraphyFont={
                post.style === 'style1' ? 'font-songti text-site1-primary' :
                post.style === 'style2' ? 'font-kaiti text-site2-primary' :
                post.style === 'style3' ? 'font-kaiti text-site3-light' :
                post.style === 'style4' ? 'font-songti text-site4-primary' :
                post.style === 'style5' ? 'font-kaiti text-[#213b53]' :
                'font-kaiti'
              }
            />
            
            <div className={metaClass}>
              <span className="mr-4">{post.date}</span>
              <span className="mr-4">作者: {post.author}</span>
              <span className="mr-4">分类: {post.category}</span>
              <div className="mt-2 flex flex-wrap">
                {post.tags && post.tags.map((tag, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 封面图 */}
            {post.coverImage && (
              <div className="w-full h-64 relative mb-6 rounded-lg overflow-hidden">
                <Image 
                  src={post.coverImage} 
                  alt={post.title} 
                  fill
                  style={{ objectFit: 'cover' }}
                  className="transition-transform duration-500 hover:scale-105"
                />
              </div>
            )}
            
            {/* 文章内容 */}
            <div className={contentClass}>
              {/* 根据内容类型选择不同的渲染器 - 同时保留反馈系统功能 */}
              <FeedbackProcessor
                articleId={post.id}
                content={post.content}
                showHeatmap={true}
              />
            </div>
            
            {/* 评论区 */}
            <div className="mt-12 border-t pt-8">
              <h3 className="text-xl font-bold mb-6">评论</h3>
              <Suspense fallback={<div>加载评论中...</div>}>
                <CommentList postId={post.id} postSlug={post.id} />
              </Suspense>
              <div className="mt-8">
                <CommentForm postId={post.id} postSlug={post.id} onCommentAdded="refresh" />
              </div>
            </div>
          </div>
        </div>
        
        {/* AI助手 */}
        <div className="fixed bottom-6 right-6 z-50">
          <AIAssistant content={post.content} currentReadingPosition={readingPosition} />
        </div>
      </div>
    </>
  );
}