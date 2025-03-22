"use client";

import React from 'react';
import { ConnectionLine } from './ConnectionLine';

interface ArticleConnectionProps {
  start: [number, number, number];
  end: [number, number, number];
  strength: number;
  isHighlighted?: boolean;
}

export const ArticleConnection: React.FC<ArticleConnectionProps> = ({
  start,
  end,
  strength,
  isHighlighted = false
}) => {
  // 创建虚拟连接数据
  const connection = {
    source: 'source',
    target: 'target',
    strength,
    similarity: strength
  };
  
  return (
    <ConnectionLine
      connection={connection}
      startPos={start}
      endPos={end}
      isHighlighted={isHighlighted}
    />
  );
}; 