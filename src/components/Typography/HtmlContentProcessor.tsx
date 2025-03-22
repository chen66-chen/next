"use client";

import React, { useEffect, useRef } from 'react';
import FuturisticKeyword from './FuturisticKeyword';

// 添加highlight.js的全局类型声明
declare global {
  interface Window {
    hljs?: any;
  }
}

interface HtmlContentProcessorProps {
  htmlContent: string;
  className?: string;
}

const HtmlContentProcessor: React.FC<HtmlContentProcessorProps> = ({
  htmlContent,
  className = ''
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 技术关键词及其对应的类型
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
  
  // 处理HTML内容，高亮技术关键词
  useEffect(() => {
    if (!containerRef.current) return;
    
    // 先渲染HTML
    containerRef.current.innerHTML = htmlContent;
    
    // 处理代码块样式
    const enhanceCodeBlocks = () => {
      if (!containerRef.current) return;
      
      // 查找所有预格式化代码块
      const preElements = containerRef.current.querySelectorAll('pre');
      preElements.forEach(pre => {
        // 添加Mac终端风格类
        pre.classList.add('relative');
        
        // 检查是否已经有窗口控件
        if (!pre.querySelector('.window-controls')) {
          // 创建窗口控件元素
          const windowControls = document.createElement('div');
          windowControls.className = 'window-controls';
          pre.insertBefore(windowControls, pre.firstChild);
        }
        
        // 设置语言标识
        const codeElement = pre.querySelector('code');
        if (codeElement) {
          // 检测语言类型
          const codeClasses = Array.from(codeElement.classList || []);
          const languageClass = codeClasses.find(cls => cls.startsWith('language-'));
          const language = languageClass ? languageClass.replace('language-', '') : '';
          
          // 设置语言标签
          if (language) {
            pre.setAttribute('data-language', language);
          }
          
          // 针对bash/shell命令行添加特殊样式
          if (language === 'bash' || language === 'sh' || language === 'shell' || 
              codeElement.textContent?.includes('$') || codeElement.textContent?.includes('#')) {
            pre.classList.add('terminal-style');
            
            // 如果是命令行，但没有language类，添加bash类
            if (!language) {
              codeElement.classList.add('language-bash');
            }
            
            // 分割成行并添加特殊样式
            let lines = codeElement.innerHTML.split('\n');
            const formattedLines = lines.map(line => {
              const trimmedLine = line.trim();
              // 对空行进行处理
              if (trimmedLine === '') return line;
              
              // 处理注释行
              if (trimmedLine.startsWith('#')) {
                return `<span class="bash-comment">${line}</span>`;
              } 
              // 处理命令行
              else if (trimmedLine.length > 0) {
                // 将命令行中的实际命令着色
                const lineWithHighlight = line.replace(
                  /^(\s*)(\$\s+)?([a-zA-Z0-9_.-]+)/,
                  (match, space, prompt, command) => {
                    space = space || '';
                    prompt = prompt || '';
                    return `${space}${prompt}<span class="bash-command">${command}</span>`;
                  }
                );
                return `<span class="bash-line">${lineWithHighlight}</span>`;
              }
              return line;
            });
            
            codeElement.innerHTML = formattedLines.join('\n');
          } 
          // 为其他代码添加高亮
          else if (language) {
            // 加载 highlight.js 脚本（如果尚未加载）
            if (!window.hljs && !document.getElementById('hljs-script')) {
              const script = document.createElement('script');
              script.id = 'hljs-script';
              script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
              script.onload = () => {
                // 脚本加载后应用高亮
                if (window.hljs && codeElement) {
                  window.hljs.highlightElement(codeElement);
                }
              };
              document.head.appendChild(script);
              
              // 添加样式
              if (!document.getElementById('hljs-styles')) {
                const style = document.createElement('link');
                style.id = 'hljs-styles';
                style.rel = 'stylesheet';
                style.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/atom-one-dark.min.css';
                document.head.appendChild(style);
              }
            } else if (window.hljs) {
              // hljs 已加载，直接应用高亮
              window.hljs.highlightElement(codeElement);
            }
          }
        }
      });
      
      // 添加复制按钮
      const addCopyButtons = () => {
        const codeBlocks = containerRef.current?.querySelectorAll('pre');
        if (!codeBlocks) return;
        
        codeBlocks.forEach(codeBlock => {
          // 避免重复添加
          if (codeBlock.querySelector('.code-copy-button')) return;
          
          const copyButton = document.createElement('button');
          copyButton.className = 'code-copy-button';
          copyButton.textContent = '复制';
          copyButton.type = 'button';
          
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
      
      // 添加复制按钮
      addCopyButtons();
    };
    
    // 增强代码块显示
    enhanceCodeBlocks();
    
    // 然后查找并处理技术关键词
    const processNode = (node: Node) => {
      // 如果是文本节点，处理关键词
      if (node.nodeType === Node.TEXT_NODE && node.textContent) {
        const text = node.textContent;
        
        // 获取所有关键词并按长度排序
        const keywords = Object.keys(techKeywords).sort((a, b) => b.length - a.length);
        
        for (const keyword of keywords) {
          // 转义特殊字符，防止正则表达式报错
          const escapedKeyword = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          
          // 创建一个正则表达式，匹配完整单词
          const regex = new RegExp(`(^|\\s|[.,;!?"'\\[\\](){}])(${escapedKeyword})($|\\s|[.,;!?"'\\[\\](){}])`, 'g');
          
          if (regex.test(text)) {
            // 分割文本
            const parts = text.split(regex);
            
            // 创建片段
            const fragment = document.createDocumentFragment();
            
            let i = 0;
            while (i < parts.length) {
              // 添加前缀
              if (i < parts.length) fragment.appendChild(document.createTextNode(parts[i]));
              i++;
              
              // 添加关键词
              if (i < parts.length && parts[i] === keyword) {
                // 创建关键词包装器
                const keywordSpan = document.createElement('span');
                keywordSpan.className = `inline-block font-mono px-1 py-0.5 rounded border-b relative overflow-hidden transition-all duration-200 futuristic-keyword futuristic-keyword-${techKeywords[keyword]}`;
                keywordSpan.textContent = parts[i];
                
                // 添加到片段
                fragment.appendChild(keywordSpan);
              } else if (i < parts.length) {
                fragment.appendChild(document.createTextNode(parts[i]));
              }
              i++;
              
              // 添加后缀
              if (i < parts.length) fragment.appendChild(document.createTextNode(parts[i]));
              i++;
            }
            
            // 替换原节点
            if (node.parentNode) {
              node.parentNode.replaceChild(fragment, node);
              return true; // 已处理
            }
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // 对于元素节点，需要检查是否是代码块或已处理的关键词
        const element = node as HTMLElement;
        
        // 跳过代码块和预格式化文本
        if (element.tagName === 'CODE' || element.tagName === 'PRE' || element.classList.contains('futuristic-keyword')) {
          return false;
        }
        
        // 处理子节点
        const childNodes = Array.from(node.childNodes);
        let i = 0;
        while (i < childNodes.length) {
          const processed = processNode(childNodes[i]);
          // 如果处理了节点，子节点可能已更改，需要重新获取
          if (processed) {
            childNodes.splice(i, 1, ...Array.from(node.childNodes).slice(i));
          } else {
            i++;
          }
        }
      }
      
      return false;
    };
    
    // 处理整个容器
    processNode(containerRef.current);
    
    // 添加事件处理器
    const keywords = containerRef.current.querySelectorAll('.futuristic-keyword');
    keywords.forEach(keyword => {
      // 鼠标悬停效果
      keyword.addEventListener('mouseenter', (e) => {
        const target = e.target as HTMLElement;
        target.style.textShadow = '0 0 8px currentColor';
        target.style.letterSpacing = '0.05em';
        
        // 根据类型应用不同的背景色
        const colorType = Array.from(target.classList)
          .find(cls => cls.startsWith('futuristic-keyword-'))
          ?.replace('futuristic-keyword-', '');
          
        if (colorType) {
          let bgColor = 'rgba(37, 99, 235, 0.1)'; // 默认蓝色
          
          switch (colorType) {
            case 'purple':
              bgColor = 'rgba(147, 51, 234, 0.1)';
              break;
            case 'cyan':
              bgColor = 'rgba(8, 145, 178, 0.1)';
              break;
            case 'green':
              bgColor = 'rgba(22, 163, 74, 0.1)';
              break;
          }
          
          target.style.backgroundColor = bgColor;
        }
        
        // 添加扫描线
        const scanLine = document.createElement('div');
        scanLine.className = 'absolute left-0 w-full h-1 bg-white opacity-30 scan-line';
        scanLine.style.animation = 'scanLine 1.5s linear infinite';
        target.appendChild(scanLine);
      });
      
      // 鼠标离开效果
      keyword.addEventListener('mouseleave', (e) => {
        const target = e.target as HTMLElement;
        target.style.textShadow = 'none';
        target.style.letterSpacing = 'normal';
        target.style.backgroundColor = 'transparent';
        
        // 移除扫描线
        const scanLine = target.querySelector('.scan-line');
        if (scanLine) target.removeChild(scanLine);
      });
    });
    
    // 添加扫描线动画样式
    if (!document.querySelector('#scan-line-style')) {
      const style = document.createElement('style');
      style.id = 'scan-line-style';
      style.textContent = `
        @keyframes scanLine {
          0% { top: -100%; }
          100% { top: 100%; }
        }
      `;
      document.head.appendChild(style);
    }
  }, [htmlContent]);
  
  return (
    <div ref={containerRef} className={className}></div>
  );
};

export default HtmlContentProcessor; 