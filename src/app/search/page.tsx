"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { posts } from '@/app/page';

// 导入Post类型
interface Post {
  id: string
  title: string
  description: string
  date: string
  author: string
  coverImage: string
  category: string
  tags: string[]
}

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchResults, setSearchResults] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query) {
      setSearchResults([]);
      setIsLoading(false);
      return;
    }

    // 模拟搜索加载
    setIsLoading(true);
    setTimeout(() => {
      const term = query.toLowerCase();
      
      // 从首页导入的文章数据中进行搜索
      const results = posts.filter(
        (post: Post) =>
          post.title.toLowerCase().includes(term) ||
          post.description.toLowerCase().includes(term) ||
          post.category.toLowerCase().includes(term) ||
          post.tags.some((tag: string) => tag.toLowerCase().includes(term)) ||
          post.author.toLowerCase().includes(term)
      );
      
      setSearchResults(results);
      setIsLoading(false);
    }, 500);
  }, [query]);

  return (
    <div className="min-h-screen pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md rounded-xl p-6 shadow-md">
          {/* 搜索头部 */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold mb-4 font-['KuaiKanShiJieTi']">搜索结果</h1>
            
            {/* 搜索框 */}
            <form action="/search" method="get" className="flex items-center gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input 
                  type="search" 
                  name="q" 
                  defaultValue={query}
                  placeholder="搜索文章..."
                  className="w-full px-10 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50"
                />
              </div>
              <Button type="submit">搜索</Button>
            </form>
            
            {/* 搜索统计 */}
            {!isLoading && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {searchResults.length > 0 
                  ? `找到 ${searchResults.length} 个结果 (关键词："${query}")` 
                  : query ? `未找到符合 "${query}" 的结果` : '请输入搜索关键词'}
              </p>
            )}
          </div>
          
          {/* 搜索结果列表 */}
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-300 dark:border-gray-700 border-t-blue-500"></div>
              <p className="mt-4 text-gray-500 dark:text-gray-400">搜索中...</p>
            </div>
          ) : searchResults.length > 0 ? (
            <div className="space-y-4">
              {searchResults.map((post) => (
                <Link
                  key={post.id}
                  href={`/posts/${post.id}`}
                  className="flex gap-4 p-4 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800/50 transition-colors group"
                >
                  <div className="flex-shrink-0 w-24 h-24 relative rounded-md overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-medium mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 mb-2">
                      {post.description}
                    </p>
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.author}</span>
                      <span className="ml-auto px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-xs">
                        {post.category}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : query ? (
            <div className="text-center py-12 bg-gray-50/50 dark:bg-gray-800/20 rounded-lg">
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-2">未找到相关内容</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                请尝试其他关键词，或浏览我们的文章分类
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
} 