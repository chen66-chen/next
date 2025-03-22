"use client";

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';
import '@uiw/react-markdown-preview/markdown.css';

// 动态导入编辑器组件以避免SSR问题
const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string | undefined) => void;
  minHeight?: number;
  placeholder?: string;
  preview?: 'live' | 'edit' | 'preview';
  className?: string;
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  value,
  onChange,
  minHeight = 200,
  placeholder = "在这里输入Markdown内容...",
  preview = "live",
  className = "",
}) => {
  // 解决Next.js中的hydration问题
  const [isMounted, setIsMounted] = useState(false);
  
  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div style={{ minHeight, width: '100%' }} className={`border rounded-md p-4 ${className}`} />;
  }

  return (
    <div data-color-mode="auto" className={className}>
      <MDEditor
        value={value}
        onChange={onChange}
        height={minHeight}
        preview={preview}
        placeholder={placeholder}
        hideToolbar={false}
        toolbarHeight={40}
        textareaProps={{
          placeholder: placeholder,
        }}
      />
    </div>
  );
};

export default MarkdownEditor; 