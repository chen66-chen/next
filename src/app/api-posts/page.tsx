"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/data/posts';

export default function ApiPostsPage() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        // 直接记录请求URL，便于检查
        console.log('发起请求: /api/posts');
        
        const response = await fetch('/api/posts');
        const responseText = await response.text();
        
        // 先检查原始响应
        console.log('API响应原始文本:', responseText);
        
        // 尝试解析JSON
        let data;
        try {
          data = JSON.parse(responseText);
        } catch (e) {
          throw new Error(`JSON解析失败: ${e.message}, 原始响应: ${responseText.substring(0, 200)}`);
        }
        
        console.log('从API获取到的文章数据:', data);
        
        if (Array.isArray(data)) {
          setPosts(data);
        } else {
          throw new Error('API返回的不是数组数据');
        }
      } catch (err) {
        console.error('获取文章失败:', err);
        setError(err.message || '获取文章失败');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">API文章列表</h1>
      <p className="mb-4">这个页面只显示从API获取的文章，不包含静态数据</p>
      
      {loading ? (
        <div className="flex justify-center my-8">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : error ? (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-md">
          <h3 className="font-bold">出错了</h3>
          <p>{error}</p>
          <p className="mt-2">请尝试：</p>
          <ul className="list-disc ml-6">
            <li>检查服务器日志</li>
            <li>确认API路由工作正常</li>
            <li>确认data/posts目录存在且有权限</li>
          </ul>
        </div>
      ) : posts.length === 0 ? (
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-md">
          <p>没有找到任何文章。API返回了空数组。</p>
          <p className="mt-2">可能的原因：</p>
          <ul className="list-disc ml-6">
            <li>尚未发布任何文章</li>
            <li>文章文件格式错误无法解析</li>
            <li>文章存储路径不正确</li>
          </ul>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map(post => (
            <div key={post.id} className="border border-gray-200 rounded-lg overflow-hidden shadow-md">
              <div className="relative h-48">
                <Image
                  src={post.coverImage || '/images/default-cover.jpg'}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-600 mb-2">{post.description}</p>
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span>{post.author}</span>
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                {post.tags && Array.isArray(post.tags) && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {post.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8">
        <Link 
          href="/"
          className="inline-block px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          返回首页
        </Link>
        
        <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h3 className="text-lg font-bold mb-2">调试信息</h3>
          <p className="mb-2">文章数量: {posts.length}</p>
          <details>
            <summary className="cursor-pointer text-blue-600">查看原始JSON数据</summary>
            <pre className="mt-2 p-2 bg-gray-800 text-green-400 overflow-auto rounded max-h-96 text-xs">
              {JSON.stringify(posts, null, 2)}
            </pre>
          </details>
        </div>
      </div>
    </div>
  );
} 