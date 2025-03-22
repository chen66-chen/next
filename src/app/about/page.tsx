import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="mb-12">
        <h1 className="site1-title text-4xl md:text-5xl mb-6 text-center">关于小臣</h1>
        <div className="max-w-3xl mx-auto">
          <p className="site2-subtitle mb-6 text-center">
            本项目是将不同设计元素融合在一起的网站
          </p>
          <div className="bg-site3-dark/5 p-6 rounded-lg mb-8">
            <p className="mb-4">
              小臣（Blog）是一个将不同设计元素进行融合的实验性项目。
              我们从不同网站获取了设计灵感，并将它们的特色元素组合在一个现代化的 Next.js 应用中。
            </p>
            <p>
              无论您是网络安全人员、设计师还是开发者，希望本站能为您提供一些设计灵感和技术参考。
            </p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="bg-gradient-to-b from-site1-light to-white p-6 rounded-lg">
          <h2 className="font-['KuaiKanShiJieTi'] text-site1-primary text-2xl mb-4">技术支持</h2>
          <p className="text-site1-secondary mb-6">
            技术支持是一个设计简约、清新的页面。以星空背景为主题，给人一种宁静舒适的感觉。
            这个博客的特点是界面干净整洁，注重内容的呈现，给读者带来良好的阅读体验。
          </p>
          <p className="text-site1-darkAccent text-sm">网址：<a href="https://chen.com" className="text-site1-blue hover:underline" target="_blank">https://chen.com</a></p>
        </div>

        <div className="bg-gradient-to-b from-site2-light to-white p-6 rounded-lg">
          <h2 className="font-['NotoSerifSC'] text-site2-primary text-2xl mb-4">小臣のWeb</h2>
          <p className="text-site2-secondary mb-6">
            小臣のweb是一个优雅、精致的技术网站。色彩丰富，设计精美，特别适合展示技术内容和教程。
            博客使用卡片式设计，内容分类清晰，便于读者快速找到感兴趣的内容。
          </p>
          <p className="text-site2-teal text-sm">网址：<a href="https://chen.com" className="text-site2-teal hover:underline" target="_blank">https://chen.com</a></p>
        </div>

        <div className="bg-site3-dark text-site3-light p-6 rounded-lg">
          <h2 className="font-['HanTang'] text-site3-light text-2xl mb-4">Chryssolion Chen安全小窝</h2>
          <p className="text-site3-secondary mb-6">
            Chryssolion Chen安全小窝采用深色系设计，简洁且专注于内容的呈现，非常适合程序员和开发者阅读。
            这个博客的设计理念是"Less is more"，去除了多余的装饰，让读者能够专注于内容本身。
          </p>
          <p className="text-site3-blue text-sm">网址：<a href="https://chen.com" className="text-site3-blue hover:underline" target="_blank">https://chen.com</a></p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="site3-title text-3xl mb-6 text-center">技术栈</h2>
        <div className="max-w-3xl mx-auto bg-site1-light/50 p-6 rounded-lg">
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="bg-site1-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">1</span>
              <span className="text-site1-primary">Next.js - React框架，用于构建现代化的Web应用</span>
            </li>
            <li className="flex items-center">
              <span className="bg-site2-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">2</span>
              <span className="text-site2-primary">Tailwind CSS - 实用优先的CSS框架，用于快速样式开发</span>
            </li>
            <li className="flex items-center">
              <span className="bg-site3-primary text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">3</span>
              <span className="text-site3-primary">Shadcn UI - 高质量的UI组件库，提供了现代化的设计元素</span>
            </li>
            <li className="flex items-center">
              <span className="bg-site1-blue text-white w-8 h-8 rounded-full flex items-center justify-center mr-3">4</span>
              <span className="text-site1-blue">TypeScript - 为JavaScript添加静态类型检查</span>
            </li>
          </ul>
        </div>
      </section>

      <div className="text-center mb-16">
        <Button asChild className="bg-gradient-to-r from-site1-primary via-site2-primary to-site3-primary hover:opacity-90">
          <Link href="/">返回首页</Link>
        </Button>
      </div>
    </div>
  )
}
