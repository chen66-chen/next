"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, BarChart, Users, Shield, Clock } from "lucide-react"

/**
 * 企业管理系统案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function EnterpriseManagementCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case4",
    title: "一体化企业管理系统",
    summary: "整合人力资源、财务、项目和客户管理的一站式企业解决方案，提供数据分析和决策支持",
    client: "某制造业企业集团",
    duration: "12个月",
    completionDate: "2023年12月",
    technologies: [
      { name: "Vue.js", icon: "/images/tech/vue.svg" },
      { name: "Node.js", icon: "/images/tech/nodejs.svg" },
      { name: "TypeScript", icon: "/images/tech/typescript.svg" },
      { name: "MongoDB", icon: "/images/tech/mongodb.svg" },
      { name: "Docker", icon: "/images/tech/docker.svg" },
      { name: "AWS", icon: "/images/tech/aws.svg" }
    ],
    features: [
      "集成化人力资源管理",
      "财务预算与支出追踪",
      "项目规划与进度管理",
      "客户关系管理（CRM）",
      "供应链与库存管理",
      "数据分析与报表生成",
      "权限管理与安全控制",
      "移动端应用支持",
      "多语言与国际化支持"
    ],
    challenges: [
      "整合多个已有系统和数据源",
      "确保系统安全同时保持高可用性",
      "满足不同部门的多样化需求",
      "提供直观的用户界面降低培训成本"
    ],
    solutions: [
      "采用微服务架构实现系统解耦和独立扩展",
      "引入统一身份认证和细粒度权限控制",
      "通过用户调研和快速迭代优化用户体验",
      "设计可配置的工作流引擎适应不同业务流程"
    ],
    results: [
      "管理效率提升35%",
      "决策时间缩短60%",
      "信息孤岛问题得到有效解决",
      "人工操作错误减少85%",
      "IT维护成本降低40%"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/127382912/3105237829.webp",
        alt: "管理控制台",
        caption: "全面直观的管理控制台，展示关键业务指标和数据分析"
      },
      {
        src: "https://ext.same-assets.com/9783219832/312893218.webp",
        alt: "人力资源管理模块",
        caption: "功能齐全的人力资源管理模块，包含员工信息、绩效考核和培训管理"
      },
      {
        src: "https://ext.same-assets.com/32178921/9073281093.png",
        alt: "数据分析报表",
        caption: "强大的数据可视化报表功能，支持自定义指标和多维度分析"
      }
    ],
    testimonial: {
      content: "这套系统彻底改变了我们的管理方式。过去我们需要在多个系统间切换，数据难以整合，决策缓慢。现在所有管理功能集成在一个平台，大大提高了效率，为我们的业务扩张提供了有力支持。",
      author: "李经理",
      position: "首席运营官",
      company: "某制造业企业集团"
    }
  };

  // 系统优势数据
  const systemAdvantages = [
    {
      icon: <BarChart className="w-8 h-8 text-blue-500" />,
      title: "数据驱动决策",
      description: "实时数据分析和可视化报表，支持管理者做出更准确的业务决策"
    },
    {
      icon: <Users className="w-8 h-8 text-green-500" />,
      title: "协作与沟通",
      description: "打破部门壁垒，促进跨团队协作，提高信息透明度和工作效率"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "安全与合规",
      description: "严格的数据安全控制和访问权限管理，确保企业信息安全和合规"
    },
    {
      icon: <Clock className="w-8 h-8 text-yellow-500" />,
      title: "流程自动化",
      description: "自动化重复性工作流程，减少手动操作，降低错误率，提升效率"
    }
  ];

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
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
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
        {/* 系统优势展示 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">企业管理系统优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {systemAdvantages.map((advantage, index) => (
              <div key={index} className="p-5 border border-gray-100 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 系统对比 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">传统管理系统 VS 一体化企业管理系统</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">对比项</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">传统分散管理系统</th>
                  <th className="px-4 py-3 text-left font-semibold text-blue-600">一体化企业管理系统</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">数据整合</td>
                  <td className="px-4 py-3 text-gray-600">数据分散在多个系统中，难以整合</td>
                  <td className="px-4 py-3 text-blue-600">数据统一存储和管理，一站式访问</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">决策效率</td>
                  <td className="px-4 py-3 text-gray-600">需要手动整合数据，决策缓慢</td>
                  <td className="px-4 py-3 text-blue-600">实时数据分析，快速决策支持</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">部门协作</td>
                  <td className="px-4 py-3 text-gray-600">各部门独立运作，协作困难</td>
                  <td className="px-4 py-3 text-blue-600">跨部门协作流畅，信息共享高效</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">系统维护</td>
                  <td className="px-4 py-3 text-gray-600">多系统维护成本高</td>
                  <td className="px-4 py-3 text-blue-600">统一维护管理，成本显著降低</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">用户体验</td>
                  <td className="px-4 py-3 text-gray-600">界面不一致，需要学习多个系统</td>
                  <td className="px-4 py-3 text-blue-600">统一用户界面，学习成本低</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">系统扩展性</td>
                  <td className="px-4 py-3 text-gray-600">扩展困难，与其他系统集成复杂</td>
                  <td className="px-4 py-3 text-blue-600">模块化设计，易于扩展和集成</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">移动支持</td>
                  <td className="px-4 py-3 text-gray-600">移动支持有限或不支持</td>
                  <td className="px-4 py-3 text-blue-600">全面移动化支持，随时随地办公</td>
                </tr>
              </tbody>
            </table>
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
                    <CheckCircle className="text-blue-500 w-5 h-5 mr-2 mt-0.5" />
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">需要定制企业管理解决方案？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们提供专业的企业管理系统设计与开发服务，帮助企业提升管理效率，降低运营成本</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-blue-600 hover:bg-blue-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">咨询企业解决方案</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 