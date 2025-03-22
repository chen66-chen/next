import { Metadata } from 'next'

export const metadata: Metadata = {
  title: '博客主题更新说明',
  description: '最新的博客主题更新内容和功能介绍',
}

export default function ThemeUpdatePost() {
  return (
    <article className="prose lg:prose-xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">博客主题更新说明</h1>
      
      <div className="mb-4 text-gray-600">
        <time>发布于 2024年3月20日</time>
      </div>

      <div className="space-y-4">
        <p>
          我很高兴地宣布，我们的博客主题已经完成了重大更新！这次更新带来了多项新功能和改进，
          让您的阅读和写作体验更加出色。
        </p>

        <h2 className="text-2xl font-semibold mt-8">主要更新内容</h2>
        
        <ul className="list-disc pl-6">
          <li>全新的响应式设计，在各种设备上都能获得最佳体验</li>
          <li>深色模式支持，保护您的眼睛</li>
          <li>改进的代码块显示，支持更多编程语言的语法高亮</li>
          <li>优化的图片加载性能</li>
          <li>新增文章目录功能，方便长文章的导航</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">性能优化</h2>
        <p>
          这次更新我们特别关注了网站的性能优化：
        </p>
        <ul className="list-disc pl-6">
          <li>页面加载速度提升50%</li>
          <li>图片懒加载优化</li>
          <li>减少不必要的JavaScript代码</li>
          <li>优化CSS打包体积</li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8">后续计划</h2>
        <p>
          我们还计划在未来添加更多功能：
        </p>
        <ul className="list-disc pl-6">
          <li>评论系统升级</li>
          <li>文章分享功能增强</li>
          <li>更多自定义主题选项</li>
          <li>性能进一步优化</li>
        </ul>

        <p className="mt-8">
          感谢您一直以来的支持！如果您有任何建议或反馈，欢迎随时联系我们。
        </p>
      </div>
    </article>
  )
} 