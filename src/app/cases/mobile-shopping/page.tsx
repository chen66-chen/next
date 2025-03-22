"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, ShoppingBag, CreditCard, Smartphone, Award } from "lucide-react"

/**
 * 移动购物应用案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function MobileShoppingCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case5",
    title: "全渠道移动购物平台",
    summary: "为零售品牌打造的移动电商解决方案，支持线上线下一体化购物体验，提升用户转化率和品牌忠诚度",
    client: "某知名零售服装品牌",
    duration: "8个月",
    completionDate: "2024年1月",
    technologies: [
      { name: "React Native", icon: "/images/tech/react-native.svg" },
      { name: "Next.js", icon: "/images/tech/nextjs.svg" },
      { name: "GraphQL", icon: "/images/tech/graphql.svg" },
      { name: "Stripe", icon: "/images/tech/stripe.svg" },
      { name: "Firebase", icon: "/images/tech/firebase.svg" },
      { name: "Google Cloud", icon: "/images/tech/gcp.svg" }
    ],
    features: [
      "个性化推荐系统",
      "多平台同步购物车",
      "AR虚拟试穿功能",
      "门店库存实时查询",
      "多渠道支付解决方案",
      "会员积分与优惠系统",
      "智能搜索与筛选",
      "社交分享与用户评价",
      "订单追踪与配送管理"
    ],
    challenges: [
      "实现线上线下无缝购物体验",
      "构建高性能移动应用支持大流量访问",
      "确保支付系统安全性与稳定性",
      "整合多个后端系统与数据源"
    ],
    solutions: [
      "采用微前端架构提升应用性能与扩展性",
      "实现渐进式Web应用与原生应用结合",
      "设计分布式购物车与订单系统",
      "基于用户行为分析构建推荐引擎"
    ],
    results: [
      "移动端转化率提升35%",
      "用户平均停留时间增加45%",
      "跨平台购物完成率提升50%",
      "应用下载量突破100万",
      "客户复购率提升28%"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/215782318/4109321031.webp",
        alt: "移动应用主页",
        caption: "个性化推荐与沉浸式购物体验的移动应用主界面"
      },
      {
        src: "https://ext.same-assets.com/3213781923/510392013.webp",
        alt: "AR试穿功能",
        caption: "创新的AR虚拟试穿功能，提供直观的产品体验"
      },
      {
        src: "https://ext.same-assets.com/421308932/398123801.png",
        alt: "无缝支付流程",
        caption: "简化的一键支付流程，支持多种支付方式"
      }
    ],
    testimonial: {
      content: "这款移动购物应用彻底改变了我们与顾客互动的方式。无论是线上购物还是实体店体验，顾客都能享受到一致的品牌服务。特别是AR试穿功能大大降低了退货率，而个性化推荐则显著提升了客单价。",
      author: "张总监",
      position: "数字营销总监",
      company: "某知名零售服装品牌"
    }
  };

  // 应用优势数据
  const appAdvantages = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-pink-500" />,
      title: "全渠道购物",
      description: "线上线下无缝衔接，随时随地享受一致的购物体验"
    },
    {
      icon: <Smartphone className="w-8 h-8 text-green-500" />,
      title: "移动端优先",
      description: "专为移动场景设计的界面与交互，提供流畅的购物体验"
    },
    {
      icon: <CreditCard className="w-8 h-8 text-blue-500" />,
      title: "安全支付",
      description: "多重加密与安全认证，保障用户支付与个人信息安全"
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-500" />,
      title: "个性化推荐",
      description: "基于AI算法的智能推荐系统，精准匹配用户喜好"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航返回按钮 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/style1" className="inline-flex items-center text-pink-600 hover:text-pink-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回案例列表</span>
          </Link>
        </div>
      </div>

      {/* 案例头部信息 */}
      <div className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-16">
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
        {/* 应用优势展示 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">移动购物应用优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {appAdvantages.map((advantage, index) => (
              <div key={index} className="p-5 border border-gray-100 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 客户旅程展示 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">无缝购物体验旅程</h2>
          <div className="relative">
            {/* 连接线 */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-pink-100 -translate-y-1/2 z-0"></div>
            
            {/* 步骤 */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 rounded-full p-4 mb-4">
                  <Smartphone className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">浏览与发现</h3>
                <p className="text-sm text-gray-600">个性化推荐与智能分类，帮助用户快速发现心仪商品</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 rounded-full p-4 mb-4">
                  <ShoppingBag className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">试穿与选择</h3>
                <p className="text-sm text-gray-600">AR虚拟试穿功能，帮助用户在购买前体验产品效果</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 rounded-full p-4 mb-4">
                  <CreditCard className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">安全结算</h3>
                <p className="text-sm text-gray-600">多种支付方式与快速结算流程，确保支付安全性</p>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-pink-100 rounded-full p-4 mb-4">
                  <Award className="w-8 h-8 text-pink-500" />
                </div>
                <h3 className="font-bold text-gray-800 mb-2">配送与跟踪</h3>
                <p className="text-sm text-gray-600">实时订单跟踪与灵活配送选项，提供优质配送体验</p>
              </div>
            </div>
          </div>
        </div>

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
                        <div className="w-5 h-5 bg-pink-500 rounded-full"></div>
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
                    <CheckCircle className="text-pink-500 w-5 h-5 mr-2 mt-0.5" />
                    <span className="text-gray-700">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧主要内容 */}
          <div className="lg:col-span-2">
            {/* 项目截图展示 */}
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
                    <div className="flex-shrink-0 bg-pink-100 rounded-full p-1 mr-3">
                      <CheckCircle className="text-pink-600 w-4 h-4" />
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
              <blockquote className="border-l-4 border-pink-500 pl-4 italic text-gray-700">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">需要移动电商解决方案？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们提供专业的移动购物平台开发服务，帮助品牌打造全渠道购物体验，提升转化率与用户粘性</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-pink-600 hover:bg-pink-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">咨询移动电商方案</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 