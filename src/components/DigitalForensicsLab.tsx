'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  FileText, 
  Image as ImageIcon, 
  Search, 
  Lock, 
  Check, 
  AlertTriangle, 
  HelpCircle, 
  Star,
  ChevronRight,
  RefreshCw,
  FileDigit,
  File,
  DownloadCloud,
  Eye,
  Shield,
  Fingerprint,
  Laptop,
  CloudCog
} from 'lucide-react';

// 定义挑战类型枚举
enum ChallengeType {
  FILE_RECOVERY = '文件恢复',
  METADATA_ANALYSIS = '元数据分析',
  STEGANOGRAPHY = '隐写术'
}

// 定义难度级别枚举
enum DifficultyLevel {
  EASY = '初级',
  MEDIUM = '中级',
  HARD = '高级'
}

// 定义挑战状态枚举
enum ChallengeStatus {
  LOCKED = 'locked',
  AVAILABLE = 'available',
  COMPLETED = 'completed'
}

// 取证挑战接口定义
interface ForensicChallenge {
  id: number;
  title: string;
  type: ChallengeType;
  difficulty: DifficultyLevel;
  description: string;
  imageUrl: string;
  hints: string[];
  status: ChallengeStatus;
  solution: string;
  tools: string[];
  points: number;
}

/**
 * 数字取证实验室组件 - 提供交互式的数字取证挑战体验
 * 
 * 功能：
 * 1. 提供三种类型的取证挑战：文件恢复、元数据分析、隐写术
 * 2. 根据难度级别划分不同挑战
 * 3. 交互式界面，提供工具和提示
 * 4. 用户进度跟踪和积分系统
 */
export default function DigitalForensicsLab() {
  // 状态定义
  const [activeChallenge, setActiveChallenge] = useState<ForensicChallenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [currentHintIndex, setCurrentHintIndex] = useState(0);
  const [resultMessage, setResultMessage] = useState('');
  const [showResult, setShowResult] = useState(false);
  const [userPoints, setUserPoints] = useState(0);
  const [completedChallenges, setCompletedChallenges] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState<ChallengeType>(ChallengeType.FILE_RECOVERY);
  
  // 取证挑战列表
  const forensicChallenges: ForensicChallenge[] = [
    {
      id: 1,
      title: "恢复被删除的访问日志",
      type: ChallengeType.FILE_RECOVERY,
      difficulty: DifficultyLevel.EASY,
      description: "有黑客入侵了公司的Web服务器并删除了部分访问日志来隐藏踪迹。请恢复被删除的日志文件，并找出黑客使用的IP地址。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "查看日志文件的文件签名，.log文件通常以特定字节开始",
        "使用文件恢复工具分析剩余的文件片段",
        "关注时间戳在入侵期间的条目"
      ],
      status: ChallengeStatus.AVAILABLE,
      solution: "192.168.1.45",
      tools: ["文件恢复器", "日志分析器"],
      points: 100
    },
    {
      id: 2,
      title: "识别可疑图片的拍摄位置",
      type: ChallengeType.METADATA_ANALYSIS,
      difficulty: DifficultyLevel.EASY,
      description: "安全团队截获了一张可疑图片，需要确定其拍摄位置。分析图片的元数据，找出照片拍摄的地点（城市名）。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "图片的EXIF数据中包含GPS信息",
        "使用元数据查看器检查图片的所有EXIF字段",
        "将经纬度转换为地理位置名称"
      ],
      status: ChallengeStatus.AVAILABLE,
      solution: "上海",
      tools: ["EXIF查看器", "GPS坐标转换器"],
      points: 100
    },
    {
      id: 3,
      title: "解密隐藏在图片中的消息",
      type: ChallengeType.STEGANOGRAPHY,
      difficulty: DifficultyLevel.EASY,
      description: "情报显示，一张看似普通的风景照中隐藏了重要的秘密信息。使用隐写术分析技术找出隐藏的信息。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "尝试查看图片的LSB（最低有效位）",
        "检查图片是否有密码保护",
        "使用隐写术工具分析图片的不同通道"
      ],
      status: ChallengeStatus.AVAILABLE,
      solution: "秘密会议将在明天举行",
      tools: ["隐写术分析器", "图像位平面查看器"],
      points: 100
    },
    {
      id: 4,
      title: "恢复加密的磁盘分区",
      type: ChallengeType.FILE_RECOVERY,
      difficulty: DifficultyLevel.MEDIUM,
      description: "一个重要的磁盘分区被加密并部分删除。通过分析剩余的文件系统结构和加密线索，恢复分区并提取关键文件的名称。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "寻找加密头部标识符",
        "分析文件系统的超级块信息",
        "密码可能隐藏在磁盘的其他部分"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "project_blueprint.pdf",
      tools: ["磁盘分析器", "加密分区恢复工具"],
      points: 200
    },
    {
      id: 5,
      title: "追踪被篡改的照片",
      type: ChallengeType.METADATA_ANALYSIS,
      difficulty: DifficultyLevel.MEDIUM,
      description: "一张关键证据照片被怀疑经过篡改。通过分析其元数据和像素特征，确定照片是否被修改以及使用了什么软件。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "检查图像的编辑历史记录",
        "分析元数据中的软件信息",
        "查找像素异常和不连续点"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "Adobe Photoshop CC 2023",
      tools: ["图像取证工具", "元数据深度分析器"],
      points: 200
    },
    {
      id: 6,
      title: "提取音频文件中的隐藏数据",
      type: ChallengeType.STEGANOGRAPHY,
      difficulty: DifficultyLevel.MEDIUM,
      description: "一个音频文件据信包含隐藏的数据。使用频谱分析和音频隐写术技术找出隐藏的信息。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "分析音频的频谱图",
        "检查音频的静音部分",
        "尝试提取音频文件的非音频数据部分"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "3qrt7zp",
      tools: ["音频分析器", "频谱可视化工具"],
      points: 200
    },
    {
      id: 7,
      title: "重建碎片化的数据库文件",
      type: ChallengeType.FILE_RECOVERY,
      difficulty: DifficultyLevel.HARD,
      description: "一个关键的数据库文件被碎片化并散布在磁盘的不同位置。重建文件并提取其中包含的管理员密码哈希值。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "识别数据库文件的特征签名",
        "分析文件碎片的正确顺序",
        "使用数据库恢复工具重建结构"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "5a81d8d79baef9c51f5b63ea0b29768fcca3c69f",
      tools: ["碎片分析器", "数据库结构重建工具"],
      points: 300
    },
    {
      id: 8,
      title: "分析内存转储中的攻击痕迹",
      type: ChallengeType.METADATA_ANALYSIS,
      difficulty: DifficultyLevel.HARD,
      description: "从受感染系统的内存转储中提取恶意进程的信息和行为。找出攻击者使用的命令与控制服务器域名。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "分析进程列表和网络连接",
        "检查可疑的字符串和命令",
        "寻找隐藏的网络通信"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "evil-control.malicious-domain.com",
      tools: ["内存分析工具", "进程检查器"],
      points: 300
    },
    {
      id: 9,
      title: "破解多层隐写术保护的秘密",
      type: ChallengeType.STEGANOGRAPHY,
      difficulty: DifficultyLevel.HARD,
      description: "一个文件使用了多层隐写术技术隐藏关键信息。解开每一层加密和隐藏来获取最终的秘密信息。",
      imageUrl: "/images/forensics/deleted_logs.jpg",
      hints: [
        "第一层使用了图像隐写",
        "第二层是加密的压缩文件",
        "最后一层涉及二进制转换"
      ],
      status: ChallengeStatus.LOCKED,
      solution: "金库密码：72A5BD91EC",
      tools: ["综合隐写分析套件", "加密破解工具"],
      points: 300
    }
  ];
  
  // 过滤出当前类型的挑战
  const filteredChallenges = forensicChallenges.filter(
    challenge => challenge.type === activeTab
  );
  
  // 更新挑战状态
  useEffect(() => {
    // 如果没有已完成的挑战，则初始难度的挑战都可用
    if (completedChallenges.length === 0) {
      return;
    }
    
    // 更新挑战状态基于用户完成的挑战
    const updatedChallenges = [...forensicChallenges];
    
    // 对于每个挑战，如果相同类型的初级挑战已完成，则中级挑战变为可用
    updatedChallenges.forEach(challenge => {
      if (challenge.difficulty === DifficultyLevel.MEDIUM) {
        const easyChallenge = forensicChallenges.find(
          c => c.type === challenge.type && c.difficulty === DifficultyLevel.EASY
        );
        
        if (easyChallenge && completedChallenges.includes(easyChallenge.id)) {
          challenge.status = ChallengeStatus.AVAILABLE;
        }
      }
      
      // 如果相同类型的中级挑战已完成，则高级挑战变为可用
      if (challenge.difficulty === DifficultyLevel.HARD) {
        const mediumChallenge = forensicChallenges.find(
          c => c.type === challenge.type && c.difficulty === DifficultyLevel.MEDIUM
        );
        
        if (mediumChallenge && completedChallenges.includes(mediumChallenge.id)) {
          challenge.status = ChallengeStatus.AVAILABLE;
        }
      }
    });
  }, [completedChallenges]);
  
  // 处理挑战选择
  const handleChallengeSelect = (challenge: ForensicChallenge) => {
    if (challenge.status === ChallengeStatus.LOCKED) {
      setResultMessage('请先完成前一级挑战以解锁此挑战');
      setShowResult(true);
      setTimeout(() => setShowResult(false), 3000);
      return;
    }
    
    setActiveChallenge(challenge);
    setUserAnswer('');
    setShowHint(false);
    setCurrentHintIndex(0);
    setResultMessage('');
    setShowResult(false);
  };
  
  // 处理提示显示
  const handleShowHint = () => {
    if (!activeChallenge) return;
    
    setShowHint(true);
    
    // 如果已经显示了所有提示，则循环回第一个
    if (currentHintIndex >= activeChallenge.hints.length - 1) {
      setCurrentHintIndex(0);
    } else {
      setCurrentHintIndex(prevIndex => prevIndex + 1);
    }
  };
  
  // 处理答案提交
  const handleSubmitAnswer = () => {
    if (!activeChallenge || !userAnswer.trim()) return;
    
    // 将用户答案和正确答案都转为小写进行比较
    const isCorrect = userAnswer.trim().toLowerCase() === activeChallenge.solution.toLowerCase();
    
    if (isCorrect) {
      setResultMessage(`正确！获得 ${activeChallenge.points} 点积分`);
      
      // 更新用户积分
      setUserPoints(prev => prev + activeChallenge.points);
      
      // 更新已完成的挑战列表
      if (!completedChallenges.includes(activeChallenge.id)) {
        setCompletedChallenges(prev => [...prev, activeChallenge.id]);
      }
      
      // 更新挑战状态
      const updatedChallenge = {...activeChallenge, status: ChallengeStatus.COMPLETED};
      setActiveChallenge(updatedChallenge);
    } else {
      setResultMessage('答案不正确，请再试一次');
    }
    
    setShowResult(true);
    setTimeout(() => setShowResult(false), 3000);
  };
  
  // 处理返回到挑战列表
  const handleBackToList = () => {
    setActiveChallenge(null);
  };
  
  // 获取图标
  const getChallengeIcon = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.FILE_RECOVERY:
        return <FileDigit className="w-6 h-6 text-blue-400" />;
      case ChallengeType.METADATA_ANALYSIS:
        return <Search className="w-6 h-6 text-green-400" />;
      case ChallengeType.STEGANOGRAPHY:
        return <ImageIcon className="w-6 h-6 text-purple-400" />;
      default:
        return <FileText className="w-6 h-6 text-gray-400" />;
    }
  };
  
  // 获取难度星级显示
  const getDifficultyStars = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return (
          <div className="flex">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-gray-600" />
            <Star className="w-4 h-4 text-gray-600" />
          </div>
        );
      case DifficultyLevel.MEDIUM:
        return (
          <div className="flex">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-gray-600" />
          </div>
        );
      case DifficultyLevel.HARD:
        return (
          <div className="flex">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          </div>
        );
      default:
        return null;
    }
  };
  
  // 获取挑战卡片的样式
  const getChallengeCardClasses = (challenge: ForensicChallenge) => {
    let baseClasses = "p-4 rounded-lg transition-all duration-300 h-full flex flex-col ";
    
    switch (challenge.status) {
      case ChallengeStatus.LOCKED:
        return baseClasses + "bg-gray-800/60 cursor-not-allowed border border-gray-700/50";
      case ChallengeStatus.COMPLETED:
        return baseClasses + "bg-green-900/20 border border-green-700/50 hover:bg-green-900/30 cursor-pointer";
      default:
        return baseClasses + "bg-gray-800/80 border border-gray-700 hover:bg-gray-700/80 cursor-pointer";
    }
  };

  // 工具图标映射
  const toolIcons: Record<string, JSX.Element> = {
    "文件恢复器": <DownloadCloud className="w-4 h-4 text-blue-400" />,
    "日志分析器": <FileText className="w-4 h-4 text-green-400" />,
    "EXIF查看器": <Eye className="w-4 h-4 text-purple-400" />,
    "GPS坐标转换器": <Laptop className="w-4 h-4 text-yellow-400" />,
    "隐写术分析器": <Fingerprint className="w-4 h-4 text-red-400" />,
    "图像位平面查看器": <ImageIcon className="w-4 h-4 text-cyan-400" />,
    "磁盘分析器": <Shield className="w-4 h-4 text-orange-400" />,
    "加密分区恢复工具": <Lock className="w-4 h-4 text-indigo-400" />,
    "图像取证工具": <Search className="w-4 h-4 text-teal-400" />,
    "元数据深度分析器": <CloudCog className="w-4 h-4 text-amber-400" />,
    "音频分析器": <File className="w-4 h-4 text-pink-400" />,
    "频谱可视化工具": <RefreshCw className="w-4 h-4 text-lime-400" />,
    "碎片分析器": <File className="w-4 h-4 text-fuchsia-400" />,
    "数据库结构重建工具": <ChevronRight className="w-4 h-4 text-emerald-400" />,
    "内存分析工具": <Laptop className="w-4 h-4 text-sky-400" />,
    "进程检查器": <RefreshCw className="w-4 h-4 text-rose-400" />,
    "综合隐写分析套件": <Fingerprint className="w-4 h-4 text-violet-400" />,
    "加密破解工具": <Lock className="w-4 h-4 text-amber-400" />
  };
  
  return (
    <div className="min-h-[600px] bg-gray-900/70 rounded-lg p-6 text-white overflow-hidden flex flex-col">
      {/* 头部信息 */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h3 className="text-xl font-semibold flex items-center">
            <Search className="text-blue-400 mr-2" />
            数字取证实验室
          </h3>
          <p className="text-gray-400 text-sm mt-1">分析数字证据，揭示隐藏的真相</p>
        </div>
        <div className="bg-blue-900/30 px-4 py-2 rounded-lg border border-blue-800/50">
          <div className="text-sm text-gray-300">总积分</div>
          <div className="text-2xl font-bold text-blue-300">{userPoints}</div>
        </div>
      </div>
      
      {activeChallenge ? (
        // 挑战详情视图
        <div className="flex-1 flex flex-col">
          {/* 返回按钮 */}
          <button 
            onClick={handleBackToList}
            className="mb-4 text-sm text-blue-400 hover:text-blue-300 flex items-center"
          >
            <ChevronRight className="w-4 h-4 transform rotate-180 mr-1" />
            返回挑战列表
          </button>
          
          <div className="flex flex-col md:flex-row gap-6 flex-1">
            {/* 左侧挑战说明 */}
            <div className="flex-1">
              <div className="bg-gray-800/70 rounded-lg p-4 mb-4 border border-gray-700">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    {getChallengeIcon(activeChallenge.type)}
                    <span className="ml-2 font-semibold">{activeChallenge.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      activeChallenge.difficulty === DifficultyLevel.EASY ? 'bg-green-900/50 text-green-400' :
                      activeChallenge.difficulty === DifficultyLevel.MEDIUM ? 'bg-yellow-900/50 text-yellow-400' :
                      'bg-red-900/50 text-red-400'
                    }`}>
                      {activeChallenge.difficulty}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded bg-purple-900/50 text-purple-400">
                      {activeChallenge.type}
                    </span>
                  </div>
                </div>
                
                <p className="text-gray-300 text-sm mb-4">
                  {activeChallenge.description}
                </p>
                
                <div className="mb-4 relative h-48 sm:h-56 md:h-64 overflow-hidden rounded-md border border-gray-700">
                  <Image
                    src={activeChallenge.imageUrl}
                    alt={activeChallenge.title}
                    fill
                    className="object-cover"
                  />
                </div>
                
                {/* 工具区域 */}
                <div className="mt-4">
                  <div className="text-sm text-gray-400 mb-2">可用工具:</div>
                  <div className="flex flex-wrap gap-2">
                    {activeChallenge.tools.map((tool, index) => (
                      <div 
                        key={index}
                        className="bg-gray-700/60 px-3 py-1.5 rounded-md text-xs flex items-center border border-gray-600"
                      >
                        {toolIcons[tool] || <FileText className="w-4 h-4 text-gray-400" />}
                        <span className="ml-1.5">{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* 提示区域 */}
              <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-300">需要帮助？</span>
                  <button
                    onClick={handleShowHint}
                    className="bg-blue-900/50 hover:bg-blue-800/60 text-blue-300 text-xs px-3 py-1.5 rounded-md flex items-center transition-colors"
                  >
                    <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
                    获取提示
                  </button>
                </div>
                
                {showHint && (
                  <div className="mt-3 bg-blue-900/20 border border-blue-800/40 rounded-md p-3 text-sm text-gray-200">
                    <div className="text-xs text-blue-400 mb-1">提示 {currentHintIndex + 1}/{activeChallenge.hints.length}:</div>
                    {activeChallenge.hints[currentHintIndex]}
                  </div>
                )}
              </div>
            </div>
            
            {/* 右侧交互区域 */}
            <div className="w-full md:w-2/5 lg:w-1/3">
              <div className="bg-gray-800/70 rounded-lg p-4 border border-gray-700 h-full flex flex-col">
                <div className="text-sm text-gray-300 mb-3">提交你的答案</div>
                
                <textarea
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  placeholder="输入你找到的答案..."
                  className="flex-1 bg-gray-900/70 border border-gray-700 focus:border-blue-700/70 rounded-md px-3 py-2 text-white placeholder-gray-500 text-sm mb-3 min-h-[120px] resize-none outline-none"
                />
                
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim()}
                  className={`w-full py-2 rounded-md flex items-center justify-center ${
                    userAnswer.trim() 
                      ? 'bg-green-700 hover:bg-green-600 text-white' 
                      : 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  提交答案
                </button>
                
                {showResult && (
                  <div className={`mt-3 p-3 rounded-md text-sm flex items-center ${
                    resultMessage.includes('正确') 
                      ? 'bg-green-900/30 border border-green-800/50 text-green-300' 
                      : 'bg-red-900/30 border border-red-800/50 text-red-300'
                  }`}>
                    {resultMessage.includes('正确') 
                      ? <Check className="w-4 h-4 mr-2" /> 
                      : <AlertTriangle className="w-4 h-4 mr-2" />
                    }
                    {resultMessage}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // 挑战列表视图
        <div className="flex-1 flex flex-col">
          {/* 挑战类型选择 */}
          <div className="flex mb-6 border-b border-gray-700">
            {Object.values(ChallengeType).map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type)}
                className={`px-4 py-2 flex items-center relative ${
                  activeTab === type 
                    ? 'text-blue-400 border-b-2 border-blue-400' 
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {type === ChallengeType.FILE_RECOVERY && <FileDigit className="w-4 h-4 mr-2" />}
                {type === ChallengeType.METADATA_ANALYSIS && <Search className="w-4 h-4 mr-2" />}
                {type === ChallengeType.STEGANOGRAPHY && <ImageIcon className="w-4 h-4 mr-2" />}
                {type}
              </button>
            ))}
          </div>
          
          {/* 挑战卡片列表 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {filteredChallenges.map((challenge) => (
              <div
                key={challenge.id}
                onClick={() => handleChallengeSelect(challenge)}
                className={getChallengeCardClasses(challenge)}
              >
                {/* 状态指示器 */}
                {challenge.status === ChallengeStatus.LOCKED && (
                  <div className="absolute top-2 right-2">
                    <Lock className="w-4 h-4 text-gray-500" />
                  </div>
                )}
                {challenge.status === ChallengeStatus.COMPLETED && (
                  <div className="absolute top-2 right-2">
                    <Check className="w-4 h-4 text-green-400" />
                  </div>
                )}
                
                <div className="flex items-center mb-3">
                  {getChallengeIcon(challenge.type)}
                  <span className={`ml-2 font-medium ${
                    challenge.status === ChallengeStatus.LOCKED 
                      ? 'text-gray-500' 
                      : challenge.status === ChallengeStatus.COMPLETED 
                      ? 'text-green-300' 
                      : 'text-white'
                  }`}>
                    {challenge.title}
                  </span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${
                    challenge.difficulty === DifficultyLevel.EASY 
                      ? 'bg-green-900/50 text-green-400' 
                      : challenge.difficulty === DifficultyLevel.MEDIUM 
                      ? 'bg-yellow-900/50 text-yellow-400' 
                      : 'bg-red-900/50 text-red-400'
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <div className="flex-1"></div>
                  {getDifficultyStars(challenge.difficulty)}
                </div>
                
                <p className={`text-xs mb-4 flex-1 ${
                  challenge.status === ChallengeStatus.LOCKED 
                    ? 'text-gray-500' 
                    : 'text-gray-300'
                }`}>
                  {challenge.description.length > 120 
                    ? challenge.description.substring(0, 120) + '...' 
                    : challenge.description
                  }
                </p>
                
                <div className="flex items-center justify-between mt-auto">
                  <div className="bg-blue-900/30 px-2 py-1 rounded text-xs text-blue-300">
                    {challenge.points} 积分
                  </div>
                  
                  {challenge.status === ChallengeStatus.LOCKED ? (
                    <div className="text-xs text-gray-500 flex items-center">
                      <Lock className="w-3 h-3 mr-1" />
                      完成前一级解锁
                    </div>
                  ) : challenge.status === ChallengeStatus.COMPLETED ? (
                    <div className="text-xs text-green-400 flex items-center">
                      <Check className="w-3 h-3 mr-1" />
                      已完成
                    </div>
                  ) : (
                    <div className="text-xs text-blue-400 flex items-center">
                      开始挑战
                      <ChevronRight className="w-3 h-3 ml-1" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          {/* 说明信息 */}
          <div className="mt-auto bg-gray-800/50 rounded-lg p-4 text-sm text-gray-300 border border-gray-700/50">
            <div className="font-medium mb-2 text-blue-300">挑战说明:</div>
            <ul className="list-disc list-inside space-y-1 text-xs">
              <li>每个挑战分为不同难度，完成简单挑战后解锁更高难度</li>
              <li>使用提供的工具分析证据并找出答案</li>
              <li>获得积分来追踪你的进度</li>
              <li>如果遇到困难，可以使用"获取提示"功能</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
} 