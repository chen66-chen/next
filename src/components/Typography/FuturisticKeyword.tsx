"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface FuturisticKeywordProps {
  children: React.ReactNode;
  highlight?: 'blue' | 'purple' | 'cyan' | 'green';
  className?: string;
}

export default function FuturisticKeyword({
  children,
  highlight = 'blue',
  className = ''
}: FuturisticKeywordProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // 根据类型设置不同的高亮颜色
  const highlightColors = {
    blue: 'text-blue-600 dark:text-blue-400',
    purple: 'text-purple-600 dark:text-purple-400',
    cyan: 'text-cyan-600 dark:text-cyan-400',
    green: 'text-green-600 dark:text-green-400'
  };

  const borderColors = {
    blue: 'border-blue-600 dark:border-blue-400',
    purple: 'border-purple-600 dark:border-purple-400',
    cyan: 'border-cyan-600 dark:border-cyan-400',
    green: 'border-green-600 dark:border-green-400'
  };

  const glowColors = {
    blue: 'rgb(37, 99, 235)',
    purple: 'rgb(147, 51, 234)',
    cyan: 'rgb(8, 145, 178)',
    green: 'rgb(22, 163, 74)'
  };
  
  return (
    <motion.span
      className={`inline-block font-mono ${highlightColors[highlight]} px-1 py-0.5 rounded
      border-b ${borderColors[highlight]} dark:bg-opacity-10 relative overflow-hidden
      transition-all duration-200 ${className}`}
      style={{
        textShadow: isHovered ? `0 0 8px ${glowColors[highlight]}` : 'none',
        letterSpacing: isHovered ? '0.05em' : 'normal'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ backgroundColor: 'transparent' }}
      animate={{
        backgroundColor: isHovered 
          ? `rgba(${highlight === 'blue' ? '37, 99, 235' 
          : highlight === 'purple' ? '147, 51, 234' 
          : highlight === 'cyan' ? '8, 145, 178' 
          : '22, 163, 74'}, 0.1)`
          : 'transparent'
      }}
      transition={{ duration: 0.3 }}
    >
      {/* 扫描线效果 */}
      {isHovered && (
        <motion.div
          className="absolute left-0 w-full h-1 bg-white opacity-30"
          initial={{ top: "-100%" }}
          animate={{ top: "100%" }}
          transition={{ 
            repeat: Infinity,
            duration: 1.5,
            ease: "linear"
          }}
        />
      )}
      
      {/* 光晕效果 */}
      <motion.span
        className="relative z-10"
        animate={{
          filter: isHovered ? 'brightness(1.2)' : 'brightness(1)'
        }}
      >
        {children}
      </motion.span>
      
      {/* 背景网格效果 */}
      {isHovered && (
        <div 
          className="absolute inset-0 pointer-events-none z-0 opacity-20"
          style={{
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), 
                              linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
            backgroundSize: '8px 8px',
          }}
        />
      )}
    </motion.span>
  );
} 