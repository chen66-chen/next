"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { FeedbackType } from '@/interfaces/feedback';

// 定义每种反馈类型的图标和文本
const FEEDBACK_CONFIG = {
  [FeedbackType.THINKING]: {
    icon: '🤔',
    text: '思考中',
    color: 'bg-blue-100 hover:bg-blue-200 text-blue-800 dark:bg-blue-900/30 dark:hover:bg-blue-800/50 dark:text-blue-300',
  },
  [FeedbackType.INSPIRED]: {
    icon: '💡',
    text: '灵感触发',
    color: 'bg-yellow-100 hover:bg-yellow-200 text-yellow-800 dark:bg-yellow-900/30 dark:hover:bg-yellow-800/50 dark:text-yellow-300',
  },
  [FeedbackType.CONFUSED]: {
    icon: '❓',
    text: '困惑',
    color: 'bg-purple-100 hover:bg-purple-200 text-purple-800 dark:bg-purple-900/30 dark:hover:bg-purple-800/50 dark:text-purple-300',
  },
  [FeedbackType.AGREE]: {
    icon: '👍',
    text: '赞同',
    color: 'bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-800/50 dark:text-green-300',
  },
  [FeedbackType.DISAGREE]: {
    icon: '👎',
    text: '不赞同',
    color: 'bg-red-100 hover:bg-red-200 text-red-800 dark:bg-red-900/30 dark:hover:bg-red-800/50 dark:text-red-300',
  },
  [FeedbackType.LOVE]: {
    icon: '❤️',
    text: '喜欢',
    color: 'bg-pink-100 hover:bg-pink-200 text-pink-800 dark:bg-pink-900/30 dark:hover:bg-pink-800/50 dark:text-pink-300',
  },
};

interface FeedbackButtonProps {
  type: FeedbackType;
  count: number;
  isSelected?: boolean;
  onClick: () => void;
  animated?: boolean;
}

export default function FeedbackButton({
  type,
  count,
  isSelected = false,
  onClick,
  animated = false,
}: FeedbackButtonProps) {
  const config = FEEDBACK_CONFIG[type];
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      animate={
        animated ? {
          scale: [1, 1.1, 1],
          transition: { duration: 0.5, repeat: 3, repeatType: 'reverse' }
        } : undefined
      }
      className={`
        flex items-center gap-1 px-3 py-1.5 rounded-full text-sm
        transition-all duration-200
        ${config.color}
        ${isSelected ? 'ring-2 ring-blue-500 dark:ring-blue-400' : ''}
      `}
      onClick={onClick}
    >
      <span className="text-base">{config.icon}</span>
      <span>{config.text}</span>
      {count > 0 && (
        <span className="ml-1 px-1.5 py-0.5 bg-white/30 dark:bg-black/20 rounded-full text-xs">
          {count}
        </span>
      )}
    </motion.button>
  );
} 