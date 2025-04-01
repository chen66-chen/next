import React from 'react';

interface HttpRequestProps {
  method: string;
  path: string;
  protocol: string;
  headers: Record<string, string>;
}

const HttpRequest: React.FC<HttpRequestProps> = ({ 
  method,
  path,
  protocol,
  headers
}) => {
  return (
    <div className="bg-[#1e1e1e] text-white p-3 font-mono text-sm rounded-b-md">
      <div className="mb-1">
        <span className="text-white">{method} / {protocol}</span>
      </div>
      
      {Object.entries(headers).map(([key, value]) => (
        <div key={key} className="text-white">
          <span>{key}: {value}</span>
        </div>
      ))}
    </div>
  );
};

export default HttpRequest; 