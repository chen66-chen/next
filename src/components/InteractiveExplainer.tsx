"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

/**
 * 解释器类型枚举
 */
export enum ExplainerType {
  TEXT = 'text',
  IMAGE = 'image',
  ANIMATION = 'animation',
  INTERACTIVE = 'interactive'
}

/**
 * 解释内容接口
 */
interface ExplainerContent {
  type: ExplainerType;
  title?: string;
  text?: string;
  image?: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  animation?: string; // Lottie JSON 或 URL
  interactive?: React.ReactNode;
}

/**
 * 组件属性接口
 */
interface InteractiveExplainerProps {
  term: string;
  content: ExplainerContent;
  className?: string;
  termClassName?: string;
  showIcon?: boolean;
}

/**
 * 交互式概念解释组件
 * 
 * 该组件将专业术语或概念包裹在一个可交互的元素中，
 * 用户悬停时会显示解释内容，可以是文本、图片、动画或交互式元素
 * 
 * @param term 需要解释的术语
 * @param content 解释内容
 * @param className 容器样式类
 * @param termClassName 术语样式类
 * @param showIcon 是否显示信息图标
 */
const InteractiveExplainer: React.FC<InteractiveExplainerProps> = ({
  term,
  content,
  className = '',
  termClassName = '',
  showIcon = true
}) => {
  // 控制提示框显示状态
  const [isOpen, setIsOpen] = useState(false);
  // 引用术语元素和提示框
  const termRef = useRef<HTMLSpanElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  // 设置提示框位置
  const [position, setPosition] = useState({ top: 0, left: 0, direction: 'bottom' });

  // 处理鼠标进入
  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  // 处理鼠标离开
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  // 计算提示框位置
  useEffect(() => {
    if (isOpen && termRef.current && tooltipRef.current) {
      const termRect = termRef.current.getBoundingClientRect();
      const tooltipRect = tooltipRef.current.getBoundingClientRect();
      
      // 计算窗口边界
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // 默认显示方向和位置
      let direction = 'bottom';
      let top = termRect.bottom + window.scrollY;
      let left = termRect.left + window.scrollX + (termRect.width / 2) - (tooltipRect.width / 2);
      
      // 检查是否超出右边界
      if (left + tooltipRect.width > viewportWidth) {
        left = viewportWidth - tooltipRect.width - 10;
      }
      
      // 检查是否超出左边界
      if (left < 10) {
        left = 10;
      }
      
      // 检查底部是否有足够空间
      if (termRect.bottom + tooltipRect.height > viewportHeight && termRect.top > tooltipRect.height) {
        direction = 'top';
        top = termRect.top + window.scrollY - tooltipRect.height;
      }
      
      setPosition({ top, left, direction });
    }
  }, [isOpen]);

  // 渲染解释内容
  const renderContent = () => {
    switch (content.type) {
      case ExplainerType.TEXT:
        return (
          <div className="p-4">
            {content.title && <h4 className="font-bold mb-2">{content.title}</h4>}
            <p>{content.text}</p>
          </div>
        );
      
      case ExplainerType.IMAGE:
        return (
          <div className="p-4">
            {content.title && <h4 className="font-bold mb-2">{content.title}</h4>}
            {content.text && <p className="mb-2">{content.text}</p>}
            {content.image && (
              <div className="mt-2 rounded-md overflow-hidden">
                <Image
                  src={content.image.src}
                  alt={content.image.alt}
                  width={content.image.width}
                  height={content.image.height}
                  className="object-contain"
                />
              </div>
            )}
          </div>
        );
      
      case ExplainerType.ANIMATION:
        return (
          <div className="p-4">
            {content.title && <h4 className="font-bold mb-2">{content.title}</h4>}
            {content.text && <p className="mb-2">{content.text}</p>}
            <div className="mt-2 rounded-md overflow-hidden">
              {/* 这里可以集成Lottie动画或其他动画库 */}
              <div className="w-full h-[200px] bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">动画加载中...</p>
              </div>
            </div>
          </div>
        );
      
      case ExplainerType.INTERACTIVE:
        return (
          <div className="p-4">
            {content.title && <h4 className="font-bold mb-2">{content.title}</h4>}
            {content.text && <p className="mb-2">{content.text}</p>}
            <div className="mt-2">
              {content.interactive}
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <span className={`inline-block relative ${className}`}>
      <span
        ref={termRef}
        className={`cursor-help border-dotted border-b-2 border-blue-400 dark:border-blue-500 ${termClassName}`}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        tabIndex={0}
        role="button"
        aria-expanded={isOpen}
      >
        {term}
        {showIcon && (
          <span className="inline-block ml-0.5 text-blue-500 dark:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </span>
        )}
      </span>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={tooltipRef}
            className="fixed z-50 w-72 max-w-sm bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            initial={{ opacity: 0, y: position.direction === 'bottom' ? -10 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: position.direction === 'bottom' ? -10 : 10 }}
            transition={{ duration: 0.2 }}
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`
            }}
          >
            {/* 三角形指示器 */}
            <div 
              className={`
                absolute w-3 h-3 bg-white dark:bg-gray-800 transform rotate-45
                ${position.direction === 'bottom' ? 'top-[-6px]' : 'bottom-[-6px]'}
              `}
              style={{ 
                left: `${termRef.current ? 
                  (termRef.current.getBoundingClientRect().left + termRef.current.getBoundingClientRect().width/2) - position.left
                : 50}px` 
              }}
            />
            
            {renderContent()}
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
};

export default InteractiveExplainer; 