'use client';

import React, { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import ForceGraph2D from 'react-force-graph-2d';

/**
 * 设备类型枚举
 */
enum DeviceType {
  SERVER = 'server',
  ROUTER = 'router',
  WORKSTATION = 'workstation',
  IOT = 'iot',
  DATABASE = 'database',
  FIREWALL = 'firewall',
  CLOUD = 'cloud'
}

/**
 * 设备节点接口定义
 */
interface DeviceNode {
  id: string;
  name: string;
  type: DeviceType;
  ip?: string;
  os?: string;
  services?: string[];
  vulnerabilities?: string[];
  group?: number;
  size?: number;
  color?: string;
  x?: number;
  y?: number;
}

/**
 * 连接关系接口定义
 */
interface ConnectionLink {
  source: string;
  target: string;
  type: string;
  protocol?: string;
  port?: number;
  bandwidth?: string;
  latency?: number;
  status?: 'active' | 'inactive' | 'compromised';
  value?: number;
  highlighted?: boolean; // 用于高亮攻击路径
  originalColor?: string;
  color?: string;
}

/**
 * 网络拓扑数据接口定义
 */
interface NetworkTopologyData {
  nodes: DeviceNode[];
  links: ConnectionLink[];
}

/**
 * 预定义颜色配置
 */
const COLORS = {
  DEFAULT_NODE: '#2563eb', // 默认节点颜色
  HIGHLIGHTED_NODE: '#ef4444', // 高亮节点颜色
  DEFAULT_LINK: '#64748b', // 默认连接颜色
  ATTACK_PATH: '#ef4444', // 攻击路径颜色
  SERVER: '#3b82f6', // 服务器颜色
  ROUTER: '#10b981', // 路由器颜色
  WORKSTATION: '#6366f1', // 工作站颜色
  IOT: '#f59e0b', // IoT设备颜色
  DATABASE: '#8b5cf6', // 数据库颜色
  FIREWALL: '#1e40af', // 防火墙颜色
  CLOUD: '#3b82f6', // 云服务颜色
  BACKGROUND: 'rgba(13, 17, 23, 0.9)', // 背景颜色
  GRID: 'rgba(30, 41, 59, 0.5)', // 网格线颜色
  GLOW: 'rgba(59, 130, 246, 0.5)' // 节点发光效果
};

/**
 * 攻击路径定义
 * 每个攻击路径包含多个步骤，每步指定源节点和目标节点
 */
const ATTACK_PATHS = [
  {
    name: 'DDoS攻击',
    description: '分布式拒绝服务攻击，通过多台僵尸网络设备向目标发送大量请求，导致服务不可用',
    steps: [
      { source: 'iot1', target: 'router1' },
      { source: 'router1', target: 'firewall1' },
      { source: 'firewall1', target: 'server1' }
    ]
  },
  {
    name: '数据泄露',
    description: '攻击者通过工作站获取凭证，访问数据库并窃取敏感数据',
    steps: [
      { source: 'workstation3', target: 'server2' },
      { source: 'server2', target: 'database1' }
    ]
  },
  {
    name: '横向移动',
    description: '攻击者攻陷一台设备后，利用内网权限在不同设备间移动',
    steps: [
      { source: 'workstation2', target: 'workstation1' },
      { source: 'workstation1', target: 'server1' },
      { source: 'server1', target: 'database1' }
    ]
  },
  {
    name: '供应链攻击',
    description: '通过攻击云服务提供商，进而渗透到组织内部网络',
    steps: [
      { source: 'cloud1', target: 'router2' },
      { source: 'router2', target: 'firewall1' },
      { source: 'firewall1', target: 'server2' }
    ]
  }
];

/**
 * 生成模拟网络拓扑数据
 * @returns NetworkTopologyData 拓扑图数据
 */
const generateNetworkData = (): NetworkTopologyData => {
  // 创建节点
  const nodes: DeviceNode[] = [
    // 服务器
    { 
      id: 'server1', 
      name: '应用服务器', 
      type: DeviceType.SERVER,
      ip: '192.168.1.10',
      os: 'Linux',
      services: ['HTTP', 'SSH'],
      vulnerabilities: ['CVE-2023-1234', 'OpenSSH 7.5漏洞'],
      group: 1,
      size: 20,
      color: COLORS.SERVER
    },
    { 
      id: 'server2', 
      name: '文件服务器', 
      type: DeviceType.SERVER,
      ip: '192.168.1.11',
      os: 'Windows Server',
      services: ['SMB', 'FTP'],
      vulnerabilities: ['EternalBlue'],
      group: 1,
      size: 18,
      color: COLORS.SERVER
    },
    
    // 路由器
    { 
      id: 'router1', 
      name: '主路由器', 
      type: DeviceType.ROUTER,
      ip: '192.168.1.1',
      os: 'Cisco IOS',
      vulnerabilities: ['默认密码'],
      group: 2,
      size: 18,
      color: COLORS.ROUTER
    },
    { 
      id: 'router2', 
      name: '边缘路由器', 
      type: DeviceType.ROUTER,
      ip: '10.0.0.1',
      os: 'Cisco IOS',
      group: 2,
      size: 18,
      color: COLORS.ROUTER
    },
    
    // 防火墙
    { 
      id: 'firewall1', 
      name: '边界防火墙', 
      type: DeviceType.FIREWALL,
      ip: '192.168.1.2',
      os: 'FortiOS',
      group: 2,
      size: 20,
      color: COLORS.FIREWALL
    },
    
    // 工作站
    { 
      id: 'workstation1', 
      name: '管理员工作站', 
      type: DeviceType.WORKSTATION,
      ip: '192.168.1.100',
      os: 'Windows 10',
      vulnerabilities: ['浏览器漏洞'],
      group: 3,
      size: 15,
      color: COLORS.WORKSTATION
    },
    { 
      id: 'workstation2', 
      name: '开发工作站', 
      type: DeviceType.WORKSTATION,
      ip: '192.168.1.101',
      os: 'MacOS',
      group: 3,
      size: 15,
      color: COLORS.WORKSTATION
    },
    { 
      id: 'workstation3', 
      name: '财务工作站', 
      type: DeviceType.WORKSTATION,
      ip: '192.168.1.102',
      os: 'Windows 10',
      group: 3,
      size: 15,
      color: COLORS.WORKSTATION
    },
    
    // 数据库
    { 
      id: 'database1', 
      name: '核心数据库', 
      type: DeviceType.DATABASE,
      ip: '192.168.1.20',
      os: 'Linux',
      services: ['MySQL', 'Redis'],
      vulnerabilities: ['弱密码'],
      group: 4,
      size: 18,
      color: COLORS.DATABASE
    },
    
    // IoT设备
    { 
      id: 'iot1', 
      name: '监控摄像头', 
      type: DeviceType.IOT,
      ip: '192.168.1.200',
      os: 'Custom Firmware',
      vulnerabilities: ['默认凭证', '固件漏洞'],
      group: 5,
      size: 12,
      color: COLORS.IOT
    },
    { 
      id: 'iot2', 
      name: '智能门禁', 
      type: DeviceType.IOT,
      ip: '192.168.1.201',
      os: 'Custom Firmware',
      group: 5,
      size: 12,
      color: COLORS.IOT
    },
    
    // 云服务
    { 
      id: 'cloud1', 
      name: '云存储服务', 
      type: DeviceType.CLOUD,
      services: ['S3', 'CDN'],
      group: 6,
      size: 22,
      color: COLORS.CLOUD
    }
  ];
  
  // 创建连接关系
  const links: ConnectionLink[] = [
    // 路由器连接
    { source: 'router1', target: 'router2', type: 'network', protocol: 'BGP', value: 5, color: COLORS.DEFAULT_LINK },
    { source: 'router1', target: 'firewall1', type: 'network', protocol: 'TCP/IP', value: 5, color: COLORS.DEFAULT_LINK },
    
    // 防火墙连接
    { source: 'firewall1', target: 'server1', type: 'network', protocol: 'TCP/IP', port: 443, value: 3, color: COLORS.DEFAULT_LINK },
    { source: 'firewall1', target: 'server2', type: 'network', protocol: 'TCP/IP', port: 80, value: 3, color: COLORS.DEFAULT_LINK },
    
    // 服务器连接
    { source: 'server1', target: 'database1', type: 'application', protocol: 'MySQL', port: 3306, value: 2, color: COLORS.DEFAULT_LINK },
    { source: 'server2', target: 'database1', type: 'application', protocol: 'MySQL', port: 3306, value: 2, color: COLORS.DEFAULT_LINK },
    
    // 工作站连接
    { source: 'workstation1', target: 'server1', type: 'user', protocol: 'SSH', port: 22, value: 1, color: COLORS.DEFAULT_LINK },
    { source: 'workstation2', target: 'server1', type: 'user', protocol: 'HTTP', port: 80, value: 1, color: COLORS.DEFAULT_LINK },
    { source: 'workstation2', target: 'workstation1', type: 'user', protocol: 'SMB', value: 1, color: COLORS.DEFAULT_LINK },
    { source: 'workstation3', target: 'server2', type: 'user', protocol: 'FTP', port: 21, value: 1, color: COLORS.DEFAULT_LINK },
    
    // IoT连接
    { source: 'iot1', target: 'router1', type: 'iot', protocol: 'MQTT', value: 1, color: COLORS.DEFAULT_LINK },
    { source: 'iot2', target: 'router1', type: 'iot', protocol: 'MQTT', value: 1, color: COLORS.DEFAULT_LINK },
    
    // 云服务连接
    { source: 'cloud1', target: 'router2', type: 'cloud', protocol: 'HTTPS', value: 3, color: COLORS.DEFAULT_LINK }
  ];
  
  return { nodes, links };
};

/**
 * 节点对象的自定义类型定义
 */
interface NodeObject {
  id: string;
  x?: number;
  y?: number;
  [key: string]: any;
}

/**
 * 自定义节点对象类型定义
 */
interface CustomNodeObject extends NodeObject {
  id: string;
  type: 'server' | 'router' | 'workstation' | 'iot' | 'database' | 'firewall' | 'cloud';
  x?: number;
  y?: number;
  connections?: string[];
}

/**
 * 网络拓扑图组件
 * 
 * 交互式网络拓扑图，展示网络设备连接和模拟攻击路径
 */
const NetworkTopology: React.FC = () => {
  // 引用图表容器
  const graphRef = useRef<any>();
  
  // 生成网络数据
  const [graphData, setGraphData] = useState<NetworkTopologyData>(generateNetworkData());
  
  // 当前选中的攻击路径
  const [selectedAttack, setSelectedAttack] = useState<string | null>(null);
  const [showAttackDetails, setShowAttackDetails] = useState(false);
  const [attackDescription, setAttackDescription] = useState('');
  
  // 高亮节点集合
  const [highlightNodes, setHighlightNodes] = useState<Set<NodeObject>>(new Set());
  const [hoveredNode, setHoveredNode] = useState<CustomNodeObject | null>(null);
  
  // 窗口宽度状态，用于响应式调整
  const [windowWidth, setWindowWidth] = useState(0);
  
  // 在组件挂载时获取窗口宽度
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    // 初始化窗口宽度
    handleResize();
    
    // 添加窗口大小变化监听
    window.addEventListener('resize', handleResize);
    
    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  // 计算图形高度，根据窗口宽度调整
  const graphHeight = useMemo(() => {
    if (windowWidth < 640) return 300; // 小屏幕
    if (windowWidth < 1024) return 400; // 中等屏幕
    return 500; // 大屏幕
  }, [windowWidth]);
  
  /**
   * 高亮显示攻击路径
   * @param attackPathName 攻击路径名称
   */
  const highlightAttackPath = (attackPathName: string | null) => {
    // 复制当前图数据
    const data = JSON.parse(JSON.stringify(graphData)) as NetworkTopologyData;
    
    // 重置所有链接的颜色
    data.links.forEach(link => {
      link.color = COLORS.DEFAULT_LINK;
      link.highlighted = false;
    });
    
    // 重置所有节点的颜色
    data.nodes.forEach(node => {
      node.color = COLORS[node.type.toUpperCase() as keyof typeof COLORS] || COLORS.DEFAULT_NODE;
    });
    
    // 如果选择了攻击路径，高亮显示
    if (attackPathName) {
      const attackPath = ATTACK_PATHS.find(path => path.name === attackPathName);
      
      if (attackPath) {
        // 设置攻击描述
        setAttackDescription(attackPath.description);
        
        // 高亮路径中的节点和连接
        attackPath.steps.forEach(step => {
          // 高亮连接
          const link = data.links.find(l => 
            (l.source === step.source && l.target === step.target) || 
            (l.source === step.target && l.target === step.source)
          );
          
          if (link) {
            link.color = COLORS.ATTACK_PATH;
            link.highlighted = true;
          }
          
          // 高亮源节点和目标节点
          const sourceNode = data.nodes.find(n => n.id === step.source);
          const targetNode = data.nodes.find(n => n.id === step.target);
          
          if (sourceNode) {
            sourceNode.color = COLORS.HIGHLIGHTED_NODE;
          }
          if (targetNode) {
            targetNode.color = COLORS.HIGHLIGHTED_NODE;
          }
        });
      }
    } else {
      setAttackDescription('');
    }
    
    // 更新图数据
    setGraphData(data);
  };
  
  /**
   * 处理攻击路径选择
   */
  const handleAttackPathSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const attackName = e.target.value || null;
    setSelectedAttack(attackName);
    highlightAttackPath(attackName);
    setShowAttackDetails(!!attackName);
  };
  
  // 为节点绘制自定义渲染函数
  const nodeCanvasObject = useCallback((node: NodeObject, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { x, y, id, type } = node as CustomNodeObject;
    
    // 检查坐标是否有效
    if (x === undefined || y === undefined || isNaN(x) || isNaN(y) || !isFinite(x) || !isFinite(y)) {
      return; // 如果坐标无效则退出渲染
    }
    
    const label = id;
    const fontSize = 4;
    
    // 根据节点类型确定颜色
    let nodeColor = COLORS.DEFAULT_NODE;
    if (type === 'server') nodeColor = COLORS.SERVER;
    else if (type === 'router') nodeColor = COLORS.ROUTER;
    else if (type === 'workstation') nodeColor = COLORS.WORKSTATION;
    else if (type === 'iot') nodeColor = COLORS.IOT;
    else if (type === 'database') nodeColor = COLORS.DATABASE;
    else if (type === 'firewall') nodeColor = COLORS.FIREWALL;
    else if (type === 'cloud') nodeColor = COLORS.CLOUD;
    
    // 如果是高亮节点，改变颜色
    if (highlightNodes.has(node)) {
      nodeColor = COLORS.HIGHLIGHTED_NODE;
    }
    
    // 节点大小随缩放变化
    const nodeSize = 5 / Math.pow(globalScale, 0.2);
    
    // 确保nodeSize是有效的数值
    if (!isFinite(nodeSize) || nodeSize <= 0) {
      return; // 如果节点大小无效则退出渲染
    }
    
    // 创建一个径向渐变效果
    const gradient = ctx.createRadialGradient(
      x, y, 0,
      x, y, nodeSize
    );
    
    // 根据节点类型添加渐变颜色
    gradient.addColorStop(0, lightenColor(nodeColor, 30));
    gradient.addColorStop(1, nodeColor);
    
    // 绘制发光效果
    ctx.beginPath();
    ctx.arc(x, y, nodeSize * 2, 0, 2 * Math.PI);
    ctx.fillStyle = `${nodeColor}33`; // 添加透明度
    ctx.fill();
    
    // 绘制节点主体
    ctx.beginPath();
    ctx.arc(x, y, nodeSize, 0, 2 * Math.PI);
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // 绘制边框
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 0.5 / globalScale;
    ctx.stroke();
    
    // 绘制标签
    ctx.font = `${fontSize}px Sans-Serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#fff';
    ctx.fillText(label, x, y + nodeSize + fontSize);
  }, [highlightNodes]);
  
  // 为连接线绘制自定义渲染函数
  const linkCanvasObject = useCallback((link: any, ctx: CanvasRenderingContext2D, globalScale: number) => {
    const { source, target, isAttackPath } = link;
    
    // 获取源节点和目标节点的坐标
    const start = source;
    const end = target;
    
    // 检查坐标是否有效
    if (!start.x || !start.y || !end.x || !end.y || 
        isNaN(start.x) || isNaN(start.y) || isNaN(end.x) || isNaN(end.y) ||
        !isFinite(start.x) || !isFinite(start.y) || !isFinite(end.x) || !isFinite(end.y)) {
      return; // 如果坐标无效则退出渲染
    }
    
    // 确定连接线的颜色
    const color = isAttackPath ? COLORS.ATTACK_PATH : COLORS.DEFAULT_LINK;
    
    // 计算线宽，根据全局缩放调整
    const lineWidth = isAttackPath ? 1.5 / globalScale : 1 / globalScale;
    
    // 开始绘制
    ctx.beginPath();
    ctx.moveTo(start.x, start.y);
    ctx.lineTo(end.x, end.y);
    
    // 设置线条样式
    ctx.strokeStyle = color;
    ctx.lineWidth = lineWidth;
    
    // 如果是攻击路径，使用虚线
    if (isAttackPath) {
      ctx.setLineDash([2 / globalScale, 2 / globalScale]);
    } else {
      ctx.setLineDash([]);
    }
    
    // 绘制线条
    ctx.stroke();
    
    // 重置虚线设置
    ctx.setLineDash([]);
    
    // 如果是攻击路径，添加一个动画箭头
    if (isAttackPath) {
      // 计算方向向量
      const dx = end.x - start.x;
      const dy = end.y - start.y;
      const length = Math.sqrt(dx * dx + dy * dy);
      
      // 标准化方向向量
      const unitDx = dx / length;
      const unitDy = dy / length;
      
      // 计算动画位置（根据当前时间）
      const animationSpeed = 1;  // 调整速度
      const timestamp = Date.now() * animationSpeed;
      const animationPos = (timestamp % 1000) / 1000;
      
      // 计算动画点的位置
      const pointX = start.x + unitDx * length * animationPos;
      const pointY = start.y + unitDy * length * animationPos;
      
      // 绘制动画点
      ctx.beginPath();
      ctx.arc(pointX, pointY, 2 / globalScale, 0, 2 * Math.PI);
      ctx.fillStyle = '#ff0000';
      ctx.fill();
    }
  }, []);
  
  /**
   * 绘制星空背景
   */
  const drawStarryBackground = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // 星空背景颜色 - 深蓝色渐变
    const bgGradient = ctx.createLinearGradient(0, 0, 0, height);
    bgGradient.addColorStop(0, 'rgba(10, 15, 30, 0.95)');
    bgGradient.addColorStop(1, 'rgba(5, 10, 20, 0.95)');
    
    // 填充背景
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);
    
    // 添加网格（可选，更微妙的网格）
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(30, 40, 70, 0.3)';
    ctx.lineWidth = 0.3;
    
    // 绘制垂直线
    for (let x = 0; x <= width; x += 50) {
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
    }
    
    // 绘制水平线
    for (let y = 0; y <= height; y += 50) {
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
    }
    
    ctx.stroke();
    
    // 添加星系云
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const radius = Math.random() * 100 + 50;
      
      const nebulaGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, radius
      );
      
      // 随机颜色的星云
      const hue = Math.floor(Math.random() * 360);
      nebulaGradient.addColorStop(0, `hsla(${hue}, 100%, 70%, 0.1)`);
      nebulaGradient.addColorStop(0.5, `hsla(${hue}, 100%, 50%, 0.05)`);
      nebulaGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = nebulaGradient;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 添加小星星
    for (let i = 0; i < 200; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 1.5;
      
      // 每个星星有不同的亮度
      const brightness = Math.random() * 0.5 + 0.5;
      ctx.fillStyle = `rgba(255, 255, 255, ${brightness})`;
      
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // 添加闪烁的大星星
    for (let i = 0; i < 30; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = Math.random() * 2 + 1;
      
      // 创建闪烁效果的外发光
      const glowGradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, size * 5
      );
      
      // 不同颜色的星星
      const starColors = [
        'rgba(150, 200, 255, 0.8)', // 蓝色星
        'rgba(255, 200, 150, 0.8)', // 黄色星
        'rgba(255, 150, 150, 0.8)', // 红色星
        'rgba(200, 255, 200, 0.8)'  // 绿色星
      ];
      
      const starColor = starColors[Math.floor(Math.random() * starColors.length)];
      
      glowGradient.addColorStop(0, starColor);
      glowGradient.addColorStop(0.5, starColor.replace('0.8', '0.3'));
      glowGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 5, 0, Math.PI * 2);
      ctx.fill();
      
      // 星星中心点
      ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.beginPath();
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
      
      // 十字光芒效果
      ctx.strokeStyle = starColor.replace('0.8', '0.4');
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(x - size * 4, y);
      ctx.lineTo(x + size * 4, y);
      ctx.moveTo(x, y - size * 4);
      ctx.lineTo(x, y + size * 4);
      ctx.stroke();
    }
  };
  
  /**
   * 辅助函数：使颜色变亮
   */
  const lightenColor = (color: string, percent: number): string => {
    // 移除 # 符号
    let hex = color.replace('#', '');
    
    // 转换为 RGB
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    
    // 增加亮度
    r = Math.min(255, Math.floor(r * (1 + percent / 100)));
    g = Math.min(255, Math.floor(g * (1 + percent / 100)));
    b = Math.min(255, Math.floor(b * (1 + percent / 100)));
    
    // 转换回 Hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  /**
   * 辅助函数：使颜色变暗
   */
  const darkenColor = (color: string, percent: number): string => {
    // 移除 # 符号
    let hex = color.replace('#', '');
    
    // 转换为 RGB
    let r = parseInt(hex.substr(0, 2), 16);
    let g = parseInt(hex.substr(2, 2), 16);
    let b = parseInt(hex.substr(4, 2), 16);
    
    // 减少亮度
    r = Math.max(0, Math.floor(r * (1 - percent / 100)));
    g = Math.max(0, Math.floor(g * (1 - percent / 100)));
    b = Math.max(0, Math.floor(b * (1 - percent / 100)));
    
    // 转换回 Hex
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  };
  
  return (
    <div className="network-topology-container relative w-full">
      {/* 控制面板 */}
      <div className="absolute top-2 right-2 z-10 bg-gray-900/80 p-3 rounded-lg backdrop-blur-sm border border-gray-700 max-w-xs">
        <h3 className="text-sm font-semibold text-cyan-300 mb-2">攻击路径模拟</h3>
        <select 
          className="w-full bg-gray-800 text-white text-sm rounded px-2 py-1 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedAttack || ''}
          onChange={handleAttackPathSelect}
        >
          <option value="">选择攻击路径...</option>
          {ATTACK_PATHS.map(path => (
            <option key={path.name} value={path.name}>{path.name}</option>
          ))}
        </select>
        
        {/* 攻击路径详情 */}
        {showAttackDetails && (
          <div className="mt-2 text-xs text-gray-300">
            <p>{attackDescription}</p>
          </div>
        )}
      </div>
      
      {/* 设备详情面板 - 当鼠标悬停在节点上时显示 */}
      {hoveredNode && (
        <div className="absolute bottom-2 left-2 z-10 bg-gray-900/90 p-3 rounded-lg backdrop-blur-md border border-gray-700 max-w-xs shadow-xl">
          <h3 className="text-sm font-semibold text-cyan-400 mb-1 flex items-center">
            <span className="w-2.5 h-2.5 rounded-full mr-2" style={{ backgroundColor: hoveredNode.color }}></span>
            {hoveredNode.name}
          </h3>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
            <span className="text-gray-400">类型:</span>
            <span className="text-gray-300">{hoveredNode.type}</span>
            
            {hoveredNode.ip && (
              <>
                <span className="text-gray-400">IP地址:</span>
                <span className="text-gray-300">{hoveredNode.ip}</span>
              </>
            )}
            
            {hoveredNode.os && (
              <>
                <span className="text-gray-400">操作系统:</span>
                <span className="text-gray-300">{hoveredNode.os}</span>
              </>
            )}
          </div>
          
          {/* 显示服务 */}
          {hoveredNode.services && hoveredNode.services.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-semibold text-gray-400">开放服务:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {hoveredNode.services.map(service => (
                  <span key={service} className="text-xs bg-gray-800 text-green-300 px-1.5 py-0.5 rounded border border-green-900/50">
                    {service}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* 显示漏洞 */}
          {hoveredNode.vulnerabilities && hoveredNode.vulnerabilities.length > 0 && (
            <div className="mt-2">
              <span className="text-xs font-semibold text-gray-400">已知漏洞:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {hoveredNode.vulnerabilities.map(vuln => (
                  <span key={vuln} className="text-xs bg-gray-800 text-red-300 px-1.5 py-0.5 rounded border border-red-900/50">
                    {vuln}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* 图例 */}
      <div className="absolute top-2 left-2 z-10 bg-gray-900/90 p-3 rounded-lg backdrop-blur-md border border-gray-700 max-w-xs shadow-lg">
        <h3 className="text-xs font-semibold text-cyan-300 mb-2">设备类型</h3>
        <div className="grid grid-cols-2 gap-1 text-xs">
          {Object.entries({
            '服务器': COLORS.SERVER,
            '路由器': COLORS.ROUTER,
            '工作站': COLORS.WORKSTATION,
            'IoT设备': COLORS.IOT,
            '数据库': COLORS.DATABASE,
            '防火墙': COLORS.FIREWALL,
            '云服务': COLORS.CLOUD
          }).map(([label, color]) => (
            <div key={label} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1.5 glow-sm" 
                style={{ 
                  backgroundColor: color, 
                  boxShadow: `0 0 4px ${color}`
                }}
              ></div>
              <span className="text-gray-300">{label}</span>
            </div>
          ))}
        </div>
      </div>
      
      {/* 拓扑图 */}
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700 shadow-2xl">
        <ForceGraph2D
          ref={graphRef}
          graphData={graphData}
          nodeCanvasObject={nodeCanvasObject}
          linkCanvasObject={linkCanvasObject}
          linkDirectionalParticles={0}
          linkDirectionalParticleSpeed={0.01}
          nodeRelSize={10}
          linkWidth={1.5}
          height={graphHeight}
          backgroundColor={COLORS.BACKGROUND}
          onNodeHover={(node: any) => setHoveredNode(node)}
          cooldownTicks={100}
          onEngineStop={() => graphRef.current?.zoomToFit(400, 50)}
          nodeLabel={() => ''}
          onRenderFramePre={(ctx, globalScale) => {
            const canvas = ctx.canvas;
            drawStarryBackground(ctx, canvas.width, canvas.height);
          }}
        />
      </div>
      
      {/* 添加CSS样式 */}
      <style jsx>{`
        .glow-sm {
          filter: drop-shadow(0 0 2px var(--glow-color));
        }
      `}</style>
    </div>
  );
};

export default NetworkTopology; 