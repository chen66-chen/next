'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  PanelLeft, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  MessageSquare,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { NavItem } from '@/types/navigation';
import { toast } from 'sonner';

// 管理员导航项
const adminNavItems: NavItem[] = [
  {
    title: "控制面板",
    href: "/admin",
    icon: <PanelLeft className="h-5 w-5" />,
  },
  {
    title: "用户管理",
    href: "/admin/users",
    icon: <Users className="h-5 w-5" />,
  },
  {
    title: "评论管理",
    href: "/admin/comments",
    icon: <MessageSquare className="h-5 w-5" />,
  },
  {
    title: "内容管理",
    href: "/admin/posts",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    title: "设置",
    href: "/admin/settings",
    icon: <Settings className="h-5 w-5" />,
  },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  // 加载状态
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* 侧边栏 */}
      <aside className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 hidden md:block">
        <div className="h-full flex flex-col">
          {/* 管理后台标题 */}
          <div className="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
            <h1 className="text-lg font-semibold">管理后台</h1>
          </div>
          
          {/* 导航菜单 */}
          <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center px-4 py-3 text-sm rounded-md transition-colors",
                  pathname === item.href || 
                  (item.href !== '/admin' && pathname?.startsWith(item.href))
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                )}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.title}</span>
              </Link>
            ))}
          </nav>
          
          {/* 底部操作区 */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <Link
              href="/"
              className="flex items-center justify-between w-full px-4 py-2 text-sm text-gray-600 dark:text-gray-400 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span>返回网站</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center w-full px-4 py-2 mt-2 text-sm text-red-600 dark:text-red-400 rounded-md hover:bg-red-50 dark:hover:bg-red-900/20"
            >
              <LogOut className="h-4 w-4 mr-2" />
              <span>退出登录</span>
            </Link>
          </div>
        </div>
      </aside>
      
      {/* 主内容区 */}
      <main className="flex-1 overflow-x-hidden">
        <div className="container py-8 px-4 md:px-8 mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
} 