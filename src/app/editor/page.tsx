"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function EditorPage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isPreview, setIsPreview] = useState(false);

  // 保存草稿到本地存储
  const saveDraft = () => {
    const draft = {
      title,
      description,
      content,
      tags,
      lastSaved: new Date().toISOString()
    };
    localStorage.setItem('article_draft', JSON.stringify(draft));
    toast.success('草稿已保存');
  };

  // 从本地存储加载草稿
  useEffect(() => {
    const savedDraft = localStorage.getItem('article_draft');
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        setTitle(draft.title || '');
        setDescription(draft.description || '');
        setContent(draft.content || '');
        setTags(draft.tags || '');
      } catch (e) {
        console.error('加载草稿时出错:', e);
      }
    }
  }, []);

  // 每10分钟自动保存
  useEffect(() => {
    const interval = setInterval(() => {
      if (title || description || content) {
        saveDraft();
      }
    }, 10 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, [title, description, content, tags]);

  // 发布文章
  const publishArticle = async () => {
    if (!title || !content) {
      toast.error('请填写标题和内容');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          content,
          tags: tags.split(',').map(tag => tag.trim()).filter(Boolean),
          date: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('发布失败');
      }

      const data = await response.json();
      toast.success('文章发布成功！');
      localStorage.removeItem('article_draft');
      router.push(`/posts/${data.id}`);
    } catch (error) {
      console.error('发布文章时出错:', error);
      toast.error('发布失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  // 预览内容
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">编辑文章</h1>

      <div className="space-y-6">
        <div>
          <Label htmlFor="title">标题</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="请输入文章标题"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="description">描述</Label>
          <Input
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="请输入文章简短描述"
            className="mt-1"
          />
        </div>

        <div>
          <Label htmlFor="tags">标签</Label>
          <Input
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="标签，使用逗号分隔"
            className="mt-1"
          />
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <Label htmlFor="content">内容</Label>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={togglePreview}
            >
              {isPreview ? '编辑' : '预览'}
            </Button>
          </div>
          
          <div className="min-h-[400px] border rounded-md">
            {isPreview ? (
              <div className="p-4">
                <MarkdownRenderer content={content} />
              </div>
            ) : (
              <MarkdownEditor
                value={content}
                onChange={(value) => setContent(value || '')}
                minHeight={400}
                preview="edit"
                className="w-full"
              />
            )}
          </div>
        </div>

        <div className="flex justify-between pt-4">
          <Button
            variant="outline"
            onClick={saveDraft}
          >
            保存草稿
          </Button>
          <Button
            onClick={publishArticle}
            disabled={isLoading}
          >
            {isLoading ? '发布中...' : '发布文章'}
          </Button>
        </div>
      </div>
    </div>
  );
} 