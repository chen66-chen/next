"use client";

import { useEffect, useState, useRef } from "react";
import { 
  Globe, AlertTriangle, Monitor, Shield, Database, 
  Server, ArrowUp, Clock, User, Lock, Mail, Info, 
  Settings, X, Save, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// HFish数据接口定义
interface AttackData {
  id: number;
  type: string;
  sourceIP: string;
  country: string;
  region: string;
  time: string;
  node: string;
}

// HFish API响应接口
interface HFishApiResponse {
  code: number;
  msg: string;
  data: any;
}

interface AttackTypeCount {
  type: string;
  count: number;
  percentage: number;
}

interface CountryAttackCount {
  country: string;
  count: number;
  percentage: number;
}

interface SystemStats {
  totalAttacks: number;
  activeHoneyPots: number;
  attackTypes: number;
  attackedCountries: number;
  accountAttempts: number;
  passwordAttempts: number;
}

// HFish API配置
const HFISH_API = {
  BASE_URL: "http://your-hfish-server:4433/api", // 替换为实际的HFish服务器地址
  API_KEY: "your-api-key", // 替换为实际的API密钥
  USERNAME: "admin", // 替换为HFish的管理员用户名
  PASSWORD: "admin" // 替换为HFish的管理员密码
};

// 从HFish API获取数据
const fetchDataFromHFishApi = async () => {
  try {
    // 1. 先获取认证token (如果HFish API需要)
    const authResponse = await fetch(`${HFISH_API.BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: HFISH_API.USERNAME,
        password: HFISH_API.PASSWORD
      })
    });

    const authData = await authResponse.json() as HFishApiResponse;
    if (authData.code !== 200) {
      console.error("Authentication failed:", authData.msg);
      return generateFallbackData();
    }

    const token = authData.data.token;

    // 2. 获取攻击数据
    const attacksResponse = await fetch(`${HFISH_API.BASE_URL}/dashboard/attacks/recent`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const attacksData = await attacksResponse.json() as HFishApiResponse;
    if (attacksData.code !== 200) {
      console.error("Failed to fetch attacks:", attacksData.msg);
      return generateFallbackData();
    }

    // 3. 获取攻击类型统计
    const attackTypesResponse = await fetch(`${HFISH_API.BASE_URL}/dashboard/attacks/types`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const attackTypesData = await attackTypesResponse.json() as HFishApiResponse;
    
    // 4. 获取攻击国家统计
    const countryAttacksResponse = await fetch(`${HFISH_API.BASE_URL}/dashboard/attacks/countries`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const countryAttacksData = await countryAttacksResponse.json() as HFishApiResponse;
    
    // 5. 获取系统统计数据
    const systemStatsResponse = await fetch(`${HFISH_API.BASE_URL}/dashboard/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const systemStatsData = await systemStatsResponse.json() as HFishApiResponse;

    // 处理和转换HFish API返回的数据
    // 注意：以下转换逻辑需要根据实际的HFish API响应结构进行调整
    
    // 处理攻击数据
    const attacks: AttackData[] = (attacksData.data || []).map((attack: any, index: number) => ({
      id: attack.id || index + 1,
      type: attack.type || "Unknown",
      sourceIP: attack.source_ip || "0.0.0.0",
      country: attack.country || "Unknown",
      region: attack.region || "",
      time: attack.time || new Date().toISOString(),
      node: attack.node || "Unknown"
    }));

    // 处理攻击类型统计
    const attackTypeCounts: AttackTypeCount[] = (attackTypesData.data || []).map((type: any) => {
      return {
        type: type.name || "Unknown",
        count: type.count || 0,
        percentage: type.percentage || Math.floor(Math.random() * 30) + 5  // 如果API没有百分比值，生成一个随机值
      };
    }).sort((a: AttackTypeCount, b: AttackTypeCount) => b.count - a.count);

    // 处理国家攻击统计
    const countryAttacks: CountryAttackCount[] = (countryAttacksData.data || []).map((country: any) => {
      return {
        country: country.name || "Unknown",
        count: country.count || 0,
        percentage: country.percentage || Math.floor(Math.random() * 30) + 5  // 如果API没有百分比值，生成一个随机值
      };
    }).sort((a: CountryAttackCount, b: CountryAttackCount) => b.count - a.count);

    // 处理系统统计数据
    const systemStats: SystemStats = {
      totalAttacks: systemStatsData.data?.total_attacks || 0,
      activeHoneyPots: systemStatsData.data?.active_honeypots || 0,
      attackTypes: systemStatsData.data?.attack_types || 0,
      attackedCountries: systemStatsData.data?.attacked_countries || 0,
      accountAttempts: systemStatsData.data?.account_attempts || 0,
      passwordAttempts: systemStatsData.data?.password_attempts || 0
    };

    return {
      attacks: attacks.slice(0, 6),
      allAttacks: attacks,
      attackTypeCounts,
      countryAttacks: countryAttacks.slice(0, 6),
      topCountryAttacks: countryAttacks.slice(0, 8),
      systemStats
    };
  } catch (error) {
    console.error("Error fetching data from HFish API:", error);
    // 如果API请求失败，返回模拟数据作为备用
    return generateFallbackData();
  }
};

// 生成备用模拟数据（当API请求失败时使用）
const generateFallbackData = () => {
  const attackTypes = ["TELNET", "HTTP", "SSH", "REDIS", "VNC", "FTP", "MYSQL"];
  const countries = ["中国", "美国", "俄罗斯", "巴西", "印度", "韩国", "德国", "法国"];
  const regions = [
    "内蒙古", "北京", "上海", "广东", "浙江", "江苏", 
    "美国亚利桑那", "巴西圣保罗", "俄罗斯莫斯科", "德国柏林"
  ];
  const nodes = ["Local", "Remote", "Cloud"];

  // 生成攻击数据
  const attacks: AttackData[] = Array.from({ length: 20 }).map((_, index) => ({
    id: index + 1,
    type: attackTypes[Math.floor(Math.random() * attackTypes.length)],
    sourceIP: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
    country: countries[Math.floor(Math.random() * countries.length)],
    region: regions[Math.floor(Math.random() * regions.length)],
    time: new Date(Date.now() - Math.floor(Math.random() * 8640000)).toISOString().replace('T', ' ').substring(0, 19),
    node: nodes[Math.floor(Math.random() * nodes.length)]
  }));

  // 生成攻击类型统计
  const attackTypeCounts: AttackTypeCount[] = attackTypes.map(type => {
    const count = Math.floor(Math.random() * 50) + 1;
    return {
      type,
      count,
      percentage: Math.floor(Math.random() * 30) + 5
    };
  }).sort((a, b) => b.count - a.count);

  // 生成国家攻击统计
  const countryAttacks: CountryAttackCount[] = countries.map(country => {
    const count = Math.floor(Math.random() * 100) + 1;
    return {
      country,
      count,
      percentage: Math.floor(Math.random() * 30) + 5
    };
  }).sort((a, b) => b.count - a.count).slice(0, 8);

  // 生成系统统计
  const systemStats: SystemStats = {
    totalAttacks: Math.floor(Math.random() * 5000) + 1000,
    activeHoneyPots: Math.floor(Math.random() * 50) + 10,
    attackTypes: attackTypes.length,
    attackedCountries: countries.length,
    accountAttempts: Math.floor(Math.random() * 1000) + 200,
    passwordAttempts: Math.floor(Math.random() * 2000) + 500
  };

  return {
    attacks: attacks.slice(0, 6),
    allAttacks: attacks,
    attackTypeCounts,
    countryAttacks: countryAttacks.slice(0, 6),
    topCountryAttacks: countryAttacks.slice(0, 8),
    systemStats
  };
};

// 主组件
export default function HFishHoneypotPlatform() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [mockData, setMockData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [apiError, setApiError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>("dashboard");
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [worldMapInitialized, setWorldMapInitialized] = useState<boolean>(false);
  const [showApiConfig, setShowApiConfig] = useState<boolean>(false);
  const [apiConfig, setApiConfig] = useState({
    baseUrl: HFISH_API.BASE_URL,
    apiKey: HFISH_API.API_KEY,
    username: HFISH_API.USERNAME,
    password: HFISH_API.PASSWORD
  });

  // API配置表单处理
  const handleApiConfigChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setApiConfig(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 保存API配置
  const saveApiConfig = () => {
    // 更新全局API配置
    HFISH_API.BASE_URL = apiConfig.baseUrl;
    HFISH_API.API_KEY = apiConfig.apiKey;
    HFISH_API.USERNAME = apiConfig.username;
    HFISH_API.PASSWORD = apiConfig.password;
    
    // 关闭配置面板并刷新数据
    setShowApiConfig(false);
    fetchHFishData();
  };

  // 获取HFish数据
  const fetchHFishData = async () => {
    try {
      setIsLoading(true);
      const data = await fetchDataFromHFishApi();
      setMockData(data);
      setApiError(null);
    } catch (error) {
      console.error("Error fetching HFish data:", error);
      setApiError("无法连接到HFish API，正在显示备用数据");
      setMockData(generateFallbackData());
    } finally {
      setIsLoading(false);
    }
  };

  // 初始加载数据
  useEffect(() => {
    fetchHFishData();
  }, []);

  // 更新当前时间
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toISOString().slice(0, 19).replace("T", " ");
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // 定期更新API数据
  useEffect(() => {
    const interval = setInterval(() => {
      fetchHFishData();
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, []);

  // 模拟创建世界地图
  useEffect(() => {
    if (mapContainerRef.current && !worldMapInitialized && !isLoading) {
      // 模拟地图初始化
      setWorldMapInitialized(true);
    }
  }, [isLoading, worldMapInitialized]);

  // 模拟攻击动画
  useEffect(() => {
    if (worldMapInitialized) {
      const timer = setInterval(() => {
        // 模拟新的攻击事件
        const attackEvent = document.createElement("div");
        const x = Math.random() * 90 + 5; // 5-95%
        const y = Math.random() * 80 + 10; // 10-90%
        
        attackEvent.className = "attack-pulse";
        attackEvent.style.left = `${x}%`;
        attackEvent.style.top = `${y}%`;
        
        mapContainerRef.current?.appendChild(attackEvent);
        
        // 攻击线条动画
        const attackLine = document.createElement("div");
        attackLine.className = "attack-line";
        attackLine.style.left = `${x}%`;
        attackLine.style.top = `${y}%`;
        
        // 随机目标点 (中心点附近)
        const targetX = 45 + (Math.random() * 10 - 5);
        const targetY = 45 + (Math.random() * 10 - 5);
        
        // 设置攻击线角度和长度
        const angle = Math.atan2(targetY - y, targetX - x);
        const distance = Math.sqrt(Math.pow(targetX - x, 2) + Math.pow(targetY - y, 2));
        
        attackLine.style.width = `${distance}%`;
        attackLine.style.transform = `rotate(${angle}rad)`;
        
        mapContainerRef.current?.appendChild(attackLine);
        
        // 移除攻击动画元素
        setTimeout(() => {
          attackEvent.remove();
          attackLine.remove();
        }, 2000);
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [worldMapInitialized]);

  if (isLoading) {
    return (
      <div className="h-screen bg-hfish-dark flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-blue-400 mb-4">加载 HFish 蜜罐平台...</h1>
          <div className="flex justify-center">
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-[#000C18] text-blue-100 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-gradient-to-r from-[#001529] to-[#00254D] px-4 py-2 border-b border-[#003366] flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-[#38BBFF] flex items-center">
              <Globe className="h-5 w-5 mr-2 text-[#38BBFF]" />
              <span>蜜罐攻击态势</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-[#38BBFF]">
              Current time: {currentTime}
            </div>
            {apiError && (
              <div className="text-xs text-red-400 bg-red-900/20 py-1 px-2 rounded-md flex items-center">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {apiError}
              </div>
            )}
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 bg-blue-900/30 hover:bg-blue-800/40 border-[#003366] text-[#38BBFF]"
              onClick={fetchHFishData}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              刷新数据
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 bg-blue-900/30 hover:bg-blue-800/40 border-[#003366] text-[#38BBFF]"
              onClick={() => setShowApiConfig(true)}
            >
              <Settings className="h-3 w-3 mr-1" />
              API配置
            </Button>
          </div>
        </header>

        {/* API连接状态显示 */}
        {apiError && (
          <div className="bg-red-900/20 border-b border-red-800/50 px-4 py-2 text-sm text-red-300 flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
              无法连接到HFish API服务器，当前显示的是模拟数据。请检查API配置和服务器状态。
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 bg-red-900/30 hover:bg-red-800/40 border-red-700/50 text-red-300"
              onClick={fetchHFishData}
            >
              重试连接
            </Button>
          </div>
        )}

        {/* 主内容区域 */}
        <main className="flex-grow p-4 grid grid-cols-12 gap-4">
          {/* 上方数据卡片区域 */}
          <div className="col-span-12 grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[#38BBFF] text-sm">本地捕获总数</h3>
                <Server className="h-5 w-5 text-[#38BBFF]" />
              </div>
              <div className="mt-3 font-mono">
                <span className="text-3xl text-white">{mockData.systemStats.totalAttacks.toLocaleString()}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-[#001F3D]">
                <div className="h-full w-2/3 bg-gradient-to-r from-[#38BBFF] to-[#00FFFC]"></div>
              </div>
            </div>
            
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[#38BBFF] text-sm">活跃蜜罐节点</h3>
                <Database className="h-5 w-5 text-[#00FFFC]" />
              </div>
              <div className="mt-3 font-mono">
                <span className="text-3xl text-white">{mockData.systemStats.activeHoneyPots}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-[#001F3D]">
                <div className="h-full w-3/4 bg-gradient-to-r from-[#00FFFC] to-[#00FFA3]"></div>
              </div>
            </div>
            
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[#38BBFF] text-sm">账户尝试</h3>
                <User className="h-5 w-5 text-[#FF5252]" />
              </div>
              <div className="mt-3 font-mono">
                <span className="text-3xl text-white">{mockData.systemStats.accountAttempts}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-[#001F3D]">
                <div className="h-full w-1/2 bg-gradient-to-r from-[#FF5252] to-[#FF9200]"></div>
              </div>
            </div>
            
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <div className="flex items-center justify-between">
                <h3 className="text-[#38BBFF] text-sm">密码统计</h3>
                <Lock className="h-5 w-5 text-[#FF9200]" />
              </div>
              <div className="mt-3 font-mono">
                <span className="text-3xl text-white">{mockData.systemStats.passwordAttempts}</span>
              </div>
              <div className="mt-2 h-1 w-full bg-[#001F3D]">
                <div className="h-full w-4/5 bg-gradient-to-r from-[#FF9200] to-[#FFDC00]"></div>
              </div>
            </div>
          </div>
          
          {/* 左侧数据面板 */}
          <div className="col-span-3 space-y-4">
            {/* 本地捕获IP统计 */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm h-80">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3 flex items-center justify-between">
                <span>本地捕获IP</span>
                <div className="h-1.5 w-20 bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#38BBFF] to-[#00FFFC] animate-pulse"></div>
                </div>
              </h3>
              
              <div className="text-center mb-8">
                <div className="relative inline-block">
                  <svg viewBox="0 0 200 200" width="140" height="140">
                    <defs>
                      <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#38BBFF" />
                        <stop offset="100%" stopColor="#00FFFC" />
                      </linearGradient>
                    </defs>
                    {Array.from({length: 5}).map((_, i) => (
                      <circle
                        key={i}
                        cx="100"
                        cy="100"
                        r={80 - i * 15}
                        fill="none"
                        stroke="url(#gradient1)"
                        strokeWidth="1"
                        opacity={0.2 + i * 0.15}
                      />
                    ))}
                    <text x="100" y="106" textAnchor="middle" className="text-2xl font-mono fill-white">{mockData.allAttacks.length}</text>
                    <text x="100" y="130" textAnchor="middle" className="text-xs font-mono fill-[#38BBFF]">高频IP总数</text>
                  </svg>
                </div>
              </div>
              
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-red-400">危险: </span>
                  <span className="font-mono text-white">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#FF9200]">中国: </span>
                  <span className="font-mono text-white">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#00FFFC]">国外: </span>
                  <span className="font-mono text-white">0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#38BBFF]">总计: </span>
                  <span className="font-mono text-white">{mockData.allAttacks.length}</span>
                </div>
              </div>
            </div>
            
            {/* 本地攻击类型统计 */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm h-80">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3 flex items-center justify-between">
                <span>本地攻击类型统计</span>
                <div className="h-1.5 w-20 bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#FFD057] to-[#FFAA0D] animate-pulse"></div>
                </div>
              </h3>
              
              <div className="h-64 flex items-center justify-center space-x-3">
                {mockData.attackTypeCounts.slice(0, 6).map((attack: any, i: number) => {
                  const height = 20 + (attack.percentage * 1.5);
                  const colors = [
                    ["#FF6B6B", "#FF3333"],
                    ["#FFD057", "#FFAA0D"],
                    ["#38BBFF", "#0090FF"],
                    ["#00FFFC", "#00C8FF"],
                    ["#FF9200", "#FF5000"],
                    ["#FF4F87", "#FF0055"]
                  ];
                  return (
                    <div key={i} className="flex flex-col items-center justify-end h-full">
                      <div 
                        className="w-6 rounded-t-full overflow-hidden transition-all duration-700"
                        style={{
                          height: `${height}%`,
                          background: `linear-gradient(180deg, ${colors[i][0]} 0%, ${colors[i][1]} 100%)`
                        }}
                      >
                        <div className="h-full w-full opacity-30 animate-pulse"></div>
                      </div>
                      <div className="mt-2 text-[10px] font-mono text-white whitespace-nowrap transform -rotate-45 origin-top-left">
                        {attack.type}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            {/* 最近事件 */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3 flex items-center justify-between">
                <span>最近攻击事件</span>
                <div className="h-1.5 w-20 bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-4/5 bg-gradient-to-r from-[#FF4F87] to-[#FF0055] animate-pulse"></div>
                </div>
              </h3>
              
              <div className="space-y-3 relative">
                <div className="absolute top-0 bottom-0 left-[7px] w-0.5 bg-[#003366] z-0"></div>
                {mockData.attacks.slice(0, 3).map((attack: AttackData, index: number) => (
                  <div key={index} className="flex items-start space-x-3 relative z-10">
                    <div className="bg-[#38BBFF] w-3.5 h-3.5 rounded-full flex-shrink-0 mt-0.5 shadow-glow"></div>
                    <div className="bg-[#001F3D]/50 border border-[#003366] p-2 rounded w-full">
                      <div className="flex justify-between text-xs">
                        <span className="text-[#FF4F87]">{attack.time}</span>
                        <span className="text-[#00FFFC]">{attack.type}</span>
                      </div>
                      <div className="mt-1 text-white text-xs flex items-center">
                        <span className="font-mono">{attack.sourceIP}</span>
                        <span className="mx-2 text-[#38BBFF]">→</span>
                        <span className="text-[#FFAA0D]">{attack.node}</span>
                      </div>
                      <div className="mt-1 text-[#38BBFF] text-xs">
                        {attack.country} {attack.region}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间世界地图 */}
          <div className="col-span-6">
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 h-full backdrop-blur-sm flex flex-col">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-[#38BBFF] text-sm flex items-center">
                  <Globe className="h-4 w-4 mr-1 text-[#00FFFC]" />
                  <span>全球攻击分布</span>
                </h3>
                <div className="flex space-x-2">
                  <div className="bg-[#001F3D] px-2 py-0.5 rounded text-xs text-[#38BBFF] flex items-center border border-[#003366]">
                    <Clock className="h-3 w-3 mr-1" />
                    实时
                  </div>
                  <div className="bg-[#001F3D] px-2 py-0.5 rounded text-xs text-[#FF4F87] flex items-center border border-[#003366]">
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    高危警报
                  </div>
                </div>
              </div>
              
              <div className="relative flex-grow" ref={mapContainerRef}>
                {/* 世界地图背景 */}
                <div className="absolute inset-0 world-map-container">
                  <div className="world-map-grid-enhanced"></div>
                  
                  {/* 地图网格上的闪烁点 */}
                  {Array.from({length: 20}).map((_, i) => {
                    const x = Math.random() * 100;
                    const y = Math.random() * 100;
                    const size = Math.random() * 1 + 0.5;
                    const delay = Math.random() * 5;
                    return (
                      <div 
                        key={i}
                        className="absolute w-1 h-1 bg-[#38BBFF] rounded-full animate-pulse-slow"
                        style={{
                          left: `${x}%`,
                          top: `${y}%`,
                          width: `${size}px`,
                          height: `${size}px`,
                          animationDelay: `${delay}s`
                        }}
                      ></div>
                    );
                  })}
                  
                  {/* 主要国家/地区标记 */}
                  <div className="absolute left-[22%] top-[30%] map-location">
                    <div className="location-marker" data-country="美国"></div>
                  </div>
                  <div className="absolute left-[48%] top-[26%] map-location">
                    <div className="location-marker" data-country="欧洲"></div>
                  </div>
                  <div className="absolute left-[77%] top-[35%] map-location">
                    <div className="location-marker" data-country="中国"></div>
                  </div>
                  <div className="absolute left-[65%] top-[52%] map-location">
                    <div className="location-marker" data-country="澳洲"></div>
                  </div>
                  <div className="absolute left-[35%] top-[60%] map-location">
                    <div className="location-marker" data-country="南美"></div>
                  </div>
                  
                  {/* 雷达扫描效果 */}
                  <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2">
                    <div className="radar-scan"></div>
                  </div>
                  
                  {/* 大陆轮廓 - 使用矢量样式替代原来的简化版本 */}
                  <div className="continent-vector north-america"></div>
                  <div className="continent-vector south-america"></div>
                  <div className="continent-vector europe"></div>
                  <div className="continent-vector africa"></div>
                  <div className="continent-vector asia"></div>
                  <div className="continent-vector australia"></div>
                </div>
              </div>
              
              {/* 攻击列表 */}
              <div className="mt-3 border-t border-[#003366] pt-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-[#38BBFF] text-sm flex items-center">
                    <AlertTriangle className="h-4 w-4 mr-1 text-[#FF4F87]" />
                    <span>实时攻击记录</span>
                  </h3>
                  <div className="text-xs text-[#00FFFC]">显示最新6条</div>
                </div>
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-[#38BBFF] border-b border-[#003366]">
                      <th className="py-2 text-left">类型</th>
                      <th className="py-2 text-left">节点</th>
                      <th className="py-2 text-left">源IP</th>
                      <th className="py-2 text-left">地理位置</th>
                      <th className="py-2 text-left">攻击时间</th>
                    </tr>
                  </thead>
                  <tbody className="cyberpunk-table">
                    {mockData.attacks.map((attack: AttackData) => (
                      <tr key={attack.id} className="cyber-row border-b border-[#003366]/30 hover:bg-[#00254D]/30">
                        <td className="py-2">
                          <span className="cyber-tag bg-[#001F3D] border border-[#FF4F87]/50 px-1.5 rounded text-[#FF4F87]">
                            {attack.type}
                          </span>
                        </td>
                        <td className="py-2 text-[#00FFFC]">{attack.node}</td>
                        <td className="py-2 font-mono text-white">{attack.sourceIP}</td>
                        <td className="py-2 text-[#FFAA0D]">{attack.country} {attack.region}</td>
                        <td className="py-2 text-[#38BBFF]">{attack.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧攻击统计 */}
          <div className="col-span-3 space-y-4">
            {/* 云端情报数据 */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm h-80">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3 flex items-center justify-between">
                <span>云端情报数据</span>
                <div className="h-1.5 w-20 bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-gradient-to-r from-[#38BBFF] to-[#00FFFC] animate-pulse"></div>
                </div>
              </h3>
              
              <div className="grid grid-cols-2 gap-2 mb-4">
                <div className="bg-[#001F3D]/50 border border-[#003366] p-2 rounded text-center">
                  <div className="text-xs text-[#38BBFF] mb-1">云端收集</div>
                  <div className="text-white text-lg font-mono">--</div>
                </div>
                <div className="bg-[#001F3D]/50 border border-[#003366] p-2 rounded text-center">
                  <div className="text-xs text-[#38BBFF] mb-1">总数据量</div>
                  <div className="text-white text-lg font-mono">--</div>
                </div>
              </div>
              
              <div className="space-y-3 flex-1">
                <div className="flex justify-between items-center text-xs">
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#FF4F87] mr-2"></span>
                    <span className="text-white">内网节点</span>
                  </div>
                  <span className="text-[#FF4F87] font-mono">7.7k/v</span>
                </div>
                <div className="h-1 w-full bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[#FF4F87] to-[#FF0055]"></div>
                </div>
                
                <div className="flex justify-between items-center text-xs mt-4">
                  <div className="flex items-center">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#FFAA0D] mr-2"></span>
                    <span className="text-white">外网节点</span>
                  </div>
                  <span className="text-[#FFAA0D] font-mono">5.7k/v</span>
                </div>
                <div className="h-1 w-full bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[#FFAA0D] to-[#FFD057]"></div>
                </div>
              </div>
              
              <div className="text-right mt-4">
                <div className="inline-block bg-[#001F3D] px-2 py-0.5 rounded text-xs text-[#38BBFF] border border-[#003366]">
                  查看详情
                </div>
              </div>
            </div>
            
            {/* 近期可疑ICS */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm h-80">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3 flex items-center justify-between">
                <span>近期可疑ICS</span>
                <div className="h-1.5 w-20 bg-[#001F3D] rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-[#FF4F87] to-[#FF0055] animate-pulse"></div>
                </div>
              </h3>
              
              <div className="space-y-2">
                {mockData.allAttacks.slice(0, 5).map((attack: AttackData, index: number) => (
                  <div key={index} className="bg-[#001F3D]/50 border border-[#003366] p-2 rounded flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-[#001F3D] border border-[#003366] flex items-center justify-center mr-2">
                        <span className="text-xs text-[#FF4F87]">{index + 1}</span>
                      </div>
                      <div>
                        <div className="text-xs text-white font-mono">{attack.sourceIP}</div>
                        <div className="text-[10px] text-[#38BBFF]">{attack.country}</div>
                      </div>
                    </div>
                    <div className="text-[#FF4F87] text-xs">{
                      Math.floor(Math.random() * 30) + 10
                    }</div>
                  </div>
                ))}
              </div>
              
              <div className="text-right mt-4">
                <div className="inline-block bg-[#001F3D] px-2 py-0.5 rounded text-xs text-[#38BBFF] border border-[#003366]">
                  查看所有记录
                </div>
              </div>
            </div>
            
            {/* 攻击类型分布 */}
            <div className="bg-[#001529]/80 border border-[#003366] rounded-md p-3 backdrop-blur-sm">
              <h3 className="text-[#38BBFF] text-sm border-b border-[#003366] pb-2 mb-3">攻击类型 TOP 5</h3>
              <div className="space-y-3">
                {mockData.attackTypeCounts.slice(0, 5).map((attack: AttackTypeCount, index: number) => {
                  // 生成不同的渐变颜色
                  const gradients = [
                    'from-[#FF4F87] to-[#FF0055]',
                    'from-[#FFAA0D] to-[#FFD057]',
                    'from-[#38BBFF] to-[#00FFFC]',
                    'from-[#00FFFC] to-[#00FFA3]',
                    'from-[#FF9200] to-[#FF5000]'
                  ];
                  
                  return (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-white">{attack.type}</span>
                        <span className="text-[#38BBFF] font-mono">{attack.count}</span>
                      </div>
                      <div className="h-1.5 w-full bg-[#001F3D] rounded-full overflow-hidden">
                        <div 
                          className={`h-full bg-gradient-to-r ${gradients[index]} cyber-progress`}
                          style={{width: `${attack.percentage}%`}}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </main>

        {/* 底部版权 */}
        <footer className="bg-[#001529]/80 border-t border-[#003366] py-2 px-4 text-xs text-[#38BBFF] text-center">
          HFish Honeypot Platform © {new Date().getFullYear()} | <span className="text-[#00FFFC]">安全态势感知系统</span>
        </footer>
      </div>

      {/* HFish API配置对话框 */}
      {showApiConfig && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
          <div className="bg-[#001529] border border-[#003366] rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-[#38BBFF]">API 配置</h3>
              <button 
                className="text-[#38BBFF] hover:text-[#00FFFC]"
                onClick={() => setShowApiConfig(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#38BBFF] mb-1">API 服务器地址</label>
                <input
                  type="text"
                  name="baseUrl"
                  value={apiConfig.baseUrl}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-[#001F3D]/50 border border-[#003366] rounded-md text-white text-sm focus:outline-none focus:border-[#38BBFF]"
                  placeholder="例如: https://Server_IP/api/v1"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#38BBFF] mb-1">API 密钥</label>
                <input
                  type="text"
                  name="apiKey"
                  value={apiConfig.apiKey}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-[#001F3D]/50 border border-[#003366] rounded-md text-white text-sm focus:outline-none focus:border-[#38BBFF]"
                  placeholder="YOUR_API_KEY"
                />
              </div>
              
              <div className="text-xs text-[#38BBFF] p-3 bg-[#001F3D]/50 border border-[#003366] rounded-md">
                <p className="font-bold mb-1">API 请求示例：</p>
                <pre className="overflow-x-auto text-[#00FFFC]">
                  {`curl --location --request POST 'https://Server_IP/api/v1/attack/ip?api_key=YOUR_API_KEY' \\
--header 'Content-Type: application/json' \\
--data '{
  "start_time": 0,
  "end_time": 0,
  "intranet": 0,
  "threat_label": [
    "Scanner"
  ]
}'`}
                </pre>
              </div>
              
              <div>
                <label className="block text-sm text-[#38BBFF] mb-1">用户名 (可选)</label>
                <input
                  type="text"
                  name="username"
                  value={apiConfig.username}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-[#001F3D]/50 border border-[#003366] rounded-md text-white text-sm focus:outline-none focus:border-[#38BBFF]"
                  placeholder="管理员用户名"
                />
              </div>
              
              <div>
                <label className="block text-sm text-[#38BBFF] mb-1">密码 (可选)</label>
                <input
                  type="password"
                  name="password"
                  value={apiConfig.password}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-[#001F3D]/50 border border-[#003366] rounded-md text-white text-sm focus:outline-none focus:border-[#38BBFF]"
                  placeholder="管理员密码"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                size="sm"
                className="text-[#38BBFF] border-[#003366] hover:bg-[#001F3D]/50"
                onClick={() => setShowApiConfig(false)}
              >
                取消
              </Button>
              <Button 
                size="sm"
                className="bg-gradient-to-r from-[#38BBFF] to-[#00FFFC] hover:from-[#00FFFC] hover:to-[#38BBFF] text-[#001529] flex items-center"
                onClick={saveApiConfig}
              >
                <Save className="h-4 w-4 mr-1" />
                保存配置
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 全局 CSS */}
      <style jsx global>{`
        /* 基础样式 */
        body {
          background-color: #000C18;
          color: #c5d8f1;
          font-family: 'Consolas', 'Menlo', monospace;
        }
        
        /* 加载动画 */
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 255, 252, 0.1);
          border-radius: 50%;
          border-top-color: #38BBFF;
          box-shadow: 0 0 15px rgba(0, 255, 252, 0.5);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* 世界地图样式增强 */
        .world-map-container {
          background-color: #00070F;
          border-radius: 4px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 30px rgba(0, 40, 80, 0.4) inset;
        }
        
        .world-map-grid-enhanced {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(56, 187, 255, 0.07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 187, 255, 0.07) 1px, transparent 1px);
          background-size: 20px 20px;
          animation: grid-pulse 8s infinite linear;
        }
        
        @keyframes grid-pulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        
        /* 雷达扫描效果 */
        .radar-scan {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(56, 187, 255, 0.3);
          position: relative;
          animation: radar-rotate 4s linear infinite;
        }
        
        .radar-scan::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: conic-gradient(from 0deg, rgba(56, 187, 255, 0) 0%, rgba(0, 255, 252, 0.5) 20%, rgba(56, 187, 255, 0) 40%);
          border-radius: 50%;
        }
        
        @keyframes radar-rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        /* 轻微闪烁效果 */
        .animate-pulse-slow {
          animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 0.2; }
        }
        
        /* 地图位置标记 */
        .map-location {
          z-index: 10;
        }
        
        .location-marker {
          width: 12px;
          height: 12px;
          background: radial-gradient(circle at center, rgba(56, 187, 255, 0.8), rgba(0, 255, 252, 0.3));
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(56, 187, 255, 0.8);
          position: relative;
          animation: location-pulse 2s ease-in-out infinite;
        }
        
        .location-marker::before {
          content: attr(data-country);
          position: absolute;
          top: -18px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 10px;
          white-space: nowrap;
          color: #38BBFF;
          text-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
        }
        
        .location-marker::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1px solid rgba(56, 187, 255, 0.5);
          animation: location-ring 2s ease-out infinite;
        }
        
        @keyframes location-pulse {
          0% { transform: scale(0.8); }
          50% { transform: scale(1.1); }
          100% { transform: scale(0.8); }
        }
        
        @keyframes location-ring {
          0% { width: 100%; height: 100%; opacity: 1; }
          100% { width: 300%; height: 300%; opacity: 0; }
        }
        
        /* 大陆矢量样式 */
        .continent-vector {
          position: absolute;
          background-color: rgba(56, 187, 255, 0.05);
          border: 1px solid rgba(0, 255, 252, 0.2);
          box-shadow: 0 0 15px rgba(56, 187, 255, 0.1);
          transition: all 0.3s ease;
        }
        
        .continent-vector:hover {
          background-color: rgba(56, 187, 255, 0.15);
          box-shadow: 0 0 20px rgba(56, 187, 255, 0.3);
        }
        
        .north-america {
          width: 22%;
          height: 18%;
          top: 22%;
          left: 18%;
          clip-path: polygon(30% 0%, 60% 10%, 90% 30%, 100% 60%, 80% 100%, 30% 90%, 0% 70%, 10% 40%);
        }
        
        .south-america {
          width: 12%;
          height: 18%;
          top: 52%;
          left: 28%;
          clip-path: polygon(40% 0%, 80% 20%, 100% 60%, 60% 100%, 20% 90%, 0% 60%, 10% 30%);
        }
        
        .europe {
          width: 12%;
          height: 10%;
          top: 22%;
          left: 48%;
          clip-path: polygon(10% 0%, 40% 10%, 80% 0%, 100% 30%, 90% 80%, 60% 100%, 20% 90%, 0% 60%);
        }
        
        .africa {
          width: 16%;
          height: 20%;
          top: 36%;
          left: 46%;
          clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 90% 70%, 80% 100%, 40% 90%, 10% 70%, 0% 40%);
        }
        
        .asia {
          width: 28%;
          height: 22%;
          top: 20%;
          left: 62%;
          clip-path: polygon(0% 20%, 30% 0%, 70% 10%, 90% 30%, 100% 60%, 80% 90%, 50% 100%, 20% 80%, 10% 50%);
        }
        
        .australia {
          width: 10%;
          height: 8%;
          top: 60%;
          left: 78%;
          clip-path: polygon(30% 0%, 70% 10%, 100% 40%, 80% 90%, 40% 100%, 10% 80%, 0% 40%);
        }
        
        /* 攻击点动画增强 */
        .attack-pulse {
          position: absolute;
          width: 8px;
          height: 8px;
          background: radial-gradient(circle at center, #FF4F87, #FF0055);
          border-radius: 50%;
          box-shadow: 0 0 15px #FF4F87, 0 0 5px #FF0055, 0 0 30px #FF0055;
          z-index: 20;
          transform: translate(-50%, -50%);
          animation: attack-pulse 2s forwards;
        }
        
        @keyframes attack-pulse {
          0% {
            transform: translate(-50%, -50%) scale(0.5);
            opacity: 0.3;
          }
          50% {
            transform: translate(-50%, -50%) scale(1.5);
            opacity: 1;
            box-shadow: 0 0 30px #FF4F87, 0 0 10px #FF0055, 0 0 45px #FF0055;
          }
          100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.7;
          }
        }
        
        /* 攻击线条增强 */
        .attack-line {
          position: absolute;
          height: 2px;
          background: linear-gradient(90deg, 
            rgba(255, 79, 135, 0.9),
            rgba(255, 0, 85, 0.1)
          );
          transform-origin: left center;
          z-index: 15;
          animation: attack-line 2s forwards;
          box-shadow: 0 0 10px rgba(255, 79, 135, 0.5);
        }
        
        @keyframes attack-line {
          0% {
            opacity: 0;
            width: 0;
            filter: blur(2px);
          }
          25% {
            filter: blur(0);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 15px rgba(255, 79, 135, 0.7);
          }
          100% {
            opacity: 0;
            filter: blur(1px);
          }
        }
        
        /* 表格行科技感样式 */
        .cyberpunk-table .cyber-row {
          transition: all 0.2s ease;
          position: relative;
          overflow: hidden;
        }
        
        .cyberpunk-table .cyber-row::before {
          content: '';
          position: absolute;
          left: -100%;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(56, 187, 255, 0.1), 
            transparent
          );
          transition: all 0.5s ease;
        }
        
        .cyberpunk-table .cyber-row:hover::before {
          left: 100%;
        }
        
        .cyber-tag {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-tag::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 79, 135, 0.2), 
            transparent
          );
          animation: cyber-tag-shine 3s infinite;
        }
        
        @keyframes cyber-tag-shine {
          0% { left: -100%; }
          20% { left: 100%; }
          100% { left: 100%; }
        }
        
        /* 进度条动画 */
        .cyber-progress {
          position: relative;
          overflow: hidden;
        }
        
        .cyber-progress::after {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 50%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            rgba(255, 255, 255, 0.2), 
            transparent
          );
          animation: progress-shine 2s infinite;
        }
        
        @keyframes progress-shine {
          0% { left: -50%; }
          100% { left: 100%; }
        }
        
        /* 阴影发光效果 */
        .shadow-glow {
          box-shadow: 0 0 10px rgba(56, 187, 255, 0.7), 
                      0 0 20px rgba(0, 255, 252, 0.4);
        }

        /* 灯笼动画效果整合 */
        .vvhan-com-denglong-c {
          color: #FF4F87 !important;
          text-shadow: 0 0 5px rgba(255, 79, 135, 0.8) !important;
        }
        
        .vvhan-com-denglong-a {
          box-shadow: 0 0 20px rgba(255, 79, 135, 0.5) !important;
        }
        
        /* 灯笼挂件外观集成到新主题 */
        .vvhan-com-denglong-b {
          background: linear-gradient(to bottom, #FF4F87, #FF0055) !important;
          border: 1px solid rgba(255, 79, 135, 0.5) !important;
        }
      `}</style>
    </>
  );
}

