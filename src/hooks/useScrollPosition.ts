import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * 自定义钩子，用于管理和恢复滚动位置
 * @returns 包含保存和恢复滚动位置的方法
 */
export function useScrollPosition() {
  // 记录滚动位置
  const scrollPosition = useRef(0);
  const [hasScrollRestored, setHasScrollRestored] = useState(false);
  
  // 保存滚动位置
  const saveScrollPosition = useCallback(() => {
    scrollPosition.current = window.scrollY;
    sessionStorage.setItem('scrollPosition', scrollPosition.current.toString());
  }, []);
  
  // 恢复滚动位置
  const restoreScrollPosition = useCallback(() => {
    const savedPosition = sessionStorage.getItem('scrollPosition');
    
    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      if (!isNaN(position) && position > 0) {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: position,
            behavior: 'auto'
          });
        });
      }
    }
  }, []);
  
  // 使用useLayoutEffect提前处理滚动位置
  useLayoutEffect(() => {
    // 初始滚动位置恢复
    if (!hasScrollRestored) {
      restoreScrollPosition();
      setHasScrollRestored(true);
    }
  }, [hasScrollRestored, restoreScrollPosition]);
  
  // 监听滚动和点击事件
  useEffect(() => {
    // 获取初始滚动位置
    const initialScrollPosition = window.scrollY;
    scrollPosition.current = initialScrollPosition;
    
    // 监听滚动，保存位置
    const handleScroll = () => {
      scrollPosition.current = window.scrollY;
      sessionStorage.setItem('scrollPosition', scrollPosition.current.toString());
    };
    
    // 处理全局点击事件
    const handleDocumentClick = (e: MouseEvent) => {
      // 保存当前滚动位置
      saveScrollPosition();
      
      const target = e.target as HTMLElement;
      const linkOrButton = target.closest('a, button');
      
      // 处理空链接或占位符链接
      if (linkOrButton instanceof HTMLAnchorElement) {
        const href = linkOrButton.getAttribute('href');
        if (href === '#' || href === '' || href === 'javascript:void(0)') {
          e.preventDefault();
        }
      }
    };
    
    // 处理表单提交
    const handleFormSubmit = (e: SubmitEvent) => {
      saveScrollPosition();
    };
    
    // 监听路由变化前
    const beforeUnload = () => {
      saveScrollPosition();
    };
    
    // 添加各种事件监听
    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('submit', handleFormSubmit);
    window.addEventListener('beforeunload', beforeUnload);
    
    // 在组件卸载时清除事件监听
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('submit', handleFormSubmit);
      window.removeEventListener('beforeunload', beforeUnload);
    };
  }, [saveScrollPosition]);

  return {
    saveScrollPosition,
    restoreScrollPosition,
    scrollPosition: scrollPosition.current
  };
} 