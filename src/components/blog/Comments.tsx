"use client";

import { useState } from 'react';
import { GitHubComments } from './GitHubComments';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { Suspense } from 'react';

interface CommentsProps {
  postId: string;
  postSlug?: string;
}

export function Comments({ postId, postSlug }: CommentsProps) {
  const [useGitHub, setUseGitHub] = useState(true);
  
  // 定义刷新函数
  const refreshComments = () => {
    window.location.reload(); // 简单的页面刷新方式
  };
  
  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-bold">评论区</h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setUseGitHub(true)}
            className={`px-3 py-1 text-sm rounded-md ${
              useGitHub 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            GitHub风格
          </button>
          <button
            onClick={() => setUseGitHub(false)}
            className={`px-3 py-1 text-sm rounded-md ${
              !useGitHub 
                ? 'bg-blue-500 text-white' 
                : 'bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300'
            }`}
          >
            传统风格
          </button>
        </div>
      </div>
      
      <Suspense fallback={<div className="py-4 text-center text-gray-500">加载评论中...</div>}>
        {useGitHub ? (
          <GitHubComments 
            postId={postId} 
            postSlug={postSlug || postId} 
          />
        ) : (
          <>
            <CommentList 
              postId={postId}
              postSlug={postSlug || postId}
            />
            
            <div className="mt-8">
              <h3 className="text-xl font-bold mb-4">发表评论</h3>
              <CommentForm 
                postId={postId} 
                postSlug={postSlug || postId}
                onCommentAdded={refreshComments} 
              />
            </div>
          </>
        )}
      </Suspense>
    </div>
  );
} 