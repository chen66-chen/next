import React, { useState } from 'react';
import { useSession } from 'next-auth/react';

interface CommentFormProps {
  postId: string;
  postSlug?: string;
  parentId?: string;
  onCommentAdded?: () => void;
}

export function CommentForm({ postId, postSlug, parentId, onCommentAdded }: CommentFormProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [authorEmail, setAuthorEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      // 验证输入
      if (!content.trim()) {
        setError('评论内容不能为空');
        setIsSubmitting(false);
        return;
      }

      if (!session && (!authorName.trim() || !authorEmail.trim())) {
        setError('请填写名称和邮箱');
        setIsSubmitting(false);
        return;
      }

      // 构建评论数据
      const commentData = {
        content: content.trim(),
        postId,
        postSlug: postSlug || postId,
        ...(parentId && { parentId }),
        ...(session ? {} : {
          authorName: authorName.trim(),
          authorEmail: authorEmail.trim()
        })
      };

      // 发送请求
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(commentData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || '提交评论失败');
      }

      // 成功处理
      setContent('');
      if (!session) {
        // 保存访客信息到localStorage
        localStorage.setItem('guestName', authorName);
        localStorage.setItem('guestEmail', authorEmail);
      }

      if (onCommentAdded) {
        onCommentAdded();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : '提交评论失败');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 页面加载时尝试从localStorage获取访客信息
  React.useEffect(() => {
    if (!session) {
      const savedName = localStorage.getItem('guestName');
      const savedEmail = localStorage.getItem('guestEmail');
      if (savedName) setAuthorName(savedName);
      if (savedEmail) setAuthorEmail(savedEmail);
    }
  }, [session]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="写下你的评论..."
          rows={4}
          className="w-full p-3 focus:outline-none bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
        />
        
        {/* 未登录用户的额外字段 */}
        {!session && (
          <div className="flex flex-col sm:flex-row gap-2 p-3 bg-gray-50 dark:bg-gray-800/50">
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="你的名字"
              className="flex-1 p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
            <input
              type="email"
              value={authorEmail}
              onChange={(e) => setAuthorEmail(e.target.value)}
              placeholder="你的邮箱"
              className="flex-1 p-2 rounded border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-200"
            />
          </div>
        )}
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-between items-center">
        {session ? (
          <div className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
            <img 
              src={session.user.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${session.user.name}`}
              alt={session.user.name || ''}
              className="w-6 h-6 rounded-full"
            />
            评论将以 <span className="font-medium">{session.user.name}</span> 的身份发表
          </div>
        ) : (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            评论将以访客身份发表
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? '提交中...' : '发表评论'}
        </button>
      </div>
    </form>
  );
} 