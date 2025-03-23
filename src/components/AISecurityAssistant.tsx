'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, RefreshCw, ChevronDown, ArrowRight } from 'lucide-react';

// AI助手预设的安全问题建议
const SUGGESTED_QUESTIONS = [
  "什么是零日漏洞？如何防范？",
  "如何保护个人数据免受网络钓鱼攻击？",
  "什么是双因素认证？为什么它很重要？",
  "勒索软件是如何工作的？企业如何防范？",
  "安全开发生命周期包含哪些关键步骤？",
  "物联网设备面临哪些主要安全威胁？",
  "HTTPS与HTTP的主要安全区别是什么？",
  "如何正确设置企业防火墙策略？"
];

// 预设的安全问题回答库
const SECURITY_ANSWERS: Record<string, string> = {
  "什么是零日漏洞？如何防范？": 
    "零日漏洞（Zero-day Vulnerability）是指软件、硬件或固件中存在的未公开的安全漏洞，攻击者可以在厂商发布补丁之前利用它进行攻击。\n\n防范措施包括：\n1. 实施多层次防御策略\n2. 使用入侵检测/防御系统(IDS/IPS)\n3. 启用行为分析技术来检测异常活动\n4. 及时更新所有软件和系统\n5. 应用最小权限原则\n6. 考虑使用虚拟补丁技术",
  
  "如何保护个人数据免受网络钓鱼攻击？": 
    "保护个人数据免受网络钓鱼攻击的方法：\n\n1. 警惕不请自来的通信，特别是要求您提供敏感信息的邮件\n2. 检查发件人的电子邮件地址是否真实\n3. 不要点击可疑电子邮件中的链接，而是直接访问官方网站\n4. 启用电子邮件过滤器\n5. 使用强密码并定期更改\n6. 启用双因素认证\n7. 定期更新浏览器和安全软件\n8. 参加安全意识培训，了解最新的钓鱼技术",
  
  "什么是双因素认证？为什么它很重要？": 
    "双因素认证（2FA）是一种安全措施，要求用户提供两种不同类型的身份验证因素来验证身份。通常包括：\n\n1. 知识因素：用户知道的东西（如密码）\n2. 所有权因素：用户拥有的东西（如手机或安全令牌）\n3. 固有因素：用户的生物特征（如指纹）\n\n双因素认证之所以重要，是因为它大大提高了账户安全性。即使攻击者获取了用户的密码，没有第二个因素（如发送到用户手机的验证码），他们仍然无法访问账户。在数据泄露频繁发生的今天，2FA已成为保护敏感账户的基本措施。"
};

/**
 * AISecurityAssistant组件 - 提供网络安全领域的AI问答功能
 * 
 * 功能：
 * 1. 模拟AI对话界面，回答用户的网络安全问题
 * 2. 提供预设的安全问题建议
 * 3. 保存对话历史
 * 4. 支持重置对话
 */
export default function AISecurityAssistant() {
  // 状态定义
  const [input, setInput] = useState(''); // 用户输入
  const [messages, setMessages] = useState<{type: 'user' | 'ai', content: string}[]>([]); // 对话历史
  const [isTyping, setIsTyping] = useState(false); // AI是否正在"输入"
  const [showSuggestions, setShowSuggestions] = useState(true); // 是否显示建议问题
  
  const messagesEndRef = useRef<HTMLDivElement>(null); // 用于自动滚动到最新消息
  const inputRef = useRef<HTMLInputElement>(null); // 输入框引用
  
  // 发送消息的处理函数
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    // 添加用户消息到对话历史
    setMessages(prev => [...prev, {type: 'user', content: input}]);
    
    // 清空输入框
    setInput('');
    
    // 隐藏问题建议
    setShowSuggestions(false);
    
    // 模拟AI响应
    setIsTyping(true);
    
    // 查找是否有预设回答
    let response = '';
    if (SECURITY_ANSWERS[input]) {
      response = SECURITY_ANSWERS[input];
    } else {
      // 对于未预设的问题，生成一个通用回答
      response = `您的问题"${input}"涉及到网络安全的重要方面。建议您查阅相关的专业资料，或咨询安全专家获取更详细的信息。安全领域知识不断更新，保持学习是确保安全的关键。`;
    }
    
    // 模拟AI思考时间
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {type: 'ai', content: response}]);
    }, 1500);
  };
  
  // 处理建议问题点击
  const handleSuggestionClick = (question: string) => {
    setInput(question);
    handleSendMessage();
  };
  
  // 清空对话历史
  const resetConversation = () => {
    setMessages([]);
    setShowSuggestions(true);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  // 消息自动滚动到底部
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);
  
  // 键盘快捷键处理
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  return (
    <div className="h-full flex flex-col bg-gray-900/70 rounded-lg overflow-hidden border border-cyan-900/60">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-cyan-900/80 to-blue-900/80 p-4 flex justify-between items-center border-b border-cyan-800/50">
        <div className="flex items-center">
          <Bot className="text-cyan-400 mr-2 h-5 w-5" />
          <h3 className="text-white font-medium">安全卫士AI助手</h3>
        </div>
        <button 
          onClick={resetConversation}
          className="text-cyan-300 hover:text-cyan-100 p-1 rounded transition-colors"
          title="重置对话"
        >
          <RefreshCw className="h-4 w-4" />
        </button>
      </div>
      
      {/* 消息区域 */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 欢迎消息 */}
        {messages.length === 0 && (
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 rounded-lg p-4 border border-cyan-800/40">
            <p className="text-cyan-300 font-medium mb-2">👋 欢迎使用安全卫士AI助手</p>
            <p className="text-gray-300 text-sm">
              我可以回答您关于网络安全、隐私保护、安全最佳实践等问题。请在下方输入您的问题，或从推荐问题中选择。
            </p>
          </div>
        )}
        
        {/* 对话消息 */}
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] rounded-lg p-3 ${
                message.type === 'user' 
                  ? 'bg-blue-600/80 text-white rounded-tr-none' 
                  : 'bg-gray-800/80 text-gray-200 rounded-tl-none border border-cyan-900/40'
              }`}
            >
              <div className="flex items-center mb-1">
                {message.type === 'ai' && <Bot className="h-4 w-4 text-cyan-400 mr-1" />}
                <span className={`text-xs ${message.type === 'user' ? 'text-blue-200' : 'text-cyan-400'}`}>
                  {message.type === 'user' ? '您' : '安全卫士AI'}
                </span>
                {message.type === 'user' && <User className="h-4 w-4 text-blue-200 ml-1" />}
              </div>
              <div className="whitespace-pre-line text-sm">
                {message.content}
              </div>
            </div>
          </div>
        ))}
        
        {/* AI正在输入提示 */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-800/80 text-gray-300 rounded-lg rounded-tl-none p-3 max-w-[80%] border border-cyan-900/40">
              <div className="flex items-center mb-1">
                <Bot className="h-4 w-4 text-cyan-400 mr-1" />
                <span className="text-xs text-cyan-400">安全卫士AI</span>
              </div>
              <div className="flex space-x-1 items-center h-5">
                <div className="w-2 h-2 bg-cyan-400/70 rounded-full animate-pulse delay-100"></div>
                <div className="w-2 h-2 bg-cyan-400/70 rounded-full animate-pulse delay-200"></div>
                <div className="w-2 h-2 bg-cyan-400/70 rounded-full animate-pulse delay-300"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* 推荐问题 */}
        {showSuggestions && messages.length === 0 && (
          <div className="mt-4">
            <div className="flex items-center text-xs text-gray-400 mb-2">
              <ChevronDown className="h-3 w-3 mr-1" />
              <span>推荐安全问题</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {SUGGESTED_QUESTIONS.map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(question)}
                  className="text-left text-sm bg-gray-800/60 hover:bg-gray-700/70 text-gray-300 p-2 rounded-md border border-gray-700/50 transition-colors flex items-center group"
                >
                  <span className="flex-1 truncate">{question}</span>
                  <ArrowRight className="h-3 w-0 text-cyan-400 group-hover:w-3 transition-all duration-200 overflow-hidden" />
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* 用于自动滚动的空div */}
        <div ref={messagesEndRef} />
      </div>
      
      {/* 输入区域 */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入您的网络安全问题..."
            className="flex-1 bg-gray-800/70 border border-gray-700/80 focus:border-cyan-700/80 rounded-l-md px-4 py-2 text-white outline-none focus:ring-1 focus:ring-cyan-700/50 placeholder-gray-500"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim()}
            className={`bg-gradient-to-r from-cyan-800 to-blue-800 text-white px-4 rounded-r-md flex items-center justify-center transition-colors ${
              !input.trim() ? 'opacity-50 cursor-not-allowed' : 'hover:from-cyan-700 hover:to-blue-700'
            }`}
          >
            <Send className="h-4 w-4" />
          </button>
        </div>
        <p className="text-gray-500 text-xs mt-2">安全卫士AI助手基于最新的安全知识库提供回答，但不应替代专业安全建议。</p>
      </div>
    </div>
  );
} 