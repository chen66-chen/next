'use client'

import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'

const KaliTerminal = () => {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState<string[]>([
    '┌──(root㉿kali)-[~]',
    '│',
    '│ 🖥️ 欢迎使用Kali Linux终端',
    '│ 💡 提示：输入 "cd linux" 访问Linux文章',
    '│ ⌨️ 输入 "help" 查看更多命令',
    '│',
    '└─# '
  ])
  const [prompt, setPrompt] = useState('└─# ')
  const inputRef = useRef<HTMLInputElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  // 存储滚动位置以防止自动滚动
  const scrollPosRef = useRef(0);
  // 是否已经激活终端
  const [isActive, setIsActive] = useState(false);

  // 移除全局点击事件监听，改为只有点击终端区域才获取焦点
  useEffect(() => {
    // 保存当前滚动位置
    const saveScrollPosition = () => {
      scrollPosRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, []);

  // 自动滚动终端内容到底部，但不滚动页面
  useEffect(() => {
    if (terminalRef.current && isActive) {
      // 仅在终端激活状态下滚动终端内容
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
      
      // 恢复页面滚动位置，防止页面滚动
      requestAnimationFrame(() => {
        window.scrollTo({
          top: scrollPosRef.current,
          behavior: 'auto'
        });
      });
    }
  }, [output, isActive]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      // 记录当前滚动位置
      scrollPosRef.current = window.scrollY;
      
      processCommand();
      
      // 防止页面滚动
      e.preventDefault();
    }
  }

  // 点击终端区域时才激活终端并获取焦点
  const activateTerminal = (e: React.MouseEvent) => {
    // 记录点击前的滚动位置
    scrollPosRef.current = window.scrollY;
    
    // 防止事件冒泡
    e.stopPropagation();
    
    // 设置终端为激活状态
    setIsActive(true);
    
    // 获取输入焦点
    if (inputRef.current) {
      inputRef.current.focus();
    }
    
    // 恢复原始滚动位置
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto'
      });
    });
  };

  const processCommand = () => {
    const command = input.trim()
    const newOutput = [...output.slice(0, -1), output[output.length - 1] + command]
    
    // 处理不同的命令
    if (command === 'cd linux') {
      newOutput.push('正在进入 Linux 文章目录...')
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
      // 导航到linux文章页面，保存滚动位置
      sessionStorage.setItem('scrollPosition', scrollPosRef.current.toString());
      setTimeout(() => {
        router.push('/posts/linux')
      }, 1000)
    } else if (command === 'ls') {
      newOutput.push('Documents  Downloads  linux  Pictures  Desktop')
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
    } else if (command === 'clear') {
      setOutput(['┌──(root㉿kali)-[~]', '└─# '])
      setInput('')
      return
    } else if (command === 'help') {
      newOutput.push('可用命令:')
      newOutput.push('  cd linux    - 查看Linux文章')
      newOutput.push('  ls          - 列出当前目录文件')
      newOutput.push('  clear       - 清屏')
      newOutput.push('  uname -a    - 显示系统信息')
      newOutput.push('  help        - 显示帮助信息')
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
    } else if (command === 'uname -a') {
      newOutput.push('Linux kali 6.1.0-kali5-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.27-1kali1 (2023-05-12) x86_64 GNU/Linux')
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
    } else if (command === '') {
      // 空命令
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
    } else {
      newOutput.push(`命令未找到: ${command}`)
      newOutput.push('💡 提示: 请尝试输入 "cd linux" 来查看Linux文章')
      setOutput([...newOutput, '┌──(root㉿kali)-[~]', '└─# '])
    }
    
    setInput('')
    
    // 恢复页面滚动位置
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto'
      });
    });
  }

  return (
    <div className="bg-black rounded-lg overflow-hidden shadow-lg relative">
      {/* 终端标题栏 */}
      <div className="bg-[#1e1e1e] px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-white text-xs mx-auto">kali@terminal: ~</div>
      </div>
      
      {/* 终端内容 */}
      <div 
        ref={terminalRef}
        className="h-64 p-3 overflow-auto font-mono"
        onClick={activateTerminal}
      >
        {output.map((line, i) => (
          <div key={i} className="whitespace-pre-wrap break-all">
            {i === output.length - 1 ? (
              <>
                <span className="text-red-500">{line}</span>
                <span className="text-white">{input}</span>
                {isActive && <span className="inline-block w-2 h-4 bg-green-500 ml-0.5 animate-pulse"></span>}
              </>
            ) : line.startsWith('┌──') ? (
              <span className="text-red-500">{line}</span>
            ) : line.startsWith('└─') ? (
              <span className="text-red-500">{line}</span>
            ) : line.startsWith('│ 💡') ? (
              <span className="text-yellow-300 font-bold">{line}</span>
            ) : line.startsWith('│') ? (
              <span className="text-cyan-400">{line}</span>
            ) : line.includes('提示:') ? (
              <span className="text-yellow-300 font-bold">{line}</span>
            ) : (
              <span className="text-white">{line}</span>
            )}
          </div>
        ))}
        
        {!isActive && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white cursor-pointer">
            <span className="px-4 py-2 bg-green-600 rounded text-sm animate-pulse">点击此处激活终端</span>
          </div>
        )}
      </div>
      
      {/* 隐藏的输入框 */}
      <input
        ref={inputRef}
        type="text"
        className="opacity-0 absolute -z-10"
        value={input}
        onChange={(e) => {
          // 保存滚动位置
          const scrollPos = window.scrollY;
          setInput(e.target.value);
          // 防止输入导致页面滚动
          requestAnimationFrame(() => {
            window.scrollTo({
              top: scrollPos,
              behavior: 'auto'
            });
          });
        }}
        onKeyDown={handleKeyDown}
        // 移除自动聚焦
        // autoFocus
      />
    </div>
  )
}

export default KaliTerminal 