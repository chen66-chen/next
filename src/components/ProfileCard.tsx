"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * ProfileCard 组件用于展示用户的个人资料卡片，包含用户信息、统计数据、社交媒体链接、最近访客等内容。
 * 
 * @returns {JSX.Element} 渲染的个人资料卡片组件。
 */
export function ProfileCard() {
  // 使用 useState 钩子来管理鼠标悬停状态
  const [isHovered, setIsHovered] = useState(false);
  
  // 模拟访问量数据
  const stats = {
    views: 10000,
    posts: 42,
    followers: 3000,
    following: 156
  };
  
  // 模拟心情状态
  const [mood, setMood] = useState('开心');
  // 定义所有可能的心情状态
  const moods = ['开心', '悲伤', '思考', '兴奋', '无聊', '困倦', '愤怒'];
  
  // 模拟最近访客
  const visitors = [
    { id: 1, name: '小明', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1' },
    { id: 2, name: '小红', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=2' },
    { id: 3, name: '小刚', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=3' },
    { id: 4, name: '小丽', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=4' },
    { id: 5, name: '小白', avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=5' },
  ];
  
  /**
   * 格式化数字，根据数字大小添加相应的单位（如 w 表示万，k 表示千）。
   * 
   * @param {number} num - 要格式化的数字。
   * @returns {string} 格式化后的字符串。
   */
  const formatNumber = (num: number): string => {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + 'w';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k';
    }
    return num.toString();
  };
  
  return (
    // 卡片容器，设置最大宽度并居中显示
    <div className="w-full max-w-xs mx-auto">
      <div 
        // 卡片主体样式，包含背景、边框、阴影等效果，鼠标悬停时有过渡动画
        className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden shadow-md border border-blue-100 dark:border-blue-900 transition-all duration-300"
        // 鼠标进入时设置悬停状态为 true
        onMouseEnter={() => setIsHovered(true)}
        // 鼠标离开时设置悬停状态为 false
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* 封面背景 */}
        <div className="relative h-32 overflow-hidden">
          {/* 封面图片 */}
          <Image 
            src="/images/2.png" 
            alt="Profile Cover"
            fill
            className="object-cover"
          />
          {/* 封面渐变遮罩 */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50"></div>
          
          {/* 头像 */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-20 h-20 border-1 border-white dark:border-gray-900 rounded-full overflow-hidden shadow-lg transition-transform duration-300 transform hover:scale-105">
            <Image 
              src="/images/2.png"
              alt="Profile Avatar"
              fill
              className="object-cover"
            />
          </div>
        </div>
        
        {/* 用户信息 */}
        <div className="pt-12 px-4 pb-4 text-center">
          {/* 用户姓名 */}
          <h3 className="font-['KuaiKanShiJieTi'] text-lg text-gray-800 dark:text-gray-200 mb-1">
            Chryssolion Chen
          </h3>
          {/* 用户在线状态和心情信息 */}
          <div className="flex items-center justify-center gap-1 text-xs text-gray-500 dark:text-gray-400 mb-2">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span>在线</span>
            <span className="mx-1">|</span>
            <span>当前心情：{mood}</span>
          </div>
          
          {/* 心情选择器 - 鼠标移入时显示 */}
          {isHovered && (
            <div className="flex flex-wrap justify-center gap-1 mb-2 animate-fadeIn">
              {/* 遍历所有心情状态，生成选择按钮 */}
              {moods.map((m) => (
                <button 
                  key={m}
                  // 点击按钮时更新当前心情状态
                  onClick={() => setMood(m)}
                  className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    // 根据当前心情状态设置按钮样式
                    mood === m 
                      ? 'bg-blue-500 text-white' 
                      : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          )}
          
          {/* 用户简介 */}
          <p className="text-xs text-gray-600 dark:text-gray-400 border-l-2 border-blue-400 pl-2 text-left italic mb-3">
            "探索未知的世界，记录生活的点滴，分享技术与思考。"
          </p>
          
          {/* 统计信息 */}
          <div className="grid grid-cols-4 gap-2 mb-4">
            {/* 访问量统计 */}
            <div className="text-center">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{formatNumber(stats.views)}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">访问量</div>
            </div>
            {/* 文章数量统计 */}
            <div className="text-center">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{stats.posts}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">文章</div>
            </div>
            {/* 粉丝数量统计 */}
            <div className="text-center">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{stats.followers}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">粉丝</div>
            </div>
            {/* 关注数量统计 */}
            <div className="text-center">
              <div className="text-sm font-medium text-gray-800 dark:text-gray-200">{stats.following}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">关注</div>
            </div>
          </div>
          
          {/* 彩色分割线 */}
          <div className="h-0.5 bg-gradient-to-r from-blue-300 via-purple-300 to-pink-300 dark:from-blue-700 dark:via-purple-700 dark:to-pink-700 rounded-full mb-3"></div>
          
          {/* 社交媒体图标 */}
          <div className="flex justify-center gap-4 mb-3">
            {/* 微信图标 */}
            <a 
              href="#" 
              // 点击时弹出微信号提示框
              onClick={(e) => {
                e.preventDefault();
                alert('微信号：我不告诉你');
              }}
              className="relative group" 
              title="微信"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-green-400 to-green-600 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M8.167 10.283c-.571 0-1.025-.46-1.025-1.03 0-.566.459-1.03 1.025-1.03.565 0 1.029.464 1.029 1.03 0 .57-.464 1.03-1.03 1.03zm7.665 0c-.565 0-1.029-.46-1.029-1.03 0-.566.464-1.03 1.03-1.03.57 0 1.029.464 1.029 1.03 0 .57-.459 1.03-1.03 1.03zm-9.999 4.198C2.993 12.208 0 9.82 0 6.808 0 3.39 3.841 0 8.5 0c4.082 0 7.564 2.56 8.173 6.008a9.52 9.52 0 0 0-1.087-.06c-3.741 0-6.997 2.465-8.173 6.008-.361 0-.722.01-1.054.03-.271.02-.542.06-.813.1-.271.05-.526.11-.722.192zm17.001 3.171c0 2.623-2.52 4.346-5.833 4.346-.698 0-1.377-.073-2.033-.219-.722.432-2.316 1.335-3.037 1.553.271-.887.361-1.663.361-1.994h-.023C4.178 17.099 2 15.395 2 13.453c0-2.463 2.993-4.318 6.5-4.318 3.544 0 6.5 1.855 6.5 4.318 0 .14-.9.277-.23.415.15.01.38.02.6.02 3.35 0 6.167 1.706 6.167 3.766z" />
                </svg>
              </div>
              {/* 鼠标悬停时显示的提示文字 */}
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                微信
              </span>
            </a>
            
            {/* GitHub图标 */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group" 
              title="GitHub"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-900 dark:from-gray-600 dark:to-gray-800 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.333-1.755-1.333-1.755-1.09-.745.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.807 1.305 3.492.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 21.795 24 17.295 24 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </div>
              {/* 鼠标悬停时显示的提示文字 */}
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                GitHub
              </span>
            </a>
            
            {/* X（推特）图标 */}
            <a 
              href="https://x.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="relative group" 
              title="X (Twitter)"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-black dark:bg-gray-800 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M13.6823 10.6218L20.2391 3H18.5796L12.9334 9.61788L8.42616 3H3.2002L10.0045 13.0074L3.2002 21H4.85974L10.7531 14.0113L15.4771 21H20.7031L13.6819 10.6218H13.6823ZM11.5678 13.0991L10.9411 12.1531L5.31445 4.28938H7.70064L12.1742 10.4469L12.8009 11.3931L18.5803 19.4999H16.1937L11.5678 13.0994V13.0991Z" />
                </svg>
              </div>
              {/* 鼠标悬停时显示的提示文字 */}
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                X
              </span>
            </a>
            
            {/* QQ图标 */}
            <a 
              href="#" 
              // 点击时弹出QQ号提示框
              onClick={(e) => {
                e.preventDefault();
                alert('QQ号：243108532@qq.com');
              }}
              className="relative group" 
              title="QQ"
            >
              <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-blue-400 to-blue-600 rounded-full shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-white">
                  <path d="M12.003 0C5.376 0 0 5.373 0 12s5.376 12 12.003 12C18.627 24 24 18.627 24 12s-5.373-12-11.997-12zm6.081 17.361c-.136.48-.73.311-1.047.155-.136-.67.252-1.022-.003-1.195-.864-.058-1.698-1.02-2.174-1.854.723-.131 1.331-.904 1.331-1.844 0-1.094-.924-1.976-2.064-1.976-1.141 0-2.068.882-2.068 1.976 0 .938.61 1.713 1.329 1.844-.477.834-1.827 1.445-2.166 1.842-.135.174.087.68-.049 1.195-.311.177-.904.354-1.047-.155-.073-.574.407-2.199.587-2.49.062-.105-.053-.18-.144-.154-.039.011-.075.033-.101.064-.42.519-1.284 1.764-1.038 3.035.065.336.409 1.325 1.362 1.312 0 0 .49 1.215 1.616 2.058.36.27 1.36.854 3.306.854s2.948-.583 3.308-.854c1.124-.843 1.615-2.058 1.615-2.058.953.013 1.297-.976 1.362-1.312.244-1.271-.618-2.516-1.039-3.035a.226.226 0 0 0-.101-.064c-.09-.026-.206.049-.144.154.184.294.665 1.924.586 2.51zm-8.288-6.778c.898-.743 2.514-1.292 3.628-1.292.703 0 1.662.309 1.662.309v-.619h-7.658v.618s.959-.308 1.662-.308c1.115 0 1.929.549 2.827 1.292.12.101.45.101.566 0h.313z" />
                </svg>
              </div>
              {/* 鼠标悬停时显示的提示文字 */}
              <span className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity">
                QQ
              </span>
            </a>
          </div>
          
          {/* 最近访客 */}
          <div className="mb-3">
            <h4 className="text-xs text-gray-700 dark:text-gray-300 font-medium text-left mb-2">最近访客</h4>
            <div className="flex flex-wrap gap-2">
              {visitors.map((visitor) => (
                <div 
                  key={visitor.id} 
                  className="flex flex-col items-center justify-center group cursor-pointer"
                  title={visitor.name}
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 dark:border-gray-700 transition-transform group-hover:scale-110">
                    <Image 
                      src={visitor.avatar}
                      alt={visitor.name}
                      width={32}
                      height={32}
                      className="object-cover"
                    />
                  </div>
                  {/* 鼠标悬停时显示访客姓名 */}
                  <span className="text-[10px] text-gray-500 dark:text-gray-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    {visitor.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* 快速链接 */}
          <div className="grid grid-cols-3 gap-2">
            <Link href="/about" className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium py-1 px-2 rounded transition-colors">
              关于我
            </Link>
            <Link href="/friends" className="bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium py-1 px-2 rounded transition-colors">
              我的好友
            </Link>
            <Link href="/message" className="bg-green-500 hover:bg-green-600 text-white text-xs font-medium py-1 px-2 rounded transition-colors">
              给我留言
            </Link>
          </div>
        </div>
        
        {/* 底部装饰 */}
        <div className="h-1 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400"></div>
      </div>
      
      {/* 额外的装饰元素 */}
      <div className="relative mt-4 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg p-3 shadow-md border border-gray-100 dark:border-gray-800">
        <div className="absolute -top-2 -left-2 w-5 h-5 bg-yellow-300 rounded-full flex items-center justify-center shadow-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-yellow-800" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h4 className="text-xs font-bold text-gray-700 dark:text-gray-300 mb-1">正在播放</h4>
        <div className="flex items-center">
          <div className="w-8 h-8 bg-gradient-to-br from-pink-400 to-purple-500 rounded flex-shrink-0 mr-2 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
              <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
            </svg>
          </div>
          <div className="overflow-hidden flex-1">
            {/* 歌曲名称 */}
            <div className="text-xs font-medium text-gray-800 dark:text-gray-200 truncate">晴天 - 周杰伦</div>
            {/* 歌曲进度条 */}
            <div className="h-1 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mac风格代码块 */}
      <div className="mt-4 overflow-hidden rounded-lg shadow-md">
        {/* Mac风格窗口顶部 */}
        <div className="h-6 bg-gray-200 dark:bg-gray-800 flex items-center px-2 relative">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
          </div>
          <div className="absolute left-1/2 transform -translate-x-1/2 text-[10px] text-gray-500 dark:text-gray-400 font-medium">
            chryssolion@root ~ 
          </div>
        </div>
        
        {/* 代码区域 */}
        <div className="bg-gray-900 p-3 font-mono text-xs text-gray-200 h-32 overflow-hidden">
          <CodeTypingEffect />
        </div>
      </div>
    </div>
  );
}

// 打字效果组件
function CodeTypingEffect() {
  const [displayText, setDisplayText] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  
  // 要显示的代码行
  const codeLines = [
    '> Hello, World! 👋',
    '> const aboutMe = {',
    '>   name: "Chryssolion Chen",',
    '>   skills: ["React", "TypeScript", "Next.js"],',
    '>   hobbies: ["Coding", "Photography", "Music"]',
    '> };',
    '> console.log("Welcome to my blog!");'
  ];
  
  useEffect(() => {
    if (currentLine >= codeLines.length) {
      // 全部打完后，等待一段时间重新开始
      const timer = setTimeout(() => {
        setCurrentLine(0);
        setDisplayText('');
      }, 3000);
      return () => clearTimeout(timer);
    }
    
    // 当前正在打的一行
    const currentLineText = codeLines[currentLine];
    
    // 如果当前行已经完全显示
    if (displayText === currentLineText) {
      // 等待一段时间后进入下一行
      const timer = setTimeout(() => {
        setCurrentLine(prev => prev + 1);
        setDisplayText(prev => prev + '\n');
      }, 500);
      return () => clearTimeout(timer);
    }
    
    // 逐字打印效果
    const timer = setTimeout(() => {
      if (displayText.split('\n').length - 1 === currentLine) {
        // 正在打当前行的字符
        setDisplayText(prev => prev + currentLineText.charAt(prev.length - prev.lastIndexOf('\n') - 1));
      } else {
        // 开始打新的一行
        setDisplayText(prev => prev + currentLineText.charAt(0));
      }
    }, 50 + Math.random() * 70); // 随机延迟，更像真人打字
    
    return () => clearTimeout(timer);
  }, [displayText, currentLine]);
  
  // 处理换行
  const formattedText = displayText.split('\n').map((line, i) => (
    <div key={i} className={i === currentLine ? 'typing-line' : ''}>
      {line}
      {i === currentLine && <span className="inline-block w-2 h-4 ml-0.5 bg-blue-400 animate-pulse"></span>}
    </div>
  ));
  
  return (
    <div className="font-mono text-xs leading-5">
      {formattedText}
    </div>
  );
}