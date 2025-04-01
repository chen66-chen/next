import React from 'react';

const HttpExampleWithDots: React.FC = () => {
  return (
    <div className="overflow-hidden rounded-md">
      {/* 顶部窗口栏 */}
      <div className="bg-[#343434] p-2 flex items-center">
        <div className="flex space-x-2">
          <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
          <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
        </div>
      </div>
      
      {/* HTTP请求内容 */}
      <div className="bg-[#1e1e1e] text-white p-3 font-mono text-sm">
        <div className="mb-1">GET / HTTP/1.1</div>
        <div>Host: tryhackme.com</div>
        <div>User-Agent: Chrome/91.0</div>
        <div>Cookie: session=abc123</div>
      </div>
    </div>
  );
};

export default HttpExampleWithDots; 