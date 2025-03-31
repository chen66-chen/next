// 从数据文件中重新导出类型
export type { Post } from '../data/posts';
export type { StyleConfig } from '../data/siteConfig';

// 组件相关类型
export interface MessageFormProps {
  onMessageSent?: () => void;
}

// 通用类型
export interface ChildrenProps {
  children: React.ReactNode;
}

// 分类和标签相关类型
export interface CategoryProps {
  category: string;
  count: number;
  onClick: (category: string) => void;
}

export interface TagProps {
  tag: string;
  onClick: (tag: string) => void;
} 