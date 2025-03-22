"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { useEffect, useState } from "react" // 页面中其他部分仍在使用这些hooks
import { useRouter } from "next/navigation"
import { ChevronRight } from "lucide-react"

// 为particlesJS添加TypeScript声明
declare global {
  interface Window {
    particlesJS: any;
  }
}

// Mock posts data
const posts = [
  {
    id: "post1",
    title: "2025年的某一天",
    description: "今天的天气很不错！！！",
    date: "2025-1-10",
    author: "Chryssolion Chen",
    coverImage: "/images/2774141023.jpeg",
    category: "scene",
    tags: ["天空"]
  },
  {
    id: "post5",
    title: "网络安全学习总结",
    description: "网络安全学习总结",
    date: "2025-01-13",
    author: "Chryssolion Chen",
    coverImage: "/images/1.webp",
    category: "网络安全",
    tags: ["网络安全", "入门","Nmap"]
  },
  {
    id: "post7",
    title: "Halo主题定制指南",
    description: "如何根据个人喜好定制你的Halo博客主题，包括颜色、字体、布局等方面的调整。",
    date: "2025-02-20",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/215159204/3145156357.webp",
    category: "Theme",
    tags: ["Halo", "定制", "教程"]
  },
  {
    id: "post8",
    title: "云上的日子",
    description: "记录一个普通的日子，天空中的云朵变幻莫测，像是在讲述着无声的故事。",
    date: "2025-03-01",
    author: "Chryssolion Chen",
    coverImage: "https://ext.same-assets.com/2548152323/3103727191.webp",
    category: "随笔",
    tags: ["生活", "随想"]
  }
]

/**
 * 案例数据结构
 * id: 案例唯一标识
 * title: 案例标题
 * description: 案例简短描述
 * technologies: 使用的技术标签
 * rating: 客户评分(1-5)
 * category: 案例分类
 * gradient: 案例卡片顶部渐变色
 * icon: 案例图标SVG路径
 * detailUrl: 案例详情页面URL
 */
const caseStudies = [
  {
    id: "case1",
    title: "电商平台解决方案",
    description: "为某知名零售品牌构建的全渠道电商平台，整合线上线下购物体验，提升转化率和客户忠诚度。",
    technologies: ["React", "Node.js", "MongoDB", "AWS"],
    rating: 4.9,
    category: "电子商务",
    gradient: "from-blue-500 to-teal-500",
    icon: "🛒",
    detailUrl: "/cases/ecommerce-platform"
  },
  {
    id: "case2",
    title: "数据分析平台",
    description: "为企业打造的数据分析平台，整合多源数据，提供实时分析和可视化，支持智能决策。",
    technologies: ["Python", "TensorFlow", "Vue.js", "Docker"],
    rating: 4.8,
    category: "数据科学",
    gradient: "from-purple-500 to-indigo-500",
    icon: "📊",
    detailUrl: "/cases/data-analysis-platform"
  },
  {
    id: "case3",
    title: "AI智能客服助手",
    description: "基于NLP技术的智能客服系统，实现多轮对话、意图识别和自动学习，提升客户服务效率。",
    technologies: ["Python", "TensorFlow", "React", "Spring Boot"],
    rating: 4.9,
    category: "人工智能",
    gradient: "from-purple-500 to-pink-500",
    icon: "🤖",
    detailUrl: "/cases/ai-assistant"
  },
  {
    id: "case4",
    title: "企业管理系统",
    description: "一体化企业管理解决方案，整合人力资源、财务、项目和客户管理，提升运营效率。",
    technologies: ["Vue.js", "Node.js", "MongoDB", "Docker"],
    rating: 4.7,
    category: "企业软件",
    gradient: "from-blue-500 to-indigo-500",
    icon: "🏢",
    detailUrl: "/cases/enterprise-management"
  },
  {
    id: "case5",
    title: "移动购物应用",
    description: "全渠道移动购物平台，支持AR试穿、个性化推荐和无缝支付体验，提升用户转化率。",
    technologies: ["React Native", "Node.js", "Firebase", "Stripe"],
    rating: 4.8,
    category: "移动应用",
    gradient: "from-pink-500 to-rose-500",
    icon: "📱",
    detailUrl: "/cases/mobile-shopping"
  },
  {
    id: "case6",
    title: "金融交易系统",
    description: "高性能金融交易平台，支持实时数据分析、风险控制和多层次安全保障，满足金融机构严格需求。",
    technologies: ["Java", "Angular", "PostgreSQL", "Kubernetes"],
    rating: 4.9,
    category: "金融科技",
    gradient: "from-green-500 to-emerald-500",
    icon: "💹",
    detailUrl: "/cases/financial-system"
  }
];

/**
 * 技术支持页面组件
 * 包含粒子背景、各种技术支持服务信息以及技术栈可视化
 */
export default function Style1Page() {
  // 添加技术介绍内容
  const techIntros = {
    html: {
      title: "HTML",
      description: "HTML是网页的基础结构，定义了网页的内容和骨架。最新的HTML5标准引入了语义化标签、音频和视频支持等特性。",
      icon: "🌐",
      color: "from-[#e44d26] to-[#f16529]"
    },
    css: {
      title: "CSS",
      description: "CSS负责网页的样式和布局，使HTML元素呈现丰富的视觉效果。CSS3增强了动画、过渡和响应式设计能力。",
      icon: "🎨",
      color: "from-[#264de4] to-[#2965f1]"
    },
    js: {
      title: "JavaScript",
      description: "JavaScript是网页的交互语言，使网页动态响应用户操作。它也可用于服务器端开发(Node.js)，是Web应用的核心技术。",
      icon: "⚡",
      color: "from-[#f0db4f] to-[#f7df1e]"
    },
    python: {
      title: "Python",
      description: "Python以其简洁的语法和强大的生态系统闻名，广泛应用于数据分析、机器学习、Web开发和自动化任务。",
      icon: "🐍",
      color: "from-[#306998] to-[#ffd43b]"
    },
    java: {
      title: "Java",
      description: "Java是跨平台的面向对象编程语言，具有\"一次编写，到处运行\"的优势，广泛用于企业级应用、Android应用和大型系统。",
      icon: "☕",
      color: "from-[#5382a1] to-[#f89820]"
    },
    cpp: {
      title: "C++",
      description: "C++是高性能的编程语言，用于系统编程、游戏开发和资源密集型应用，提供底层内存操作和高级抽象能力。",
      icon: "🔧",
      color: "from-[#00599c] to-[#044f88]"
    },
    ai: {
      title: "人工智能",
      description: "AI技术包括机器学习、深度学习和神经网络等，用于实现智能决策、图像识别、自然语言处理等现代应用场景。",
      icon: "🧠",
      color: "from-[#8e44ad] to-[#9b59b6]"
    }
  };
  
  // 当前选中的技术
  const [selectedTech, setSelectedTech] = useState<string | null>("python");
  
  // 性能模式状态管理
  const [performanceMode, setPerformanceMode] = useState<string>("high"); // 'high', 'medium', 'low'
  const [showPerformanceOptions, setShowPerformanceOptions] = useState<boolean>(false);
  
  const router = useRouter();
  
  /**
   * 根据性能模式返回对应的粒子配置
   * @param mode - 性能模式: high(高质量), medium(平衡), low(高性能)
   * @returns 粒子配置对象
   */
  const getParticlesConfig = (mode: string) => {
    // 基础配置
    const baseConfig = {
      "particles": {
        "color": {
          "value": "#ffffff"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          }
        },
        "opacity": {
          "random": true,
          "anim": {
            "enable": true,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "color": "#69a7ff",
          "width": 1
        },
        "move": {
          "enable": true,
          "direction": "none",
          "random": true,
          "straight": false,
          "out_mode": "out",
          "bounce": false
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "resize": true
        }
      },
      "retina_detect": true
    };
    
    // 根据不同性能模式调整配置
    switch(mode) {
      case "high": // 高质量模式 - 完整效果
        return {
          ...baseConfig,
          "particles": {
            ...baseConfig.particles,
            "number": {
              "value": 120,
              "density": {
                "enable": true,
                "value_area": 1000
              }
            },
            "opacity": {
              "value": 0.6,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              ...baseConfig.particles.line_linked,
              "distance": 150,
              "opacity": 0.35,
            },
            "move": {
              ...baseConfig.particles.move,
              "speed": 1.2,
              "attract": {
                "enable": true,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            ...baseConfig.interactivity,
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": true,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 180,
                "line_linked": {
                  "opacity": 0.8
                }
              },
              "push": {
                "particles_nb": 6
              }
            }
          }
        };
        
      case "medium": // 平衡模式 - 减少粒子数量和交互
        return {
          ...baseConfig,
          "particles": {
            ...baseConfig.particles,
            "number": {
              "value": 60,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "opacity": {
              "value": 0.5,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "line_linked": {
              ...baseConfig.particles.line_linked,
              "distance": 150,
              "opacity": 0.25
            },
            "move": {
              ...baseConfig.particles.move,
              "speed": 1.0
            }
          },
          "interactivity": {
            ...baseConfig.interactivity,
            "events": {
              "onhover": {
                "enable": true,
                "mode": "grab"
              },
              "onclick": {
                "enable": false
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 140,
                "line_linked": {
                  "opacity": 0.5
                }
              }
            }
          }
        };
        
      case "low": // 高性能模式 - 最小化效果
        return {
          ...baseConfig,
          "particles": {
            ...baseConfig.particles,
            "number": {
              "value": 30,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "opacity": {
              "value": 0.4,
              "random": false,
              "anim": {
                "enable": false
              }
            },
            "size": {
              "value": 2,
              "random": true,
              "anim": {
                "enable": false
              }
            },
            "line_linked": {
              ...baseConfig.particles.line_linked,
              "distance": 100,
              "opacity": 0.2
            },
            "move": {
              ...baseConfig.particles.move,
              "speed": 0.8
            }
          },
          "interactivity": {
            ...baseConfig.interactivity,
            "events": {
              "onhover": {
                "enable": false
              },
              "onclick": {
                "enable": false
              },
              "resize": true
            }
          }
        };
        
      case "off": // 关闭粒子效果
        return null;
        
      default:
        return baseConfig;
    }
  };

  // 添加粒子效果
  useEffect(() => {
    // 如果性能模式设为关闭，则清除粒子效果并返回
    if (performanceMode === "off") {
      const particles = document.getElementById('particles-js');
      if (particles) {
        particles.innerHTML = '';
      }
      return;
    }
    
    const loadParticlesScript = async () => {
      if (typeof window !== 'undefined' && !window.particlesJS) {
        // 动态加载particles.js脚本
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
        script.async = true;
        
        script.onload = () => {
          if (window.particlesJS) {
            // 根据性能模式获取配置
            const config = getParticlesConfig(performanceMode);
            if (config) {
              window.particlesJS('particles-js', config);
            }
          }
        };
        
        document.body.appendChild(script);
      } else if (typeof window !== 'undefined' && window.particlesJS) {
        // 如果脚本已加载，则直接初始化
        const config = getParticlesConfig(performanceMode);
        if (config) {
          // 清除现有粒子
          const particles = document.getElementById('particles-js');
          if (particles) {
            particles.innerHTML = '';
          }
          // 重新初始化粒子
          window.particlesJS('particles-js', config);
        }
      }
    };

    loadParticlesScript();
    
    // 清理函数
    return () => {
      const particles = document.getElementById('particles-js');
      if (particles && particles.children.length > 0) {
        particles.innerHTML = '';
      }
    };
  }, [performanceMode]); // 依赖项添加performanceMode，以便在模式变化时重新渲染粒子

  // 添加技术标签与代码区块的交互功能
  useEffect(() => {
    const techTags = document.querySelectorAll('.tech-tag');
    const codeBlocks = document.querySelectorAll('.code-block-container');
    
    // 默认显示Python代码块
    document.querySelectorAll('.code-block-container').forEach(block => {
      if (block.id !== 'python-block') {
        (block as HTMLElement).style.display = 'none';
      }
    });

    // 为技术标签添加点击事件
    techTags.forEach(tag => {
      tag.addEventListener('click', (e) => {
        const tech = (e.currentTarget as HTMLElement).getAttribute('data-tech');
        
        // 设置当前选中的技术
        if (tech) {
          setSelectedTech(tech);
        }
        
        // 隐藏所有代码块
        codeBlocks.forEach(block => {
          (block as HTMLElement).style.display = 'none';
        });
        
        // 显示对应的代码块
        const targetBlock = document.getElementById(`${tech}-block`);
        if (targetBlock) {
          targetBlock.style.display = 'block';
          
          // 滚动到代码展示区域
          document.getElementById('code-samples')?.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
    
    // 清理函数
    return () => {
      techTags.forEach(tag => {
        tag.removeEventListener('click', () => {});
      });
    };
  }, [setSelectedTech]);

  // 切换性能模式的处理函数
  const handlePerformanceModeChange = (mode: string) => {
    // 保存用户偏好设置到localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferedPerformanceMode', mode);
    }
    setPerformanceMode(mode);
  };

  // 在组件挂载时检查用户之前的偏好设置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('preferedPerformanceMode');
      if (savedMode) {
        setPerformanceMode(savedMode);
      }
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* 背景渐变 */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#1a2b47] to-[#2d3a6d] -z-10"></div>
      
      {/* 半透明代码背景图案 */}
      <div className="fixed inset-0 opacity-10 -z-5">
        <div className="code-pattern h-full w-full"></div>
      </div>
      
      {/* 数据流粒子效果 */}
      <div className="fixed inset-0 -z-5">
        <div id="particles-js" className="h-full w-full"></div>
      </div>
      
      {/* 性能模式选择器 - 固定在页面右上角 */}
      <div className="fixed top-4 right-4 z-50">
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-2">
          <div 
            className="flex items-center text-xs text-[#1a2b47] cursor-pointer" 
            onClick={() => setShowPerformanceOptions(!showPerformanceOptions)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            性能模式
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className={`h-3 w-3 ml-1 transition-transform ${showPerformanceOptions ? 'rotate-180' : ''}`} 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          {showPerformanceOptions && (
            <div className="flex space-x-1 mt-1">
              <button 
                onClick={() => {
                  handlePerformanceModeChange('high');
                  setShowPerformanceOptions(false);
                }}
                className={`text-xs px-2 py-1 rounded ${performanceMode === 'high' ? 'bg-site1-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                title="高质量视觉效果"
              >
                高质量
              </button>
              <button 
                onClick={() => {
                  handlePerformanceModeChange('medium');
                  setShowPerformanceOptions(false);
                }}
                className={`text-xs px-2 py-1 rounded ${performanceMode === 'medium' ? 'bg-site1-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                title="平衡视觉效果与性能"
              >
                平衡
              </button>
              <button 
                onClick={() => {
                  handlePerformanceModeChange('low');
                  setShowPerformanceOptions(false);
                }}
                className={`text-xs px-2 py-1 rounded ${performanceMode === 'low' ? 'bg-site1-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                title="优化性能"
              >
                高性能
              </button>
              <button 
                onClick={() => {
                  handlePerformanceModeChange('off');
                  setShowPerformanceOptions(false);
                }}
                className={`text-xs px-2 py-1 rounded ${performanceMode === 'off' ? 'bg-site1-blue text-white' : 'bg-gray-100 text-gray-600'}`}
                title="关闭动画效果"
              >
                关闭
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="relative pt-16 pb-8 z-10">
        <div className="relative h-[350px] flex flex-col items-center justify-center">
          <div className="text-center text-white">
            <h1 className="font-['KuaiKanShiJieTi'] text-4xl mb-4 glow-text">技术支持</h1>
            <p className="font-['MiSans'] text-xl max-w-2xl mx-auto px-4 glow-text-sm">
              探索编程世界的无限可能，掌握前沿技术解决方案
            </p>
            
            {/* 技术标签展示区 */}
            <div className="mb-6">
              <h3 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-xl mb-4">我们擅长的技术</h3>
              <div className="flex flex-wrap mb-5 justify-center">
                <span className={`tech-tag html cursor-pointer ${selectedTech === 'html' ? 'selected-tech' : ''}`} data-tech="html">HTML</span>
                <span className={`tech-tag css cursor-pointer ${selectedTech === 'css' ? 'selected-tech' : ''}`} data-tech="css">CSS</span>
                <span className={`tech-tag js cursor-pointer ${selectedTech === 'js' ? 'selected-tech' : ''}`} data-tech="js">JavaScript</span>
                <span className={`tech-tag python cursor-pointer ${selectedTech === 'python' ? 'selected-tech' : ''}`} data-tech="python">Python</span>
                <span className={`tech-tag java cursor-pointer ${selectedTech === 'java' ? 'selected-tech' : ''}`} data-tech="java">Java</span>
                <span className={`tech-tag cpp cursor-pointer ${selectedTech === 'cpp' ? 'selected-tech' : ''}`} data-tech="cpp">C++</span>
                <span className={`tech-tag ai cursor-pointer ${selectedTech === 'ai' ? 'selected-tech' : ''}`} data-tech="ai">AI</span>
              </div>
              
              {/* 技术介绍区域 */}
              {selectedTech && (
                <div className="max-w-3xl mx-auto bg-white/90 backdrop-blur-md rounded-lg p-4 mb-4 shadow-lg transform transition-all duration-300 scale-100 tech-intro-card">
                  <div className={`flex items-center mb-3 bg-gradient-to-r ${techIntros[selectedTech as keyof typeof techIntros].color} text-white p-3 rounded-lg`}>
                    <span className="text-2xl mr-3">{techIntros[selectedTech as keyof typeof techIntros].icon}</span>
                    <h3 className="font-['KuaiKanShiJieTi'] text-xl">{techIntros[selectedTech as keyof typeof techIntros].title}</h3>
                  </div>
                  <p className="text-[#374869] leading-relaxed">
                    {techIntros[selectedTech as keyof typeof techIntros].description}
                  </p>
                </div>
              )}
              
              <p className="text-[#374869]">
                点击任意技术标签，可以查看相关的技术介绍和代码示例。我们提供专业的技术咨询、问题排查和解决方案。
              </p>
            </div>
          </div>
        </div>
        
        {/* 技术图标波浪效果 */}
        <div className="relative h-24 overflow-hidden">
          <div className="absolute bottom-0 left-0 right-0 tech-wave h-24 opacity-60"></div>
        </div>
      </div>

      {/* 添加样式到 globals.css 中 */}
      <style jsx global>{`
        .glow-text {
          text-shadow: 0 0 10px rgba(255, 255, 255, 0.7), 0 0 20px rgba(74, 164, 255, 0.5), 0 0 30px rgba(74, 164, 255, 0.3);
        }
        
        .glow-text-sm {
          text-shadow: 0 0 5px rgba(255, 255, 255, 0.7), 0 0 10px rgba(74, 164, 255, 0.5);
        }

        /* 代码背景图案 */
        .code-pattern {
          background: url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%221000%22%20height%3D%221000%22%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23fff%22%20stroke-width%3D%221%22%3E%3Cpath%20d%3D%22M0%2C250%20Q500%2C0%201000%2C250%20L1000%2C750%20Q500%2C1000%200%2C750%20Z%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E');
          background-size: cover;
          mix-blend-mode: overlay;
        }

        /* 技术波浪效果 */
        .tech-wave {
          background-image: url('data:image/svg+xml;charset=utf8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%201440%20320%22%3E%3Cpath%20fill%3D%22%23fff%22%20fill-opacity%3D%22.5%22%20d%3D%22M0%2C192L48%2C208C96%2C224%2C192%2C256%2C288%2C250.7C384%2C245%2C480%2C203%2C576%2C208C672%2C213%2C768%2C267%2C864%2C272C960%2C277%2C1056%2C235%2C1152%2C202.7C1248%2C171%2C1344%2C149%2C1392%2C138.7L1440%2C128L1440%2C320L1392%2C320C1344%2C320%2C1248%2C320%2C1152%2C320C1056%2C320%2C960%2C320%2C864%2C320C768%2C320%2C672%2C320%2C576%2C320C480%2C320%2C384%2C320%2C288%2C320C192%2C320%2C96%2C320%2C48%2C320L0%2C320Z%22%3E%3C%2Fpath%3E%3C%2Fsvg%3E');
          background-size: cover;
          animation: wave 15s linear infinite;
        }

        @keyframes wave {
          0% {
            background-position-x: 0;
          }
          100% {
            background-position-x: 1440px;
          }
        }

        /* 技术标签样式 - 修改为基础样式，详细样式在globals.css中定义 */
        .tech-tag {
          padding: 4px 12px;
          border-radius: 16px;
          font-size: 0.85rem;
          font-weight: 500;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
          transition: all 0.3s ease;
          margin: 0.25rem;
        }
        
        .tech-tag:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
        }
        
        .tech-tag.selected-tech {
          transform: translateY(-3px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          position: relative;
        }
        
        .tech-tag.selected-tech::after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 50%;
          transform: translateX(-50%);
          width: 6px;
          height: 6px;
          background-color: white;
          border-radius: 50%;
        }

        .tech-intro-card {
          animation: fadeIn 0.4s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .tech-tag.html {
          background: linear-gradient(135deg, #e44d26, #f16529);
          animation-delay: 0s;
        }
        
        .tech-tag.css {
          background: linear-gradient(135deg, #264de4, #2965f1);
          animation-delay: 0.3s;
        }
        
        .tech-tag.js {
          background: linear-gradient(135deg, #f0db4f, #f7df1e);
          color: #323330;
          animation-delay: 0.6s;
        }
        
        .tech-tag.python {
          background: linear-gradient(135deg, #306998, #ffd43b);
          animation-delay: 0.9s;
        }
        
        .tech-tag.java {
          background: linear-gradient(135deg, #5382a1, #f89820);
          animation-delay: 1.2s;
        }
        
        .tech-tag.cpp {
          background: linear-gradient(135deg, #00599c, #044f88);
          animation-delay: 1.5s;
        }
        
        .tech-tag.ai {
          background: linear-gradient(135deg, #8e44ad, #9b59b6);
          animation-delay: 1.8s;
        }

        @keyframes pulse {
          0% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 1;
          }
        }

        /* 容器内容区域样式调整 */
        .content-container {
          position: relative;
          z-index: 20;
          background-color: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
          margin-top: -50px;
          margin-bottom: 50px;
        }
        
        /* 确保卡片和其他内容显示在粒子效果之上 */
        .post-card, section, .card {
          position: relative;
          z-index: 10;
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        }
      `}</style>

      <div className="content-container mx-auto px-4 py-10 max-w-7xl">
        {/* Style Description */}
        <div className="bg-white/90 backdrop-blur-sm p-6 rounded-lg mb-12 section-border tech-support-section">
          <h2 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-2xl mb-6">技术领域</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-[#374869] mb-5 leading-relaxed">
                我们提供各种编程语言和前沿技术的支持和解决方案，帮助您实现创新项目和解决技术挑战。我们的专业领域包括：
              </p>
              <ul className="list-disc list-inside space-y-3 text-[#2d3a6d]">
                <li className="pl-2"><span className="text-emphasis">前端开发</span> (HTML5, CSS3, JavaScript)</li>
                <li className="pl-2"><span className="text-emphasis">后端开发</span> (Python, Java, Node.js)</li>
                <li className="pl-2"><span className="text-emphasis">移动应用开发</span> (React Native, Flutter)</li>
                <li className="pl-2"><span className="text-emphasis">人工智能</span>与机器学习解决方案</li>
                <li className="pl-2"><span className="text-emphasis">数据科学</span>与数据可视化</li>
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md bg-white rounded-lg overflow-hidden shadow-xl border border-gray-200">
                {/* Mac风格顶部栏 */}
                <div className="bg-[#f0f0f0] px-4 py-2 flex items-center">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56] border border-[#e0443e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e] border border-[#dea123]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f] border border-[#1aab29]"></div>
                  </div>
                  <div className="flex-1 text-center text-xs text-gray-600">kali@kali: ~/pentest</div>
                </div>
                {/* Kali终端内容 */}
                <div className="p-4 font-mono text-sm text-gray-800 bg-white">
                  <div className="mb-1">
                    <span className="text-[#0078d4]">┌──(</span>
                    <span className="text-[#e51400]">kali㉿kali</span>
                    <span className="text-[#0078d4]">)-[</span>
                    <span className="text-[#333333]">~/pentest</span>
                    <span className="text-[#0078d4]">]</span>
                  </div>
                  <div className="mb-2">
                    <span className="text-[#0078d4]">└─$ </span>
                    <span className="text-[#333333]">nmap -sV -sC 192.168.1.1</span>
                  </div>
                  <div className="mb-1 text-gray-600 text-xs">Starting Nmap 7.92 ( https://nmap.org ) at 2023-05-15 14:30 EDT</div>
                  <div className="mb-1 text-gray-600 text-xs">Nmap scan report for 192.168.1.1</div>
                  <div className="mb-1 text-gray-600 text-xs">Host is up (0.0034s latency).</div>
                  <div className="mb-2 text-gray-600 text-xs">
                    PORT&nbsp;&nbsp;&nbsp;STATE SERVICE&nbsp;&nbsp;&nbsp;VERSION<br/>
                    22/tcp&nbsp;&nbsp;open&nbsp;ssh&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;OpenSSH 8.2<br/>
                    80/tcp&nbsp;&nbsp;open&nbsp;http&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Apache 2.4.41<br/>
                    443/tcp&nbsp;open&nbsp;https&nbsp;&nbsp;&nbsp;&nbsp;Apache 2.4.41
                  </div>
                  <div className="mb-1">
                    <span className="text-[#0078d4]">┌──(</span>
                    <span className="text-[#e51400]">kali㉿kali</span>
                    <span className="text-[#0078d4]">)-[</span>
                    <span className="text-[#333333]">~/pentest</span>
                    <span className="text-[#0078d4]">]</span>
                  </div>
                  <div>
                    <span className="text-[#0078d4]">└─$ </span>
                    <span className="text-[#333333]">python3 exploit.py</span>
                    <span className="animate-pulse ml-1 text-[#333333]">▋</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 推荐文章部分 - 优化布局和添加分类筛选功能 */}
        <section className="mb-16">
          {/* 标题和筛选器容器 */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
            <h2 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-2xl mb-4 md:mb-0">推荐文章</h2>
            
            {/* 分类标签筛选区域 */}
            <div className="flex flex-wrap gap-2">
              {/* 使用React的useState来管理当前选中的分类 */}
              {(() => {
                // 提取所有不重复的分类
                const categories = ['全部', ...Array.from(new Set(posts.map(post => post.category)))];
                // 使用useState记录当前选中的分类
                const [selectedCategory, setSelectedCategory] = useState('全部');
                
                // 根据选中的分类过滤文章
                const filteredPosts = selectedCategory === '全部' 
                  ? posts 
                  : posts.filter(post => post.category === selectedCategory);
                
                return (
                  <>
                    {/* 分类筛选按钮组 */}
                    <div className="flex flex-wrap gap-2 mb-4 md:mb-0">
                      {categories.map(category => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`px-3 py-1.5 text-sm rounded-full transition-all duration-300 ${
                            selectedCategory === category
                              ? 'bg-site1-blue text-white shadow-md'
                              : 'bg-white text-[#516580] border border-gray-200 hover:bg-gray-50'
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                    
                    {/* 文章卡片网格布局 */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                      {filteredPosts.length > 0 ? (
                        filteredPosts.map((post) => (
                          <Link href={`/posts/${post.id}`} key={post.id} className="block group">
                            {/* 文章卡片 - 添加悬停动画效果 */}
                            <div className="post-card h-full transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                              {/* 图片容器 */}
                              <div className="relative h-48 overflow-hidden rounded-t-xl">
                                <Image
                                  src={post.coverImage}
                                  alt={post.title}
                                  width={400}
                                  height={200}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                {/* 分类标签 - 美化样式 */}
                                <div className={`absolute bottom-0 left-0 px-3 py-1 text-xs font-medium text-white rounded-tr-lg category-tag ${post.category.toLowerCase()}`}>
                                  {post.category}
                                </div>
                              </div>
                              
                              {/* 卡片内容区域 */}
                              <div className="p-5 bg-white rounded-b-xl card-content-gradient">
                                {/* 文章标签 */}
                                <div className="flex flex-wrap gap-2 mb-3">
                                  {post.tags.map((tag, idx) => (
                                    <span key={idx} className="text-xs px-2 py-1 bg-gray-100 text-[#3a4a7d] rounded-full">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                                
                                {/* 文章标题 */}
                                <h3 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-xl font-bold mb-2 line-clamp-1 group-hover:text-site1-blue transition-colors duration-300">
                                  {post.title}
                                </h3>
                                
                                {/* 文章描述 */}
                                <p className="text-[#566889] text-sm mb-4 line-clamp-2 min-h-[2.5rem]">
                                  {post.description}
                                </p>
                                
                                {/* 文章元信息 */}
                                <div className="flex justify-between items-center border-t border-gray-100 pt-3 text-[#7887a7] text-xs">
                                  {/* 作者信息 */}
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    {post.author}
                                  </span>
                                  
                                  {/* 发布日期 */}
                                  <span className="flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {post.date}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        ))
                      ) : (
                        // 当没有匹配的文章时显示提示信息
                        <div className="col-span-full text-center py-10 bg-white rounded-lg border border-gray-200">
                          <p className="text-[#516580]">没有找到相关分类的文章</p>
                          <button 
                            onClick={() => setSelectedCategory('全部')}
                            className="mt-3 px-4 py-2 bg-site1-blue text-white rounded-lg"
                          >
                            查看全部文章
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
        </section>

        {/* 技术栈可视化展示区域 */}
        <section className="py-8">
          <h2 className="text-2xl font-bold text-center mb-8">技术栈可视化</h2>
          
          {/* 技术栈可视化容器 */}
          <div className="tech-stack-visualization relative mx-auto">
            <h3 className="tech-stack-title">我们的技术支持领域</h3>
            
            {/* 技术连接线 - 使用SVG创建节点间的连接 */}
            <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* 中心到前端的连接线 */}
              <line 
                x1="50%" y1="50%" 
                x2="20%" y2="20%" 
                stroke="rgba(59, 130, 246, 0.3)" 
                strokeWidth="2"
                strokeDasharray="5,5"
                className="tech-connection-line"
              />
              {/* 中心到后端的连接线 */}
              <line 
                x1="50%" y1="50%" 
                x2="80%" y2="20%" 
                stroke="rgba(59, 130, 246, 0.3)" 
                strokeWidth="2"
                strokeDasharray="5,5"
                className="tech-connection-line"
              />
              {/* 中心到移动开发的连接线 */}
              <line 
                x1="50%" y1="50%" 
                x2="20%" y2="80%" 
                stroke="rgba(59, 130, 246, 0.3)" 
                strokeWidth="2"
                strokeDasharray="5,5"
                className="tech-connection-line"
              />
              {/* 中心到AI技术的连接线 */}
              <line 
                x1="50%" y1="50%" 
                x2="80%" y2="80%" 
                stroke="rgba(59, 130, 246, 0.3)" 
                strokeWidth="2"
                strokeDasharray="5,5"
                className="tech-connection-line"
              />
            </svg>
            
            {/* 中心技术节点 */}
            <div className="tech-node tech-node-center">
              技术支持中心
            </div>
            
            {/* 前端技术组 */}
            <div className="tech-node tech-group-frontend">
              前端技术
              <div className="mt-3 flex flex-wrap">
                <span className="tech-tag html">HTML</span>
                <span className="tech-tag css">CSS</span>
                <span className="tech-tag js">JavaScript</span>
                <span className="tech-tag js">React</span>
                <span className="tech-tag js">Vue</span>
              </div>
            </div>
            
            {/* 后端技术组 */}
            <div className="tech-node tech-group-backend">
              后端技术
              <div className="mt-3 flex flex-wrap">
                <span className="tech-tag python">Python</span>
                <span className="tech-tag java">Java</span>
                <span className="tech-tag js">Node.js</span>
                <span className="tech-tag cpp">C++</span>
              </div>
            </div>
            
            {/* 移动开发技术组 */}
            <div className="tech-node tech-group-mobile">
              移动开发
              <div className="mt-3 flex flex-wrap">
                <span className="tech-tag js">React Native</span>
                <span className="tech-tag java">Android</span>
                <span className="tech-tag">iOS/Swift</span>
                <span className="tech-tag js">Flutter</span>
              </div>
            </div>
            
            {/* AI技术组 */}
            <div className="tech-node tech-group-ai">
              AI技术
              <div className="mt-3 flex flex-wrap">
                <span className="tech-tag ai">机器学习</span>
                <span className="tech-tag ai">深度学习</span>
                <span className="tech-tag python">TensorFlow</span>
                <span className="tech-tag python">PyTorch</span>
              </div>
            </div>
          </div>
        </section>

        {/* 案例展示部分 */}
        <section id="cases" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-2">最新案例展示</h2>
            <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              通过真实项目案例，了解我们如何帮助客户解决各种技术挑战，实现业务目标
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((caseStudy) => (
                <div 
                  key={caseStudy.id} 
                  className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => router.push(caseStudy.detailUrl)}
                >
                  <div className={`h-24 bg-gradient-to-r ${caseStudy.gradient} p-6 flex items-center`}>
                    <span className="text-4xl mr-4">{caseStudy.icon}</span>
                    <h3 className="text-xl font-bold text-white">{caseStudy.title}</h3>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {caseStudy.category}
                      </span>
                      <div className="flex items-center">
                        <span className="text-yellow-400 mr-1">★</span>
                        <span className="text-sm text-gray-600">{caseStudy.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">{caseStudy.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {caseStudy.technologies.map((tech, i) => (
                        <span 
                          key={i} 
                          className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <button 
                      className="text-blue-600 hover:text-blue-800 flex items-center text-sm font-medium"
                      onClick={(e) => {
                        e.stopPropagation();
                        router.push(caseStudy.detailUrl);
                      }}
                    >
                      查看详情
                      <ChevronRight className="w-4 h-4 ml-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 热门文章展示区 */}
        <section className="mb-16 bg-white p-6 rounded-lg shadow-md section-border content-section">
          <h2 className="font-['KuaiKanShiJieTi'] text-[#1a2b47] text-2xl mb-6">最新技术文章</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 文章卡片1 */}
            <div className="post-card rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/posts/frontend-frameworks')}>
              <div className="image-container h-40 bg-[#f8fafc] relative">
                <Image 
                  src="/images/article1.jpg" 
                  alt="前端框架对比" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <span className="post-tag">前端</span>
                  <span className="post-tag">框架</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">2023年最受欢迎的前端框架对比</h3>
                <p className="text-[#374869] text-sm mb-3">深入分析React、Vue和Angular的优缺点，帮助您选择最适合的技术栈...</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 mr-2"></div>
                    <span className="text-sm text-[#566889]">张开发</span>
                  </div>
                  <span className="text-xs text-[#6b7280]">3天前</span>
                </div>
              </div>
            </div>
              
            {/* 文章卡片2 */}
            <div className="post-card rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/posts/python-data-analysis')}>
              <div className="image-container h-40 bg-[#f8fafc] relative">
                <Image 
                  src="/images/article2.jpg" 
                  alt="Python数据分析" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <span className="post-tag">Python</span>
                  <span className="post-tag">数据分析</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">使用Python进行高效数据分析的10个技巧</h3>
                <p className="text-[#374869] text-sm mb-3">掌握Pandas和NumPy的高级用法，提升数据处理效率，简化分析流程...</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-green-100 mr-2"></div>
                    <span className="text-sm text-[#566889]">李数据</span>
                  </div>
                  <span className="text-xs text-[#6b7280]">1周前</span>
                </div>
              </div>
            </div>
            
            {/* 文章卡片3 */}
            <div className="post-card rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-shadow" onClick={() => router.push('/posts/ai-implementation')}>
              <div className="image-container h-40 bg-[#f8fafc] relative">
                <Image 
                  src="/images/article3.jpg" 
                  alt="AI应用实践" 
                  fill 
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-3">
                  <span className="post-tag">AI</span>
                  <span className="post-tag">实践</span>
                </div>
                <h3 className="text-lg font-semibold mb-2">如何将AI技术应用到实际业务场景</h3>
                <p className="text-[#374869] text-sm mb-3">从需求分析到模型选择，再到部署和监控，全面介绍AI落地的完整流程...</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-purple-100 mr-2"></div>
                    <span className="text-sm text-[#566889]">王智能</span>
                  </div>
                  <span className="text-xs text-[#6b7280]">2周前</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="text-center">
          <Button asChild className="bg-site1-primary hover:bg-site1-primary/90">
            <Link href="/">返回首页</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
