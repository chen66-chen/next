'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { sha256 } from 'js-sha256';

/**
 * CTF挑战类型枚举
 */
enum ChallengeType {
  CRYPTO = 'crypto',
  STEGO = 'stego',
  WEB = 'web',
  MISC = 'misc',
  FORENSICS = 'forensics'
}

/**
 * 挑战难度等级枚举
 */
enum DifficultyLevel {
  EASY = 'easy',
  MEDIUM = 'medium',
  HARD = 'hard'
}

/**
 * 挑战状态
 */
enum ChallengeStatus {
  NOT_STARTED = 'not_started',
  IN_PROGRESS = 'in_progress',
  SOLVED = 'solved'
}

/**
 * CTF挑战接口定义
 */
interface Challenge {
  id: string;
  title: string;
  type: ChallengeType;
  difficulty: DifficultyLevel;
  description: string;
  hints: string[];
  answerHash: string; // SHA-256 哈希值用于答案验证
  points: number;
  imageUrl?: string;
  downloadUrl?: string;
}

/**
 * 预定义的CTF挑战
 */
const ctfChallenges: Challenge[] = [
  {
    id: 'crypto1',
    title: '古典密码学',
    type: ChallengeType.CRYPTO,
    difficulty: DifficultyLevel.EASY,
    description: '下面这段文字是使用凯撒密码加密的，请解密并提交明文内容：\n\nXyzjwdqd Hmjs nx f ujwkjhy ufxxbtwi!',
    hints: [
      '凯撒密码是一种简单的替换密码，每个字母被固定偏移量的字母替代',
      '你需要尝试不同的位移量 (0-25)',
      '提示：偏移量是5的倍数'
    ],
    answerHash: '86be9a55762d316a3026c2836d044f5a75b7336e71f9b6d4708e0376d40dd3b8', // Chryssolion Chen is a perfect password!
    points: 100
  },
  {
    id: 'stego1',
    title: '图片中的秘密',
    type: ChallengeType.STEGO,
    difficulty: DifficultyLevel.MEDIUM,
    description: '这张图片中隐藏了一个秘密消息。找出隐藏的标志！',
    hints: [
      '查看图片的元数据信息可能会有帮助',
      '有时候，信息就在你眼前，只是你没注意到',
      '尝试调整图片的亮度和对比度'
    ],
    imageUrl: '/images/1.jpg',
    answerHash: '7fbd7bbe861d9e74cf626ae8e22d528eb44f6e3ab0ea63099f5aff2453bb2df7', // FLAG{h1dd3n_1n_pl41n_s1ght}
    points: 200
  },
  {
    id: 'web1',
    title: '简单的身份验证绕过',
    type: ChallengeType.WEB,
    difficulty: DifficultyLevel.EASY,
    description: '下面是一个简单的登录验证函数。找出如何在不知道正确密码的情况下通过验证：\n\n```javascript\nfunction checkPassword(password) {\n  if(password == "secret123") {\n    return true;\n  }\n  return password === "admin" + "123456";\n}\n```\n输入能通过验证的密码：',
    hints: [
      '关注 JavaScript 中 == 和 === 运算符的区别',
      '考虑类型转换可能带来的影响',
      '某些特殊值在进行相等比较时会有特殊行为'
    ],
    answerHash: '4d06ddb32a5b889269e584c7e6c4cd7e983bf6ef2b5b40711aee770b795fda16', // true
    points: 150
  },
  {
    id: 'forensics1',
    title: '日志分析',
    type: ChallengeType.FORENSICS,
    difficulty: DifficultyLevel.MEDIUM,
    description: '以下是一段服务器访问日志，找出攻击者的IP地址：\n\n```\n192.168.1.105 - - [10/Oct/2023:13:55:36 +0800] "GET /login.php HTTP/1.1" 200 2571\n192.168.1.111 - - [10/Oct/2023:13:57:28 +0800] "GET /admin.php HTTP/1.1" 403 1998\n10.10.14.5 - - [10/Oct/2023:14:03:15 +0800] "GET /login.php?username=admin%27%20OR%20%271%27=%271%27&password=anything HTTP/1.1" 200 4371\n192.168.1.105 - - [10/Oct/2023:14:10:22 +0800] "GET /contact.php HTTP/1.1" 200 3428\n10.10.14.5 - - [10/Oct/2023:14:12:43 +0800] "GET /admin.php HTTP/1.1" 200 6729\n```',
    hints: [
      '注意观察异常的请求模式',
      '查找可能包含SQL注入攻击的请求',
      '成功访问需要权限的页面可能表明攻击成功'
    ],
    answerHash: 'f50a6128daf9cde4d638affc9c466e9471027bf9a62e8af9679dec46e5b7a73f', // 10.10.14.5
    points: 200
  },
  {
    id: 'misc1',
    title: '二进制挑战',
    type: ChallengeType.MISC,
    difficulty: DifficultyLevel.EASY,
    description: '将以下二进制数据转换为ASCII文本查看隐藏消息：\n\n01000011 01010100 01000110 01111011 01100010 00110001 01101110 01100001 01110010 01111001 01011111 01100110 01110101 01101110 01111101',
    hints: [
      '每8位二进制数字对应一个ASCII字符',
      '可以使用在线工具进行转换',
      '转换后的文本遵循标准CTF标志格式'
    ],
    answerHash: '8b58a319ef87743be1d03c8217b00452e90268a33bc9b045a116d7c2c33565ad', // CTF{b1nary_fun}
    points: 100
  }
];

/**
 * CTF挑战区组件
 * 提供多种安全挑战供用户解决
 */
const CTFChallenge: React.FC = () => {
  // 状态管理
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [userAnswer, setUserAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [revealedHints, setRevealedHints] = useState<number[]>([]);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [userScore, setUserScore] = useState(0);
  const [showHints, setShowHints] = useState(false);

  // 在组件挂载时从本地存储加载已解决的挑战
  useEffect(() => {
    const savedSolved = localStorage.getItem('ctf_solved_challenges');
    const savedScore = localStorage.getItem('ctf_user_score');
    
    if (savedSolved) {
      setSolvedChallenges(JSON.parse(savedSolved));
    }
    
    if (savedScore) {
      setUserScore(parseInt(savedScore, 10));
    }
  }, []);

  // 保存解决的挑战和分数到本地存储
  useEffect(() => {
    if (solvedChallenges.length > 0) {
      localStorage.setItem('ctf_solved_challenges', JSON.stringify(solvedChallenges));
      localStorage.setItem('ctf_user_score', userScore.toString());
    }
  }, [solvedChallenges, userScore]);

  /**
   * 获取按类型过滤的挑战列表
   */
  const filteredChallenges = React.useMemo(() => {
    if (selectedType === 'all') return ctfChallenges;
    return ctfChallenges.filter(challenge => challenge.type === selectedType);
  }, [selectedType]);

  /**
   * 处理挑战选择
   */
  const handleSelectChallenge = (challenge: Challenge) => {
    setCurrentChallenge(challenge);
    setUserAnswer('');
    setErrorMessage('');
    setSuccessMessage('');
    setRevealedHints([]);
    setShowHints(false);
  };

  /**
   * 处理提交答案
   */
  const handleSubmitAnswer = () => {
    if (!currentChallenge || !userAnswer.trim()) {
      setErrorMessage('请输入答案');
      return;
    }

    // 计算用户答案的哈希值并与正确答案比较
    const answerHash = sha256(userAnswer.trim());
    
    if (answerHash === currentChallenge.answerHash) {
      // 检查是否已经解决过这个挑战
      if (!solvedChallenges.includes(currentChallenge.id)) {
        // 添加到已解决列表并增加分数
        setSolvedChallenges(prev => [...prev, currentChallenge.id]);
        setUserScore(prev => prev + currentChallenge.points);
        setSuccessMessage(`恭喜！你成功解决了挑战，获得 ${currentChallenge.points} 分！`);
      } else {
        setSuccessMessage('恭喜！答案正确！（你已经解决过这个挑战）');
      }
      setErrorMessage('');
    } else {
      setErrorMessage('答案错误，请再试一次');
      setSuccessMessage('');
    }
  };

  /**
   * 处理揭示提示
   */
  const handleRevealHint = (index: number) => {
    if (!revealedHints.includes(index)) {
      setRevealedHints(prev => [...prev, index]);
    }
  };

  /**
   * 处理返回挑战列表
   */
  const handleBackToList = () => {
    setCurrentChallenge(null);
    setUserAnswer('');
    setErrorMessage('');
    setSuccessMessage('');
  };

  /**
   * 获取挑战类型名称
   */
  const getChallengeTypeName = (type: ChallengeType) => {
    switch (type) {
      case ChallengeType.CRYPTO: return '密码学';
      case ChallengeType.STEGO: return '隐写术';
      case ChallengeType.WEB: return 'Web安全';
      case ChallengeType.MISC: return '杂项';
      case ChallengeType.FORENSICS: return '取证分析';
      default: return '未知';
    }
  };

  /**
   * 获取挑战难度标签
   */
  const getDifficultyLabel = (difficulty: DifficultyLevel) => {
    switch (difficulty) {
      case DifficultyLevel.EASY:
        return <span className="bg-green-500/70 text-white text-xs px-2 py-0.5 rounded">简单</span>;
      case DifficultyLevel.MEDIUM:
        return <span className="bg-yellow-500/70 text-white text-xs px-2 py-0.5 rounded">中等</span>;
      case DifficultyLevel.HARD:
        return <span className="bg-red-500/70 text-white text-xs px-2 py-0.5 rounded">困难</span>;
      default:
        return null;
    }
  };

  /**
   * 获取挑战状态
   */
  const getChallengeStatus = (challengeId: string) => {
    if (solvedChallenges.includes(challengeId)) {
      return ChallengeStatus.SOLVED;
    }
    return ChallengeStatus.NOT_STARTED;
  };

  /**
   * 渲染挑战类型过滤器
   */
  const renderTypeFilters = () => {
    const types = [
      { id: 'all', name: '全部' },
      { id: ChallengeType.CRYPTO, name: '密码学' },
      { id: ChallengeType.STEGO, name: '隐写术' },
      { id: ChallengeType.WEB, name: 'Web安全' },
      { id: ChallengeType.FORENSICS, name: '取证分析' },
      { id: ChallengeType.MISC, name: '杂项' }
    ];

    return (
      <div className="flex flex-wrap gap-2 mb-4">
        {types.map(type => (
          <Button
            key={type.id}
            variant={selectedType === type.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedType(type.id)}
            className="text-xs"
          >
            {type.name}
          </Button>
        ))}
      </div>
    );
  };

  /**
   * 渲染挑战列表
   */
  const renderChallengesList = () => (
    <>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold text-cyan-300">选择挑战</h3>
        <div className="text-sm bg-blue-900/50 px-3 py-1 rounded-full">
          总分: <span className="font-bold text-yellow-300">{userScore}</span>
        </div>
      </div>
      
      {renderTypeFilters()}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        {filteredChallenges.map(challenge => {
          const status = getChallengeStatus(challenge.id);
          
          return (
            <div 
              key={challenge.id}
              className={`bg-gray-900/60 border ${status === ChallengeStatus.SOLVED ? 'border-green-500/50' : 'border-gray-700'} rounded-lg p-4 hover:bg-gray-800/80 transition-colors cursor-pointer`}
              onClick={() => handleSelectChallenge(challenge)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-white">{challenge.title}</h3>
                <div className="flex items-center space-x-2">
                  <span className="bg-blue-600/70 text-white text-xs px-2 py-0.5 rounded">
                    {challenge.points}分
                  </span>
                  {getDifficultyLabel(challenge.difficulty)}
                </div>
              </div>
              
              <div className="text-xs text-cyan-300 mb-2">
                {getChallengeTypeName(challenge.type)}
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs text-gray-400">
                  提示: {challenge.hints.length}
                </div>
                
                {status === ChallengeStatus.SOLVED && (
                  <span className="text-xs flex items-center text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    已解决
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );

  /**
   * 渲染当前挑战详情
   */
  const renderCurrentChallenge = () => {
    if (!currentChallenge) return null;
    
    const isChallengeSolved = solvedChallenges.includes(currentChallenge.id);
    
    return (
      <div className="bg-gray-900/60 border border-gray-700 rounded-lg p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <button
              onClick={handleBackToList}
              className="text-blue-400 flex items-center mb-3 text-sm hover:underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              返回挑战列表
            </button>
            <h3 className="text-xl font-bold text-white">{currentChallenge.title}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-cyan-300">{getChallengeTypeName(currentChallenge.type)}</span>
              <span className="text-xs bg-blue-600/70 px-2 py-0.5 rounded text-white">{currentChallenge.points}分</span>
              {getDifficultyLabel(currentChallenge.difficulty)}
            </div>
          </div>
          
          {isChallengeSolved && (
            <div className="bg-green-900/50 text-green-300 text-xs px-3 py-1 rounded-full flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              已解决
            </div>
          )}
        </div>
        
        {/* 挑战描述 */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">挑战描述:</h4>
          <div className="bg-gray-950/50 rounded-md p-3 text-gray-300 whitespace-pre-wrap text-sm font-mono">
            {currentChallenge.description}
          </div>
        </div>
        
        {/* 挑战图片 (如果有) */}
        {currentChallenge.imageUrl && (
          <div className="mb-4">
            <div className="relative w-full h-64 bg-gray-900 rounded-md overflow-hidden">
              <Image
                src={currentChallenge.imageUrl}
                alt={currentChallenge.title}
                fill
                className="object-contain"
              />
            </div>
          </div>
        )}
        
        {/* 提示部分 */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-sm font-semibold text-gray-300">提示:</h4>
            <button
              onClick={() => setShowHints(!showHints)}
              className="text-xs text-blue-400 hover:underline"
            >
              {showHints ? '隐藏提示' : '显示提示'}
            </button>
          </div>
          
          {showHints && (
            <div className="space-y-2">
              {currentChallenge.hints.map((hint, index) => (
                <div key={index}>
                  {revealedHints.includes(index) ? (
                    <div className="bg-gray-800/50 rounded p-2 text-sm text-gray-300">{hint}</div>
                  ) : (
                    <button
                      onClick={() => handleRevealHint(index)}
                      className="w-full bg-gray-800/30 hover:bg-gray-800/50 rounded p-2 text-sm text-gray-400 text-left"
                    >
                      点击查看提示 #{index + 1}
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* 答案提交区域 */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">提交答案:</h4>
          <div className="flex space-x-2">
            <input
              type="text"
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder="输入你的答案..."
              className="flex-1 bg-gray-900 border border-gray-700 rounded-md px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <Button onClick={handleSubmitAnswer}>提交</Button>
          </div>
          
          {errorMessage && (
            <div className="mt-2 text-red-400 text-sm">{errorMessage}</div>
          )}
          
          {successMessage && (
            <div className="mt-2 text-green-400 text-sm">{successMessage}</div>
          )}
        </div>
      </div>
    );
  };

  // 渲染组件主体
  return (
    <div className="ctf-challenge-container">
      {!currentChallenge ? renderChallengesList() : renderCurrentChallenge()}
    </div>
  );
};

export default CTFChallenge; 