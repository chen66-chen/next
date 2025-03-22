"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';

// 卡通搜索图标组件
const CartoonSearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M15 15L20 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="10" cy="10" r="3" fill="currentColor" opacity="0.2" />
    <circle cx="8" cy="8" r="1" fill="currentColor" />
  </svg>
);

// 卡通关闭图标组件
const CartoonCloseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 8L16 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M16 8L8 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" opacity="0.2" />
  </svg>
);

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  // 处理表单提交
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // 播放搜索音效
      const searchSound = new Audio('/sounds/search.mp3');
      searchSound.volume = 0.2;
      searchSound.play().catch(e => console.log('音频播放失败:', e));
      
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // 清除搜索内容
  const clearSearch = () => {
    setQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // 点击ESC键关闭搜索框
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsFocused(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="relative">
      <form 
        onSubmit={handleSubmit}
        className="relative flex items-center"
      >
        <motion.div 
          className={`
            relative flex items-center overflow-hidden rounded-full 
            bg-white/10 backdrop-blur-md border border-white/20 shadow-lg
            transition-all duration-300 w-52
            ${isFocused ? 'w-72 pr-10' : 'focus-within:w-72 focus-within:pr-10'}
          `}
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
        >
          <div 
            className={`
              absolute left-3 text-gray-500/80 dark:text-gray-400/80
              transition-all duration-300
              ${isFocused ? 'text-blue-500/80 dark:text-blue-400/80' : ''}
            `}
          >
            <CartoonSearchIcon />
          </div>
          <input
            ref={inputRef}
            type="search"
            placeholder="搜索文章..."
            className="w-full h-10 bg-transparent pl-10 pr-2 outline-none text-gray-800 dark:text-gray-200"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
          />
          <AnimatePresence>
            {query && (
              <motion.button
                type="button"
                className="absolute right-3 text-gray-500/80 hover:text-gray-700 dark:text-gray-400/80 dark:hover:text-gray-200"
                onClick={clearSearch}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
              >
                <CartoonCloseIcon />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <Button type="submit" className="hidden">搜索</Button>
      </form>
    </div>
  );
} 