"use client";

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { formatDistanceToNow } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import CommentForm from './CommentForm';
import { toast } from 'sonner';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import 'highlight.js/styles/atom-one-dark.css';
import Link from 'next/link';

interface User {
  id: string;
  name: string | null;
  image: string | null;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  user: User;
  replies?: Comment[];
}

interface CommentListProps {
  postId: string;
  postSlug: string;
}

export default function CommentList({ postId, postSlug }: CommentListProps) {
  const { data: session } = useSession();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | null>(null);

  // 获取评论列表
  const fetchComments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/comments?postSlug=${postSlug}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '获取评论失败');
      }

      setComments(data.comments);
    } catch (error: any) {
      setError(error.message || '获取评论失败，请稍后再试');
      console.error('获取评论错误:', error);
    } finally {
      setLoading(false);
    }
  };

  // 组件挂载时获取评论
  useEffect(() => {
    fetchComments();
  }, [postSlug]);

  // 处理回复按钮点击
  const handleReplyClick = (commentId: string) => {
    if (!session?.user) {
      toast.error('请先登录后再回复评论');
      return;
    }
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  // 评论添加后刷新列表
  const handleCommentAdded = () => {
    fetchComments();
    setReplyingTo(null);
  };

  // 获取用户头像的首字母
  const getInitials = (name: string | null) => {
    if (!name) return '?';
    return name.substring(0, 2).toUpperCase();
  };

  // 格式化日期
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true, locale: zhCN });
    } catch (error) {
      return dateString;
    }
  };

  // 渲染单个评论
  const renderComment = (comment: Comment, isReply = false) => (
    <div
      key={comment.id}
      className={`p-4 rounded-lg ${
        isReply ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-900'
      } shadow-sm mb-4`}
    >
      <div className="flex items-start gap-3">
        <Avatar className="h-10 w-10">
          {comment.user.image ? (
            <AvatarImage src={comment.user.image} alt={comment.user.name || '用户'} />
          ) : (
            <AvatarFallback>{getInitials(comment.user.name)}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
            <h4 className="font-semibold text-sm">{comment.user.name || '匿名用户'}</h4>
            <span className="text-xs text-gray-500">{formatDate(comment.createdAt)}</span>
          </div>

          <div className="prose prose-sm dark:prose-invert max-w-none">
            <MarkdownRenderer content={comment.content} className="prose-sm" />
          </div>

          {session?.user && !isReply && (
            <div className="mt-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleReplyClick(comment.id)}
                className="text-xs h-8 px-2"
              >
                {replyingTo === comment.id ? '取消回复' : '回复'}
              </Button>
            </div>
          )}

          {replyingTo === comment.id && (
            <div className="mt-4">
              <CommentForm
                postId={postId}
                postSlug={postSlug}
                parentId={comment.id}
                onCommentAdded={handleCommentAdded}
              />
            </div>
          )}
        </div>
      </div>

      {/* 渲染回复 */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-4 ml-12 space-y-4">
          {comment.replies.map((reply) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  if (loading) {
    return <div className="animate-pulse text-center p-8">加载评论中...</div>;
  }

  if (error) {
    return (
      <div className="text-center p-4 text-red-500">
        <p>{error}</p>
        <Button variant="outline" onClick={fetchComments} className="mt-2">
          重试
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-12">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">评论 ({comments.length})</h3>
        {!session?.user && (
          <Link href="/login" className="flex items-center gap-2 text-primary hover:underline">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
              <polyline points="10 17 15 12 10 7"/>
              <line x1="15" y1="12" x2="3" y2="12"/>
            </svg>
            登录账号
          </Link>
        )}
      </div>
      
      {/* 评论表单 */}
      <div className="mb-10">
        <CommentForm
          postId={postId}
          postSlug={postSlug}
          onCommentAdded={handleCommentAdded}
        />
      </div>

      {/* 评论列表 */}
      {comments.length > 0 ? (
        <div>
          {comments.map((comment) => renderComment(comment))}
        </div>
      ) : (
        <div className="py-8 text-center text-muted-foreground">
          暂无评论，成为第一个评论的人吧！
        </div>
      )}
    </div>
  );
}