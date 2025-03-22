"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle } from "lucide-react"

/**
 * 电子商务平台案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function EcommercePlatformCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case1",
    title: "全栈电子商务平台",
    summary: "面向中小企业的一站式电商解决方案，兼具现代UI设计和强大后端功能",
    client: "某知名服装品牌",
    duration: "4个月",
    completionDate: "2023年12月",
    technologies: [
      { name: "React", icon: "/images/tech/react.svg" },
      { name: "Next.js", icon: "/images/tech/nextjs.svg" },
      { name: "Node.js", icon: "/images/tech/nodejs.svg" },
      { name: "MongoDB", icon: "/images/tech/mongodb.svg" },
      { name: "TailwindCSS", icon: "/images/tech/tailwind.svg" },
      { name: "Redux", icon: "/images/tech/redux.svg" }
    ],
    features: [
      "响应式商品展示与搜索功能",
      "用户账户管理与个性化推荐",
      "购物车与结账流程优化",
      "多种支付方式集成",
      "订单跟踪与管理系统",
      "库存实时管理",
      "SEO优化与性能提升",
      "多语言支持",
      "数据分析与报告功能"
    ],
    challenges: [
      "构建高效的搜索引擎以处理大量产品数据",
      "确保支付过程的安全性与流畅性",
      "优化移动端用户体验",
      "实现实时库存管理系统"
    ],
    solutions: [
      "采用ElasticSearch实现高效产品搜索与筛选",
      "集成多重安全验证的支付系统",
      "使用移动优先设计原则与性能优化",
      "实现WebSocket的实时库存更新"
    ],
    results: [
      "网站访问量提升65%",
      "移动端转化率提高43%",
      "页面加载速度提升70%",
      "客户满意度达到96%",
      "订单处理时间减少50%"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/215159204/3145156357.webp",
        alt: "电商平台首页设计",
        caption: "响应式首页设计，突出产品展示"
      },
      {
        src: "https://ext.same-assets.com/1310289913/40117092.png",
        alt: "商品详情页",
        caption: "详情页面设计，提供丰富产品信息" 
      },
      {
        src: "https://ext.same-assets.com/919106026/2774141023.jpeg",
        alt: "结账流程",
        caption: "简化的结账流程，提升转化率"
      }
    ],
    testimonial: {
      content: "这个电商平台不仅满足了我们所有业务需求，而且带来了显著的销售增长。尤其是移动端体验和快速结账功能，得到了客户的高度评价。",
      author: "张经理",
      position: "运营总监",
      company: "客户公司"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航返回按钮 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/style1" className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回案例列表</span>
          </Link>
        </div>
      </div>

      {/* 案例头部信息 */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{caseDetail.title}</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl">{caseDetail.summary}</p>
          
          {/* 项目基本信息 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">客户</h3>
              <p>{caseDetail.client}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">项目周期</h3>
              <p>{caseDetail.duration}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
              <h3 className="text-lg font-medium mb-2">完成时间</h3>
              <p>{caseDetail.completionDate}</p>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容区域 */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧技术栈 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">技术栈</h2>
              <div className="space-y-4">
                {caseDetail.technologies.map((tech, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-md">
                      {tech.icon ? (
                        <Image src={tech.icon} alt={tech.name} width={20} height={20} />
                      ) : (
                        <div className="w-5 h-5 bg-blue-500 rounded-full"></div>
                      )}
                    </div>
                    <span className="text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 项目成果 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">项目成果</h2>
              <div className="space-y-3">
                {caseDetail.results.map((result, index) => (
                  <div key={index} className="flex items-start">
                    <CheckCircle className="text-green-500 w-5 h-5 mr-2 mt-0.5" />
                    <span className="text-gray-700">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧主要内容 */}
          <div className="lg:col-span-2">
            {/* 项目截图轮播 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">项目展示</h2>
              <div className="space-y-8">
                {caseDetail.screenshots.map((screenshot, index) => (
                  <div key={index} className="space-y-2">
                    <div className="relative h-[300px] w-full overflow-hidden rounded-lg">
                      <Image 
                        src={screenshot.src} 
                        alt={screenshot.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <p className="text-sm text-gray-500 text-center">{screenshot.caption}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 核心功能 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">核心功能</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {caseDetail.features.map((feature, index) => (
                  <div key={index} className="flex items-start">
                    <div className="flex-shrink-0 bg-blue-100 rounded-full p-1 mr-3">
                      <CheckCircle className="text-blue-600 w-4 h-4" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 挑战与解决方案 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">项目挑战</h2>
                <ul className="space-y-3 list-disc pl-5">
                  {caseDetail.challenges.map((challenge, index) => (
                    <li key={index} className="text-gray-700">{challenge}</li>
                  ))}
                </ul>
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-bold mb-6 text-gray-800">解决方案</h2>
                <ul className="space-y-3 list-disc pl-5">
                  {caseDetail.solutions.map((solution, index) => (
                    <li key={index} className="text-gray-700">{solution}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* 客户评价 */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">客户评价</h2>
              <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-700">
                "{caseDetail.testimonial.content}"
              </blockquote>
              <div className="mt-4">
                <p className="font-semibold text-gray-800">{caseDetail.testimonial.author}</p>
                <p className="text-sm text-gray-600">{caseDetail.testimonial.position}，{caseDetail.testimonial.company}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 底部CTA */}
      <div className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">想了解更多类似案例？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们专注于为不同行业提供定制化的技术解决方案，助力企业实现数字化转型</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">联系我们</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 