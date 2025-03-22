"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import dynamic from 'next/dynamic';
import MarkdownEditor from './MarkdownEditor';
import Link from 'next/link';

interface CommentFormProps {
  postId: string;
  postSlug: string;
  parentId?: string;
  onCommentAdded: (() => void) | string;
}

export default function CommentForm({ postId, postSlug, parentId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!session?.user) {
      toast.error('请先登录后再发表评论');
      return;
    }

    if (!content.trim()) {
      toast.error('评论内容不能为空');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          postId,
          postSlug,
          parentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || '评论提交失败');
      }

      toast.success('评论已提交');
      setContent('');

      // 处理评论提交后的回调
      if (typeof onCommentAdded === 'function') {
        onCommentAdded();
      } else if (onCommentAdded === 'refresh') {
        window.location.reload();
      }
    } catch (error) {
      console.error('评论提交失败:', error);
      toast.error(error instanceof Error ? error.message : '评论提交失败，请稍后重试');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContentChange = (value: string | undefined) => {
    setContent(value || '');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <div className="mb-2 flex items-center gap-2">
          <span className="text-sm font-medium">
            {session?.user ? (
              <>
                评论身份: <span className="text-site2-primary">{session.user.name || session.user.email}</span>
              </>
            ) : (
              <span className="text-yellow-600">请登录后发表评论</span>
            )}
          </span>
        </div>
        
        <div className="rounded-md border border-input">
          <MarkdownEditor 
            value={content}
            onChange={handleContentChange}
            minHeight={150}
            placeholder="在此输入评论内容，支持Markdown格式..."
            preview="live"
          />
        </div>
        
        <p className="mt-1 text-xs text-gray-500">
          评论支持Markdown语法，可以使用 # 标题、**粗体**、*斜体*、`代码` 等格式
        </p>
      </div>

      <div className="flex justify-between items-center">
        {!session?.user && (
          <Link href="/login">
            <Button type="button" variant="outline" className="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                <polyline points="10 17 15 12 10 7"/>
                <line x1="15" y1="12" x2="3" y2="12"/>
              </svg>
              登录发表评论
            </Button>
          </Link>
        )}
        <div className={!session?.user ? "ml-auto" : ""}>
          <Button
            type="submit"
            disabled={isSubmitting || !session?.user}
            className="px-4 py-2"
          >
            {isSubmitting ? '提交中...' : '发表评论'}
          </Button>
        </div>
      </div>
    </form>
  );
}