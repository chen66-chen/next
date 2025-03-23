'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  ComposableMap, 
  Geographies, 
  Geography, 
  Marker 
} from 'react-simple-maps';
import { scaleLinear } from 'd3-scale';

// 为TypeScript创建声明
declare module 'react-simple-maps';
declare module 'd3-scale';

// 世界地图数据 GeoJSON 文件路径
const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

/**
 * 模拟攻击数据接口
 */
interface Attack {
  id: string;
  source: [number, number]; // 经度,纬度
  target: [number, number]; // 经度,纬度
  sourceCountry: string;
  targetCountry: string;
  type: string;
  intensity: number; // 攻击强度 1-10
  startTime: number; // 动画开始时间
  duration: number; // 动画持续时间
}

/**
 * 攻击类型及其对应的颜色
 */
const attackTypes = {
  'ddos': '#ff4d4d',
  'ransomware': '#9c27b0',
  'phishing': '#2196f3',
  'malware': '#ff9800',
  'exploit': '#4caf50',
  'brute_force': '#795548',
} as const;

/**
 * 计算两点之间的中间点并添加曲率
 * @param start 起始点坐标
 * @param end 终点坐标
 * @param curvature 曲率
 * @returns 包含曲线的点数组
 */
const curvedLine = (start: [number, number], end: [number, number], curvature: number = 0.3) => {
  // 计算直线中点
  const midPoint: [number, number] = [
    (start[0] + end[0]) / 2,
    (start[1] + end[1]) / 2
  ];
  
  // 添加一个垂直于直线的偏移来创建曲率
  // 计算直线的方向向量
  const dx = end[0] - start[0];
  const dy = end[1] - start[1];
  
  // 垂直于方向向量的单位向量
  const length = Math.sqrt(dx * dx + dy * dy);
  const normX = -dy / length;
  const normY = dx / length;
  
  // 曲线的控制点 (添加曲率)
  const controlPoint: [number, number] = [
    midPoint[0] + normX * curvature * length,
    midPoint[1] + normY * curvature * length
  ];
  
  return {
    controlPoint,
    path: `M ${start[0]} ${start[1]} Q ${controlPoint[0]} ${controlPoint[1]}, ${end[0]} ${end[1]}`
  };
};

/**
 * 生成随机攻击数据
 * @param count 生成数据数量
 * @returns 攻击数据数组
 */
const generateRandomAttacks = (count: number): Attack[] => {
  // 一些主要国家的坐标 [经度, 纬度]
  const countries = [
    { name: '中国', coords: [104.195, 35.861] as [number, number] },
    { name: '美国', coords: [-95.713, 37.090] as [number, number] },
    { name: '俄罗斯', coords: [105.318, 61.524] as [number, number] },
    { name: '德国', coords: [10.451, 51.165] as [number, number] },
    { name: '巴西', coords: [-51.925, -14.235] as [number, number] },
    { name: '印度', coords: [78.962, 20.593] as [number, number] },
    { name: '日本', coords: [138.252, 36.204] as [number, number] },
    { name: '澳大利亚', coords: [133.775, -25.274] as [number, number] },
    { name: '英国', coords: [-3.436, 55.378] as [number, number] },
    { name: '加拿大', coords: [-106.346, 56.130] as [number, number] },
    { name: '法国', coords: [2.213, 46.227] as [number, number] },
    { name: '韩国', coords: [127.766, 35.907] as [number, number] }
  ];
  
  // 攻击类型列表
  const types = Object.keys(attackTypes);
  
  // 生成随机攻击数据
  return Array.from({ length: count }, (_, i) => {
    // 随机选择源国家和目标国家
    const sourceIndex = Math.floor(Math.random() * countries.length);
    let targetIndex;
    do {
      targetIndex = Math.floor(Math.random() * countries.length);
    } while (targetIndex === sourceIndex); // 确保源和目标不是同一个国家
    
    // 随机选择攻击类型和强度
    const type = types[Math.floor(Math.random() * types.length)];
    const intensity = Math.floor(Math.random() * 10) + 1;
    
    // 随机生成动画开始时间(延迟)
    const startTime = Math.random() * 30000; // 0-30秒内随机开始
    const duration = Math.random() * 3000 + 2000; // 2-5秒完成
    
    return {
      id: `attack-${i}`,
      source: countries[sourceIndex].coords,
      target: countries[targetIndex].coords,
      sourceCountry: countries[sourceIndex].name,
      targetCountry: countries[targetIndex].name,
      type,
      intensity,
      startTime,
      duration
    };
  });
};

/**
 * 网络安全事件地图组件
 * 
 * 该组件在世界地图上展示模拟的网络攻击事件，使用动画展示攻击流向。
 * 包含攻击源、目标标记以及攻击强度和类型的可视化。
 */
const CyberAttackMap: React.FC = () => {
  // 设置地图缩放和中心点
  const [position, setPosition] = useState<{
    zoom: number;
    center: [number, number]; // 经度,纬度
  }>({
    zoom: 1,
    center: [0, 0]
  });
  
  // 模拟攻击数据
  const [attacks, setAttacks] = useState<Attack[]>([]);
  
  // 活跃攻击
  const [activeAttacks, setActiveAttacks] = useState<{[key: string]: number}>({});
  
  // 攻击统计数据
  const [stats, setStats] = useState({
    total: 0,
    byType: {} as {[key: string]: number},
    byCountry: {} as {[key: string]: number}
  });
  
  // 计时器引用，用于管理动画
  const animationRef = useRef<NodeJS.Timeout | null>(null);
  
  // 强度到标记大小的映射函数
  const intensityScale = scaleLinear().domain([1, 10]).range([2, 6]);
  
  // 初始化和更新攻击数据
  useEffect(() => {
    // 生成初始随机攻击数据
    const initialAttacks = generateRandomAttacks(30);
    setAttacks(initialAttacks);
    
    // 计算初始统计数据
    const initialStats = {
      total: initialAttacks.length,
      byType: {} as {[key: string]: number},
      byCountry: {} as {[key: string]: number}
    };
    
    initialAttacks.forEach(attack => {
      // 计算攻击类型统计
      initialStats.byType[attack.type] = (initialStats.byType[attack.type] || 0) + 1;
      
      // 计算目标国家统计
      initialStats.byCountry[attack.targetCountry] = (initialStats.byCountry[attack.targetCountry] || 0) + 1;
    });
    
    setStats(initialStats);
    
    // 定期更新攻击数据以模拟实时性
    const updateInterval = setInterval(() => {
      // 生成新的随机攻击
      const newAttack = generateRandomAttacks(1)[0];
      
      setAttacks(prev => {
        // 保持列表中最多有50个攻击数据，移除最老的
        const updated = [...prev, newAttack];
        if (updated.length > 50) {
          updated.shift();
        }
        return updated;
      });
      
      // 更新统计数据
      setStats(prev => {
        const newStats = { ...prev };
        newStats.total += 1;
        newStats.byType[newAttack.type] = (newStats.byType[newAttack.type] || 0) + 1;
        newStats.byCountry[newAttack.targetCountry] = (newStats.byCountry[newAttack.targetCountry] || 0) + 1;
        return newStats;
      });
    }, 5000); // 每5秒添加一个新攻击
    
    return () => {
      clearInterval(updateInterval);
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, []);
  
  // 管理攻击动画
  useEffect(() => {
    // 清除之前的计时器
    if (animationRef.current) {
      clearTimeout(animationRef.current);
    }
    
    // 为每个攻击创建动画
    attacks.forEach(attack => {
      // 设置攻击开始的计时器
      const startTimer = setTimeout(() => {
        // 将攻击添加到活跃列表
        setActiveAttacks(prev => ({
          ...prev,
          [attack.id]: Date.now()
        }));
        
        // 设置攻击结束的计时器
        const endTimer = setTimeout(() => {
          // 从活跃列表中移除攻击
          setActiveAttacks(prev => {
            const updated = { ...prev };
            delete updated[attack.id];
            return updated;
          });
        }, attack.duration);
        
        // 存储结束计时器
        animationRef.current = endTimer;
      }, attack.startTime);
      
      // 存储开始计时器
      animationRef.current = startTimer;
    });
    
    return () => {
      if (animationRef.current) {
        clearTimeout(animationRef.current);
      }
    };
  }, [attacks]);
  
  return (
    <div className="cyber-attack-map-container relative w-full rounded-xl overflow-hidden border border-gray-700 bg-black/60">
      {/* 标题和统计信息 */}
      <div className="absolute top-4 left-4 z-10 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm border border-gray-700 max-w-xs">
        <h3 className="text-lg font-semibold text-cyan-400 mb-1">全球网络攻击实时监控</h3>
        <p className="text-xs text-gray-300 mb-3">追踪并可视化全球网络安全事件</p>
        
        <div className="text-xs text-gray-400">
          <div className="flex justify-between mb-1">
            <span>已检测攻击:</span>
            <span className="text-cyan-300">{stats.total}</span>
          </div>
          <div className="flex justify-between mb-1">
            <span>实时攻击:</span>
            <span className="text-red-400">{Object.keys(activeAttacks).length}</span>
          </div>
        </div>
      </div>
      
      {/* 攻击类型图例 */}
      <div className="absolute top-4 right-4 z-10 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm border border-gray-700">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">攻击类型</h3>
        <div className="grid grid-cols-2 gap-2 text-xs">
          {Object.entries(attackTypes).map(([type, color]) => (
            <div key={type} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: color }}
              ></div>
              <span className="capitalize">{type.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 地图区域 */}
      <div className="relative w-full h-[400px]">
        <ComposableMap
          projectionConfig={{ scale: 140 }}
          width={800}
          height={400}
          style={{ width: "100%", height: "100%" }}
        >
          {/* 地理区域 - 国家 */}
          <Geographies geography={geoUrl}>
            {({ geographies }: { geographies: any[] }) =>
              geographies.map((geo: any) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#1f2937"
                  stroke="#374151"
                  strokeWidth={0.5}
                  style={{
                    default: { outline: "none" },
                    hover: { fill: "#2d3748", outline: "none" },
                    pressed: { outline: "none" }
                  }}
                />
              ))
            }
          </Geographies>
          
          {/* 攻击线条和标记 */}
          {attacks.map(attack => {
            const isActive = activeAttacks[attack.id];
            
            if (!isActive) return null;
            
            // 计算动画进度百分比
            const currentTime = Date.now();
            const progress = Math.min(
              (currentTime - isActive) / attack.duration,
              1
            );
            
            // 获取攻击类型对应的颜色
            const attackColor = attackTypes[attack.type as keyof typeof attackTypes] || '#ff0000';
            
            // 计算曲线路径
            const curve = curvedLine(attack.source, attack.target, 0.4);
            
            return (
              <React.Fragment key={attack.id}>
                {/* 攻击路径线条 */}
                <defs>
                  <linearGradient id={`gradient-${attack.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor={attackColor} stopOpacity={0.7} />
                    <stop offset="100%" stopColor={attackColor} stopOpacity={0.3} />
                  </linearGradient>
                </defs>
                <path
                  d={curve.path}
                  fill="none"
                  stroke={`url(#gradient-${attack.id})`}
                  strokeWidth={intensityScale(attack.intensity)}
                  strokeLinecap="round"
                  strokeDasharray="6,4"
                  style={{
                    strokeDashoffset: `${(1 - progress) * 100}`,
                    transition: "stroke-dashoffset 0.1s ease"
                  }}
                  opacity={0.8}
                />
                
                {/* 攻击起点标记 */}
                <Marker coordinates={attack.source}>
                  <circle
                    r={3}
                    fill={attackColor}
                    opacity={0.8}
                    stroke="#040b18"
                    strokeWidth={1}
                  />
                </Marker>
                
                {/* 攻击终点标记 - 根据进度显示 */}
                {progress > 0.7 && (
                  <Marker coordinates={attack.target}>
                    <circle
                      r={intensityScale(attack.intensity)}
                      fill={attackColor}
                      opacity={0.8}
                      stroke="#040b18"
                      strokeWidth={1}
                      style={{
                        animation: "pulse 1.5s infinite"
                      }}
                    />
                  </Marker>
                )}
              </React.Fragment>
            );
          })}
        </ComposableMap>
      </div>
      
      {/* 攻击详情面板 */}
      <div className="absolute bottom-4 left-4 z-10 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm border border-gray-700 max-w-xs max-h-[150px] overflow-y-auto">
        <h3 className="text-sm font-semibold text-gray-300 mb-2">最新攻击</h3>
        <div className="space-y-2">
          {Object.keys(activeAttacks).slice(0, 3).map(attackId => {
            const attack = attacks.find(a => a.id === attackId);
            if (!attack) return null;
            
            return (
              <div key={attackId} className="text-xs flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-2" 
                  style={{ backgroundColor: attackTypes[attack.type as keyof typeof attackTypes] }}
                ></div>
                <span className="text-gray-300">{attack.sourceCountry}</span>
                <span className="mx-1 text-gray-500">→</span>
                <span className="text-gray-300">{attack.targetCountry}</span>
                <span className="ml-auto text-gray-400 text-[10px]">{attack.type}</span>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* 自定义样式 */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            opacity: 0.8;
            transform: scale(1);
          }
          50% {
            opacity: 0.4;
            transform: scale(1.5);
          }
          100% {
            opacity: 0.8;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

export default CyberAttackMap; 