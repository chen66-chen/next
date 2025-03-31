import React, { useState } from 'react';
import { CommentList } from './CommentList';
import { CommentForm } from './CommentForm';
import { Suspense } from 'react';

interface CommentsProps {
  postId: string;
  postSlug?: string;
}

export function Comments({ postId, postSlug }: CommentsProps) {
  const [refreshKey, setRefreshKey] = useState(0);
  
  // 当新评论添加成功时触发刷新
  const handleCommentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
      <Suspense fallback={<div className="py-4 text-center text-gray-500">加载评论中...</div>}>
        <CommentList 
          key={`comments-${refreshKey}`} 
          postId={postId} 
          postSlug={postSlug}
        />
        
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-4">发表评论</h3>
          <CommentForm 
            postId={postId} 
            postSlug={postSlug}
            onCommentAdded={handleCommentAdded} 
          />
        </div>
      </Suspense>
    </div>
  );
} 