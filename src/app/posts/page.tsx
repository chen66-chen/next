"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { posts as staticPosts, Post } from '@/data/posts';

// 搜索参数组件
function PostsWithSearchParams() {
  const searchParams = useSearchParams();
  const category = searchParams.get('category');
  const tag = searchParams.get('tag');
  
  const [allPosts, setAllPosts] = useState<Post[]>(staticPosts);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(staticPosts || []);
  const [filterTitle, setFilterTitle] = useState('全部文章');
  const [loading, setLoading] = useState(false);

  // 获取所有文章数据（包括静态和API）
  useEffect(() => {
    const fetchNewPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('获取文章失败');
        }
        const data = await response.json();
        
        // 解析标签字段（如果它是JSON字符串）
        const newPosts = data.map((post: any) => ({
          ...post,
          tags: typeof post.tags === 'string' ? JSON.parse(post.tags) : post.tags
        }));
        
        // 获取所有静态文章的ID，用于过滤重复文章
        const staticPostIds = new Set(staticPosts.map(post => post.id));
        
        // 过滤出静态数据中不存在的新文章
        const uniqueNewPosts = newPosts.filter((post: Post) => !staticPostIds.has(post.id));
        
        // 合并静态文章和新文章
        setAllPosts([...uniqueNewPosts, ...staticPosts]);
      } catch (error) {
        console.error('获取文章数据时出错:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchNewPosts();
  }, []);

  // 根据分类或标签过滤文章
  useEffect(() => {
    let filtered = [...allPosts];
    let title = '全部文章';

    if (category) {
      filtered = filtered.filter(post => post.category === category);
      title = `分类：${category}`;
    } else if (tag) {
      filtered = filtered.filter(post => post.tags.includes(tag));
      title = `标签：${tag}`;
    }

    setFilteredPosts(filtered);
    setFilterTitle(title);
  }, [category, tag, allPosts]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{filterTitle}</h1>
            <p className="text-gray-600 dark:text-gray-400">
              {loading ? 
                '加载中...' : 
                (filteredPosts?.length === 0 
                  ? '没有找到相关文章' 
                  : `找到 ${filteredPosts?.length || 0} 篇相关文章`)}
            </p>
          </div>
          <Link href="/" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            返回首页
          </Link>
        </div>

        {loading && filteredPosts.length === 0 ? (
          <div className="flex justify-center items-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
            <p className="ml-4 text-gray-600 dark:text-gray-400">加载文章中...</p>
          </div>
        ) : (
          <>
            {filteredPosts?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map(post => (
                  <Link href={`/posts/${post.id}`} key={post.id} className="block">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                      <div className="relative h-48">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex justify-between items-center mb-3">
                          <span className="text-sm text-blue-600 dark:text-blue-400">{post.category}</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{post.date}</span>
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 line-clamp-2">
                          {post.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-2">
                          {post.tags && post.tags.map((tag, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-xs"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 text-center">
                <p className="text-gray-600 dark:text-gray-400">没有找到符合条件的文章</p>
                <Link href="/" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                  返回首页
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// 使用Suspense包裹使用useSearchParams的组件
export default function FilteredPosts() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    }>
      <PostsWithSearchParams />
    </Suspense>
  );
} 