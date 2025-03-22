export interface Post {
  slug: string;
  title: string;
  date: string;
  author: {
    name: string;
    picture?: string;
  };
  excerpt?: string;
  content: string;
  category?: string;
  tags?: string[];
  coverImage?: string;
} 