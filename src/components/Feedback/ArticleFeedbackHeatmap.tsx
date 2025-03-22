"use client";

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { FeedbackType, ArticleFeedback, ParagraphFeedback } from '@/interfaces/feedback';

// 热图颜色配置
const HEAT_COLORS = [
  'bg-blue-50 dark:bg-blue-950/30',  // 最低热度
  'bg-blue-100 dark:bg-blue-900/40',
  'bg-blue-200 dark:bg-blue-800/50',
  'bg-yellow-200 dark:bg-yellow-800/50',
  'bg-orange-200 dark:bg-orange-800/50',
  'bg-red-200 dark:bg-red-800/50',   // 最高热度
];

interface ArticleFeedbackHeatmapProps {
  articleFeedback: ArticleFeedback;
  onSelectParagraph?: (paragraphId: string) => void;
}

export default function ArticleFeedbackHeatmap({
  articleFeedback,
  onSelectParagraph,
}: ArticleFeedbackHeatmapProps) {
  // 计算最高热度值用于归一化
  const maxHotness = useMemo(() => {
    return Math.max(
      ...articleFeedback.paragraphFeedbacks.map(p => p.hotness),
      1 // 至少为1，避免除以0
    );
  }, [articleFeedback]);
  
  // 计算反馈类型的分布情况
  const feedbackDistribution = useMemo(() => {
    const distribution: Record<FeedbackType, number> = {
      [FeedbackType.THINKING]: 0,
      [FeedbackType.INSPIRED]: 0,
      [FeedbackType.CONFUSED]: 0,
      [FeedbackType.AGREE]: 0,
      [FeedbackType.DISAGREE]: 0,
      [FeedbackType.LOVE]: 0,
    };
    
    articleFeedback.paragraphFeedbacks.forEach(paragraph => {
      paragraph.feedbacks.forEach(feedback => {
        distribution[feedback.type] += feedback.count;
      });
    });
    
    return distribution;
  }, [articleFeedback]);
  
  // 总反馈数
  const totalFeedbacks = articleFeedback.totalFeedbacks;
  
  // 获取热度颜色
  const getHeatColor = (hotness: number) => {
    // 归一化热度值到0-1
    const normalizedHeat = Math.min(hotness / maxHotness, 1);
    // 将0-1映射到颜色数组索引
    const colorIndex = Math.min(
      Math.floor(normalizedHeat * HEAT_COLORS.length),
      HEAT_COLORS.length - 1
    );
    return HEAT_COLORS[colorIndex];
  };
  
  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-4 w-full max-w-md">
      <h3 className="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-100">
        阅读热图
      </h3>
      
      {/* 反馈分布统计 */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          读者反馈分布 ({totalFeedbacks} 总计)
        </div>
        
        <div className="flex flex-wrap gap-2">
          {Object.entries(feedbackDistribution)
            .filter(([_, count]) => count > 0)
            .sort(([_, countA], [__, countB]) => countB - countA)
            .map(([type, count]) => (
              <div 
                key={type} 
                className="flex items-center gap-1 px-2 py-1 rounded-full text-xs bg-gray-100 dark:bg-gray-800"
              >
                <span>
                  {type === FeedbackType.THINKING && '🤔'}
                  {type === FeedbackType.INSPIRED && '💡'}
                  {type === FeedbackType.CONFUSED && '❓'}
                  {type === FeedbackType.AGREE && '👍'}
                  {type === FeedbackType.DISAGREE && '👎'}
                  {type === FeedbackType.LOVE && '❤️'}
                </span>
                <span>{count}</span>
              </div>
            ))}
        </div>
      </div>
      
      {/* 热点段落列表 */}
      <div>
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          热点段落
        </div>
        
        <div className="space-y-2">
          {articleFeedback.paragraphFeedbacks
            .filter(p => p.hotness > 0)
            .sort((a, b) => b.hotness - a.hotness)
            .slice(0, 5) // 只显示前5个热点
            .map((paragraph, index) => {
              // 找出该段落最常见的反馈类型
              const topFeedback = paragraph.feedbacks
                .sort((a, b) => b.count - a.count)[0];
              
              return (
                <motion.div
                  key={paragraph.paragraphId}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`p-2 rounded cursor-pointer ${getHeatColor(paragraph.hotness)}`}
                  onClick={() => onSelectParagraph?.(paragraph.paragraphId)}
                >
                  <div className="flex justify-between items-start mb-1">
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      段落 #{index + 1}
                    </div>
                    <div className="flex gap-1">
                      {paragraph.feedbacks.slice(0, 3).map(feedback => (
                        <span key={feedback.id} title={`${feedback.count} ${feedback.type}`}>
                          {feedback.type === FeedbackType.THINKING && '🤔'}
                          {feedback.type === FeedbackType.INSPIRED && '💡'}
                          {feedback.type === FeedbackType.CONFUSED && '❓'}
                          {feedback.type === FeedbackType.AGREE && '👍'}
                          {feedback.type === FeedbackType.DISAGREE && '👎'}
                          {feedback.type === FeedbackType.LOVE && '❤️'}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-sm line-clamp-2 text-gray-700 dark:text-gray-300">
                    {topFeedback?.textContent || '...'}
                  </div>
                  
                  <div className="mt-1 w-full bg-gray-200 dark:bg-gray-700 h-1 rounded-full overflow-hidden">
                    <div 
                      className="bg-blue-500 dark:bg-blue-400 h-full rounded-full" 
                      style={{ width: `${(paragraph.hotness / maxHotness) * 100}%` }}
                    />
                  </div>
                </motion.div>
              );
            })}
        </div>
      </div>
    </div>
  );
} 