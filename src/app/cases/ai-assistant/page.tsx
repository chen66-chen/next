"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, Brain, MessageSquare, Zap, Sparkles } from "lucide-react"

/**
 * AI智能助手案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function AiAssistantCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case3",
    title: "AI智能客服助手",
    summary: "基于NLP技术的智能客服系统，实现多轮对话、意图识别和自动学习，提升客户服务效率",
    client: "某大型电商集团",
    duration: "6个月",
    completionDate: "2024年3月",
    technologies: [
      { name: "TensorFlow", icon: "/images/tech/tensorflow.svg" },
      { name: "Python", icon: "/images/tech/python.svg" },
      { name: "React", icon: "/images/tech/react.svg" },
      { name: "Spring Boot", icon: "/images/tech/spring.svg" },
      { name: "Redis", icon: "/images/tech/redis.svg" },
      { name: "Kubernetes", icon: "/images/tech/kubernetes.svg" }
    ],
    features: [
      "自然语言理解与处理",
      "多轮对话管理",
      "意图识别与实体提取",
      "情感分析与回应调整",
      "知识库智能检索",
      "自动学习与优化",
      "多语言支持",
      "人机协作模式切换",
      "实时数据分析仪表盘"
    ],
    challenges: [
      "处理多样化的用户表达方式",
      "构建高效的多轮对话管理机制",
      "确保模型持续学习和优化",
      "在高并发场景下保持系统稳定"
    ],
    solutions: [
      "采用BERT模型优化自然语言理解能力",
      "设计基于状态机的对话管理框架",
      "实现基于用户反馈的持续学习机制",
      "通过微服务架构和容器化部署保障系统扩展性"
    ],
    results: [
      "客服人力成本降低45%",
      "客户问题解决率提升至92%",
      "平均响应时间缩短75%",
      "客户满意度提升28%",
      "系统能够处理95%以上的常见问题"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/2548152323/3103727191.webp",
        alt: "AI客服对话界面",
        caption: "直观友好的AI对话界面，支持多轮对话和自然语言理解"
      },
      {
        src: "https://ext.same-assets.com/215159204/3145156357.webp",
        alt: "管理控制台",
        caption: "功能齐全的管理控制台，提供实时数据分析和系统监控"
      },
      {
        src: "https://ext.same-assets.com/1310289913/40117092.png",
        alt: "知识库管理",
        caption: "强大的知识库管理系统，支持AI自动学习和优化"
      }
    ],
    testimonial: {
      content: "AI客服助手彻底改变了我们的客户服务模式。它不仅能够自动处理大量重复性工作，还能不断学习和改进。我们的客服团队现在可以专注于处理更复杂的问题，客户满意度也有了显著提升。",
      author: "王总监",
      position: "客户服务中心主管",
      company: "某大型电商集团"
    }
  };

  // AI技术优势数据
  const aiAdvantages = [
    {
      icon: <Brain className="w-8 h-8 text-indigo-500" />,
      title: "自然语言处理",
      description: "先进的NLP技术，精准理解用户表达，实现接近人类水平的对话交互能力"
    },
    {
      icon: <MessageSquare className="w-8 h-8 text-blue-500" />,
      title: "多轮对话能力",
      description: "基于上下文的对话管理，实现连贯自然的多轮交流，准确跟踪对话状态"
    },
    {
      icon: <Zap className="w-8 h-8 text-yellow-500" />,
      title: "实时响应系统",
      description: "毫秒级响应速度，提供即时反馈，满足大规模并发访问需求"
    },
    {
      icon: <Sparkles className="w-8 h-8 text-purple-500" />,
      title: "持续学习机制",
      description: "基于用户反馈不断自我优化，知识库动态扩展，服务质量持续提升"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 顶部导航返回按钮 */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/style1" className="inline-flex items-center text-purple-600 hover:text-purple-800">
            <ArrowLeft className="w-4 h-4 mr-2" />
            <span>返回案例列表</span>
          </Link>
        </div>
      </div>

      {/* 案例头部信息 */}
      <div className="bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-16">
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
        {/* AI技术优势展示 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">AI客服解决方案优势</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {aiAdvantages.map((advantage, index) => (
              <div key={index} className="p-5 border border-gray-100 rounded-lg text-center hover:shadow-md transition-shadow">
                <div className="flex justify-center mb-4">{advantage.icon}</div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{advantage.title}</h3>
                <p className="text-sm text-gray-600">{advantage.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 案例对比 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">传统客服 VS AI智能客服</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">对比项</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">传统人工客服</th>
                  <th className="px-4 py-3 text-left font-semibold text-purple-600">AI智能客服</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">响应速度</td>
                  <td className="px-4 py-3 text-gray-600">平均1-5分钟</td>
                  <td className="px-4 py-3 text-purple-600">即时响应（毫秒级）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">服务时间</td>
                  <td className="px-4 py-3 text-gray-600">受限于工作时间</td>
                  <td className="px-4 py-3 text-purple-600">24/7全天候服务</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">并发处理能力</td>
                  <td className="px-4 py-3 text-gray-600">单客服有限处理能力</td>
                  <td className="px-4 py-3 text-purple-600">无限并发处理能力</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">知识覆盖</td>
                  <td className="px-4 py-3 text-gray-600">依赖个人经验和培训</td>
                  <td className="px-4 py-3 text-purple-600">完整统一的知识库支持</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">服务一致性</td>
                  <td className="px-4 py-3 text-gray-600">受情绪和个人差异影响</td>
                  <td className="px-4 py-3 text-purple-600">高度一致的服务质量</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">学习能力</td>
                  <td className="px-4 py-3 text-gray-600">需要定期培训</td>
                  <td className="px-4 py-3 text-purple-600">自动持续学习优化</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">成本</td>
                  <td className="px-4 py-3 text-gray-600">高人力成本和培训成本</td>
                  <td className="px-4 py-3 text-purple-600">低维护成本，规模扩展成本低</td>
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
                        <div className="w-5 h-5 bg-purple-500 rounded-full"></div>
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
                    <CheckCircle className="text-purple-500 w-5 h-5 mr-2 mt-0.5" />
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
                    <div className="flex-shrink-0 bg-purple-100 rounded-full p-1 mr-3">
                      <CheckCircle className="text-purple-600 w-4 h-4" />
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
              <blockquote className="border-l-4 border-purple-500 pl-4 italic text-gray-700">
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">想了解更多AI解决方案？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们提供定制化的AI技术服务，帮助企业提升运营效率，创造更多商业价值</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-purple-600 hover:bg-purple-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">咨询AI解决方案</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 