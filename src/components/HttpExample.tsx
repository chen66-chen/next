import React from 'react';

const HttpExample: React.FC = () => {
  return (
    <div className="bg-[#1e1e1e] text-white p-3 font-mono text-sm rounded-md">
      <div className="mb-1">GET / HTTP/1.1</div>
      <div>Host: tryhackme.com</div>
      <div>User-Agent: Chrome/91.0</div>
      <div>Cookie: session=abc123</div>
    </div>
  );
};

export default HttpExample; 