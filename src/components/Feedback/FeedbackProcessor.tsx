"use client";

import React, { useState, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FeedbackType, UserFeedback, ArticleFeedback, FeedbackItem, ParagraphFeedback } from '@/interfaces/feedback';
import ParagraphFeedbackPanel from './ParagraphFeedbackPanel';
import ArticleFeedbackHeatmap from './ArticleFeedbackHeatmap';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { HtmlContentProcessor } from '@/components/Typography';

interface FeedbackProcessorProps {
  articleId: string;
  content: string;
  showHeatmap?: boolean;
}

export default function FeedbackProcessor({
  articleId,
  content,
  showHeatmap = true,
}: FeedbackProcessorProps) {
  // 保存处理过的内容
  const [processedContent, setProcessedContent] = useState<JSX.Element[]>([]);
  // 保存文章反馈数据
  const [articleFeedback, setArticleFeedback] = useState<ArticleFeedback>({
    articleId,
    totalFeedbacks: 0,
    paragraphFeedbacks: [],
  });
  
  // 引用处理后的内容容器
  const contentRef = useRef<HTMLDivElement>(null);
  
  // 存储高亮的段落ID
  const [highlightedParagraphId, setHighlightedParagraphId] = useState<string | null>(null);

  // 判断内容类型
  const isHtml = content.trim().startsWith('<');
  const isMarkdown = content.trim().startsWith('#') || 
                   content.includes('```') || 
                   content.includes('##');
  
  // 模拟API调用获取已有的反馈数据
  useEffect(() => {
    // 这里应该是从API获取数据，现在模拟一些示例数据
    const mockFeedbackData: ArticleFeedback = {
      articleId,
      totalFeedbacks: 14,
      paragraphFeedbacks: [
        {
          paragraphId: 'p-2', // 第3个段落
          hotness: 8,
          feedbacks: [
            {
              id: uuidv4(),
              type: FeedbackType.CONFUSED,
              count: 5,
              paragraphId: 'p-2',
              textContent: content.split('\n\n')[2]?.substring(0, 100) || '',
              timestamp: Date.now() - 3600000,
            },
            {
              id: uuidv4(),
              type: FeedbackType.THINKING,
              count: 3,
              paragraphId: 'p-2',
              textContent: content.split('\n\n')[2]?.substring(0, 100) || '',
              timestamp: Date.now() - 7200000,
            },
          ],
        },
        {
          paragraphId: 'p-4', // 第5个段落
          hotness: 6,
          feedbacks: [
            {
              id: uuidv4(),
              type: FeedbackType.INSPIRED,
              count: 4,
              paragraphId: 'p-4',
              textContent: content.split('\n\n')[4]?.substring(0, 100) || '',
              timestamp: Date.now() - 1800000,
            },
            {
              id: uuidv4(),
              type: FeedbackType.LOVE,
              count: 2,
              paragraphId: 'p-4',
              textContent: content.split('\n\n')[4]?.substring(0, 100) || '',
              timestamp: Date.now() - 5400000,
            },
          ],
        },
      ],
    };
    
    setArticleFeedback(mockFeedbackData);
  }, [articleId, content]);
  
  // 处理点击段落
  const handleSelectParagraph = (paragraphId: string) => {
    setHighlightedParagraphId(paragraphId);
    
    // 滚动到对应段落
    if (contentRef.current) {
      const paragraph = contentRef.current.querySelector(`[data-paragraph-id="${paragraphId}"]`);
      if (paragraph) {
        paragraph.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
    
    // 设置一个定时器，几秒后取消高亮
    setTimeout(() => {
      setHighlightedParagraphId(null);
    }, 3000);
  };
  
  // 处理用户提交的反馈
  const handleSubmitFeedback = (feedback: UserFeedback) => {
    // 创建一个新的反馈项
    const newFeedbackItem: FeedbackItem = {
      id: uuidv4(),
      type: feedback.type,
      count: 1,
      paragraphId: feedback.paragraphId,
      textContent: feedback.textContent,
      timestamp: Date.now(),
    };
    
    // 更新文章反馈状态
    setArticleFeedback(prevFeedback => {
      // 找到对应段落的反馈
      const paragraphIndex = prevFeedback.paragraphFeedbacks.findIndex(
        p => p.paragraphId === feedback.paragraphId
      );
      
      let newParagraphFeedbacks: ParagraphFeedback[];
      
      if (paragraphIndex >= 0) {
        // 段落已有反馈
        const paragraph = prevFeedback.paragraphFeedbacks[paragraphIndex];
        
        // 查看该段落是否已有相同类型的反馈
        const feedbackIndex = paragraph.feedbacks.findIndex(f => f.type === feedback.type);
        
        if (feedbackIndex >= 0) {
          // 已有相同类型的反馈，增加计数
          const updatedFeedbacks = [...paragraph.feedbacks];
          updatedFeedbacks[feedbackIndex] = {
            ...updatedFeedbacks[feedbackIndex],
            count: updatedFeedbacks[feedbackIndex].count + 1,
          };
          
          // 更新该段落的反馈
          newParagraphFeedbacks = [...prevFeedback.paragraphFeedbacks];
          newParagraphFeedbacks[paragraphIndex] = {
            ...paragraph,
            feedbacks: updatedFeedbacks,
            // 重新计算热度
            hotness: updatedFeedbacks.reduce((sum, item) => sum + item.count, 0),
          };
        } else {
          // 该段落没有这种类型的反馈，添加新的反馈
          newParagraphFeedbacks = [...prevFeedback.paragraphFeedbacks];
          newParagraphFeedbacks[paragraphIndex] = {
            ...paragraph,
            feedbacks: [...paragraph.feedbacks, newFeedbackItem],
            // 重新计算热度
            hotness: paragraph.hotness + 1,
          };
        }
      } else {
        // 该段落还没有任何反馈，创建新的段落反馈
        newParagraphFeedbacks = [
          ...prevFeedback.paragraphFeedbacks,
          {
            paragraphId: feedback.paragraphId,
            feedbacks: [newFeedbackItem],
            hotness: 1,
          },
        ];
      }
      
      // 返回更新后的文章反馈
      return {
        ...prevFeedback,
        totalFeedbacks: prevFeedback.totalFeedbacks + 1,
        paragraphFeedbacks: newParagraphFeedbacks,
      };
    });
    
    // 在实际应用中，这里应该调用API将反馈发送到服务器
    console.log('发送反馈到服务器:', feedback);
  };
  
  // 处理HTML内容分段并添加反馈面板
  const processHtmlContent = () => {
    return (
      <div className="relative">
        <HtmlContentProcessor htmlContent={content} className="prose max-w-none dark:prose-invert" />
        {/* 为整体HTML内容添加一个反馈面板 */}
        <div className="absolute right-0 top-0">
          <ParagraphFeedbackPanel
            paragraphId="p-html"
            textContent={content.substring(0, 100)}
            feedbacks={articleFeedback.paragraphFeedbacks.find(p => p.paragraphId === "p-html")?.feedbacks || []}
            onSubmitFeedback={handleSubmitFeedback}
          />
        </div>
      </div>
    );
  };
  
  // 智能分割Markdown内容为段落，保留代码块完整性
  const smartSplitMarkdown = (content: string): string[] => {
    const lines = content.split('\n');
    const paragraphs: string[] = [];
    let currentParagraph: string[] = [];
    let inCodeBlock = false;
    
    lines.forEach(line => {
      // 检测代码块开始或结束
      if (line.trim().startsWith('```')) {
        inCodeBlock = !inCodeBlock;
        currentParagraph.push(line);
        return;
      }
      
      // 在代码块内，添加到当前段落
      if (inCodeBlock) {
        currentParagraph.push(line);
        return;
      }
      
      // 空行表示段落分隔
      if (line.trim() === '') {
        if (currentParagraph.length > 0) {
          paragraphs.push(currentParagraph.join('\n'));
          currentParagraph = [];
        }
        return;
      }
      
      // 标题行作为独立段落
      if (line.trim().startsWith('#')) {
        if (currentParagraph.length > 0) {
          paragraphs.push(currentParagraph.join('\n'));
          currentParagraph = [];
        }
        currentParagraph.push(line);
        paragraphs.push(currentParagraph.join('\n'));
        currentParagraph = [];
        return;
      }
      
      // 普通行添加到当前段落
      currentParagraph.push(line);
    });
    
    // 处理最后一个段落
    if (currentParagraph.length > 0) {
      paragraphs.push(currentParagraph.join('\n'));
    }
    
    return paragraphs;
  };
  
  // 提供纯Markdown渲染的选项
  const renderFullMarkdown = () => {
    return (
      <div className="relative mb-6">
        <div className="prose max-w-none dark:prose-invert">
          <MarkdownRenderer content={content} />
        </div>
        <div className="absolute right-0 top-0">
          <ParagraphFeedbackPanel
            paragraphId="p-markdown"
            textContent={content.substring(0, 100)}
            feedbacks={articleFeedback.paragraphFeedbacks.find(p => p.paragraphId === "p-markdown")?.feedbacks || []}
            onSubmitFeedback={handleSubmitFeedback}
          />
        </div>
      </div>
    );
  };
  
  // 处理内容分段并添加反馈面板 - 针对Markdown
  useEffect(() => {
    if (!content || isHtml) return;
    
    // 是否检测到复杂代码结构
    const hasComplexCode = content.includes('```') && 
                          (content.split('```').length > 3 || 
                           content.includes('```javascript') || 
                           content.includes('```python') || 
                           content.includes('```typescript') ||
                           content.includes('```html') ||
                           content.includes('```css'));
    
    // 对于复杂代码内容，使用整体渲染
    if (hasComplexCode) {
      setProcessedContent([renderFullMarkdown()]);
      return;
    }
    
    // 按段落分割内容（智能分割）
    const paragraphs = smartSplitMarkdown(content);
    
    // 为每个段落添加反馈面板
    const elements = paragraphs.map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      
      const paragraphId = `p-${index}`;
      const paragraphFeedback = articleFeedback.paragraphFeedbacks.find(
        p => p.paragraphId === paragraphId
      );
      
      const isHighlighted = paragraphId === highlightedParagraphId;
      
      return (
        <div 
          key={paragraphId}
          data-paragraph-id={paragraphId}
          className={`relative mb-6 paragraph ${isHighlighted ? 'bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-md transition-colors duration-500' : ''}`}
        >
          <div className="paragraph-content">
            {/* 使用MarkdownRenderer渲染单个段落 */}
            <MarkdownRenderer content={paragraph} />
          </div>
          
          <ParagraphFeedbackPanel
            paragraphId={paragraphId}
            textContent={paragraph}
            feedbacks={paragraphFeedback?.feedbacks || []}
            onSubmitFeedback={handleSubmitFeedback}
          />
        </div>
      );
    }).filter(Boolean);
    
    setProcessedContent(elements as JSX.Element[]);
  }, [content, articleFeedback, highlightedParagraphId, isHtml]);
  
  return (
    <div className="feedback-processor relative w-full">
      {/* 文章内容区域 */}
      <div 
        ref={contentRef}
        className="processed-content relative pl-10 pr-4"
      >
        {isHtml ? (
          processHtmlContent()
        ) : (
          processedContent
        )}
      </div>
      
      {/* 热图区域 */}
      {showHeatmap && (
        <div className="heatmap-container sticky bottom-8 right-8 float-right ml-6 mb-6">
          <ArticleFeedbackHeatmap
            articleFeedback={articleFeedback}
            onSelectParagraph={handleSelectParagraph}
          />
        </div>
      )}
    </div>
  );
} 