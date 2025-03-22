"use client";

import React from 'react';
import FuturisticKeyword from './FuturisticKeyword';

interface MixedTextRendererProps {
  content: string;
  className?: string;
}

export default function MixedTextRenderer({
  content,
  className = ''
}: MixedTextRendererProps) {
  // 技术关键词列表及其对应的类型
  const techKeywords: Record<string, 'blue' | 'purple' | 'cyan' | 'green'> = {
    // 编程语言
    'JavaScript': 'blue',
    'TypeScript': 'blue',
    'Python': 'blue',
    'Java': 'blue',
    'C++': 'blue',
    'Rust': 'blue',
    'Go': 'blue',
    
    // 前端框架和库
    'React': 'cyan',
    'Vue': 'cyan',
    'Angular': 'cyan',
    'Next.js': 'cyan',
    'Nuxt': 'cyan',
    'Svelte': 'cyan',
    'Three.js': 'cyan',
    'WebGL': 'cyan',
    
    // 后端技术
    'Node.js': 'green',
    'Express': 'green',
    'Django': 'green',
    'Flask': 'green',
    'Spring': 'green',
    'Docker': 'green',
    'Kubernetes': 'green',
    'GraphQL': 'green',
    'REST': 'green',
    'API': 'green',
    
    // 人工智能和数据科学
    'AI': 'purple',
    '人工智能': 'purple',
    '机器学习': 'purple',
    'ML': 'purple',
    '深度学习': 'purple',
    'ChatGPT': 'purple',
    'TensorFlow': 'purple',
    'PyTorch': 'purple',
    '自然语言处理': 'purple',
    'NLP': 'purple',
  };
  
  // 递归匹配并替换关键词的函数
  const parseContent = (text: string) => {
    // 从最长关键词开始匹配，以避免部分匹配问题
    const keywords = Object.keys(techKeywords).sort((a, b) => b.length - a.length);
    
    // 使用正则表达式匹配整个单词
    for (const keyword of keywords) {
      // 创建一个匹配整个单词的正则表达式
      const regex = new RegExp(`(^|\\s|[.,;!?"'\\[\\](){}])(${keyword})($|\\s|[.,;!?"'\\[\\](){}])`, 'g');
      
      // 替换文本中的关键词
      if (regex.test(text)) {
        const parts = text.split(regex);
        const result: React.ReactNode[] = [];
        
        let i = 0;
        while (i < parts.length) {
          // 添加前缀
          if (i < parts.length) result.push(parts[i]);
          i++;
          
          // 添加关键词
          if (i < parts.length && parts[i] === keyword) {
            result.push(
              <FuturisticKeyword 
                key={`keyword-${i}`} 
                highlight={techKeywords[keyword]}
              >
                {parts[i]}
              </FuturisticKeyword>
            );
          } else if (i < parts.length) {
            result.push(parts[i]);
          }
          i++;
          
          // 添加后缀
          if (i < parts.length) result.push(parts[i]);
          i++;
        }
        
        // 递归处理剩余文本片段
        return result.map((item, index) => 
          typeof item === 'string' 
            ? <React.Fragment key={`fragment-${index}`}>{parseContent(item)}</React.Fragment> 
            : item
        );
      }
    }
    
    // 如果没有匹配项，直接返回文本
    return text;
  };

  return (
    <div className={className}>
      {parseContent(content)}
    </div>
  );
} 