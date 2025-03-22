"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CheckCircle, BarChart3, Lock, LineChart, Shield } from "lucide-react"

/**
 * 金融系统案例详情页
 * 展示案例的详细信息、核心功能、技术栈和实现效果
 */
export default function FinancialSystemCase() {
  // 案例详情数据
  const caseDetail = {
    id: "case6",
    title: "企业级金融交易系统",
    summary: "为大型金融机构开发的高性能交易平台，提供实时数据分析、风险控制和多层次安全保障",
    client: "某大型金融投资机构",
    duration: "15个月",
    completionDate: "2023年11月",
    technologies: [
      { name: "Java Spring", icon: "/images/tech/spring.svg" },
      { name: "Kafka", icon: "/images/tech/kafka.svg" },
      { name: "Angular", icon: "/images/tech/angular.svg" },
      { name: "PostgreSQL", icon: "/images/tech/postgresql.svg" },
      { name: "Elasticsearch", icon: "/images/tech/elasticsearch.svg" },
      { name: "Kubernetes", icon: "/images/tech/kubernetes.svg" }
    ],
    features: [
      "高频交易引擎",
      "实时市场数据分析",
      "多层风险控制系统",
      "智能投资建议",
      "监管合规报告生成",
      "多币种与多市场支持",
      "自动对账与清算",
      "高级图表与可视化",
      "多因子预测模型"
    ],
    challenges: [
      "处理高并发交易请求与极低延迟要求",
      "确保系统安全性满足金融行业标准",
      "实现复杂的风险管理算法",
      "与多个外部金融系统的实时对接"
    ],
    solutions: [
      "采用微服务架构与事件驱动设计",
      "实现多层次安全策略与身份验证",
      "开发专用高性能计算集群",
      "构建实时流处理引擎提高数据处理速度"
    ],
    results: [
      "系统响应时间降低至毫秒级",
      "交易处理效率提升300%",
      "风险预警准确率达到98%",
      "节省运营成本约40%",
      "系统稳定性达到99.99%"
    ],
    screenshots: [
      {
        src: "https://ext.same-assets.com/210931023/312909123.webp",
        alt: "交易仪表盘",
        caption: "功能全面的交易管理仪表盘，提供实时市场数据和交易状态"
      },
      {
        src: "https://ext.same-assets.com/312784123/489123741.webp",
        alt: "风险控制面板",
        caption: "多维度风险监控面板，支持实时预警和风险评估"
      },
      {
        src: "https://ext.same-assets.com/582317321/921347213.png",
        alt: "数据分析报表",
        caption: "强大的数据分析工具，支持多维度数据可视化和策略分析"
      }
    ],
    testimonial: {
      content: "这套金融交易系统的性能令人印象深刻。在上线后，我们不仅能够处理更大量的交易请求，而且风险管理能力得到了显著提升。系统的稳定性和安全性完全满足了我们作为金融机构的严格要求。",
      author: "吴总监",
      position: "技术与运营总监",
      company: "某大型金融投资机构"
    }
  };

  // 系统优势数据
  const systemAdvantages = [
    {
      icon: <LineChart className="w-8 h-8 text-green-500" />,
      title: "高性能交易引擎",
      description: "毫秒级响应时间，支持高频交易和大规模并发操作"
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-blue-500" />,
      title: "实时数据分析",
      description: "强大的实时分析能力，支持复杂查询和多维度数据可视化"
    },
    {
      icon: <Shield className="w-8 h-8 text-red-500" />,
      title: "多层风险控制",
      description: "先进的风险评估模型，提供全方位风险监控和预警"
    },
    {
      icon: <Lock className="w-8 h-8 text-yellow-500" />,
      title: "银行级安全保障",
      description: "多重加密与安全验证机制，确保交易和数据安全"
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
      <div className="bg-gradient-to-r from-green-600 to-blue-800 text-white py-16">
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
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">金融系统核心优势</h2>
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

        {/* 性能指标 */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">系统性能指标</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">性能指标</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-600">行业平均水平</th>
                  <th className="px-4 py-3 text-left font-semibold text-green-600">本系统性能</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-4 py-3 font-medium">交易响应时间</td>
                  <td className="px-4 py-3 text-gray-600">50-200毫秒</td>
                  <td className="px-4 py-3 text-green-600">＜5毫秒</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">系统并发处理能力</td>
                  <td className="px-4 py-3 text-gray-600">每秒5,000笔交易</td>
                  <td className="px-4 py-3 text-green-600">每秒50,000+笔交易</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">数据分析延迟</td>
                  <td className="px-4 py-3 text-gray-600">准实时（秒级）</td>
                  <td className="px-4 py-3 text-green-600">实时（毫秒级）</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">系统可用性</td>
                  <td className="px-4 py-3 text-gray-600">99.9%</td>
                  <td className="px-4 py-3 text-green-600">99.99%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">风险预警准确率</td>
                  <td className="px-4 py-3 text-gray-600">90%</td>
                  <td className="px-4 py-3 text-green-600">98%</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">恢复时间目标(RTO)</td>
                  <td className="px-4 py-3 text-gray-600">＜4小时</td>
                  <td className="px-4 py-3 text-green-600">＜15分钟</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 font-medium">数据安全等级</td>
                  <td className="px-4 py-3 text-gray-600">行业标准</td>
                  <td className="px-4 py-3 text-green-600">银行级+军事级加密</td>
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

            {/* 安全架构图 */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800">多层安全架构</h2>
              <div className="relative h-[300px] w-full bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="w-full max-w-lg mx-auto">
                    {/* 安全层级示意图 */}
                    <div className="relative">
                      {/* 外层 - 网络安全层 */}
                      <div className="bg-blue-100 rounded-lg p-6 mb-4">
                        <p className="font-bold text-blue-800 mb-1">网络安全层</p>
                        <p className="text-sm text-blue-600">防火墙、入侵检测、DDoS防护</p>
                        
                        {/* 中层 - 应用安全层 */}
                        <div className="bg-green-100 rounded-lg p-5 mt-3 mb-3">
                          <p className="font-bold text-green-800 mb-1">应用安全层</p>
                          <p className="text-sm text-green-600">身份验证、权限控制、API安全</p>
                          
                          {/* 内层 - 数据安全层 */}
                          <div className="bg-yellow-100 rounded-lg p-4 mt-3 mb-2">
                            <p className="font-bold text-yellow-800 mb-1">数据安全层</p>
                            <p className="text-sm text-yellow-600">加密存储、敏感数据保护</p>
                            
                            {/* 核心 - 交易安全 */}
                            <div className="bg-red-100 rounded-lg p-3 mt-2">
                              <p className="font-bold text-red-800">交易安全核心</p>
                              <p className="text-xs text-red-600">多重签名、实时审计、风险控制</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-500 text-center">系统采用多层次安全架构，从网络到数据层层防护，确保交易安全</p>
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
          <h2 className="text-2xl md:text-3xl font-bold mb-4">需要高性能金融系统解决方案？</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">我们提供专业的金融科技解决方案，帮助金融机构提升交易效率，完善风险控制体系</p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button className="bg-green-600 hover:bg-green-700" asChild>
              <Link href="/style1">浏览更多案例</Link>
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-gray-800">
              <Link href="/contact">咨询金融解决方案</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
} 