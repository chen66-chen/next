"use client";

import React, { useState, useEffect, useRef } from 'react';

type SnakeCell = {
  x: number;
  y: number;
};

type Direction = 'UP' | 'RIGHT' | 'DOWN' | 'LEFT';

export function SnakeGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [snake, setSnake] = useState<SnakeCell[]>([
    { x: 8, y: 8 },
    { x: 8, y: 7 },
    { x: 8, y: 6 },
  ]);
  const [food, setFood] = useState<SnakeCell>({ x: 5, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [gameOver, setGameOver] = useState(false);
  const [gameActive, setGameActive] = useState(true);
  const [score, setScore] = useState(0);
  const [speed, setSpeed] = useState(200);
  const [isPaused, setIsPaused] = useState(false);
  const [autoMode, setAutoMode] = useState(true);

  const cellSize = 15;
  const gridSize = 15;
  const canvasSize = cellSize * gridSize;

  // 随机生成食物位置
  const generateFood = (): SnakeCell => {
    let newFood: SnakeCell;
    do {
      newFood = {
        x: Math.floor(Math.random() * gridSize),
        y: Math.floor(Math.random() * gridSize),
      };
    } while (
      snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)
    );
    return newFood;
  };

  // 游戏初始化
  const initGame = () => {
    setSnake([
      { x: 8, y: 8 },
      { x: 8, y: 7 },
      { x: 8, y: 6 },
    ]);
    setFood(generateFood());
    setDirection('RIGHT');
    setGameOver(false);
    setScore(0);
    setSpeed(200);
    setGameActive(true);
    setIsPaused(false);
  };

  // 暂停/继续游戏
  const togglePause = () => {
    if (gameActive && !gameOver) {
      setIsPaused(!isPaused);
    }
  };

  // 切换自动/手动模式
  const toggleAutoMode = () => {
    setAutoMode(!autoMode);
  };

  // 自动寻路算法
  const getAutoDirection = (head: SnakeCell, foodPos: SnakeCell, currentDirection: Direction, snakeBody: SnakeCell[]): Direction => {
    // 创建一个二维数组表示网格，标记蛇身所在位置
    const grid = Array(gridSize).fill(0).map(() => Array(gridSize).fill(0));
    snakeBody.forEach(segment => {
      grid[segment.y][segment.x] = 1; // 1 表示蛇身
    });

    // 获取可能的方向及其优先级（距离食物更近的方向优先）
    const possibleDirections: Direction[] = [];
    
    // 检查四个方向是否可行（不会撞墙或咬到自己）
    // 上
    if (head.y > 0 && grid[head.y - 1][head.x] === 0 && currentDirection !== 'DOWN') {
      possibleDirections.push('UP');
    }
    // 右
    if (head.x < gridSize - 1 && grid[head.y][head.x + 1] === 0 && currentDirection !== 'LEFT') {
      possibleDirections.push('RIGHT');
    }
    // 下
    if (head.y < gridSize - 1 && grid[head.y + 1][head.x] === 0 && currentDirection !== 'UP') {
      possibleDirections.push('DOWN');
    }
    // 左
    if (head.x > 0 && grid[head.y][head.x - 1] === 0 && currentDirection !== 'RIGHT') {
      possibleDirections.push('LEFT');
    }

    // 如果没有可行的方向，保持当前方向
    if (possibleDirections.length === 0) {
      return currentDirection;
    }

    // 计算每个方向移动后与食物的曼哈顿距离
    const distances = possibleDirections.map(dir => {
      let newX = head.x;
      let newY = head.y;
      
      switch (dir) {
        case 'UP': newY -= 1; break;
        case 'RIGHT': newX += 1; break;
        case 'DOWN': newY += 1; break;
        case 'LEFT': newX -= 1; break;
      }
      
      // 曼哈顿距离 = |x1 - x2| + |y1 - y2|
      return Math.abs(newX - foodPos.x) + Math.abs(newY - foodPos.y);
    });

    // 加入一些随机性，避免机械化的移动
    const randomFactor = Math.random() < 0.2;
    
    if (randomFactor && possibleDirections.length > 1) {
      // 20%概率随机选择方向
      return possibleDirections[Math.floor(Math.random() * possibleDirections.length)];
    } else {
      // 80%概率选择距离食物最近的方向
      const minDistance = Math.min(...distances);
      const bestDirections = possibleDirections.filter((_, index) => distances[index] === minDistance);
      return bestDirections[Math.floor(Math.random() * bestDirections.length)];
    }
  };

  // 键盘控制
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!gameActive || gameOver) return;
      
      // 空格键暂停/继续游戏
      if (e.key === ' ') {
        togglePause();
        return;
      }
      
      // 如果在自动模式下，按任意方向键切换到手动模式
      if (autoMode && ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'].includes(e.key)) {
        setAutoMode(false);
      }
      
      if (!autoMode) {
        switch (e.key) {
          case 'ArrowUp':
            if (direction !== 'DOWN') setDirection('UP');
            break;
          case 'ArrowRight':
            if (direction !== 'LEFT') setDirection('RIGHT');
            break;
          case 'ArrowDown':
            if (direction !== 'UP') setDirection('DOWN');
            break;
          case 'ArrowLeft':
            if (direction !== 'RIGHT') setDirection('LEFT');
            break;
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [direction, gameActive, gameOver, isPaused, autoMode]);

  // 游戏主循环
  useEffect(() => {
    if (!gameActive || gameOver || isPaused) return;

    const gameLoop = setInterval(() => {
      setSnake(prevSnake => {
        // 创建蛇头位置
        const head = { ...prevSnake[0] };
        
        // 在自动模式下计算下一个方向
        let nextDirection = direction;
        if (autoMode) {
          nextDirection = getAutoDirection(head, food, direction, prevSnake);
          setDirection(nextDirection);
        }
        
        // 根据方向移动蛇头
        switch (nextDirection) {
          case 'UP':
            head.y -= 1;
            break;
          case 'RIGHT':
            head.x += 1;
            break;
          case 'DOWN':
            head.y += 1;
            break;
          case 'LEFT':
            head.x -= 1;
            break;
        }

        // 检查碰撞墙壁
        if (
          head.x < 0 ||
          head.x >= gridSize ||
          head.y < 0 ||
          head.y >= gridSize
        ) {
          setGameOver(true);
          clearInterval(gameLoop);
          
          // 在自动模式下，短暂延迟后重新开始
          if (autoMode) {
            setTimeout(initGame, 2000);
          }
          
          return prevSnake;
        }

        // 检查蛇是否咬到自己
        if (
          prevSnake.some(
            segment => segment.x === head.x && segment.y === head.y
          )
        ) {
          setGameOver(true);
          clearInterval(gameLoop);
          
          // 在自动模式下，短暂延迟后重新开始
          if (autoMode) {
            setTimeout(initGame, 2000);
          }
          
          return prevSnake;
        }

        // 创建新的蛇身
        const newSnake = [head, ...prevSnake];
        
        // 检查是否吃到食物
        if (head.x === food.x && head.y === food.y) {
          setFood(generateFood());
          setScore(prevScore => prevScore + 1);
          
          // 加速游戏
          if (score > 0 && score % 5 === 0) {
            setSpeed(prevSpeed => Math.max(prevSpeed - 10, 70));
          }
        } else {
          // 如果没吃到食物，移除蛇尾
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => {
      clearInterval(gameLoop);
    };
  }, [direction, food, gameActive, gameOver, isPaused, score, speed, autoMode]);

  // 绘制游戏
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 清空画布
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // 绘制背景
    const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize);
    gradient.addColorStop(0, '#f0f8ff');
    gradient.addColorStop(1, '#f5f5f5');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasSize, canvasSize);

    // 绘制网格线
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= gridSize; i++) {
      // 垂直线
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvasSize);
      ctx.stroke();
      
      // 水平线
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvasSize, i * cellSize);
      ctx.stroke();
    }

    // 绘制食物 - 改为铜锣烧样子
    ctx.fillStyle = '#8B4513'; // 棕色
    // 铜锣烧饼皮
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // 铜锣烧对比色边缘
    ctx.strokeStyle = '#6B3E0B';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 2,
      0,
      Math.PI * 2
    );
    ctx.stroke();
    
    // 红豆馅
    ctx.fillStyle = '#990000';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2,
      food.y * cellSize + cellSize / 2,
      cellSize / 3,
      0,
      Math.PI * 2
    );
    ctx.fill();
    
    // 高光效果
    ctx.fillStyle = '#FFFFFF';
    ctx.beginPath();
    ctx.arc(
      food.x * cellSize + cellSize / 2 - cellSize / 6,
      food.y * cellSize + cellSize / 2 - cellSize / 6,
      cellSize / 10,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // 绘制蛇
    snake.forEach((segment, index) => {
      // 为每个蛇身段落添加渐变色
      const segmentGradient = ctx.createLinearGradient(
        segment.x * cellSize,
        segment.y * cellSize,
        segment.x * cellSize + cellSize,
        segment.y * cellSize + cellSize
      );
      
      // 哆啦A梦的头部
      if (index === 0) {
        // 哆啦A梦蓝色头部
        ctx.fillStyle = '#29B6F6';
        ctx.beginPath();
        ctx.arc(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 2,
          cellSize / 1.5,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // 白色脸部
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.ellipse(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 1.8,
          cellSize / 2,
          cellSize / 2.5,
          0,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // 红色鼻子
        ctx.fillStyle = '#FF5252';
        ctx.beginPath();
        ctx.arc(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 2,
          cellSize / 5,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // 黑色鼻子轮廓
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.arc(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 2,
          cellSize / 5,
          0,
          Math.PI * 2
        );
        ctx.stroke();
        
        // 鼻子连接到嘴的线
        ctx.beginPath();
        ctx.moveTo(segment.x * cellSize + cellSize / 2, segment.y * cellSize + cellSize / 2 + cellSize / 5);
        ctx.lineTo(segment.x * cellSize + cellSize / 2, segment.y * cellSize + cellSize / 2 + cellSize / 3);
        ctx.stroke();
        
        // 嘴巴微笑
        ctx.beginPath();
        ctx.arc(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 2 + cellSize / 5,
          cellSize / 3,
          0.1 * Math.PI,
          0.9 * Math.PI,
          false
        );
        ctx.stroke();
        
        // 眼睛
        ctx.fillStyle = '#FFFFFF';
        const eyeSize = cellSize / 4;
        
        // 眼睛位置会根据方向稍微调整
        let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
        let eyeOffset = cellSize / 15;
        
        switch (direction) {
          case 'UP':
            eyeOffset = -eyeOffset;
            // 向上看
            break;
          case 'DOWN':
            eyeOffset = eyeOffset;
            // 向下看
            break;
          case 'LEFT':
            eyeOffset = -eyeOffset;
            // 向左看
            break;
          case 'RIGHT':
            eyeOffset = eyeOffset;
            // 向右看
            break;
        }
        
        // 左眼
        leftEyeX = segment.x * cellSize + cellSize / 3;
        leftEyeY = segment.y * cellSize + cellSize / 2.5;
        ctx.beginPath();
        ctx.arc(leftEyeX, leftEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // 右眼
        rightEyeX = segment.x * cellSize + cellSize * 2/3;
        rightEyeY = segment.y * cellSize + cellSize / 2.5;
        ctx.beginPath();
        ctx.arc(rightEyeX, rightEyeY, eyeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // 眼珠
        ctx.fillStyle = '#000000';
        const pupilSize = eyeSize / 2;
        const pupilOffset = Math.sin(Date.now() / 300) * 1;
        
        // 左眼珠
        ctx.beginPath();
        ctx.arc(leftEyeX + eyeOffset + pupilOffset, leftEyeY + pupilOffset, pupilSize, 0, Math.PI * 2);
        ctx.fill();
        
        // 右眼珠
        ctx.beginPath();
        ctx.arc(rightEyeX + eyeOffset + pupilOffset, rightEyeY + pupilOffset, pupilSize, 0, Math.PI * 2);
        ctx.fill();
        
        // 哆啦A梦胡须
        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 0.8;
        
        // 左侧胡须
        ctx.beginPath();
        ctx.moveTo(segment.x * cellSize + cellSize / 4, segment.y * cellSize + cellSize / 2 + cellSize / 8);
        ctx.lineTo(segment.x * cellSize - cellSize / 5, segment.y * cellSize + cellSize / 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(segment.x * cellSize + cellSize / 4, segment.y * cellSize + cellSize / 2 + cellSize / 4);
        ctx.lineTo(segment.x * cellSize - cellSize / 5, segment.y * cellSize + cellSize / 2 + cellSize / 4);
        ctx.stroke();
        
        // 右侧胡须
        ctx.beginPath();
        ctx.moveTo(segment.x * cellSize + cellSize * 3/4, segment.y * cellSize + cellSize / 2 + cellSize / 8);
        ctx.lineTo(segment.x * cellSize + cellSize + cellSize / 5, segment.y * cellSize + cellSize / 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(segment.x * cellSize + cellSize * 3/4, segment.y * cellSize + cellSize / 2 + cellSize / 4);
        ctx.lineTo(segment.x * cellSize + cellSize + cellSize / 5, segment.y * cellSize + cellSize / 2 + cellSize / 4);
        ctx.stroke();
      }
      // 蛇身 - 哆啦A梦身体部分
      else {
        // 蓝色圆形身体
        ctx.fillStyle = index % 2 === 0 ? '#29B6F6' : '#0288D1';
        
        ctx.beginPath();
        ctx.arc(
          segment.x * cellSize + cellSize / 2,
          segment.y * cellSize + cellSize / 2,
          cellSize / 2,
          0,
          Math.PI * 2
        );
        ctx.fill();
        
        // 添加白色肚子 - 如果是偶数节
        if (index % 2 === 0) {
          ctx.fillStyle = '#FFFFFF';
          ctx.beginPath();
          ctx.ellipse(
            segment.x * cellSize + cellSize / 2,
            segment.y * cellSize + cellSize / 1.8,
            cellSize / 3,
            cellSize / 4,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
        
        // 添加铃铛 - 如果是第一个身体部分
        if (index === 1) {
          // 红色项圈
          ctx.fillStyle = '#FF5252';
          ctx.beginPath();
          ctx.ellipse(
            segment.x * cellSize + cellSize / 2,
            segment.y * cellSize + cellSize / 2,
            cellSize / 2,
            cellSize / 6,
            0,
            0,
            Math.PI * 2
          );
          ctx.fill();
          
          // 黄色铃铛
          ctx.fillStyle = '#FFEB3B';
          ctx.beginPath();
          ctx.arc(
            segment.x * cellSize + cellSize / 2,
            segment.y * cellSize + cellSize / 1.7,
            cellSize / 5,
            0,
            Math.PI * 2
          );
          ctx.fill();
          
          // 铃铛黑点
          ctx.fillStyle = '#000000';
          ctx.beginPath();
          ctx.arc(
            segment.x * cellSize + cellSize / 2,
            segment.y * cellSize + cellSize / 1.7,
            cellSize / 10,
            0,
            Math.PI * 2
          );
          ctx.fill();
        }
      }
    });

    // 绘制分数显示
    ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
    ctx.font = 'bold 12px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`得分: ${score}`, canvasSize / 2, 14);

    // 绘制游戏结束或暂停提示
    if (gameOver || isPaused) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      ctx.fillRect(0, 0, canvasSize, canvasSize);
      
      ctx.fillStyle = '#fff';
      ctx.font = '14px Arial';
      ctx.textAlign = 'center';
      
      if (gameOver) {
        ctx.fillText('游戏结束', canvasSize / 2, canvasSize / 2 - 10);
        ctx.fillText(`得分: ${score}`, canvasSize / 2, canvasSize / 2 + 10);
        ctx.fillText(autoMode ? '即将重新开始...' : '点击重新开始', canvasSize / 2, canvasSize / 2 + 30);
      } else {
        ctx.fillText('已暂停', canvasSize / 2, canvasSize / 2);
        ctx.fillText('点击继续', canvasSize / 2, canvasSize / 2 + 20);
      }
    }
    
    // 请求动画帧以实现连续更新效果（特别是瞳孔和舌头的动画）
    if (gameActive && !gameOver && !isPaused) {
      requestAnimationFrame(() => {
        // 触发重新渲染
      });
    }
  }, [snake, food, gameOver, isPaused, score, direction, autoMode]);

  const handleCanvasClick = () => {
    if (gameOver) {
      initGame();
    } else if (gameActive) {
      togglePause();
    } else {
      initGame();
    }
  };

  return (
    <div className="flex flex-col items-center p-3 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-md border border-blue-100 dark:border-blue-900">
      <div className="text-center mb-2">
        <h3 className="text-base font-bold text-gray-800 dark:text-gray-200 font-['KuaiKanShiJieTi']">哆啦A梦展示</h3>
        <div className="text-xs text-gray-600 dark:text-gray-400 mb-1">
          得分: <span className="text-blue-500 dark:text-blue-400 font-bold">{score}</span>
        </div>
      </div>
      
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={canvasSize}
          height={canvasSize}
          onClick={handleCanvasClick}
          className="border border-blue-200 dark:border-blue-900 rounded-lg shadow-inner cursor-pointer"
        />
        
        {/* 装饰角标 */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </div>
      </div>
      
      <div className="mt-2 flex justify-between w-full">
        <button
          onClick={toggleAutoMode}
          className={`text-xs px-2 py-1 rounded transition-colors ${
            autoMode
              ? 'bg-green-500 text-white hover:bg-green-600'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
          }`}
        >
          {autoMode ? '自动中' : '手动'}
        </button>
        
        <button
          onClick={togglePause}
          className="text-xs px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          disabled={gameOver}
        >
          {isPaused ? '继续' : '暂停'}
        </button>
      </div>
      
      <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 text-center">
        {autoMode 
          ? '自动模式：蛇会自动寻找食物' 
          : '手动模式：使用方向键控制'
        }
      </div>
    </div>
  );
}