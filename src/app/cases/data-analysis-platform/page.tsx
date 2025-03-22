"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, BarChart3, PieChart, TrendingUp, Database } from "lucide-react"

/**
 * 数据分析平台案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function DataAnalysisPlatformCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case2",
    title: "企业级数据分析平台",
    summary: "为企业提供全方位数据可视化和分析解决方案，助力数据驱动决策",
    client: "某金融科技公司",
    duration: "5个月",
    completionDate: "2024年2月",
    technologies: [
      { name: "Python", icon: "/images/tech/python.svg" },
      { name: "Flask", icon: "/images/tech/flask.svg" },
      { name: "Pandas", icon: "/images/tech/pandas.svg" },
      { name: "D3.js", icon: "/images/tech/d3.svg" },
      { name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
      { name: "Docker", icon: "/images/tech/docker.svg" }
    ],
    features: [
      "多数据源集成与导入",
      "交互式数据可视化仪表盘",
      "自定义报表生成",
      "数据趋势分析",
      "用户权限管理",
      "数据导出多种格式支持",
      "API接口集成",
      "自动数据清洗和预处理",
      "历史数据对比分析"
    ],
    challenges: [
      "处理大规模复杂数据集",
      "实现高性能可视化组件",
      "确保数据处理的准确性和一致性",
      "构建用户友好的界面以服务非技术用户"
    ],
    solutions: [
      "采用分布式计算架构处理大规模数据",
      "自定义优化的D3.js可视化组件",
      "实现自动化数据验证和校准流程",
      "基于用户研究的界面设计与迭代优化"
    ],
    results: [
      "数据分析效率提升80%",
      "决策周期缩短60%",
      "业务报表生成时间减少75%",
      "企业利润增长22%",
      "用户满意度达到98%"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/2548152323/3103727191.webp",
        alt: "数据分析仪表盘",
        caption: "全面的数据分析仪表盘，提供多维度数据视图"
      },
      {
        src: "https://ext.same-assets.com/1310289913/40117092.png", 
        alt: "可视化图表",
        caption: "交互式数据可视化图表，支持深入分析"
      },
      {
        src: "https://ext.same-assets.com/215159204/3145156357.webp",
        alt: "报表生成界面",
        caption: "自定义报表生成界面，支持多种格式导出"
      }
    ],
    testimonial: {
      content: "这个数据分析平台彻底改变了我们处理数据的方式。现在我们能够快速获取业务洞察，并基于数据做出更明智的决策。尤其是自定义报表功能，为我们节省了大量时间。",
      author: "李总监",
      position: "数据分析部门主管",
      company: "某金融科技公司"
    }
  };

  // 数据分析优势部分数据
  const analyticsAdvantages = [
    {
      icon: <BarChart3 className="w-8 h-8 text-green-500" />,
      title: "全方位数据可视化",
      description: "将复杂数据转化为直观图表，支持多种可视化方式，让数据讲述业务故事"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-blue-500" />,
      title: "趋势预测分析",
      description: "基于历史数据进行趋势分析与预测，帮助企业掌握未来发展方向"
    },
    {
      icon: <Database className="w-8 h-8 text-purple-500" />,
      title: "多源数据整合",
      description: "无缝集成多种内外部数据源，构建统一数据视图，消除信息孤岛"
    },
    {
      icon: <PieChart className="w-8 h-8 text-orange-500" />,
      title: "深度洞察挖掘",
      description: "应用高级分析算法，从海量数据中发现隐藏的业务价值和机会"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航返回按钮 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/style1" className="inline-flex items-center text-green-600 hover:text-green-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回案例列表</span>
          </Link>
        </div>
      </div>

      {/* 案例头部信息 */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white py-16">
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
        {/* 数据分析优势展示 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">数据分析平台核心优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {analyticsAdvantages.map((advantage, index) => (
              <div key={index} className="p-5 border border-gray-100 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
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
                        <div className="w-5 h-5 bg-green-500 rounded-full"></div>
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
                    <div className="flex-shrink-0 bg-green-100 rounded-full p-1 mr-3">
                      <CheckCircle className="text-green-600 w-4 h-4" />
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
              <blockquote className="border-l-4 border-green-500 pl-4 italic text-gray-700">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">想了解更多数据解决方案？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们提供定制化的数据分析服务，帮助企业挖掘数据价值，提升决策效率</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">咨询服务</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 