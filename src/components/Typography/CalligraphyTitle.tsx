"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalligraphyTitleProps {
  text: string;
  className?: string;
  modernFont?: string;
  calligraphyFont?: string;
}

export default function CalligraphyTitle({
  text,
  className = '',
  modernFont = 'font-kuaikan',
  calligraphyFont = 'font-noto'
}: CalligraphyTitleProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const modernRef = useRef<HTMLDivElement>(null);
  
  // 更新尺寸以保持布局稳定
  useEffect(() => {
    if (modernRef.current) {
      setDimensions({
        width: modernRef.current.offsetWidth,
        height: modernRef.current.offsetHeight
      });
    }
  }, [text]);

  // 处理标题文本，为每个字符创建单独的动画
  const characters = text.split('');
  
  return (
    <div 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ minWidth: dimensions.width > 0 ? dimensions.width : 'auto', minHeight: dimensions.height > 0 ? dimensions.height : 'auto' }}
    >
      {/* 现代字体层 */}
      <div 
        ref={modernRef}
        className={`${modernFont} transition-opacity duration-500 ${isHovered ? 'opacity-0' : 'opacity-100'}`}
      >
        {text}
      </div>
      
      {/* 书法字体层 - 字符动画 */}
      <AnimatePresence>
        {isHovered && (
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
            <div className={`relative ${calligraphyFont} text-center flex flex-wrap`}>
              {characters.map((char, index) => (
                <motion.span
                  key={`${char}-${index}`}
                  initial={{ 
                    opacity: 0, 
                    scale: 1.5,
                    filter: 'blur(10px)',
                    color: 'rgba(0, 0, 0, 0.7)'
                  }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    filter: 'blur(0px)',
                    color: 'rgba(0, 0, 0, 1)'
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8,
                    filter: 'blur(5px)'
                  }}
                  transition={{ 
                    duration: 0.5,
                    delay: index * 0.03,
                    ease: "easeInOut" 
                  }}
                  className="inline-block whitespace-pre-wrap relative"
                  style={{
                    // 添加毛笔书法效果的文字阴影
                    textShadow: isHovered ? '1px 1px 2px rgba(0, 0, 0, 0.1)' : 'none',
                  }}
                >
                  {/* 模拟墨水扩散效果 */}
                  {isHovered && (
                    <motion.span
                      className="absolute top-0 left-0 w-full h-full z-0 opacity-0"
                      initial={{ opacity: 0 }}
                      animate={{ 
                        opacity: [0, 0.7, 0] 
                      }}
                      transition={{ 
                        duration: 1.5,
                        delay: index * 0.03,
                        ease: "easeOut" 
                      }}
                      style={{
                        background: 'radial-gradient(circle, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0) 70%)'
                      }}
                    />
                  )}
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        )}
      </AnimatePresence>
      
      {/* 墨水扩散效果 - 整体效果 */}
      {isHovered && (
        <div className="absolute -bottom-2 left-0 w-full h-1 opacity-70">
          <motion.div
            initial={{ width: "0%", left: "50%" }}
            animate={{ width: "100%", left: "0%" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-transparent via-black to-transparent"
          />
        </div>
      )}
    </div>
  );
} 