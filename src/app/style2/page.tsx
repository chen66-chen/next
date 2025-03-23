import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"

// Mock posts data
const posts = [
  {
    id: "post2",
    title: "局域网",
    description: "局域网（LAN）拓扑与网络基础概念总结",
    date: "2025-03-19",
    author: "Chryssolion Chen",
    coverImage: "/images/6.png",
    category: "网工笔记",
    tags: ["ACL", "网络配置"]
  },
  {
    id: "post4",
    title: "渗透测试实战总结",
    description: "详细介绍SSH登录提权流程、NMAP扫描+FTP提权流程、防火墙实战案例等渗透测试技术",
    date: "2025-03-03",
    author: "Chryssolion Chen",
    coverImage: "/images/3.jpg",
    category: "渗透",
    tags: ["网络"]
  },
  {
    id: "post9",
    title: "OSPF与RIP协议对比分析",
    description: "详细对比两种常用路由协议的优缺点，帮助网络工程师选择合适的协议。",
    date: "2025-03-15",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/400199818/1223356591.webp",
    category: "网工笔记",
    tags: ["OSPF", "RIP", "路由协议"]
  },
  {
    id: "post10",
    title: "网络安全基础教程",
    description: "介绍网络安全基础知识，包括常见攻击方式和防御策略。",
    date: "2025-02-25",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/1824305649/3628065475.webp",
    category: "安全",
    tags: ["网络安全", "防御"]
  }
]

export default function Style2Page() {
  return (
    <div className="bg-site2-light min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-cover bg-center" style={{ backgroundImage: "url('https://ext.same-assets.com/887758388/155078395.jpeg')" }}>
        <div className="absolute inset-0 bg-site2-primary/50"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-['NotoSerifSC'] text-4xl mb-2">小臣のWeb风格</h1>
            <p className="font-['NotoSerifSC'] text-xl max-w-2xl mx-auto px-4">
              优雅、精致的卡片设计，色彩丰富，适合技术内容的展示。
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-10">
        {/* Style Description */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-4">设计特点</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-site2-secondary mb-4">
                小臣のWeb设计风格优雅精致，采用卡片式布局，色彩搭配丰富多样，适合展示技术内容和教程。其主要设计特点包括：
              </p>
              <ul className="list-disc list-inside space-y-2 text-site2-secondary">
                <li>精致的卡片式布局，内容分区明确</li>
                <li>丰富的色彩搭配，视觉效果丰富</li>
                <li>优雅的字体选择，增强阅读体验</li>
                <li>平滑的过渡动画，提升交互感</li>
                <li>响应式设计，各种设备均可浏览</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md p-4 bg-site2-light rounded-lg shadow-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-3 h-3 rounded-full bg-site2-primary"></div>
                  <div className="w-3 h-3 rounded-full bg-site2-teal"></div>
                  <div className="w-3 h-3 rounded-full bg-site2-gold"></div>
                  <div className="flex-1"></div>
                </div>
                <div className="h-32 bg-gradient-to-r from-site2-primary/30 to-site2-teal/30 rounded mb-3"></div>
                <div className="h-4 bg-site2-primary/20 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-site2-secondary/20 rounded w-full mb-1"></div>
                <div className="h-3 bg-site2-secondary/20 rounded w-5/6"></div>
                <div className="mt-3 flex gap-2">
                  <div className="h-5 w-16 rounded-full bg-site2-teal/20"></div>
                  <div className="h-5 w-16 rounded-full bg-site2-gold/20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts - Grid Layout */}
        <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-6">最新文章</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-12">
          {posts.map((post) => (
            <div key={post.id} className="post-card post-card-site2 group">
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.title}
                  width={600}
                  height={300}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-site2-primary/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-['NotoSerifSC'] text-site2-primary text-xl mb-2 truncate">
                  {post.title}
                </h3>
                <p className="text-site2-secondary text-sm mb-3 line-clamp-2">
                  {post.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-3">
                  {post.tags.map((tag, idx) => (
                    <span key={idx} className="bg-site2-teal/10 text-site2-teal text-xs px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-site2-primary text-xs font-semibold">{post.category}</span>
                  <span className="text-site2-gold text-xs">{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Color Palette */}
        <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-6">配色方案</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <div className="flex flex-col items-center">
            <div className="w-full h-24 bg-site2-primary rounded-lg mb-2"></div>
            <span className="text-site2-secondary text-sm">#213954</span>
            <span className="text-site2-secondary text-xs">主色调</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-24 bg-site2-secondary rounded-lg mb-2"></div>
            <span className="text-site2-secondary text-sm">#815e61</span>
            <span className="text-site2-secondary text-xs">次要色调</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-24 bg-site2-teal rounded-lg mb-2"></div>
            <span className="text-site2-secondary text-sm">#3faaa8</span>
            <span className="text-site2-secondary text-xs">强调色</span>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-full h-24 bg-site2-gold rounded-lg mb-2"></div>
            <span className="text-site2-secondary text-sm">#bb8d37</span>
            <span className="text-site2-secondary text-xs">点缀色</span>
          </div>
        </div>

        {/* Typography */}
        <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-6">字体展示</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="mb-6">
            <h3 className="font-['NotoSerifSC'] text-site2-primary text-xl mb-4">Noto Serif SC</h3>
            <div className="space-y-3">
              <p className="font-['NotoSerifSC'] text-site2-primary text-3xl">大标题文字效果</p>
              <p className="font-['NotoSerifSC'] text-site2-primary text-2xl">中标题文字效果</p>
              <p className="font-['NotoSerifSC'] text-site2-primary text-xl">小标题文字效果</p>
              <p className="font-['NotoSerifSC'] text-site2-secondary">
                正文文字效果。Noto Serif SC是一款优雅的衬线字体，适合用于博客和文章的标题和正文，增强阅读体验和美观度。
              </p>
            </div>
          </div>
        </div>

        {/* UI Components */}
        <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-6">UI组件</h2>
        <div className="bg-white p-6 rounded-lg shadow-md mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-['NotoSerifSC'] text-site2-primary text-xl mb-4">标签</h3>
              <div className="flex flex-wrap gap-2">
                <span className="bg-site2-primary text-white text-sm px-3 py-1 rounded-md">
                  #网络配置
                </span>
                <span className="bg-site2-teal text-white text-sm px-3 py-1 rounded-md">
                  #OSPF
                </span>
                <span className="bg-site2-gold text-white text-sm px-3 py-1 rounded-md">
                  #RIP
                </span>
                <span className="bg-site2-secondary text-white text-sm px-3 py-1 rounded-md">
                  #ACL
                </span>
              </div>
            </div>
            <div>
              <h3 className="font-['NotoSerifSC'] text-site2-primary text-xl mb-4">按钮</h3>
              <div className="flex flex-wrap gap-3">
                <button className="bg-site2-primary text-white px-4 py-2 rounded-md hover:bg-site2-primary/90 transition-colors">
                  主要按钮
                </button>
                <button className="bg-site2-teal text-white px-4 py-2 rounded-md hover:bg-site2-teal/90 transition-colors">
                  操作按钮
                </button>
                <button className="border border-site2-primary text-site2-primary px-4 py-2 rounded-md hover:bg-site2-primary/10 transition-colors">
                  次要按钮
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center">
          <Button asChild className="bg-site2-primary hover:bg-site2-primary/90">
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
