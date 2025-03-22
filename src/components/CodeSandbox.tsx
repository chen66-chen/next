"use client";

import React, { useState, useEffect } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * 代码语言类型
 */
const SUPPORTED_LANGUAGES = [
  'javascript', 'typescript', 'python', 'html', 'css',
  'java', 'cpp', 'csharp', 'go', 'ruby', 'php'
] as const;

type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number];

/**
 * 沙盒模式
 */
export enum SandboxMode {
  CODE = 'code',
  INTERACTIVE = 'interactive',
  RESULT = 'result'
}

/**
 * 组件属性接口
 */
interface CodeSandboxProps {
  code: string;
  language: SupportedLanguage;
  title?: string;
  defaultMode?: SandboxMode;
  showLineNumbers?: boolean;
  className?: string;
  sandboxOptions?: {
    height?: number | string;
    dependencies?: string[];
    autorun?: boolean;
    module?: string;
  };
}

/**
 * 代码沙盒组件
 * 
 * 提供代码查看、交互式编辑和结果预览三种模式
 * 用户可以在三种模式间无缝切换，体验更好的代码学习效果
 * 
 * @param code 初始代码
 * @param language 代码语言
 * @param title 标题
 * @param defaultMode 默认显示模式
 * @param showLineNumbers 是否显示行号
 * @param className 自定义样式类
 * @param sandboxOptions 沙盒配置选项
 */
const CodeSandbox: React.FC<CodeSandboxProps> = ({
  code,
  language,
  title,
  defaultMode = SandboxMode.CODE,
  showLineNumbers = true,
  className = '',
  sandboxOptions = {
    height: 300,
    dependencies: [],
    autorun: true
  }
}) => {
  // 当前显示模式
  const [mode, setMode] = useState<SandboxMode>(defaultMode);
  // 当前代码
  const [currentCode, setCurrentCode] = useState(code);
  // 结果
  const [result, setResult] = useState<{ output: string; error: string | null }>({
    output: '',
    error: null
  });
  // 沙盒ID
  const [sandboxId, setSandboxId] = useState<string>('');
  // 加载状态
  const [loading, setLoading] = useState(false);

  // 生成随机ID
  useEffect(() => {
    setSandboxId(`sandbox-${Math.random().toString(36).substring(2, 11)}`);
  }, []);

  // 运行代码
  const runCode = async () => {
    setLoading(true);
    
    try {
      let output = '';
      let error = null;
      
      // 模拟代码执行，实际应用中可以使用WebWorker或API调用执行代码
      switch (language) {
        case 'javascript':
        case 'typescript':
          try {
            // 创建安全的执行环境
            const consoleLogs: string[] = [];
            const mockConsole = {
              log: (...args: any[]) => {
                consoleLogs.push(args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' '));
              },
              error: (...args: any[]) => {
                consoleLogs.push(`Error: ${args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ')}`);
              },
              warn: (...args: any[]) => {
                consoleLogs.push(`Warning: ${args.map(arg => 
                  typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
                ).join(' ')}`);
              }
            };
            
            // 准备执行代码
            const executeCode = new Function('console', `
              "use strict";
              try {
                ${currentCode}
                return { result: null, error: null };
              } catch (e) {
                return { result: null, error: e.message };
              }
            `);
            
            // 执行代码
            const result = executeCode(mockConsole);
            
            if (result.error) {
              error = result.error;
            }
            
            output = consoleLogs.join('\n');
          } catch (e: any) {
            error = e.message;
          }
          break;
          
        case 'html':
          // 对于HTML，我们可以直接显示渲染结果
          output = '在"结果"标签查看渲染HTML';
          break;
          
        default:
          output = '该语言暂不支持在浏览器中执行';
      }
      
      setResult({ output, error });
    } finally {
      setLoading(false);
    }
  };

  // 复制代码
  const copyCode = () => {
    navigator.clipboard.writeText(currentCode);
    // 显示一个提示，实际应用中可以使用Toast组件
    alert('代码已复制到剪贴板');
  };

  // 重置代码
  const resetCode = () => {
    setCurrentCode(code);
    setResult({ output: '', error: null });
  };

  // 创建CodePen
  const createCodePen = () => {
    const form = document.createElement('form');
    form.method = 'POST';
    form.action = 'https://codepen.io/pen/define';
    form.target = '_blank';
    form.style.display = 'none';

    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = 'data';
    
    const data = {
      title: title || 'Code Example',
      description: 'Created from blog post',
      html: language === 'html' ? currentCode : '',
      css: language === 'css' ? currentCode : '',
      js: ['javascript', 'typescript'].includes(language) ? currentCode : '',
      js_pre_processor: language === 'typescript' ? 'typescript' : 'none'
    };
    
    input.value = JSON.stringify(data);
    
    form.appendChild(input);
    document.body.appendChild(form);
    form.submit();
    document.body.removeChild(form);
  };

  // 根据模式渲染内容
  const renderContent = () => {
    switch (mode) {
      case SandboxMode.CODE:
        return (
          <div className="relative">
            <SyntaxHighlighter
              language={language}
              style={atomDark}
              showLineNumbers={showLineNumbers}
              customStyle={{ margin: 0, borderRadius: '0.375rem' }}
              wrapLines
            >
              {currentCode}
            </SyntaxHighlighter>
            
            <div className="absolute top-2 right-2 flex gap-1">
              <button
                onClick={copyCode}
                className="p-1 bg-gray-700 hover:bg-gray-600 rounded text-white text-xs"
                title="复制代码"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </button>
            </div>
          </div>
        );
        
      case SandboxMode.INTERACTIVE:
        return (
          <div className="h-full">
            <textarea
              value={currentCode}
              onChange={(e) => setCurrentCode(e.target.value)}
              className="w-full h-full min-h-[200px] p-4 bg-gray-800 text-white font-mono text-sm border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{ height: sandboxOptions.height }}
              spellCheck="false"
              placeholder={`在这里编辑您的${language}代码...`}
            />
            <div className="flex justify-between mt-2">
              <div>
                <button
                  onClick={runCode}
                  className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded text-sm mr-2"
                  disabled={loading}
                >
                  {loading ? '运行中...' : '运行代码'}
                </button>
                <button
                  onClick={resetCode}
                  className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white rounded text-sm"
                >
                  重置代码
                </button>
              </div>
              <button
                onClick={createCodePen}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm flex items-center gap-1"
              >
                <span>在CodePen中打开</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </button>
            </div>
          </div>
        );
        
      case SandboxMode.RESULT:
        // 对于HTML，渲染HTML预览
        if (language === 'html') {
          return (
            <div className="h-full border border-gray-300 dark:border-gray-700 rounded-lg overflow-hidden">
              <iframe
                title="HTML Preview"
                srcDoc={currentCode}
                className="w-full h-full"
                style={{ height: sandboxOptions.height, border: 'none' }}
                sandbox="allow-scripts"
              />
            </div>
          );
        }
        
        // 其他语言，显示控制台输出
        return (
          <div
            className="w-full h-full min-h-[200px] p-4 bg-gray-800 text-white font-mono text-sm rounded-lg overflow-auto"
            style={{ height: sandboxOptions.height }}
          >
            {result.error ? (
              <div className="text-red-400 whitespace-pre-wrap">{result.error}</div>
            ) : result.output ? (
              <div className="whitespace-pre-wrap">{result.output}</div>
            ) : (
              <div className="text-gray-500">先在"交互"标签中运行代码，查看结果</div>
            )}
          </div>
        );
        
      default:
        return null;
    }
  };

  // 获取标签文本
  const getTabText = (tabMode: SandboxMode) => {
    switch (tabMode) {
      case SandboxMode.CODE:
        return '代码';
      case SandboxMode.INTERACTIVE:
        return '交互';
      case SandboxMode.RESULT:
        return language === 'html' ? '预览' : '结果';
      default:
        return '';
    }
  };

  // 获取标签图标
  const getTabIcon = (tabMode: SandboxMode) => {
    switch (tabMode) {
      case SandboxMode.CODE:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case SandboxMode.INTERACTIVE:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        );
      case SandboxMode.RESULT:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  // 确定哪些模式应该显示
  const availableModes = [SandboxMode.CODE, SandboxMode.INTERACTIVE];
  
  // HTML、JavaScript 和 TypeScript 可以查看结果
  if (['html', 'javascript', 'typescript'].includes(language)) {
    availableModes.push(SandboxMode.RESULT);
  }

  return (
    <div className={`border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden shadow-sm ${className}`}>
      {/* 标题和操作栏 */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2">
          {title && <h3 className="font-medium text-sm text-gray-700 dark:text-gray-300">{title}</h3>}
          <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 rounded-full">
            {language}
          </span>
        </div>
      </div>
      
      {/* 标签栏 */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        {availableModes.map((tabMode) => (
          <button
            key={tabMode}
            onClick={() => setMode(tabMode)}
            className={`
              flex items-center px-4 py-2 text-sm border-b-2 focus:outline-none transition-colors
              ${mode === tabMode
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200'
              }
            `}
          >
            <span className="mr-1.5">{getTabIcon(tabMode)}</span>
            <span>{getTabText(tabMode)}</span>
          </button>
        ))}
      </div>
      
      {/* 内容区域 */}
      <AnimatePresence mode="wait">
        <motion.div
          key={mode}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {renderContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CodeSandbox; 