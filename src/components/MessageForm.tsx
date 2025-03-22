"use client";

import { useState, useRef, useEffect } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useTheme } from 'next-themes';

interface MessageFormProps {
  onMessageSent?: (message: {name: string, email: string, content: string}) => void;
}

export function MessageForm({ onMessageSent }: MessageFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const { theme } = useTheme();
  // 存储滚动位置
  const scrollPosRef = useRef(0);
  
  // 纸飞机发送动画状态
  const [isSending, setIsSending] = useState(false);

  // 在组件挂载时立即保存当前的滚动位置
  useEffect(() => {
    scrollPosRef.current = window.scrollY;
    
    const saveScrollPosition = () => {
      scrollPosRef.current = window.scrollY;
    };
    
    window.addEventListener('scroll', saveScrollPosition);
    return () => window.removeEventListener('scroll', saveScrollPosition);
  }, []);

  // 恢复滚动位置的函数
  const restoreScrollPosition = () => {
    requestAnimationFrame(() => {
      window.scrollTo({
        top: scrollPosRef.current,
        behavior: 'auto'
      });
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // 阻止事件冒泡
    
    // 保存当前滚动位置
    const currentScroll = window.scrollY;
    scrollPosRef.current = currentScroll;
    
    // 表单验证
    if (!name.trim() || !email.trim() || !content.trim()) {
      // 播放错误音效
      const errorSound = new Audio('/sounds/error.mp3');
      errorSound.volume = 0.2;
      errorSound.play().catch(e => console.log('音频播放失败:', e));
      
      toast.error('请填写完整信息后提交');
      return;
    }
    
    setIsSubmitting(true);
    setIsSending(true);
    
    // 播放发送音效
    const sendSound = new Audio('/sounds/send.mp3');
    sendSound.volume = 0.2;
    sendSound.play().catch(e => console.log('音频播放失败:', e));
    
    try {
      // 模拟API请求
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // 表单提交成功
      if (onMessageSent) {
        onMessageSent({ name, email, content });
      }
      
      // 播放成功音效
      const successSound = new Audio('/sounds/success.mp3');
      successSound.volume = 0.3;
      successSound.play().catch(e => console.log('音频播放失败:', e));
      
      toast.success('留言发送成功！');
      
      // 重置表单
      setName('');
      setEmail('');
      setContent('');
      
      // 使用ref直接重置而不触发表单提交
      if (formRef.current) {
        formRef.current.reset();
      }
      
      // 恢复滚动位置
      restoreScrollPosition();
      
    } catch (error) {
      toast.error('提交失败，请稍后重试');
      console.error('留言提交错误:', error);
      
      // 恢复滚动位置
      restoreScrollPosition();
    } finally {
      setIsSubmitting(false);
      // 动画完成后重置发送状态
      setTimeout(() => {
        setIsSending(false);
        // 再次确保滚动位置恢复
        restoreScrollPosition();
      }, 1000);
    }
  };

  // 防止输入时触发滚动
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, setter: React.Dispatch<React.SetStateAction<string>>) => {
    // 保存当前滚动位置
    const currentScroll = window.scrollY;
    setter(e.target.value);
    // 确保状态更新后不会滚动
    requestAnimationFrame(() => {
      window.scrollTo({
        top: currentScroll,
        behavior: 'auto'
      });
    });
  };

  return (
    <div id="message-form" className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-800">
      <h2 className="text-2xl font-bold mb-4 text-center font-['KuaiKanShiJieTi']">
        留言板
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-sm text-center mb-6">
        有什么想法和建议？欢迎留言告诉我！
      </p>
      
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-4" onClick={(e) => e.stopPropagation()}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              昵称
            </label>
            <Input
              id="name"
              type="text"
              placeholder="你的昵称"
              value={name}
              onChange={(e) => handleInputChange(e, setName)}
              disabled={isSubmitting}
              className="w-full bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              邮箱
            </label>
            <Input
              id="email"
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => handleInputChange(e, setEmail)}
              disabled={isSubmitting}
              className="w-full bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/50"
            />
          </div>
        </div>
        
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            留言内容
          </label>
          <Textarea
            id="message"
            placeholder="写下你的想法..."
            rows={4}
            value={content}
            onChange={(e) => handleInputChange(e, setContent)}
            disabled={isSubmitting}
            className="w-full bg-white/50 dark:bg-gray-800/50 focus:ring-2 focus:ring-blue-500/50 resize-none"
          />
        </div>
        
        <div className="flex justify-end">
          <motion.div
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button 
              type="button" 
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`relative overflow-hidden ${theme === 'dark' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'} text-white px-8 py-2 rounded-full transition-all duration-300`}
            >
              <AnimatePresence mode="wait">
                {isSubmitting ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    <span>发送中...</span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="send"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center"
                  >
                    <span className="mr-2">发送留言</span>
                    
                    {/* 纸飞机图标及其动画 */}
                    <motion.div
                      animate={isSending ? {
                        x: [0, 20, -300],
                        y: [0, -20, -50],
                        scale: [1, 1.2, 0.5],
                        opacity: [1, 1, 0],
                        rotate: [0, -10, -20]
                      } : {}}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className="inline-block"
                    >
                      <Send size={16} className="inline-block" />
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
            
            {/* 提交成功后的波纹动画效果 */}
            <AnimatePresence>
              {isSending && (
                <motion.div
                  initial={{ width: 0, height: 0, opacity: 0.5 }}
                  animate={{ 
                    width: [0, 300], 
                    height: [0, 300], 
                    opacity: [0.5, 0],
                    x: [-150, -150],
                    y: [-150, -150]
                  }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1 }}
                  className="absolute top-1/2 left-1/2 rounded-full bg-blue-400/30 dark:bg-blue-600/30"
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </form>
    </div>
  );
} 