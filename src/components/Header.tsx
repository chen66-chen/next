'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { 
  Users, 
  Settings, 
  FileText,
  Home,
  Search,
  Menu,
  X,
  MessageSquare,
  PanelLeft,
  User
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { NavItem } from '@/types/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const adminItems: NavItem[] = [
  {
    title: "控制面板",
    href: "/admin",
    icon: <PanelLeft className="h-4 w-4" />,
    isAdmin: true,
  },
  {
    title: "用户管理",
    href: "/admin/users",
    icon: <Users className="h-4 w-4" />,
    isAdmin: true,
  },
  {
    title: "评论管理",
    href: "/admin/comments",
    icon: <MessageSquare className="h-4 w-4" />,
    isAdmin: true,
  },
  {
    title: "内容管理",
    href: "/admin/posts",
    icon: <FileText className="h-4 w-4" />,
    isAdmin: true,
  },
  {
    title: "设置",
    href: "/admin/settings",
    icon: <Settings className="h-4 w-4" />,
    isAdmin: true,
  },
];

export default function Header() {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // 监听滚动事件，添加背景效果
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 检查当前路径是否为管理员路径
  const isAdminPage = pathname?.startsWith('/admin');

  // 获取用户头像
  const getUserInitials = () => {
    if (session?.user?.name) {
      return session.user.name.substring(0, 2).toUpperCase();
    }
    return 'U';
  };

  return (
    <header
      className={cn(
        'sticky top-0 z-40 w-full transition-colors duration-300',
        isScrolled 
          ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm' 
          : 'bg-transparent'
      )}
    >
      <div className="container flex h-16 items-center px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          {/* 移动端菜单按钮 */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "关闭菜单" : "打开菜单"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="bg-gradient-to-r from-site1-primary via-site2-primary to-site3-primary text-transparent bg-clip-text font-['KuaiKanShiJieTi'] text-xl font-bold">
              小臣
            </span>
          </Link>
        </div>

        {/* 导航链接 - 桌面端 */}
        <nav className="hidden md:flex items-center space-x-4 ml-6">
          <Link 
            href="/" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span>首页</span>
          </Link>
          <Link 
            href="/search" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/search" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span>搜索</span>
          </Link>
          <Link 
            href="/about" 
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              pathname === "/about" ? "text-primary" : "text-muted-foreground"
            )}
          >
            <span>关于</span>
          </Link>
        </nav>

        {/* 右侧操作区 */}
        <div className="flex items-center ml-auto space-x-4">
          {/* 搜索按钮 */}
          <Link href="/search">
            <Button variant="ghost" size="icon" aria-label="Search">
              <Search className="h-5 w-5" />
            </Button>
          </Link>
          
          {/* 主题切换 */}
          <ThemeToggle />
          
          {/* 用户菜单 */}
          {session ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full" aria-label="User menu">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={session.user?.image || ''} alt={session.user?.name || ''} />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link href="/profile">
                    <User className="mr-2 h-4 w-4" />
                    个人资料
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                {/* 管理员菜单项 */}
                {session.user?.role === 'admin' && (
                  <>
                    <DropdownMenuLabel>管理</DropdownMenuLabel>
                    {adminItems.map((item) => (
                      <DropdownMenuItem key={item.href} asChild>
                        <Link href={item.href}>
                          {item.icon}
                          {item.title}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                    <DropdownMenuSeparator />
                  </>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout">退出登录</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login">
              <Button variant="default" size="sm">登录</Button>
            </Link>
          )}
        </div>
      </div>

      {/* 移动端菜单 */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setIsMenuOpen(false)}></div>
          <div className="fixed top-16 left-0 z-50 w-3/4 h-[calc(100vh-4rem)] bg-background border-r p-4 overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/" ? "bg-accent" : "hover:bg-accent/50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-2" />
                首页
              </Link>
              <Link
                href="/search"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/search" ? "bg-accent" : "hover:bg-accent/50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <Search className="h-4 w-4 mr-2" />
                搜索
              </Link>
              <Link
                href="/about"
                className={cn(
                  "flex items-center px-3 py-2 text-sm rounded-md",
                  pathname === "/about" ? "bg-accent" : "hover:bg-accent/50"
                )}
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                关于
              </Link>
              
              {/* 管理员菜单项 */}
              {session?.user?.role === 'admin' && (
                <>
                  <div className="h-px bg-border my-2"></div>
                  <div className="px-3 py-1 text-xs font-medium text-muted-foreground">管理选项</div>
                  {adminItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-2 text-sm rounded-md",
                        pathname === item.href ? "bg-accent" : "hover:bg-accent/50"
                      )}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon}
                      <span className="ml-2">{item.title}</span>
                    </Link>
                  ))}
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
} 