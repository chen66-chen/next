"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FeedbackType, FeedbackItem, UserFeedback } from '@/interfaces/feedback';
import FeedbackButton from './FeedbackButton';

interface ParagraphFeedbackPanelProps {
  paragraphId: string;
  textContent: string;
  feedbacks: FeedbackItem[];
  onSubmitFeedback: (feedback: UserFeedback) => void;
}

export default function ParagraphFeedbackPanel({
  paragraphId,
  textContent,
  feedbacks,
  onSubmitFeedback,
}: ParagraphFeedbackPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackType | null>(null);
  
  // 计算各类反馈的数量
  const feedbackCounts = Object.values(FeedbackType).reduce((acc, type) => {
    acc[type] = feedbacks.filter(f => f.type === type).reduce((sum, f) => sum + f.count, 0);
    return acc;
  }, {} as Record<FeedbackType, number>);
  
  // 提交反馈
  const handleSubmitFeedback = (type: FeedbackType) => {
    // 如果用户点击了已选中的反馈，则取消选择
    if (selectedFeedback === type) {
      setSelectedFeedback(null);
      return;
    }
    
    setSelectedFeedback(type);
    
    // 将反馈发送到父组件
    onSubmitFeedback({
      type,
      paragraphId,
      textContent: textContent.substring(0, 100), // 只保存前100个字符作为上下文
    });
  };
  
  // 检查是否有被激活的反馈类型
  const hasActiveFeedback = feedbacks.length > 0;
  
  // 检查是否有特定类型的反馈
  const hasConfusion = feedbackCounts[FeedbackType.CONFUSED] > 0;
  const hasInspiration = feedbackCounts[FeedbackType.INSPIRED] > 0;
  
  return (
    <div className="relative group">
      {/* 段落反馈指示器 - 当有反馈时显示，仅显示一个最主要的 */}
      {hasActiveFeedback && (
        <div 
          className="absolute -left-8 top-0 flex flex-col items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* 优先级：困惑 > 灵感 > 思考中，只显示一个图标 */}
          {hasConfusion ? (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-purple-500 dark:text-purple-400 cursor-pointer text-xl"
              title="有读者对此感到困惑"
            >
              ❓
            </motion.div>
          ) : hasInspiration ? (
            <motion.div 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-yellow-500 dark:text-yellow-400 cursor-pointer text-xl"
              title="有读者从此获得灵感"
            >
              💡
            </motion.div>
          ) : feedbackCounts[FeedbackType.THINKING] > 0 ? (
            <span className="text-blue-500 dark:text-blue-400 cursor-pointer text-xl">🤔</span>
          ) : null}
        </div>
      )}
      
      {/* 显示反馈按钮 */}
      <div 
        className="absolute right-2 top-2 z-10 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div 
          className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 shadow-md flex items-center justify-center cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-all transform hover:scale-110"
          title="反馈"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500 dark:text-gray-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
          </svg>
        </div>
        
        {/* 显示当前段落的反馈数量 */}
        {feedbacks.length > 0 && (
          <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            {feedbacks.length}
          </div>
        )}
      </div>
      
      {/* 反馈面板 */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-6 z-10 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700 min-w-[250px]"
          >
            <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              对这段内容有什么感受？
            </div>
            
            <div className="flex flex-wrap gap-2">
              {Object.values(FeedbackType).map(type => (
                <FeedbackButton
                  key={type}
                  type={type}
                  count={feedbackCounts[type]}
                  isSelected={selectedFeedback === type}
                  onClick={() => handleSubmitFeedback(type)}
                  animated={
                    type === FeedbackType.CONFUSED && hasConfusion ||
                    type === FeedbackType.INSPIRED && hasInspiration
                  }
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 