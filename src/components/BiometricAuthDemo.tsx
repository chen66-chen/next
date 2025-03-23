'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Button } from "@/components/ui/button";

/**
 * 生物识别类型定义
 * fingerprint: 指纹识别
 * facial: 面部识别
 */
type BiometricType = 'fingerprint' | 'facial' | null;

/**
 * 认证状态定义
 * idle: 空闲状态，等待用户操作
 * scanning: 扫描中状态，模拟生物特征扫描过程
 * success: 认证成功状态
 * failed: 认证失败状态
 */
type AuthStatus = 'idle' | 'scanning' | 'success' | 'failed';

/**
 * BiometricAuthDemo 组件
 * 
 * 该组件用于模拟现代生物识别认证技术的交互过程，包括：
 * 1. 指纹识别：模拟指纹扫描和验证过程
 * 2. 面部识别：模拟面部扫描和验证过程
 * 
 * 组件提供交互式控制面板，用户可以选择不同的生物识别方式进行模拟体验
 * 
 * @author Chryssolion Chen
 * @version 1.0.0
 */
const BiometricAuthDemo = ({ onAuthSuccess }: { onAuthSuccess?: () => void }) => {
  // 状态管理
  const [biometricType, setBiometricType] = useState<BiometricType>(null); // 当前选择的生物识别类型
  const [authStatus, setAuthStatus] = useState<AuthStatus>('idle'); // 当前认证状态
  const [scanProgress, setScanProgress] = useState(0); // 扫描进度，0-100
  
  // 引用管理
  const scanTimerRef = useRef<NodeJS.Timeout | null>(null); // 扫描计时器引用
  const resultTimerRef = useRef<NodeJS.Timeout | null>(null); // 结果显示计时器引用
  
  /**
   * 清理所有定时器，防止内存泄漏和状态冲突
   */
  const clearAllTimers = () => {
    if (scanTimerRef.current) {
      clearInterval(scanTimerRef.current);
      scanTimerRef.current = null;
    }
    if (resultTimerRef.current) {
      clearTimeout(resultTimerRef.current);
      resultTimerRef.current = null;
    }
  };
  
  /**
   * 重置认证状态
   * 清理定时器并将状态重置为初始状态
   */
  const resetAuth = () => {
    clearAllTimers();
    setAuthStatus('idle');
    setScanProgress(0);
  };
  
  /**
   * 切换生物识别类型
   * @param type 要切换到的生物识别类型
   */
  const switchBiometricType = (type: BiometricType) => {
    resetAuth();
    setBiometricType(type);
  };
  
  /**
   * 开始认证过程
   * 模拟生物识别扫描过程，更新扫描进度，并在完成后随机决定认证结果
   */
  const startAuthentication = () => {
    if (authStatus !== 'idle') return;
    
    resetAuth();
    setAuthStatus('scanning');
    
    // 模拟扫描进度更新
    scanTimerRef.current = setInterval(() => {
      setScanProgress(prev => {
        // 当进度达到100%时，清除扫描定时器，并设置结果显示定时器
        if (prev >= 100) {
          clearInterval(scanTimerRef.current!);
          
          // 随机决定认证成功或失败（80%成功率）
          const isSuccess = Math.random() < 0.8;
          setAuthStatus(isSuccess ? 'success' : 'failed');
          
          // 成功时调用回调函数
          if (isSuccess && onAuthSuccess) {
            resultTimerRef.current = setTimeout(() => {
              onAuthSuccess();
            }, 1000);
          } else {
            // 失败时3秒后重置
            resultTimerRef.current = setTimeout(() => {
              resetAuth();
            }, 3000);
          }
          
          return 100;
        }
        return prev + 2; // 每次增加2%进度
      });
    }, 50); // 每50毫秒更新一次进度
  };
  
  // 组件卸载时清理所有定时器
  useEffect(() => {
    return () => clearAllTimers();
  }, []);
  
  /**
   * 渲染指纹识别界面
   * @returns JSX元素
   */
  const renderFingerprintUI = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {/* 指纹图标容器 - 修改为新的凹槽形状 */}
        <div 
          className={`w-48 h-64 rounded-2xl flex items-center justify-center relative cursor-pointer transition-all duration-300 overflow-hidden ${
            authStatus === 'idle' 
              ? 'bg-gradient-to-br from-slate-800 to-slate-900 hover:from-slate-700 hover:to-slate-800' 
              : authStatus === 'scanning' 
                ? 'bg-gradient-to-br from-cyan-900 to-slate-900' 
                : authStatus === 'success' 
                  ? 'bg-gradient-to-br from-green-900 to-slate-900' 
                  : 'bg-gradient-to-br from-red-900 to-slate-900'
          }`}
          onClick={authStatus === 'idle' ? startAuthentication : undefined}
        >
          {/* 指纹凹槽效果 */}
          <div className="absolute inset-4 rounded-xl border-8 border-gray-700/50 bg-gray-800/30"></div>
          
          {/* 指纹识别区 */}
          <div className={`absolute inset-8 rounded-lg flex items-center justify-center
            ${authStatus === 'idle' ? 'bg-cyan-900/20' : 
              authStatus === 'scanning' ? 'bg-cyan-800/30 animate-pulse' : 
              authStatus === 'success' ? 'bg-green-800/30' : 'bg-red-800/30'}`}>
            
            {/* 指纹图案 */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              className={`w-24 h-24 ${
                authStatus === 'idle' 
                  ? 'text-cyan-400/70' 
                  : authStatus === 'scanning' 
                    ? 'text-cyan-300 animate-pulse' 
                    : authStatus === 'success' 
                      ? 'text-green-400' 
                      : 'text-red-400'
              }`}
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12.8,5.4c3.1,0.5,5.3,3.2,5.3,6.4c0,0.2-0.2,0.4-0.4,0.4s-0.4-0.2-0.4-0.4c0-2.9-2-5.2-4.8-5.7
                c-0.2,0-0.4-0.2-0.4-0.4C12.1,5.5,12.3,5.3,12.8,5.4z M8.4,14.6c-0.5-0.5-0.5-1.4,0-1.9s1.4-0.5,1.9,0s0.5,1.4,0,1.9S8.9,15.1,8.4,14.6z
                M7,10.8c-0.2,0-0.4-0.2-0.4-0.4c0-3.1,2.5-5.6,5.6-5.6c3.1,0,5.6,2.5,5.6,5.6c0,1.2-0.4,2.4-1,3.4c-0.1,0.2-0.3,0.2-0.5,0.1
                c-0.2-0.1-0.2-0.3-0.1-0.5c0.6-0.9,0.9-1.9,0.9-2.9c0-2.7-2.2-4.9-4.9-4.9S7.4,7.7,7.4,10.4C7.4,10.6,7.2,10.8,7,10.8z M9.4,18.5
                c-0.1,0-0.2,0-0.3-0.1C7.6,16.8,6.6,14.7,6.6,12.4c0-3.5,2.9-6.4,6.4-6.4c0.2,0,0.4,0.2,0.4,0.4s-0.2,0.4-0.4,0.4
                c-3.1,0-5.6,2.5-5.6,5.6c0,2.1,0.9,4,2.4,5.2c0.2,0.1,0.2,0.4,0,0.5C9.6,18.4,9.5,18.5,9.4,18.5z M13.9,19.4
                c-0.7,0.3-1.5,0.5-2.3,0.5c-1.5,0-2.9-0.6-4-1.5c-0.2-0.1-0.2-0.4-0.1-0.5s0.4-0.2,0.5-0.1c1,0.9,2.2,1.4,3.6,1.4
                c0.7,0,1.4-0.1,2-0.4c0.2-0.1,0.4,0,0.5,0.2C14.2,19.1,14.1,19.3,13.9,19.4z M14.8,18.4c-0.2-0.1-0.2-0.3-0.1-0.5
                c0.6-0.9,0.9-1.9,0.9-2.9c0-2.8-2.3-5.1-5.1-5.1c-1.1,0-2.1,0.3-2.9,0.9c-0.2,0.1-0.4,0.1-0.5-0.1c-0.1-0.2-0.1-0.4,0.1-0.5
                c1-0.7,2.1-1,3.3-1c3.2,0,5.9,2.6,5.9,5.9c0,1.2-0.4,2.4-1,3.4C15.2,18.4,15,18.5,14.8,18.4z" />
            </svg>
          </div>
          
          {/* 扫描动画 */}
          {authStatus === 'scanning' && (
            <div className="absolute inset-0 overflow-hidden">
              <div 
                className="absolute top-0 left-0 right-0 h-2 bg-cyan-400 animate-scan"
                style={{
                  transform: `translateY(${scanProgress}%)`,
                  boxShadow: '0 0 20px rgba(34, 211, 238, 0.9), 0 0 40px rgba(34, 211, 238, 0.6)'
                }}
              ></div>
            </div>
          )}
          
          {/* 成功或失败图标 */}
          {authStatus === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          )}
          
          {authStatus === 'failed' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-800/30">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          
          {/* 指示灯 */}
          <div className="absolute top-2 right-2 w-3 h-3 rounded-full
            shadow-[0_0_5px_rgba(255,255,255,0.5)]
            ${authStatus === 'idle' ? 'bg-yellow-500/70' : 
              authStatus === 'scanning' ? 'bg-blue-500/70 animate-pulse' : 
              authStatus === 'success' ? 'bg-green-500/70' : 'bg-red-500/70'}"></div>
        </div>
        
        {/* 提示文本 */}
        <p className="mt-4 text-base text-center">
          {authStatus === 'idle' 
            ? '请将手指放在指纹传感器上' 
            : authStatus === 'scanning' 
              ? '正在扫描指纹...' 
              : authStatus === 'success' 
                ? '身份验证成功！正在进入系统...' 
                : '身份验证失败，请重试'}
        </p>
        
        {/* 扫描进度条 */}
        {authStatus === 'scanning' && (
          <div className="w-48 h-2 bg-cyan-900/30 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-cyan-500"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };
  
  /**
   * 渲染面部识别界面
   * @returns JSX元素
   */
  const renderFacialUI = () => {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        {/* 面部识别框 - 升级为更现代的设计 */}
        <div 
          className={`w-64 h-64 rounded-2xl flex items-center justify-center relative cursor-pointer border-2 ${
            authStatus === 'idle' 
              ? 'border-purple-600/50 bg-gradient-to-br from-slate-800/80 to-purple-900/30 hover:border-purple-500' 
              : authStatus === 'scanning' 
                ? 'border-purple-400 border-dashed bg-gradient-to-br from-slate-800/80 to-purple-800/30' 
                : authStatus === 'success' 
                  ? 'border-green-500 bg-gradient-to-br from-slate-800/80 to-green-900/30' 
                  : 'border-red-500 bg-gradient-to-br from-slate-800/80 to-red-900/30'
          }`}
          onClick={authStatus === 'idle' ? startAuthentication : undefined}
        >
          {/* 面部识别标记 */}
          <div className="absolute inset-0">
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-purple-500/70 rounded-tl-lg"></div>
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-purple-500/70 rounded-tr-lg"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-purple-500/70 rounded-bl-lg"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-purple-500/70 rounded-br-lg"></div>
          </div>
          
          {/* 面部图标 */}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            className={`w-32 h-32 ${
              authStatus === 'idle' 
                ? 'text-purple-300 opacity-80' 
                : authStatus === 'scanning' 
                  ? 'text-purple-200 opacity-100' 
                  : authStatus === 'success' 
                    ? 'text-green-300' 
                    : 'text-red-300'
            }`}
          >
            <circle cx="12" cy="10" r="3" strokeWidth="1" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12,13c2.8,0,5,2.2,5,5v2H7v-2C7,15.2,9.2,13,12,13z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5,7.8V5c0-0.6,0.4-1,1-1h2.8 M19,7.8V5c0-0.6-0.4-1-1-1h-2.8 M5,16.2V19c0,0.6,0.4,1,1,1h2.8 M19,16.2V19c0,0.6-0.4,1-1,1h-2.8" />
          </svg>
          
          {/* 扫描动画 */}
          {authStatus === 'scanning' && (
            <>
              <div className="absolute inset-0 rounded-lg overflow-hidden flex items-center justify-center">
                <div className="w-full h-2 bg-purple-500 absolute animate-facial-scan opacity-80"
                  style={{boxShadow: '0 0 20px rgba(168, 85, 247, 0.9), 0 0 40px rgba(168, 85, 247, 0.6)'}}></div>
                
                {/* 面部识别网格 */}
                <div className="absolute inset-4 grid grid-cols-8 grid-rows-8 opacity-40">
                  {Array.from({ length: 64 }).map((_, index) => (
                    <div key={index} className="border border-purple-400/30"></div>
                  ))}
                </div>
                
                {/* 面部特征点 */}
                <div className="absolute w-6 h-6 rounded-full border border-purple-400 left-1/3 top-1/3"></div>
                <div className="absolute w-6 h-6 rounded-full border border-purple-400 right-1/3 top-1/3"></div>
                <div className="absolute w-8 h-4 rounded-full border border-purple-400 left-1/2 bottom-1/3 transform -translate-x-1/2"></div>
                <div className="absolute w-20 h-20 rounded-full border border-purple-400 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
                
                {/* 增加额外的AI分析效果 */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-xs text-purple-300 font-mono absolute bottom-6 left-4">正在分析...</div>
                  <div className="text-xs text-purple-300 font-mono absolute top-6 right-4">特征点：23</div>
                </div>
              </div>
            </>
          )}
          
          {/* 成功或失败图标 */}
          {authStatus === 'success' && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-800/40 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-green-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          )}
          
          {authStatus === 'failed' && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-800/40 rounded-xl">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-red-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          )}
        </div>
        
        {/* 提示文本 */}
        <p className="mt-4 text-base text-center">
          {authStatus === 'idle' 
            ? '请面向摄像头开始面部识别' 
            : authStatus === 'scanning' 
              ? '正在进行面部识别...' 
              : authStatus === 'success' 
                ? '面部识别成功！正在进入系统...' 
                : '面部识别失败，请调整位置后重试'}
        </p>
        
        {/* 扫描进度条 */}
        {authStatus === 'scanning' && (
          <div className="w-64 h-2 bg-purple-900/30 rounded-full mt-3 overflow-hidden">
            <div 
              className="h-full bg-purple-500"
              style={{ width: `${scanProgress}%` }}
            ></div>
          </div>
        )}
      </div>
    );
  };
  
  return (
    <div className="relative bg-black rounded-lg overflow-hidden shadow-2xl border border-gray-700">
      {/* 背景效果 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 网格背景 */}
        <div className="grid-bg absolute inset-0 opacity-30"></div>
        {/* 渐变叠加 */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/40 via-black/90 to-purple-900/40"></div>
        {/* 动态光效 */}
        <div className="glow-effect absolute -inset-[10%] opacity-30"></div>
      </div>
      
      {/* 标题栏 */}
      <div className="relative bg-gradient-to-r from-indigo-900 to-purple-900 text-white px-6 py-4 z-10 flex justify-between items-center">
        <div>
          <h3 className="text-lg font-bold">安全验证系统</h3>
          <p className="text-xs text-blue-100">请完成生物识别认证以访问</p>
        </div>
        <div className="bg-black/30 px-3 py-1 rounded-full text-xs">
          Chryssolion Chen 安全小窝
        </div>
      </div>
      
      {/* 认证类型选择按钮 */}
      <div className="relative p-4 flex gap-3 overflow-x-auto bg-gray-900/80 backdrop-blur-sm z-10">
        <Button
          variant={biometricType === 'fingerprint' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchBiometricType('fingerprint')}
          className={`text-sm font-medium ${biometricType === 'fingerprint' ? 'bg-cyan-700 hover:bg-cyan-800' : 'border-cyan-600 text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/30'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12,11.8c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5S12.3,11.8,12,11.8z M12,5.3
              c-3.7,0-6.7,3-6.7,6.7c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5c0-3.2,2.6-5.7,5.7-5.7c0.3,0,0.5-0.2,0.5-0.5S12.3,5.3,12,5.3z" />
          </svg>
          指纹识别
        </Button>
        <Button
          variant={biometricType === 'facial' ? 'default' : 'outline'}
          size="sm"
          onClick={() => switchBiometricType('facial')}
          className={`text-sm font-medium ${biometricType === 'facial' ? 'bg-purple-700 hover:bg-purple-800' : 'border-purple-600 text-purple-400 hover:text-purple-300 hover:bg-purple-950/30'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.8,4.2H6.2C5.5,4.2,5,4.8,5,5.4v2.5 M19,7.9V5.4c0-0.6-0.5-1.2-1.2-1.2h-2.5" />
          </svg>
          面部识别
        </Button>
      </div>
      
      {/* 主内容区域 */}
      <div className="relative p-6 z-10 min-h-[340px] flex items-center justify-center">
        {biometricType === null ? (
          // 未选择认证类型时显示引导内容
          <div className="text-center max-w-md">
            <div className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-4 mb-6">
              <p className="text-indigo-100 text-sm">
                欢迎来到 Chryssolion Chen 安全小窝。请完成身份验证以访问完整内容。
              </p>
            </div>
            <h3 className="text-xl font-semibold text-white mb-4">选择验证方式</h3>
            <p className="text-gray-300 mb-6">此页面受到生物识别保护，您需要通过以下方式之一进行身份验证</p>
            <div className="flex justify-center gap-16">
              {/* 指纹识别图标 */}
              <div className="text-center">
                <div 
                  className="w-24 h-24 mx-auto bg-cyan-900/30 border border-cyan-700/50 rounded-lg flex items-center justify-center mb-3 hover:bg-cyan-900/50 hover:border-cyan-600 transition-all duration-300 cursor-pointer"
                  onClick={() => switchBiometricType('fingerprint')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12,11.8c-0.3,0-0.5,0.2-0.5,0.5s0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5S12.3,11.8,12,11.8z M12,5.3
                      c-3.7,0-6.7,3-6.7,6.7c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5c0-3.2,2.6-5.7,5.7-5.7c0.3,0,0.5-0.2,0.5-0.5S12.3,5.3,12,5.3z M12,8.3
                      c-1.5,0-2.7,1.2-2.7,2.7s1.2,2.7,2.7,2.7s2.7-1.2,2.7-2.7S13.5,8.3,12,8.3z M12,12.7c-0.9,0-1.7-0.8-1.7-1.7s0.8-1.7,1.7-1.7s1.7,0.8,1.7,1.7
                      S12.9,12.7,12,12.7z M12,6.8c-2.9,0-5.2,2.3-5.2,5.2c0,0.3,0.2,0.5,0.5,0.5s0.5-0.2,0.5-0.5c0-2.3,1.9-4.2,4.2-4.2c0.3,0,0.5-0.2,0.5-0.5
                      S12.3,6.8,12,6.8z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-cyan-400">指纹识别</p>
                <p className="text-xs text-gray-400">推荐方式</p>
              </div>
              
              {/* 面部识别图标 */}
              <div className="text-center">
                <div 
                  className="w-24 h-24 mx-auto bg-purple-900/30 border border-purple-700/50 rounded-lg flex items-center justify-center mb-3 hover:bg-purple-900/50 hover:border-purple-600 transition-all duration-300 cursor-pointer"
                  onClick={() => switchBiometricType('facial')}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.8,4.2H6.2C5.5,4.2,5,4.8,5,5.4v2.5 M19,7.9V5.4c0-0.6-0.5-1.2-1.2-1.2h-2.5 M5,16.1v2.5c0,0.6,0.5,1.2,1.2,1.2h2.5 M15.2,19.8h2.5c0.6,0,1.2-0.5,1.2-1.2v-2.5 M12,9c1.1,0,2,0.9,2,2s-0.9,2-2,2s-2-0.9-2-2S10.9,9,12,9z M12,15c2.2,0,4,1.8,4,4v1H8v-1C8,16.8,9.8,15,12,15z" />
                  </svg>
                </div>
                <p className="text-base font-medium text-purple-400">面部识别</p>
                <p className="text-xs text-gray-400">快速便捷</p>
              </div>
            </div>
          </div>
        ) : (
          // 根据选择的认证类型显示对应的UI
          biometricType === 'fingerprint' ? renderFingerprintUI() : renderFacialUI()
        )}
      </div>
      
      {/* 信息提示区 */}
      <div className="relative bg-gray-900/90 backdrop-blur-sm p-4 border-t border-gray-700 z-10">
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-400 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            所有生物特征数据均在本地处理，不会上传至服务器
          </div>
          {biometricType !== null && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setBiometricType(null)}
              className="text-xs text-gray-400 hover:text-gray-200"
            >
              返回选择
            </Button>
          )}
        </div>
      </div>
      
      {/* 自定义样式 */}
      <style jsx>{`
        .grid-bg {
          background-image: 
            linear-gradient(rgba(66, 153, 225, 0.1) 1px, transparent 1px), 
            linear-gradient(90deg, rgba(66, 153, 225, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
          background-position: center center;
        }
        
        .glow-effect {
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.3) 0%, transparent 70%);
          animation: pulse 8s infinite alternate;
        }
        
        @keyframes pulse {
          0% { opacity: 0.1; }
          50% { opacity: 0.3; }
          100% { opacity: 0.1; }
        }
        
        @keyframes scan {
          0% { transform: translateY(0); }
          100% { transform: translateY(100%); }
        }
        
        @keyframes facial-scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100%); }
        }
        
        .animate-scan {
          animation: scan 2s linear infinite;
        }
        
        .animate-facial-scan {
          animation: facial-scan 2s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default BiometricAuthDemo; 