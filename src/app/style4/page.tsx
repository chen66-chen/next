"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Calendar, Tag, Eye, MessageSquare, Download, ArrowRight, FileDown, Send } from "lucide-react";
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from "react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  description: string;
  date: string;
  author: string;
  coverImage: string;
  category: string;
  tags: string[];
  views?: number;
  comments?: number;
  content?: string;
}

// 热门标签
const popularTags = [
  { name: "Halo", count: 10 },
  { name: "主题", count: 5 },
  { name: "minio", count: 2 },
  { name: "教程", count: 8 },
  { name: "PIX", count: 1 },
  { name: "生活", count: 6 },
  { name: "随笔", count: 4 },
  { name: "天空", count: 3 }
];

export default function Style4Page() {
  const router = useRouter();
  const [noteContent, setNoteContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [noteTitle, setNoteTitle] = useState('笔记');
  
  // 文章数据状态
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // 获取文章数据
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/posts');
        if (!response.ok) {
          throw new Error('无法获取文章数据');
        }
        const data = await response.json();
        
        // 对文章数据进行处理，添加默认值
        const processedPosts = data.map((post: Post) => ({
          ...post,
          views: post.views || Math.floor(Math.random() * 300) + 50,
          comments: post.comments || Math.floor(Math.random() * 10),
        }));
        
        setPosts(processedPosts);
      } catch (err) {
        console.error('获取文章失败:', err);
        setError('获取文章失败，请刷新页面重试');
        // 使用模拟数据作为备份
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  // Markdown示例内容
  const exampleMarkdown = `## Markdown 快速入门示例

### 基本语法

**粗体文本** 和 *斜体文本*

#### 列表示例
- 无序列表项目1
- 无序列表项目2
  - 嵌套项目

1. 有序列表项目1
2. 有序列表项目2

### 代码示例
\`\`\`javascript
// 这是一段JavaScript代码
function hello() {
  console.log("Hello, Markdown!");
}
\`\`\`

> 这是一段引用文本

[链接文本](https://example.com)

![图片描述](https://ext.same-assets.com/1677884995/882917863.webp)

---
`;

  // 从本地存储加载笔记
  useEffect(() => {
    const savedNote = localStorage.getItem('quick_note');
    if (savedNote) {
      setNoteContent(savedNote);
    }
  }, []);

  // 保存笔记到本地存储
  const saveNote = () => {
    setIsSaving(true);
    try {
      localStorage.setItem('quick_note', noteContent);
      toast.success('笔记已保存到浏览器');
    } catch (error) {
      toast.error('保存失败，请重试');
      console.error('保存笔记时出错:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // 导出笔记到本地文件
  const exportToFile = () => {
    try {
      // 创建Blob对象
      const blob = new Blob([noteContent], { type: 'text/markdown' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${noteTitle || '笔记'}_${new Date().toISOString().split('T')[0]}.md`;
      
      // 触发点击下载
      document.body.appendChild(a);
      a.click();
      
      // 清理
      URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast.success('笔记已导出为Markdown文件');
    } catch (error) {
      toast.error('导出失败，请重试');
      console.error('导出笔记时出错:', error);
    }
  };
  
  // 发布笔记为文章
  const publishNote = async () => {
    if (!noteContent.trim()) {
      toast.error('笔记内容不能为空');
      return;
    }
    
    // 提取第一行作为标题
    const title = noteContent.trim().split('\n')[0].replace(/^#+\s*/, '') || '无标题笔记';
    
    if (window.confirm(`确定要将"${title}"发布为文章吗？`)) {
      setIsPublishing(true);
      try {
        const response = await fetch('/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: title,
            description: noteContent.trim().split('\n').slice(1, 3).join(' ').substring(0, 120) + '...',
            content: noteContent,
            tags: ['笔记', '快速发布'],
            date: new Date().toISOString(),
            author: "Chryssolion Chen",
            coverImage: "https://ext.same-assets.com/2189857954/3060987925.webp",
            category: "快速笔记",
          }),
        });

        const responseData = await response.json();
        
        if (!response.ok) {
          console.error('发布失败，状态码:', response.status);
          console.error('响应内容:', responseData);
          throw new Error(responseData.message || '发布失败');
        }

        // 清空笔记内容
        setNoteContent('');
        localStorage.removeItem('quick_note');
        
        // 重新获取文章列表
        fetch('/api/posts')
          .then(res => res.json())
          .then(data => {
            setPosts(data.map((post: Post) => ({
              ...post,
              views: post.views || Math.floor(Math.random() * 300) + 50,
              comments: post.comments || Math.floor(Math.random() * 10),
            })));
          })
          .catch(err => console.error('刷新文章列表失败:', err));
        
        // 显示成功消息
        toast.success('文章发布成功！', {
          description: '您可以在文章页面查看已发布的文章'
        });
        
        // 等待1秒后跳转到文章页面
        setTimeout(() => {
          router.push(`/posts/${responseData.id}`);
        }, 1000);
      } catch (error) {
        console.error('发布文章时出错:', error);
        toast.error(`发布失败: ${error instanceof Error ? error.message : '请重试'}`);
      } finally {
        setIsPublishing(false);
      }
    }
  };

  // 切换预览模式
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  // 清除内容
  const clearContent = () => {
    if (window.confirm('确定要清除所有内容吗？')) {
      setNoteContent('');
      localStorage.removeItem('quick_note');
      toast.success('内容已清除');
    }
  };

  // 加载示例内容
  const loadExample = () => {
    setNoteContent(exampleMarkdown);
    setIsPreview(false);
    toast.success('示例内容已加载');
  };

  return (
    <div className="min-h-screen bg-site4-light">
      {/* Hero Header */}
      <header className="site4-header">
        <div className="site4-header-overlay"></div>
        <div className="site4-header-content">
          <h1 className="font-kuaikan text-4xl mb-4">2023年的点滴记录</h1>
          <p className="font-misans text-lg max-w-2xl mx-auto">
            记录美好的瞬间，分享生活的感动，学习的心得与技术的成长
          </p>
        </div>
      </header>

      <div className="site4-container">
        {/* 导航路径 */}
        <nav className="flex items-center text-sm text-site4-secondary mb-6">
          <Link href="/" className="hover:text-site4-blue transition-colors">首页</Link>
          <ChevronRight className="h-4 w-4 mx-1" />
          <span className="text-site4-primary">技术风格</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 主内容区 */}
          <div className="lg:col-span-2">
            <h2 className="site4-title mb-6 pb-2 border-b border-site4-accent/30">
              最新文章
            </h2>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin h-8 w-8 border-4 border-site4-blue border-t-transparent rounded-full"></div>
                <p className="mt-4 text-site4-text">加载文章中...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
                <Button 
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-site4-blue text-white"
                >
                  刷新页面
                </Button>
              </div>
            ) : posts.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm p-6">
                <p className="text-site4-text mb-4">还没有发布的文章</p>
                <p className="text-site4-secondary text-sm">使用右侧的快速笔记发布你的第一篇文章吧！</p>
              </div>
            ) : (
              <div className="space-y-8">
                {posts.map((post) => (
                  <article key={post.id} className="post-card-site4">
                    <Link href={`/posts/${post.id}`} className="block">
                      <div className="relative aspect-[2/1] overflow-hidden">
                        <Image
                          src={post.coverImage}
                          alt={post.title}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </Link>
                    <div className="p-6">
                      <div className="flex items-center text-site4-secondary text-sm mb-3">
                        <span className="flex items-center mr-4">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(post.date).toLocaleDateString('zh-CN')}
                        </span>
                        <span className="flex items-center mr-4">
                          <Eye className="h-4 w-4 mr-1" />
                          {post.views}
                        </span>
                        <span className="flex items-center">
                          <MessageSquare className="h-4 w-4 mr-1" />
                          {post.comments}
                        </span>
                      </div>

                      <h3 className="font-kuaikan text-site4-primary text-xl mb-3 hover:text-site4-blue transition-colors">
                        <Link href={`/posts/${post.id}`}>{post.title}</Link>
                      </h3>

                      <p className="text-site4-text mb-4 line-clamp-2">{post.description}</p>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {post.tags.map((tag, i) => (
                          <span key={i} className="site4-tag">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link
                        href={`/posts/${post.id}`}
                        className="site4-link inline-flex items-center text-sm"
                      >
                        阅读全文 <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          {/* 侧边栏 */}
          <aside className="space-y-8">
            {/* 作者卡片 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6 text-center">
              <div className="relative h-24 w-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-site4-accent/30">
                <Image
                  src="https://ext.same-assets.com/1869367520/3221986511.png"
                  alt="Chryssolion Chen"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="font-kuaikan text-site4-primary text-xl mb-2">Chryssolion Chen</h3>
              <p className="text-site4-text text-sm mb-4">
                希望我的文章能给您带来思考，如果能在您的生活中体现些许色彩那就更好了。
              </p>
              <div className="flex justify-center gap-4">
                <button className="p-2 rounded-full bg-site4-accent/20 text-site4-primary hover:bg-site4-accent/40 transition-colors">
                  <Download className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Markdown编辑器 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-site4-accent/30">
                  <h3 className="font-kuaikan text-site4-primary text-lg">
                    快速笔记
                  </h3>
                  
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={noteTitle}
                      onChange={(e) => setNoteTitle(e.target.value)}
                      className="text-sm border border-site4-accent/30 rounded px-2 py-1 w-32"
                      placeholder="笔记标题"
                    />
                    <Button 
                      variant="ghost"
                      size="sm"
                      onClick={togglePreview}
                      className="text-site4-text hover:text-site4-primary transition-colors text-sm"
                    >
                      {isPreview ? '编辑' : '预览'}
                    </Button>
                  </div>
                </div>
                
                <div className="mb-4 shadow-sm rounded border border-site4-accent/30">
                  {isPreview ? (
                    <div className="p-4 min-h-[200px] max-h-[300px] overflow-auto">
                      <MarkdownRenderer content={noteContent} />
                    </div>
                  ) : (
                    <MarkdownEditor
                      value={noteContent}
                      onChange={(value) => setNoteContent(value || '')}
                      minHeight={200}
                      placeholder="在这里输入Markdown内容..."
                      preview="edit"
                      className="w-full rounded"
                    />
                  )}
                </div>
                <div className="flex justify-between">
                  <div>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={loadExample}
                      className="text-site4-text mr-2 text-xs"
                    >
                      加载示例
                    </Button>
                    <Button 
                      variant="outline"
                      size="sm"
                      onClick={clearContent}
                      className="text-site4-text text-xs"
                    >
                      清除内容
                    </Button>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      className="bg-site4-blue text-white hover:bg-site4-primary transition-colors text-sm px-3"
                      onClick={saveNote}
                      disabled={isSaving}
                    >
                      {isSaving ? '保存中...' : '保存'}
                    </Button>
                    
                    <Button 
                      variant="outline"
                      className="text-site4-text border-site4-accent/50 hover:bg-site4-accent/10 text-sm px-3"
                      onClick={exportToFile}
                      title="导出为Markdown文件"
                    >
                      <FileDown className="h-4 w-4 mr-1" /> 导出
                    </Button>
                    
                    <Button 
                      className="bg-site4-primary text-white hover:bg-site4-accent transition-colors text-sm px-3"
                      onClick={publishNote}
                      disabled={isPublishing}
                    >
                      <Send className="h-4 w-4 mr-1" /> {isPublishing ? '发布中...' : '发布'}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* 热门标签 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
              <h3 className="font-kuaikan text-site4-primary text-lg mb-4 pb-2 border-b border-site4-accent/30">
                热门标签
              </h3>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, i) => (
                  <Link
                    key={i}
                    href={`#${tag.name}`}
                    className="site4-tag flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag.name} <span className="ml-1 text-site4-secondary">({tag.count})</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* 分类 */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm p-6">
              <h3 className="font-kuaikan text-site4-primary text-lg mb-4 pb-2 border-b border-site4-accent/30">
                分类
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-site4-text hover:text-site4-blue transition-colors py-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-site4-blue h-2 w-2 rounded-full mr-2"></span>
                      生活随笔
                    </span>
                    <span className="text-site4-secondary text-sm">12</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-site4-text hover:text-site4-blue transition-colors py-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-site4-primary h-2 w-2 rounded-full mr-2"></span>
                      技术笔记
                    </span>
                    <span className="text-site4-secondary text-sm">18</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-site4-text hover:text-site4-blue transition-colors py-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-site4-accent h-2 w-2 rounded-full mr-2"></span>
                      主题开发
                    </span>
                    <span className="text-site4-secondary text-sm">6</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-site4-text hover:text-site4-blue transition-colors py-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-gray-300 h-2 w-2 rounded-full mr-2"></span>
                      教程
                    </span>
                    <span className="text-site4-secondary text-sm">9</span>
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="flex items-center justify-between text-site4-text hover:text-site4-blue transition-colors py-1"
                  >
                    <span className="flex items-center">
                      <span className="bg-site4-blue/60 h-2 w-2 rounded-full mr-2"></span>
                      摄影
                    </span>
                    <span className="text-site4-secondary text-sm">4</span>
                  </Link>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
