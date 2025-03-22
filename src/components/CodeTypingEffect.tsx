'use client'

import React, { useState, useEffect } from "react"

const CodeTypingEffect = () => {
  // 自动打字效果的状态
  const [currentText, setCurrentText] = useState("");
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  
  // 代码行
  const codeLines = [
    "// 博客文章构建器",
    "class BlogPost {",
    "  constructor(title, content, author) {",
    "    this.title = title;",
    "    this.content = content;",
    "    this.author = author;",
    "    this.date = new Date();",
    "    this.comments = [];",
    "    this.likes = 0;",
    "  }",
    "  ",
    "  addComment(user, text) {",
    "    this.comments.push({",
    "      user,",
    "      text,",
    "      date: new Date()",
    "    });",
    "    console.log(`${user} 发表了评论`);",
    "  }",
    "  ",
    "  like() {",
    "    this.likes++;",
    "    console.log(`获得了一个点赞，总数: ${this.likes}`);",
    "  }",
    "  ",
    "  publish() {",
    "    console.log(`《${this.title}》已发布`);",
    "    console.log(`作者: ${this.author}`);",
    "    return true;",
    "  }",
    "}",
    "",
    "// 创建新文章",
    "const post = new BlogPost(",
    "  '如何构建个人博客',", 
    "  '这篇文章将介绍搭建博客的步骤...',",
    "  'Chryssolion Chen'",
    ");",
    "",
    "post.publish();",
    "post.addComment('访客', '写得真好！');",
    "post.like();"
  ];
  
  // 自动打字效果
  useEffect(() => {
    const typingInterval = setInterval(() => {
      if (currentLineIndex < codeLines.length) {
        const currentLine = codeLines[currentLineIndex];
        
        if (currentCharIndex < currentLine.length) {
          // 继续在当前行打字
          setCurrentText(prev => prev + currentLine[currentCharIndex]);
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // 换到下一行
          setCurrentText(prev => prev + "\n");
          setCurrentLineIndex(prev => prev + 1);
          setCurrentCharIndex(0);
        }
      } else {
        // 所有代码打完后，重新开始
        setCurrentText("");
        setCurrentLineIndex(0);
        setCurrentCharIndex(0);
      }
    }, 80); // 控制打字速度
    
    return () => clearInterval(typingInterval);
  }, [currentLineIndex, currentCharIndex]);

  return (
    <div className="bg-[#1e1e1e] rounded-lg overflow-hidden shadow-lg mb-6">
      {/* Mac风格标题栏 */}
      <div className="bg-gray-800 px-4 py-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="text-gray-400 text-xs mx-auto">code.js</div>
      </div>
      
      {/* 代码区域 */}
      <div className="p-4 font-mono text-xs text-gray-300 h-64 overflow-auto">
        <pre className="whitespace-pre-wrap">{currentText}</pre>
        <span className="inline-block w-2 h-4 bg-white animate-pulse"></span>
      </div>
    </div>
  );
};

export default CodeTypingEffect; 