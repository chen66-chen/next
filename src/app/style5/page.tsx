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
      <div className="min-h-screen bg-hfish-dark text-blue-100 flex flex-col">
        {/* 顶部导航 */}
        <header className="bg-gradient-to-r from-blue-950 to-blue-900 px-4 py-2 border-b border-blue-800 flex justify-between items-center sticky top-0 z-10">
          <div className="flex items-center space-x-4">
            <div className="text-xl font-bold text-blue-300 flex items-center">
              <Globe className="h-5 w-5 mr-2 text-blue-400" />
              <span>HFish Global Situation Awareness</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-blue-400">
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
              className="text-xs h-7 bg-blue-900/30 hover:bg-blue-800/40 border-blue-700/50 text-blue-300"
              onClick={fetchHFishData}
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              刷新数据
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-xs h-7 bg-blue-900/30 hover:bg-blue-800/40 border-blue-700/50 text-blue-300"
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
          {/* 左侧数据面板 */}
          <div className="col-span-3 space-y-4">
            {/* 中国 TOP 8 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">TOP 8 in China</h3>
              <div className="space-y-2">
                <div className="mb-4">
                  <div className="relative">
                    <svg width="100%" height="180" viewBox="0 0 100 100" className="pie-chart">
                      {mockData.topCountryAttacks.map((attack: CountryAttackCount, index: number) => {
                        const offset = index * (360 / mockData.topCountryAttacks.length);
                        const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#7B61FF", "#1B998B"];
                        return (
                          <g key={attack.country} transform={`rotate(${offset} 50 50)`}>
                            <path 
                              d={`M 50 50 L 50 0 A 50 50 0 0 1 85 15 Z`} 
                              fill={colors[index % colors.length]} 
                              opacity="0.8"
                            />
                            <text 
                              x="65" 
                              y="25" 
                              fontSize="5" 
                              fill="white"
                              transform={`rotate(${-offset} 50 50)`}
                            >
                              {attack.country}
                            </text>
                          </g>
                        );
                      })}
                      <circle cx="50" cy="50" r="25" fill="#0B1622" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-xs text-blue-300">攻击来源</div>
                        <div className="text-sm text-white">中国地区</div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-1 text-xs text-center">
                  {mockData.topCountryAttacks.slice(0, 8).map((attack: CountryAttackCount, index: number) => {
                    const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#7B61FF", "#1B998B"];
                    return (
                      <div key={index} className="flex items-center">
                        <div 
                          className="w-2 h-2 rounded-full mr-1" 
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="truncate">{attack.country}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* 全球 TOP 8 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">Global TOP 8</h3>
              <div className="mb-4">
                <div className="relative">
                  <svg width="100%" height="180" viewBox="0 0 100 100" className="pie-chart">
                    {mockData.topCountryAttacks.map((attack: CountryAttackCount, index: number) => {
                      const offset = index * (360 / mockData.topCountryAttacks.length);
                      const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#7B61FF", "#1B998B"];
                      return (
                        <g key={attack.country} transform={`rotate(${offset} 50 50)`}>
                          <path 
                            d={`M 50 50 L 50 0 A 50 50 0 0 1 85 15 Z`} 
                            fill={colors[index % colors.length]} 
                            opacity="0.8"
                          />
                          <text 
                            x="65" 
                            y="25" 
                            fontSize="5" 
                            fill="white"
                            transform={`rotate(${-offset} 50 50)`}
                          >
                            {attack.country}
                          </text>
                        </g>
                      );
                    })}
                    <circle cx="50" cy="50" r="25" fill="#0B1622" />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-xs text-blue-300">攻击来源</div>
                      <div className="text-sm text-white">全球分布</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-1 text-xs text-center">
                {mockData.topCountryAttacks.slice(0, 8).map((attack: CountryAttackCount, index: number) => {
                  const colors = ["#FF6B6B", "#4ECDC4", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#7B61FF", "#1B998B"];
                  return (
                    <div key={index} className="flex items-center">
                      <div 
                        className="w-2 h-2 rounded-full mr-1" 
                        style={{ backgroundColor: colors[index % colors.length] }}
                      ></div>
                      <span className="truncate">{attack.country}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* IP TOP 10 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">IP TOP 10</h3>
              <div className="space-y-2">
                {mockData.allAttacks.slice(0, 10).map((attack: AttackData, index: number) => (
                  <div key={index} className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                      <div className="w-5 h-5 rounded-full bg-blue-800 flex items-center justify-center mr-2 text-[10px]">
                        {index + 1}
                      </div>
                      <span className="text-blue-100">{attack.sourceIP}</span>
                    </div>
                    <div className="text-blue-300">{Math.floor(Math.random() * 100) + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 中间世界地图 */}
          <div className="col-span-6">
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 h-full shadow-lg flex flex-col">
              <div className="relative flex-grow" ref={mapContainerRef}>
                {/* 世界地图背景 */}
                <div className="absolute inset-0 world-map-container">
                  <div className="world-map-grid"></div>
                  
                  {/* 大陆轮廓 */}
                  <div className="continent continent-asia"></div>
                  <div className="continent continent-europe"></div>
                  <div className="continent continent-africa"></div>
                  <div className="continent continent-north-america"></div>
                  <div className="continent continent-south-america"></div>
                  <div className="continent continent-australia"></div>
                  
                  {/* HFish Logo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="text-center">
                      <h1 className="text-5xl font-bold text-white/80 tracking-wider">HFish</h1>
                      <h2 className="text-2xl text-blue-300/70 mt-2">Honeypot Platform</h2>
                    </div>
                  </div>
                  
                  {/* 固定的蜜罐节点 */}
                  <div className="honeypot-node" style={{ left: '22%', top: '30%' }}>
                    <div className="ping-effect"></div>
                  </div>
                  <div className="honeypot-node" style={{ left: '48%', top: '26%' }}>
                    <div className="ping-effect"></div>
                  </div>
                  <div className="honeypot-node" style={{ left: '77%', top: '35%' }}>
                    <div className="ping-effect"></div>
                  </div>
                  <div className="honeypot-node" style={{ left: '65%', top: '52%' }}>
                    <div className="ping-effect"></div>
                  </div>
                  <div className="honeypot-node" style={{ left: '35%', top: '60%' }}>
                    <div className="ping-effect"></div>
                  </div>
                </div>
              </div>
              
              {/* 攻击列表 */}
              <div className="mt-4">
                <table className="w-full text-xs border-collapse">
                  <thead>
                    <tr className="text-blue-300 border-b border-blue-800/50">
                      <th className="py-2 text-left">Type</th>
                      <th className="py-2 text-left">node</th>
                      <th className="py-2 text-left">Source IP</th>
                      <th className="py-2 text-left">Geographic information</th>
                      <th className="py-2 text-left">Attack time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockData.attacks.map((attack: AttackData) => (
                      <tr key={attack.id} className="border-b border-blue-900/30 hover:bg-blue-900/20">
                        <td className="py-2">{attack.type}</td>
                        <td className="py-2">{attack.node}</td>
                        <td className="py-2">{attack.sourceIP}</td>
                        <td className="py-2">{attack.country} {attack.region}</td>
                        <td className="py-2">{attack.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 右侧攻击统计 */}
          <div className="col-span-3 space-y-4">
            {/* 攻击类型 TOP 10 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">Attack type TOP 10</h3>
              <div className="space-y-3">
                {mockData.attackTypeCounts.slice(0, 5).map((attack: AttackTypeCount, index: number) => (
                  <div key={index}>
                    <div className="flex justify-between text-xs mb-1">
                      <span>{attack.type}</span>
                      <span>{attack.count}</span>
                    </div>
                    <Progress value={attack.percentage} className="h-1.5" indicatorClassName="bg-gradient-to-r from-blue-500 to-cyan-400" />
                  </div>
                ))}
              </div>
            </div>

            {/* 账户统计 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">Account statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="h-20 w-20 mx-auto relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#1e3a5f" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="10" 
                        strokeDasharray="283" 
                        strokeDashoffset="70" 
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <User className="h-8 w-8 text-blue-300" />
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{mockData.systemStats.accountAttempts}</div>
                  <div className="text-xs text-blue-400">账户尝试</div>
                </div>
                <div className="text-center">
                  <div className="h-20 w-20 mx-auto relative flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#1e3a5f" 
                        strokeWidth="10" 
                      />
                      <circle 
                        cx="50" 
                        cy="50" 
                        r="45" 
                        fill="none" 
                        stroke="#38bdf8" 
                        strokeWidth="10" 
                        strokeDasharray="283" 
                        strokeDashoffset="140" 
                        transform="rotate(-90 50 50)" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Lock className="h-8 w-8 text-blue-300" />
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{mockData.systemStats.passwordAttempts}</div>
                  <div className="text-xs text-blue-400">密码统计</div>
                </div>
              </div>
            </div>

            {/* 最近访问 */}
            <div className="bg-blue-950/70 rounded-md border border-blue-800/50 p-3 shadow-lg">
              <h3 className="text-blue-300 text-sm border-b border-blue-800/50 pb-2 mb-3">Recent views</h3>
              <div className="space-y-3">
                {mockData.countryAttacks.slice(0, 3).map((attack: CountryAttackCount, index: number) => (
                  <div key={index} className="flex items-center gap-3 text-xs">
                    <div className="w-8 h-8 rounded-full bg-blue-900/50 flex items-center justify-center">
                      <Info className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                      <div className="text-white">LS-NET-0{10-index} 网络安全防火墙配置实战</div>
                      <div className="text-blue-400 mt-1">
                        {new Date(Date.now() - Math.floor(Math.random() * 8640000)).toISOString().replace('T', ' ').substring(0, 19)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>

        {/* 底部版权 */}
        <footer className="bg-blue-950/80 border-t border-blue-800 py-2 px-4 text-xs text-blue-400 text-center">
          HFish Honeypot Platform © {new Date().getFullYear()} - Chryssolion Chen | <span className="text-blue-300">demo</span>
        </footer>
      </div>

      {/* HFish API配置对话框 */}
      {showApiConfig && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-blue-950 border border-blue-800 rounded-lg shadow-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-blue-300">HFish API 配置</h3>
              <button 
                className="text-blue-400 hover:text-blue-300"
                onClick={() => setShowApiConfig(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-blue-400 mb-1">API 服务器地址</label>
                <input
                  type="text"
                  name="baseUrl"
                  value={apiConfig.baseUrl}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-blue-100 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="例如: http://your-hfish-server:4433/api"
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-400 mb-1">API 密钥</label>
                <input
                  type="text"
                  name="apiKey"
                  value={apiConfig.apiKey}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-blue-100 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="API 密钥"
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-400 mb-1">用户名</label>
                <input
                  type="text"
                  name="username"
                  value={apiConfig.username}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-blue-100 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="HFish 管理员用户名"
                />
              </div>
              
              <div>
                <label className="block text-sm text-blue-400 mb-1">密码</label>
                <input
                  type="password"
                  name="password"
                  value={apiConfig.password}
                  onChange={handleApiConfigChange}
                  className="w-full px-3 py-2 bg-blue-900/30 border border-blue-800 rounded-md text-blue-100 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="HFish 管理员密码"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-3 mt-6">
              <Button 
                variant="outline" 
                size="sm"
                className="text-blue-300 border-blue-800 hover:bg-blue-900/50"
                onClick={() => setShowApiConfig(false)}
              >
                取消
              </Button>
              <Button 
                size="sm"
                className="bg-blue-600 hover:bg-blue-500 text-white flex items-center"
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
          background-color: #0B1622;
          color: #c5d8f1;
          font-family: 'Consolas', monospace;
        }
        
        /* 加载动画 */
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 5px solid rgba(59, 130, 246, 0.2);
          border-radius: 50%;
          border-top-color: #3b82f6;
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        /* 世界地图样式增强 */
        .world-map-container {
          background-color: #081221;
          border-radius: 8px;
          overflow: hidden;
          position: relative;
          box-shadow: 0 0 30px rgba(0, 40, 80, 0.4) inset;
          backdrop-filter: blur(10px);
        }
        
        .world-map-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(25, 93, 156, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(25, 93, 156, 0.15) 1px, transparent 1px);
          background-size: 30px 30px;
          animation: grid-pulse 8s infinite linear;
        }
        
        @keyframes grid-pulse {
          0% { opacity: 0.5; }
          50% { opacity: 0.8; }
          100% { opacity: 0.5; }
        }
        
        /* 粒子背景 */
        .world-map-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: radial-gradient(circle at center, transparent 70%, rgba(56, 189, 248, 0.1) 100%);
          z-index: 1;
          animation: radar-sweep 10s infinite linear;
        }
        
        @keyframes radar-sweep {
          0% { transform: scale(0.9); opacity: 0.3; }
          50% { transform: scale(1.1); opacity: 0.6; }
          100% { transform: scale(0.9); opacity: 0.3; }
        }
        
        /* 大陆样式增强 */
        .continent {
          position: absolute;
          background-color: rgba(25, 93, 156, 0.2);
          border: 1px solid rgba(56, 189, 248, 0.4);
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.2);
          transition: all 0.3s ease;
        }
        
        .continent:hover {
          background-color: rgba(25, 93, 156, 0.4);
          box-shadow: 0 0 20px rgba(56, 189, 248, 0.4);
        }
        
        .continent-asia {
          width: 25%;
          height: 25%;
          top: 30%;
          left: 65%;
          border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;
          animation: float 8s infinite ease-in-out;
        }
        
        .continent-europe {
          width: 12%;
          height: 12%;
          top: 25%;
          left: 48%;
          border-radius: 40% 50% 50% 40% / 30% 50% 50% 40%;
          animation: float 7s infinite ease-in-out;
          animation-delay: 1s;
        }
        
        .continent-africa {
          width: 18%;
          height: 22%;
          top: 40%;
          left: 47%;
          border-radius: 40% 30% 60% 30% / 40% 40% 60% 30%;
          animation: float 9s infinite ease-in-out;
          animation-delay: 0.5s;
        }
        
        .continent-north-america {
          width: 20%;
          height: 20%;
          top: 25%;
          left: 20%;
          border-radius: 30% 50% 50% 60% / 50% 50% 70% 40%;
          animation: float 8.5s infinite ease-in-out;
          animation-delay: 2s;
        }
        
        .continent-south-america {
          width: 12%;
          height: 18%;
          top: 55%;
          left: 30%;
          border-radius: 40% 30% 40% 50% / 40% 40% 60% 60%;
          animation: float 7.5s infinite ease-in-out;
          animation-delay: 1.5s;
        }
        
        .continent-australia {
          width: 10%;
          height: 8%;
          top: 60%;
          left: 75%;
          border-radius: 50% 60% 50% 40% / 40% 50% 40% 50%;
          animation: float 6.5s infinite ease-in-out;
          animation-delay: 0.7s;
        }
        
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
          100% { transform: translateY(0px); }
        }
        
        /* 蜜罐节点样式增强 */
        .honeypot-node {
          position: absolute;
          width: 14px;
          height: 14px;
          background: radial-gradient(circle at center, #60dffb, #38bdf8);
          border-radius: 50%;
          box-shadow: 0 0 15px #38bdf8, 0 0 5px #38bdf8, 0 0 30px #38bdf8;
          z-index: 10;
          filter: drop-shadow(0 0 1px rgba(56, 189, 248, 0.8));
        }
        
        /* 脉冲效果增强 */
        .ping-effect {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: rgba(56, 189, 248, 0.6);
          animation: ping 3s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        
        @keyframes ping {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.8;
          }
          80%, 100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        /* 攻击点动画增强 */
        .attack-pulse {
          position: absolute;
          width: 10px;
          height: 10px;
          background: radial-gradient(circle at center, #ff6b6b, #ef4444);
          border-radius: 50%;
          box-shadow: 0 0 15px #ef4444, 0 0 5px #ef4444, 0 0 30px #ef4444;
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
            box-shadow: 0 0 30px #ef4444, 0 0 10px #ef4444, 0 0 45px #ef4444;
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
            rgba(239, 68, 68, 0.9),
            rgba(239, 68, 68, 0.1)
          );
          transform-origin: left center;
          z-index: 15;
          animation: attack-line 2s forwards;
          box-shadow: 0 0 10px rgba(239, 68, 68, 0.5);
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
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.7);
          }
          100% {
            opacity: 0;
            filter: blur(1px);
          }
        }
        
        /* 卡片样式增强 */
        .bg-blue-950\/70 {
          backdrop-filter: blur(5px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3), 
                      0 0 1px 1px rgba(56, 189, 248, 0.1);
          transition: all 0.3s ease;
        }
        
        .bg-blue-950\/70:hover {
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4), 
                      0 0 2px 1px rgba(56, 189, 248, 0.2);
          transform: translateY(-2px);
        }
        
        /* 表格悬停效果 */
        tbody tr {
          transition: all 0.2s ease;
          border-left: 2px solid transparent;
        }
        
        tbody tr:hover {
          background-color: rgba(59, 130, 246, 0.15) !important;
          border-left: 2px solid rgba(56, 189, 248, 0.6);
        }
        
        /* 进度条增强 */
        .bg-hfish-dark {
          background-color: #0B1622;
        }
        
        /* 粒子背景效果 */
        body::before {
          content: '';
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(rgba(56, 189, 248, 0.1) 1px, transparent 1px),
            radial-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px);
          background-size: 30px 30px;
          background-position: 0 0, 15px 15px;
          z-index: -1;
          animation: bg-scroll 120s infinite linear;
        }
        
        @keyframes bg-scroll {
          from { background-position: 0 0, 15px 15px; }
          to { background-position: 500px 500px, 515px 515px; }
        }
        
        /* 立体效果和光晕 */
        .pie-chart path {
          transition: all 0.3s ease;
          filter: drop-shadow(0px 3px 3px rgba(0, 0, 0, 0.2));
        }
        
        .pie-chart path:hover {
          transform: translateY(-3px) scale(1.02);
          filter: drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.3));
        }
        
        /* 导航栏增强 */
        header {
          backdrop-filter: blur(10px);
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        /* 按钮悬停效果 */
        button {
          transition: all 0.3s ease;
        }
        
        button:hover {
          box-shadow: 0 0 15px rgba(56, 189, 248, 0.3);
        }
        
        /* IP列表高亮效果 */
        [class*="flex items-center"]:hover {
          transform: translateX(3px);
          transition: transform 0.2s ease;
        }
        
        /* 数据面板标题下划线动画 */
        h3 {
          position: relative;
        }
        
        h3::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, 
            rgba(56, 189, 248, 0.8), 
            rgba(59, 130, 246, 0.2)
          );
          transition: width 0.3s ease;
        }
        
        .bg-blue-950\/70:hover h3::after {
          width: 100%;
        }
        
        /* 圆形统计图增强 */
        svg circle[stroke="#38bdf8"] {
          filter: drop-shadow(0 0 3px rgba(56, 189, 248, 0.5));
          transition: all 0.3s ease;
        }
        
        svg:hover circle[stroke="#38bdf8"] {
          filter: drop-shadow(0 0 5px rgba(56, 189, 248, 0.7));
        }
        
        /* 流光按钮效果 */
        .bg-blue-600 {
          background: linear-gradient(90deg, #3b82f6, #0ea5e9, #38bdf8, #3b82f6);
          background-size: 300% 100%;
          animation: gradient-shift 6s infinite ease-in-out;
        }
        
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        /* 对话框模糊背景 */
        .fixed.inset-0.bg-black\/70 {
          backdrop-filter: blur(5px);
        }
      `}</style>
    </>
  );
}
