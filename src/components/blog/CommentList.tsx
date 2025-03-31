import React, { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { CommentForm } from './CommentForm';

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    image: string | null;
  };
  replies?: Comment[];
}

interface CommentListProps {
  postId: string;
  postSlug?: string;
}

export function CommentList({ postId, postSlug }: CommentListProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyToId, setReplyToId] = useState<string | null>(null);

  // 加载评论
  const fetchComments = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (postId) params.append('postId', postId);
      if (postSlug) params.append('postSlug', postSlug);

      const response = await fetch(`/api/comments?${params.toString()}`);
      if (!response.ok) {
        throw new Error('获取评论失败');
      }

      const data = await response.json();
      setComments(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : '加载评论失败');
      console.error('获取评论错误:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载评论
  useEffect(() => {
    fetchComments();
  }, [postId, postSlug]);

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return format(date, 'yyyy年MM月dd日 HH:mm', { locale: zhCN });
    } catch (error) {
      return dateString;
    }
  };

  // 回复处理
  const handleReply = (commentId: string) => {
    setReplyToId(commentId === replyToId ? null : commentId);
  };

  // 评论添加后刷新
  const handleCommentAdded = () => {
    fetchComments();
    setReplyToId(null);
  };

  // 渲染单个评论
  const renderComment = (comment: Comment, isReply = false) => (
    <div key={comment.id} className={`${isReply ? 'ml-8 mt-4' : 'mb-6'} border-l-2 border-gray-200 dark:border-gray-700 pl-4`}>
      <div className="flex items-start gap-3">
        <img
          src={comment.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${comment.user.name || comment.id}`}
          alt={comment.user.name || '匿名用户'}
          className="w-10 h-10 rounded-full"
        />
        <div className="flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-medium">{comment.user.name || '匿名用户'}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formatDate(comment.createdAt)}
            </span>
          </div>

          <div className="mt-2 text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {comment.content}
          </div>

          <button
            onClick={() => handleReply(comment.id)}
            className="mt-2 text-xs text-blue-500 hover:text-blue-600 transition-colors"
          >
            {replyToId === comment.id ? '取消回复' : '回复'}
          </button>

          {replyToId === comment.id && (
            <div className="mt-3">
              <CommentForm
                postId={postId}
                postSlug={postSlug}
                parentId={comment.id}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          )}

          {/* 渲染回复 */}
          {comment.replies && comment.replies.length > 0 && (
            <div className="mt-4 space-y-4">
              {comment.replies.map((reply) => renderComment(reply, true))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  if (isLoading) {
    return <div className="py-4 text-center text-gray-500">加载评论中...</div>;
  }

  if (error) {
    return (
      <div className="py-4 text-center text-red-500">
        {error}
        <button 
          onClick={fetchComments}
          className="ml-2 underline"
        >
          重试
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className="text-xl font-bold mb-6">评论 ({comments.length})</h3>
      
      {comments.length === 0 ? (
        <div className="py-4 text-center text-gray-500">
          还没有评论，来发表第一条评论吧!
        </div>
      ) : (
        <div className="space-y-6">
          {comments.map((comment) => renderComment(comment))}
        </div>
      )}
    </div>
  );
} 