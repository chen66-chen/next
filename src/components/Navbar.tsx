"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Menu, X, Moon, Sun } from 'lucide-react';
import SearchForm from './SearchForm';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const router = useRouter();

  // 在组件挂载时检查当前主题
  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        setIsDarkMode(true);
        document.documentElement.classList.add('dark');
      }
    } catch (e) {
      // 忽略localStorage错误
    }
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleTheme = () => {
    try {
      const newDarkMode = !isDarkMode;
      setIsDarkMode(newDarkMode);

      if (newDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
    } catch (e) {
      // 忽略localStorage错误
    }
  };

  const handleSearch = (query: string) => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-gradient-to-r from-site1-primary via-site2-primary to-site3-primary text-transparent bg-clip-text font-['KuaiKanShiJieTi'] text-2xl font-bold">
              小臣
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="font-['NotoSerifSC'] text-site2-primary hover:text-site2-teal transition-colors">
            首页
          </Link>
          <Link href="/style1" className="font-['KuaiKanShiJieTi'] text-site1-primary hover:text-site1-blue transition-colors">
            技术支持
          </Link>
          <Link href="/style2" className="font-['NotoSerifSC'] text-site2-primary hover:text-site2-teal transition-colors">
            小臣のWeb
          </Link>
          <Link href="/style5" className="font-noto text-site5-primary hover:text-site5-teal transition-colors">
            Chryssolion Chen.0
          </Link>
          <Link href="/style3" className="font-['HanTang'] text-site3-primary hover:text-site3-blue transition-colors">
            Chryssolion Chen安全小窝
          </Link>
          <Link href="/style4" className="font-['MiSans'] text-site4-primary hover:text-site4-blue transition-colors">
            Chryssolion Chen
          </Link>
          <Link href="/about" className="font-['MiSans'] text-foreground hover:text-primary transition-colors">
            关于
          </Link>
          <Link href="/contact" className="font-['MiSans'] text-foreground hover:text-primary transition-colors">
            联系
          </Link>
        </nav>

        {/* Desktop Right Side */}
        <div className="hidden md:flex items-center gap-3">
          <SearchForm />
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle Theme"
            onClick={toggleTheme}
          >
            {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          <Link href="/editor">
            <Button variant="outline" size="sm">
              写文章
            </Button>
          </Link>
        </div>

        {/* Mobile Navigation */}
        <div className="flex md:hidden items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowSearch(!showSearch)}
            type="button"
          >
            {showSearch ? <X size={18} /> : <Sun size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            type="button"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            type="button"
          >
            {isMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </div>

      {/* Mobile Search */}
      {showSearch && (
        <div className="md:hidden container py-3 px-4 bg-background border-t">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const input = e.currentTarget.querySelector('input[type="search"]') as HTMLInputElement;
              if (input?.value) {
                handleSearch(input.value);
              }
            }}
            className="flex items-center gap-2"
          >
            <div className="relative flex-1">
              <input
                type="search"
                placeholder="搜索..."
                className="w-full rounded-md py-2 px-4 pl-9 border border-input bg-background"
              />
            </div>
            <Button type="submit" size="sm">搜索</Button>
          </form>
        </div>
      )}

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden container py-4 bg-background border-t">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="font-['MiSans'] text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              首页
            </Link>
            <Link
              href="/style1"
              className="font-['KuaiKanShiJieTi'] text-site1-primary hover:text-site1-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              技术支持
            </Link>
            <Link
              href="/style2"
              className="font-['NotoSerifSC'] text-site2-primary hover:text-site2-teal transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              小臣のWeb
            </Link>
            <Link
              href="/style5"
              className="font-noto text-site5-primary hover:text-site5-teal transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Chryssolion Chen.0
            </Link>
            <Link
              href="/style3"
              className="font-['HanTang'] text-site3-primary hover:text-site3-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Chryssolion Chen安全小窝
            </Link>
            <Link
              href="/style4"
              className="font-['MiSans'] text-site4-primary hover:text-site4-blue transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Chryssolion Chen
            </Link>
            <Link
              href="/about"
              className="font-['MiSans'] text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              关于
            </Link>
            <Link
              href="/contact"
              className="font-['MiSans'] text-foreground hover:text-primary transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              联系
            </Link>
            <Link
              href="/editor"
              className="font-['MiSans'] text-foreground hover:text-primary transition-colors py-2 bg-muted rounded-md text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              写文章
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
