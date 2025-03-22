"use client";

import React, { useState, useEffect } from 'react';
import { Chart } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
} from 'chart.js';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

// 注册ChartJS组件
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  BarElement,
  Title, 
  Tooltip, 
  Legend,
  ArcElement
);

/**
 * 内容类型枚举
 */
export enum ContentType {
  TEXT = 'text',
  CODE = 'code',
  CHART = 'chart'
}

/**
 * 内容接口定义
 */
interface ContentData {
  text?: string;
  code?: {
    code: string;
    language: string;
  };
  chart?: {
    type: 'line' | 'bar' | 'pie';
    data: any;
    options?: any;
  };
}

/**
 * 组件属性接口
 */
interface DynamicContentProps {
  initialContentType?: ContentType;
  contentData: ContentData;
  title?: string;
  className?: string;
}

/**
 * 动态内容组件
 * 
 * 该组件允许在文本、代码和图表之间无缝切换，为博客内容提供更丰富的展示方式
 * 
 * @param initialContentType 初始内容类型
 * @param contentData 包含不同格式的内容数据
 * @param title 内容标题
 * @param className 自定义样式类
 */
const DynamicContent: React.FC<DynamicContentProps> = ({
  initialContentType = ContentType.TEXT,
  contentData,
  title,
  className = ''
}) => {
  // 当前显示的内容类型
  const [activeType, setActiveType] = useState<ContentType>(initialContentType);
  // 可用的内容类型
  const [availableTypes, setAvailableTypes] = useState<ContentType[]>([]);

  // 确定可用的内容类型
  useEffect(() => {
    const types: ContentType[] = [];
    if (contentData.text) types.push(ContentType.TEXT);
    if (contentData.code) types.push(ContentType.CODE);
    if (contentData.chart) types.push(ContentType.CHART);
    
    setAvailableTypes(types);
    
    // 如果初始内容类型不可用，则选择第一个可用类型
    if (!types.includes(activeType) && types.length > 0) {
      setActiveType(types[0]);
    }
  }, [contentData, activeType]);

  // 渲染图表内容
  const renderChart = () => {
    if (!contentData.chart) return null;
    
    const { type, data, options } = contentData.chart;
    
    switch(type) {
      case 'line':
        return <Chart type="line" data={data} options={options} />;
      case 'bar':
        return <Chart type="bar" data={data} options={options} />;
      case 'pie':
        return <Chart type="pie" data={data} options={options} />;
      default:
        return null;
    }
  };

  // 渲染代码内容
  const renderCode = () => {
    if (!contentData.code) return null;
    
    const { code, language } = contentData.code;
    
    return (
      <SyntaxHighlighter 
        language={language} 
        style={atomDark}
        showLineNumbers
        wrapLines
      >
        {code}
      </SyntaxHighlighter>
    );
  };

  // 渲染文本内容
  const renderText = () => {
    if (!contentData.text) return null;
    
    return (
      <div className="prose dark:prose-invert max-w-none">
        <div dangerouslySetInnerHTML={{ __html: contentData.text }} />
      </div>
    );
  };

  // 渲染当前活动内容
  const renderActiveContent = () => {
    switch(activeType) {
      case ContentType.TEXT:
        return renderText();
      case ContentType.CODE:
        return renderCode();
      case ContentType.CHART:
        return renderChart();
      default:
        return null;
    }
  };

  // 获取内容类型的图标
  const getTypeIcon = (type: ContentType) => {
    switch(type) {
      case ContentType.TEXT:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        );
      case ContentType.CODE:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case ContentType.CHART:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden ${className}`}>
      {/* 标题和切换按钮 */}
      <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
        {title && <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>}
        
        <div className="flex space-x-2">
          {availableTypes.map((type) => (
            <button
              key={type}
              onClick={() => setActiveType(type)}
              className={`p-2 rounded-md transition-colors ${
                activeType === type 
                  ? 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
              }`}
              title={`切换到${type === ContentType.TEXT ? '文本' : type === ContentType.CODE ? '代码' : '图表'}视图`}
              aria-label={`切换到${type === ContentType.TEXT ? '文本' : type === ContentType.CODE ? '代码' : '图表'}视图`}
            >
              {getTypeIcon(type)}
            </button>
          ))}
        </div>
      </div>
      
      {/* 内容区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="p-4"
        >
          {renderActiveContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default DynamicContent; 