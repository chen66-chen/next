"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import DynamicContent, { ContentType } from '@/components/DynamicContent';
import InteractiveExplainer, { ExplainerType } from '@/components/InteractiveExplainer';
import CodeSandbox, { SandboxMode } from '@/components/CodeSandbox';

/**
 * 内容展示创新演示页面
 * 
 * 展示博客中的创新内容展示功能：
 * 1. 动态内容转换（文本/代码/图表）
 * 2. 交互式概念解释（悬停查看解释）
 * 3. 代码沙盒（一键切换为交互式环境）
 */
export default function DemoPage() {
  // 图表数据示例
  const chartData = {
    labels: ['一月', '二月', '三月', '四月', '五月', '六月'],
    datasets: [
      {
        label: '2025年访问量',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: '2024年访问量',
        data: [8, 12, 2, 4, 1, 2],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // JavaScript示例代码
  const jsCode = `// 一个简单的JavaScript函数示例
function calculateFactorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  
  let result = 1;
  for (let i = 2; i <= n; i++) {
    result *= i;
  }
  
  console.log(\`\${n}的阶乘是:\${result}\`);
  return result;
}

// 测试函数
calculateFactorial(5);`;

  // HTML示例代码
  const htmlCode = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>HTML示例</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      line-height: 1.6;
    }
    .card {
      border: 1px solid #ddd;
      border-radius: 8px;
      padding: 16px;
      margin-bottom: 16px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-title {
      font-size: 18px;
      font-weight: bold;
      color: #333;
      margin-bottom: 8px;
    }
    .card-content {
      color: #666;
    }
  </style>
</head>
<body>
  <h1>交互式HTML示例</h1>
  
  <div class="card">
    <div class="card-title">可编辑内容</div>
    <div class="card-content">
      这是一个简单的HTML示例，您可以在交互模式下编辑它，然后查看效果。
    </div>
  </div>
  
  <div class="card">
    <div class="card-title">尝试修改样式</div>
    <div class="card-content">
      尝试修改CSS样式，比如改变卡片的背景色、边框或阴影效果。
    </div>
  </div>
</body>
</html>`;

  return (
    <div className="min-h-screen py-12 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-4xl">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            博客内容展示创新
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            探索全新的交互式内容展示方式，让阅读技术博客更加高效、直观和有趣
          </p>
        </header>

        <div className="space-y-12">
          {/* 第一部分：动态内容转换 */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                1. 动态内容转换
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                同一数据可在文本、代码和图表三种视图间无缝切换，满足不同的阅读和学习偏好
              </p>
            </div>

            <DynamicContent
              title="网站访问量数据分析"
              initialContentType={ContentType.CHART}
              contentData={{
                text: `<p>在过去六个月内，网站访问量呈波动趋势，整体上2025年的数据高于2024年同期。各月具体数据如下：</p>
                <ul>
                  <li><strong>一月</strong>：2025年12次访问，2024年8次访问</li>
                  <li><strong>二月</strong>：2025年19次访问，2024年12次访问</li>
                  <li><strong>三月</strong>：2025年3次访问，2024年2次访问</li>
                  <li><strong>四月</strong>：2025年5次访问，2024年4次访问</li>
                  <li><strong>五月</strong>：2025年2次访问，2024年1次访问</li>
                  <li><strong>六月</strong>：2025年3次访问，2024年2次访问</li>
                </ul>
                <p>二月的访问量明显高于其他月份，这可能与我们在此期间发布的重要内容相关。</p>`,
                chart: {
                  type: 'bar',
                  data: chartData,
                  options: {
                    scales: {
                      y: {
                        beginAtZero: true
                      }
                    }
                  }
                },
                code: {
                  code: JSON.stringify(chartData, null, 2),
                  language: 'json'
                }
              }}
              className="mb-6"
            />

            <div className="text-sm text-gray-500 dark:text-gray-400 italic mt-2">
              使用顶部的按钮在不同视图之间切换
            </div>
          </section>

          {/* 第二部分：交互式概念解释 */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                2. 概念解释悬浮提示
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                将复杂概念包装在交互式组件中，读者悬停即可展开查看详细解释，无需离开当前阅读上下文
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md prose dark:prose-invert max-w-none">
              <h3>Linux系统介绍</h3>
              <p>
                Linux是一个开源的操作系统内核，由
                <InteractiveExplainer
                  term="Linus Torvalds"
                  content={{
                    type: ExplainerType.IMAGE,
                    title: "Linus Torvalds",
                    text: "Linux之父，芬兰裔美国计算机程序员，1969年12月28日出生于芬兰赫尔辛基。他创建了Linux内核和Git版本控制系统，对开源软件发展有重大贡献。",
                    image: {
                      src: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg/330px-LinuxCon_Europe_Linus_Torvalds_03_%28cropped%29.jpg",
                      alt: "Linus Torvalds",
                      width: 330,
                      height: 330
                    }
                  }}
                />
                于1991年首次发布。它通常与
                <InteractiveExplainer
                  term="GNU工具"
                  content={{
                    type: ExplainerType.TEXT,
                    title: "GNU工具",
                    text: "GNU是\"GNU's Not Unix\"的递归缩写，是一个自由软件项目，旨在创建一个完全自由的操作系统。GNU工具包括编译器、Shell解释器、文本编辑器等核心组件，与Linux内核结合形成了完整的操作系统。"
                  }}
                />
                一起使用，形成了完整的操作系统。
              </p>
              <p>
                在现代计算领域，Linux被广泛应用于服务器、
                <InteractiveExplainer
                  term="嵌入式系统"
                  content={{
                    type: ExplainerType.IMAGE,
                    title: "嵌入式系统",
                    text: "嵌入式系统是专为特定功能设计的计算机系统，通常嵌入到各种设备和机器中。Linux的轻量级版本常用于各种嵌入式设备，如路由器、智能家电和工业控制系统等。",
                    image: {
                      src: "https://miro.medium.com/v2/resize:fit:1400/1*ZJJEwT5-8jE7H54AnCYL2w.jpeg",
                      alt: "嵌入式系统示例",
                      width: 640,
                      height: 400
                    }
                  }}
                />
                和超级计算机等领域。Linux的特点包括：
              </p>
              <ul>
                <li>
                  <InteractiveExplainer
                    term="开源特性"
                    content={{
                      type: ExplainerType.TEXT,
                      title: "开源软件",
                      text: "开源软件是指源代码可以自由获取、使用、修改和分发的软件。Linux遵循GPL许可证，任何人都可以查看、修改和分发其源代码，这促进了全球开发者社区的协作与创新。"
                    }}
                  />
                  使其可以被任何人自由使用、修改和分发
                </li>
                <li>
                  强大的
                  <InteractiveExplainer
                    term="多用户和多任务"
                    content={{
                      type: ExplainerType.TEXT,
                      title: "多用户和多任务能力",
                      text: "Linux系统允许多个用户同时登录和使用系统资源，同时能够并行执行多个程序和进程。这种能力使Linux成为服务器环境的理想选择，可以同时处理多个用户请求和应用程序。"
                    }}
                  />
                  支持
                </li>
                <li>
                  高度的
                  <InteractiveExplainer
                    term="可定制性"
                    content={{
                      type: ExplainerType.TEXT,
                      title: "可定制性",
                      text: "Linux允许用户和开发者根据特定需求定制系统。从精简的嵌入式系统到功能丰富的桌面环境，Linux可以适应各种不同的使用场景和硬件平台。"
                    }}
                  />
                  和灵活性
                </li>
              </ul>
              <p>
                （鼠标悬停在文本中的蓝色下划线术语上查看详细解释）
              </p>
            </div>
          </section>

          {/* 第三部分：代码沙盒 */}
          <section>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                3. 代码沙盒
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                一键将代码示例转换为交互式编辑环境，读者可以直接修改和运行代码，实时查看结果
              </p>
            </div>

            <div className="space-y-8">
              <CodeSandbox
                title="JavaScript阶乘计算示例"
                code={jsCode}
                language="javascript"
                defaultMode={SandboxMode.CODE}
                sandboxOptions={{
                  height: 250,
                  autorun: true
                }}
              />

              <CodeSandbox
                title="HTML卡片组件示例"
                code={htmlCode}
                language="html"
                defaultMode={SandboxMode.CODE}
                sandboxOptions={{
                  height: 400,
                  autorun: true
                }}
              />
            </div>
          </section>

          {/* 返回首页链接 */}
          <div className="text-center mt-12">
            <Link 
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              返回博客首页
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 