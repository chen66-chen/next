"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, Calendar, Tag, Eye, MessageSquare, Download, ArrowRight, 
  FileDown, Send, Brain, Cpu, Globe, Zap, Layers, Search, Menu, X, 
  Moon, Sun, Star, ArrowUpRight, BrainCircuit, GitBranch, Lock, Sparkles
} from "lucide-react";
import MarkdownEditor from '@/components/MarkdownEditor';
import MarkdownRenderer from '@/components/MarkdownRenderer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

/**
 * 文章数据接口
 * 定义文章的数据结构和类型
 */
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

/**
 * AI项目数据接口
 * 定义AI项目的数据结构和类型
 */
interface AiProject {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  category: string;
  link: string;
}

// 热门标签数据
const popularTags = [
  { name: "AI", count: 15 },
  { name: "机器学习", count: 12 },
  { name: "神经网络", count: 8 },
  { name: "大模型", count: 10 },
  { name: "计算机视觉", count: 7 },
  { name: "自然语言处理", count: 9 },
  { name: "强化学习", count: 5 },
  { name: "深度学习", count: 11 }
];

// AI项目展示数据
const aiProjects: AiProject[] = [
  {
    id: 1,
    title: "智能图像识别系统",
    description: "基于深度学习的图像识别技术，可识别上千种物体和场景",
    icon: <Eye className="h-6 w-6" />,
    color: "from-purple-600 to-indigo-600",
    category: "计算机视觉",
    link: "#project-1"
  },
  {
    id: 2,
    title: "自然语言理解引擎",
    description: "能够理解和生成人类语言的AI系统，支持多语言交互",
    icon: <Globe className="h-6 w-6" />,
    color: "from-cyan-500 to-blue-600",
    category: "NLP",
    link: "#project-2"
  },
  {
    id: 3,
    title: "智能推荐算法",
    description: "基于用户行为分析的个性化推荐系统，提高用户体验",
    icon: <Brain className="h-6 w-6" />,
    color: "from-emerald-500 to-teal-600",
    category: "机器学习",
    link: "#project-3"
  },
  {
    id: 4,
    title: "量子神经网络",
    description: "结合量子计算和神经网络的前沿研究项目",
    icon: <Cpu className="h-6 w-6" />,
    color: "from-rose-500 to-pink-600",
    category: "量子计算",
    link: "#project-4"
  }
];

/**
 * Chryssolion Chen 科技AI风格页面组件
 * 展示AI研究、项目和技术博客
 */
export default function Style4Page() {
  const router = useRouter();
  const [noteContent, setNoteContent] = useState('');
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [noteTitle, setNoteTitle] = useState('笔记');
  
  // 深色模式
  const [darkMode, setDarkMode] = useState(true);
  // 移动端菜单状态
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // 搜索状态
  const [searchOpen, setSearchOpen] = useState(false);
  // 搜索关键词
  const [searchQuery, setSearchQuery] = useState('');
  // 粒子动画引用
  const particlesRef = useRef<HTMLDivElement>(null);
  // 神经网络动画引用
  const neuralNetRef = useRef<HTMLCanvasElement>(null);
  
  // 文章数据状态
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  // 活跃项目
  const [activeProject, setActiveProject] = useState<number | null>(null);

  /**
   * 初始化神经网络背景动画
   * 创建具有AI风格的交互式背景
   */
  useEffect(() => {
    if (!neuralNetRef.current || !darkMode) return;
    
    const canvas = neuralNetRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // 节点类
    class Node {
      x: number;
      y: number;
      radius: number;
      vx: number;
      vy: number;
      color: string;
      
      constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
        this.radius = Math.random() * 1.5 + 1;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        
        // 生成蓝色/青色调的随机颜色
        const hue = Math.floor(180 + Math.random() * 60);
        const saturation = Math.floor(70 + Math.random() * 30);
        const lightness = Math.floor(50 + Math.random() * 30);
        this.color = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
      }
      
      // 更新节点位置
      update() {
        this.x += this.vx;
        this.y += this.vy;
        
        // 边界检查
        if (this.x < 0 || this.x > canvas.width) this.vx = -this.vx;
        if (this.y < 0 || this.y > canvas.height) this.vy = -this.vy;
      }
      
      // 绘制节点
      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
    }
    
    // 创建节点
    const nodeCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
    const nodes: Node[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      nodes.push(new Node(x, y));
    }
    
    // 动画循环
    const animate = () => {
      if (!ctx) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // 更新和绘制节点
      nodes.forEach(node => {
        node.update();
        node.draw();
      });
      
      // 绘制节点之间的连接
      ctx.strokeStyle = 'rgba(65, 184, 255, 0.15)';
      ctx.lineWidth = 0.5;
      
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            // 距离越近线条越不透明
            ctx.strokeStyle = `rgba(65, 184, 255, ${0.3 * (1 - distance / 100)})`;
            ctx.stroke();
          }
        }
      }
      
      requestAnimationFrame(animate);
    };
    
    const animationId = requestAnimationFrame(animate);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [darkMode]);

  // 从本地存储加载笔记
  useEffect(() => {
    const savedNote = localStorage.getItem('quick_note');
    if (savedNote) {
      setNoteContent(savedNote);
    }
    
    // 默认深色模式
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setDarkMode(prefersDark);
  }, []);

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
  const exampleMarkdown = `## AI研究笔记：注意力机制

### 1. 注意力机制基础

注意力机制是深度学习中的关键创新，它允许模型**集中关注**输入的特定部分：

- **自注意力**: 评估同一序列中元素之间的关系
- **交叉注意力**: 评估两个不同序列之间的元素关系

### 2. 数学表示

\`\`\`python
# 自注意力计算示例
def self_attention(query, key, value):
    # 计算注意力分数
    scores = query @ key.transpose(-2, -1)
    # 缩放
    scaled_scores = scores / math.sqrt(key.shape[-1])
    # 应用softmax得到权重
    weights = F.softmax(scaled_scores, dim=-1)
    # 加权求和
    return weights @ value
\`\`\`

### 3. 多头注意力

![多头注意力图示](https://miro.medium.com/max/700/1*Uyx77-OsHVxDFMsZz0L1hA.webp)

> 多头注意力允许模型同时关注不同位置的不同表示子空间的信息

### 4. 应用场景

1. **自然语言处理**: Transformer架构的核心
2. **计算机视觉**: Vision Transformer
3. **多模态学习**: 跨域信息整合

---
`;

  /**
   * 保存笔记到本地存储
   * 将当前编辑器内容保存到浏览器本地存储
   */
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

  /**
   * 导出笔记到本地文件
   * 生成Markdown文件并触发下载
   */
  const exportToFile = () => {
    try {
      // 创建Blob对象
      const blob = new Blob([noteContent], { type: 'text/markdown' });
      
      // 创建下载链接
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${noteTitle || 'AI_研究笔记'}_${new Date().toISOString().split('T')[0]}.md`;
      
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
  
  /**
   * 发布笔记为文章
   * 将编辑器内容作为新文章发布到博客
   */
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
            tags: ['AI', '研究笔记'],
            date: new Date().toISOString(),
            author: "Chryssolion Chen",
            coverImage: "https://ext.same-assets.com/2189857954/3060987925.webp",
            category: "AI研究",
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

  /**
   * 切换预览模式
   * 在编辑模式和预览模式之间切换
   */
  const togglePreview = () => {
    setIsPreview(!isPreview);
  };

  /**
   * 清除内容
   * 清空编辑器内容并从本地存储中删除
   */
  const clearContent = () => {
    if (window.confirm('确定要清除所有内容吗？')) {
      setNoteContent('');
      localStorage.removeItem('quick_note');
      toast.success('内容已清除');
    }
  };

  /**
   * 加载示例内容
   * 在编辑器中加载AI相关的示例Markdown
   */
  const loadExample = () => {
    setNoteContent(exampleMarkdown);
    setIsPreview(false);
    toast.success('示例AI研究笔记已加载');
  };
  
  /**
   * 切换暗色/亮色模式
   * 在深色和浅色主题之间切换
   */
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen transition-all duration-300 ${darkMode ? 'bg-gray-950 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      {/* 神经网络背景动画 */}
      {darkMode && (
        <canvas 
          ref={neuralNetRef} 
          className="fixed inset-0 z-0 opacity-60" 
          style={{ pointerEvents: 'none' }}
        />
      )}
      
      {/* 浮动粒子效果 */}
      <div ref={particlesRef} className="fixed inset-0 z-0 pointer-events-none">
        {darkMode && Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="absolute rounded-full animate-float opacity-30"
            style={{
              width: `${Math.random() * 8 + 2}px`,
              height: `${Math.random() * 8 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: `hsla(${180 + Math.random() * 60}, 80%, 70%, 0.6)`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>

      {/* 顶部导航栏 */}
      <header className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-md transition-all duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo和品牌名 */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <BrainCircuit className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                <span className={`font-bold text-xl ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                  ChryssolionAI
                </span>
              </Link>
              
              {/* 桌面端导航 */}
              <nav className="hidden md:ml-10 md:flex md:space-x-8">
                <Link href="#projects" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}>
                  AI项目
                </Link>
                <Link href="#research" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}>
                  研究领域
                </Link>
                <Link href="#blog" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}>
                  技术博客
                </Link>
                <Link href="#about" className={`px-3 py-2 rounded-md text-sm font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'} transition-all duration-200`}>
                  关于我
                </Link>
              </nav>
            </div>
            
            {/* 右侧按钮组 */}
            <div className="flex items-center space-x-4">
              {/* 搜索按钮 */}
              <button 
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-all duration-200`}
                aria-label="搜索"
              >
                {searchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </button>
              
              {/* 暗色模式切换 */}
              <button 
                onClick={toggleDarkMode}
                className={`p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-all duration-200`}
                aria-label={darkMode ? '切换亮色模式' : '切换暗色模式'}
              >
                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              
              {/* 移动端菜单按钮 */}
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden p-2 rounded-full ${darkMode ? 'hover:bg-gray-800' : 'hover:bg-gray-200'} transition-all duration-200`}
                aria-label="菜单"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
          
          {/* 搜索框 */}
          <AnimatePresence>
            {searchOpen && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className="py-3"
              >
                <div className={`flex items-center ${darkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg p-2 border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                  <Search className="h-5 w-5 text-gray-400 mr-2" />
                  <Input 
                    type="text" 
                    placeholder="搜索AI项目、研究或文章..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`flex-1 border-0 focus-visible:ring-0 ${darkMode ? 'bg-gray-800 text-white placeholder:text-gray-400' : 'bg-white text-gray-900 placeholder:text-gray-500'}`}
                    autoFocus
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* 移动端菜单 */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className={`md:hidden ${darkMode ? 'bg-gray-900' : 'bg-white'} border-b ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
            >
              <div className="px-4 pt-2 pb-4 space-y-1 sm:px-6">
                <Link href="#projects" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
                  AI项目
                </Link>
                <Link href="#research" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
                  研究领域
                </Link>
                <Link href="#blog" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
                  技术博客
                </Link>
                <Link href="#about" className={`block px-3 py-2 rounded-md text-base font-medium ${darkMode ? 'text-gray-300 hover:text-white hover:bg-gray-800' : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'}`}>
                  关于我
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* Hero区 */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                  <span className="block">Chryssolion Chen</span>
                  <span className={`block ${darkMode ? 'bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600' : 'bg-gradient-to-r from-cyan-600 via-blue-700 to-purple-800'} bg-clip-text text-transparent`}>
                    AI研究与创新
                  </span>
                </h1>
                <p className={`mt-6 text-base ${darkMode ? 'text-gray-300' : 'text-gray-700'} sm:text-lg md:text-xl max-w-3xl`}>
                  探索人工智能的前沿，从深度学习到大型语言模型，
                  让我们一起开启通往智能未来的旅程。
                </p>
                <div className="mt-8 flex sm:justify-center lg:justify-start space-x-4">
                  <Button
                    className={`${darkMode 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-700 hover:bg-blue-800 text-white'
                    } rounded-md px-6 py-5`}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    探索AI项目
                  </Button>
                  <Button
                    variant="outline"
                    className={`${darkMode 
                      ? 'border-gray-700 text-gray-300 hover:bg-gray-800' 
                      : 'border-gray-300 text-gray-700 hover:bg-gray-100'
                    } rounded-md px-6 py-5`}
                  >
                    <GitBranch className="w-5 h-5 mr-2" />
                    查看我的研究
                  </Button>
                </div>
              </motion.div>
              
              {/* 科技感指标卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mt-12 grid grid-cols-3 gap-4"
              >
                <div className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="text-2xl font-bold text-blue-500">15+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI项目</div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="text-2xl font-bold text-purple-500">24+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>研究论文</div>
                </div>
                <div className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm p-4 rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="text-2xl font-bold text-cyan-500">5年+</div>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI经验</div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <div className={`${darkMode ? 'bg-gray-900' : 'bg-white'} rounded-2xl overflow-hidden border ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                  {/* 3D脑网络模型图 */}
                  <div className="relative h-64 sm:h-72 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0">
                      <Image
                        src="/images/ai-brain-network.jpg"
                        alt="AI神经网络可视化"
                        fill
                        className="object-cover"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900' : 'from-gray-100'} to-transparent opacity-40`}></div>
                    </div>
                    <span className="absolute bottom-4 left-4 text-white text-sm px-2 py-1 bg-black/30 backdrop-blur-sm rounded-md">
                      AI视觉模型可视化
                    </span>
                  </div>
                  
                  <div className="px-6 py-4">
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                      最新研究项目
                    </h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      多模态AI系统：整合视觉、语言和知识的统一智能
                    </p>
                    <div className="mt-3 flex space-x-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        多模态
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        深度学习
                      </span>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        神经网络
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* AI项目展示区 */}
      <section id="projects" className="relative py-16 bg-gradient-to-b from-transparent via-blue-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}
            >
              <span className={`inline-block ${darkMode ? 'bg-gradient-to-r from-blue-400 to-cyan-300' : 'bg-gradient-to-r from-blue-600 to-cyan-500'} bg-clip-text text-transparent`}>
                AI项目展示
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`mt-4 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              探索我的AI研究项目，从理论研究到实际应用
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5, boxShadow: darkMode ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 10px 25px -5px rgba(0, 0, 0, 0.1)' }}
                className={`relative overflow-hidden rounded-lg ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm p-6 border ${darkMode ? 'border-gray-700' : 'border-gray-200'} cursor-pointer transition-all duration-300`}
                onClick={() => setActiveProject(activeProject === project.id ? null : project.id)}
              >
                <div className={`absolute top-0 left-0 w-1 h-full bg-gradient-to-b ${project.color}`}></div>
                <div className="flex items-start">
                  <div className={`flex-shrink-0 p-2 rounded-lg bg-gradient-to-br ${project.color} text-white mr-4`}>
                    {project.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                      {project.title}
                    </h3>
                    <p className={`mt-1 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                    <div className="mt-3 flex items-center">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                        {project.category}
                      </span>
                      <ArrowUpRight className={`ml-auto h-4 w-4 ${darkMode ? 'text-blue-400' : 'text-blue-600'}`} />
                    </div>
                  </div>
                </div>
                {activeProject === project.id && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 pt-4 border-t border-gray-700/30"
                  >
                    <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                      这是一个在{project.category}领域的前沿AI项目，结合了最新的深度学习技术和创新算法，致力于解决实际问题。
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className={`mt-3 ${darkMode ? 'text-blue-400 hover:text-blue-300 hover:bg-blue-900/20' : 'text-blue-600 hover:text-blue-500 hover:bg-blue-100/50'}`}
                    >
                      查看详情 <ArrowRight className="ml-1 h-4 w-4" />
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Button
              className={`${darkMode 
                ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                : 'bg-blue-700 hover:bg-blue-800 text-white'
              } rounded-md px-6 py-2 font-medium`}
            >
              查看更多项目
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 研究领域 */}
      <section id="research" className="relative py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`text-3xl font-extrabold tracking-tight ${darkMode ? 'text-white' : 'text-gray-900'} sm:text-4xl`}
            >
              <span className={`inline-block ${darkMode ? 'bg-gradient-to-r from-purple-400 to-pink-300' : 'bg-gradient-to-r from-purple-600 to-pink-500'} bg-clip-text text-transparent`}>
                研究领域
              </span>
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={`mt-4 max-w-2xl mx-auto text-xl ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              我专注的AI研究方向和技术栈
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* 研究领域1：深度学习 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-blue-600 to-indigo-600 text-white mb-4">
                  <Layers className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>深度学习</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  专注于神经网络架构设计与优化，包括卷积神经网络(CNN)、循环神经网络(RNN)和Transformer模型等。
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                    CNN
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                    RNN
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    Transformer
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-red-300' : 'bg-red-100 text-red-800'}`}>
                    深度强化学习
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 研究领域2：自然语言处理 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-purple-600 to-pink-600 text-white mb-4">
                  <Brain className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>自然语言处理</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  研究大型语言模型(LLM)、文本生成和理解，以及多语言处理技术，探索语言与知识的结合。
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                    大型语言模型
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                    文本生成
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    情感分析
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-red-300' : 'bg-red-100 text-red-800'}`}>
                    多语言处理
                  </span>
                </div>
              </div>
            </motion.div>

            {/* 研究领域3：计算机视觉 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
            >
              <div className="p-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gradient-to-r from-cyan-600 to-teal-600 text-white mb-4">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>计算机视觉</h3>
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  图像分类、目标检测和分割，以及生成式视觉模型研究，探索视觉与其他模态的交互。
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                    目标检测
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-purple-300' : 'bg-purple-100 text-purple-800'}`}>
                    图像分割
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-green-300' : 'bg-green-100 text-green-800'}`}>
                    生成式视觉
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-red-300' : 'bg-red-100 text-red-800'}`}>
                    视觉Transformer
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* 研究技能图谱 */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className={`mt-16 p-6 rounded-lg border ${darkMode ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-gray-200'} backdrop-blur-sm`}
          >
            <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6 text-center`}>AI技能图谱</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { name: 'PyTorch', level: 95 },
                { name: 'TensorFlow', level: 85 },
                { name: 'NLP', level: 90 },
                { name: '计算机视觉', level: 88 },
                { name: '强化学习', level: 70 },
                { name: '大型语言模型', level: 82 },
                { name: '多模态AI', level: 85 },
                { name: '神经网络设计', level: 92 }
              ].map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ width: 0 }}
                  whileInView={{ width: '100%' }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <div className={`${darkMode ? 'text-gray-300' : 'text-gray-800'} text-sm font-medium mb-1`}>
                    {skill.name}
                  </div>
                  <div className={`bg-gray-200 rounded-full h-2.5 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <div 
                      className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-cyan-500" 
                      style={{ width: `${skill.level}%` }}
                    />
                  </div>
                  <div className="text-right text-xs mt-1 text-gray-500">{skill.level}%</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 博客文章和笔记编辑区 */}
      <section id="blog" className="relative py-16 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 主内容区 */}
            <div className="lg:col-span-2">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`text-3xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-6`}
              >
                <span className={`inline-block ${darkMode ? 'bg-gradient-to-r from-purple-400 to-blue-300' : 'bg-gradient-to-r from-purple-600 to-blue-500'} bg-clip-text text-transparent`}>
                  技术博客
                </span>
              </motion.h2>

              {loading ? (
                <div className={`text-center py-12 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <div className="inline-block animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
                  <p className={`mt-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>加载文章中...</p>
                </div>
              ) : error ? (
                <div className={`text-center py-12 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className="text-red-500">{error}</p>
                  <Button 
                    onClick={() => window.location.reload()}
                    className={`mt-4 ${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800'} text-white`}
                  >
                    刷新页面
                  </Button>
                </div>
              ) : posts.length === 0 ? (
                <div className={`text-center py-12 ${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4`}>还没有发布的文章</p>
                  <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} text-sm`}>使用右侧的AI研究笔记发布你的第一篇文章吧！</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {posts.map((post, index) => (
                    <motion.article 
                      key={post.id} 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300 hover:shadow-lg`}
                    >
                      <Link href={`/posts/${post.id}`} className="block">
                        <div className="relative aspect-[2/1] overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-500"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${darkMode ? 'from-gray-900' : 'from-gray-800'} to-transparent opacity-60`}></div>
                          <div className="absolute bottom-4 left-4 right-4">
                            <div className="flex items-center text-white text-sm mb-2">
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
                            <h3 className="text-white text-xl font-bold text-shadow">
                              {post.title}
                            </h3>
                          </div>
                        </div>
                      </Link>
                      <div className="p-6">
                        <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'} mb-4 line-clamp-2`}>{post.description}</p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {post.tags.map((tag, i) => (
                            <span key={i} className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${darkMode ? 'bg-gray-700 text-blue-300' : 'bg-blue-100 text-blue-800'}`}>
                              <Tag className="h-3 w-3 mr-1" />
                              {tag}
                            </span>
                          ))}
                        </div>

                        <Link
                          href={`/posts/${post.id}`}
                          className={`inline-flex items-center text-sm ${darkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500'} transition-colors`}
                        >
                          阅读全文 <ArrowRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>

            {/* 侧边栏 */}
            <aside className="space-y-8">
              {/* 作者卡片 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6 text-center`}
              >
                <div className="relative h-24 w-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-blue-500/30">
                  <Image
                    src="/images/2774141023.jpeg"
                    alt="Chryssolion Chen"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'} mb-2`}>Chryssolion Chen</h3>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-4`}>
                  AI研究员 | 机器学习专家 | 技术博主
                </p>
                <div className="flex justify-center gap-4">
                  <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-colors`}>
                    <Download className="h-5 w-5" />
                  </button>
                  <button className={`p-2 rounded-full ${darkMode ? 'bg-gray-700 text-blue-400 hover:bg-gray-600' : 'bg-gray-100 text-blue-600 hover:bg-gray-200'} transition-colors`}>
                    <Lock className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>

              {/* AI研究笔记编辑器 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4 pb-2 border-b border-gray-700/30">
                    <h3 className={`font-bold text-lg ${darkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                      <Brain className="inline-block mr-2 h-5 w-5" />
                      AI研究笔记
                    </h3>
                    
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        className={`text-sm ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-gray-900'} border rounded px-2 py-1 w-32`}
                        placeholder="笔记标题"
                      />
                      <Button 
                        variant="ghost"
                        size="sm"
                        onClick={togglePreview}
                        className={`${darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-700 hover:text-gray-900'} transition-colors text-sm`}
                      >
                        {isPreview ? '编辑' : '预览'}
                      </Button>
                    </div>
                  </div>
                  
                  <div className={`mb-4 rounded border ${darkMode ? 'border-gray-700 bg-gray-900/60' : 'border-gray-300 bg-white'}`}>
                    {isPreview ? (
                      <div className={`p-4 min-h-[200px] max-h-[300px] overflow-auto ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                        <MarkdownRenderer content={noteContent} />
                      </div>
                    ) : (
                      <MarkdownEditor
                        value={noteContent}
                        onChange={(value) => setNoteContent(value || '')}
                        minHeight={200}
                        placeholder="在这里输入AI研究笔记..."
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
                        className={`${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-300'} mr-2 text-xs`}
                      >
                        加载示例
                      </Button>
                      <Button 
                        variant="outline"
                        size="sm"
                        onClick={clearContent}
                        className={`${darkMode ? 'text-gray-300 border-gray-700' : 'text-gray-700 border-gray-300'} text-xs`}
                      >
                        清除内容
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        className={`${darkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-700 hover:bg-blue-800'} text-white text-sm px-3`}
                        onClick={saveNote}
                        disabled={isSaving}
                      >
                        {isSaving ? '保存中...' : '保存'}
                      </Button>
                      
                      <Button 
                        variant="outline"
                        className={`${darkMode ? 'text-gray-300 border-gray-700 hover:bg-gray-700' : 'text-gray-700 border-gray-300 hover:bg-gray-100'} text-sm px-3`}
                        onClick={exportToFile}
                        title="导出为Markdown文件"
                      >
                        <FileDown className="h-4 w-4 mr-1" /> 导出
                      </Button>
                      
                      <Button 
                        className={`${darkMode ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-700 hover:bg-purple-800'} text-white text-sm px-3`}
                        onClick={publishNote}
                        disabled={isPublishing}
                      >
                        <Send className="h-4 w-4 mr-1" /> {isPublishing ? '发布中...' : '发布'}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* 热门标签 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
              >
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  热门标签
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, i) => (
                    <Link
                      key={i}
                      href={`#${tag.name}`}
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium transition-colors ${darkMode 
                        ? 'bg-gray-700 text-blue-300 hover:bg-gray-600' 
                        : 'bg-blue-100 text-blue-800 hover:bg-blue-200'}`}
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag.name} <span className={`ml-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>({tag.count})</span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* AI技术话题 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`${darkMode ? 'bg-gray-800/60' : 'bg-white/60'} backdrop-blur-sm rounded-lg overflow-hidden border ${darkMode ? 'border-gray-700' : 'border-gray-200'} p-6`}
              >
                <h3 className={`font-bold text-lg ${darkMode ? 'text-white' : 'text-gray-900'} mb-4 pb-2 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  热门AI主题
                </h3>
                <ul className="space-y-3">
                  <li>
                    <Link
                      href="#"
                      className={`flex items-center justify-between ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors py-1`}
                    >
                      <span className="flex items-center">
                        <span className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 w-2 rounded-full mr-2"></span>
                        大型语言模型
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>24</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`flex items-center justify-between ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors py-1`}
                    >
                      <span className="flex items-center">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 w-2 rounded-full mr-2"></span>
                        生成式AI
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>18</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`flex items-center justify-between ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors py-1`}
                    >
                      <span className="flex items-center">
                        <span className="bg-gradient-to-r from-green-500 to-teal-500 h-2 w-2 rounded-full mr-2"></span>
                        机器学习基础
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>14</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`flex items-center justify-between ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors py-1`}
                    >
                      <span className="flex items-center">
                        <span className="bg-gradient-to-r from-red-500 to-orange-500 h-2 w-2 rounded-full mr-2"></span>
                        计算机视觉
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>12</span>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="#"
                      className={`flex items-center justify-between ${darkMode ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600'} transition-colors py-1`}
                    >
                      <span className="flex items-center">
                        <span className="bg-gradient-to-r from-amber-500 to-yellow-500 h-2 w-2 rounded-full mr-2"></span>
                        AI伦理与安全
                      </span>
                      <span className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>9</span>
                    </Link>
                  </li>
                </ul>
              </motion.div>
            </aside>
          </div>
        </div>
      </section>
      
      {/* 页脚 */}
      <footer className={`${darkMode ? 'bg-gray-900' : 'bg-gray-100'} py-12`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-6 md:mb-0">
              <BrainCircuit className={`h-8 w-8 ${darkMode ? 'text-blue-400' : 'text-blue-600'} mr-2`} />
              <span className={`font-bold text-xl ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                ChryssolionAI
              </span>
            </div>
            <div className={`${darkMode ? 'text-gray-400' : 'text-gray-500'} text-sm`}>
              © {new Date().getFullYear()} Chryssolion Chen. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      {/* 为代码添加文本阴影效果的样式 */}
      <style jsx global>{`
        .text-shadow {
          text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
        }
        
        /* 添加浮动动画 */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
