"use client";

import React, { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import 'highlight.js/styles/atom-one-dark.css';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // 添加额外复制代码按钮功能
  useEffect(() => {
    const addCopyButtons = () => {
      const codeBlocks = document.querySelectorAll('pre');
      codeBlocks.forEach(codeBlock => {
        // 避免重复添加
        if (codeBlock.querySelector('.code-copy-button')) return;
        
        const copyButton = document.createElement('button');
        copyButton.className = 'code-copy-button absolute top-4 right-4 bg-gray-700 hover:bg-gray-600 text-white rounded-md px-2 py-1 text-xs opacity-70 hover:opacity-100 transition-opacity';
        copyButton.textContent = '复制';
        copyButton.type = 'button';
        
        // 设置相对定位容器
        if (!codeBlock.style.position) {
          codeBlock.style.position = 'relative';
        }
        
        copyButton.addEventListener('click', () => {
          const code = codeBlock.querySelector('code');
          if (code) {
            const codeText = code.textContent || '';
            navigator.clipboard.writeText(codeText)
              .then(() => {
                copyButton.textContent = '已复制！';
                setTimeout(() => {
                  copyButton.textContent = '复制';
                }, 2000);
              })
              .catch(err => {
                console.error('复制失败:', err);
                copyButton.textContent = '复制失败';
                setTimeout(() => {
                  copyButton.textContent = '复制';
                }, 2000);
              });
          }
        });
        
        codeBlock.appendChild(copyButton);
      });
    };
    
    // 延迟一点执行以确保渲染完成
    const timeoutId = setTimeout(() => {
      addCopyButtons();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [content]);

  return (
    <div className={`prose max-w-none dark:prose-invert ${className}`}>
      <ReactMarkdown 
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '')
            const isCommandLine = match && (match[1] === 'bash' || match[1] === 'sh')
            
            if (!inline && match) {
              // 修复对象转换为字符串的问题
              const rawContent = Array.isArray(children) 
                ? children.join('') 
                : String(children);
              
              let formattedContent = rawContent.replace(/\n$/, '')
              
              // 增强命令行显示效果
              if (isCommandLine) {
                // 为每行命令添加类以便应用样式
                formattedContent = formattedContent
                  .split('\n')
                  .map(line => {
                    if (line.trim().startsWith('#')) {
                      // 这是注释行
                      return `<span class="bash-comment">${line}</span>`
                    } else if (line.trim().length > 0) {
                      // 将命令行中的实际命令（第一个单词或sudo后的第一个单词）着色为金色
                      const lineWithHighlight = line.replace(
                        /(sudo\s+)?([a-zA-Z0-9_.-]+)/,
                        (match, sudo, command) => {
                          if (sudo) {
                            return `${sudo}<span class="bash-command">${command}</span>`;
                          }
                          return `<span class="bash-command">${command}</span>`;
                        }
                      );
                      return `<span class="bash-line">${lineWithHighlight}</span>`;
                    }
                    return line
                  })
                  .join('\n')
              }
              
              // 设置语言标签
              const language = match[1];
              const preProps = {
                className: isCommandLine ? "terminal-style relative" : "relative",
                'data-language': language
              };
              
              return (
                <pre {...preProps}>
                  <div className="window-controls"></div>
                  <code
                    className={className}
                    dangerouslySetInnerHTML={{ __html: formattedContent }}
                    {...props}
                  />
                </pre>
              )
            }
            
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer; 