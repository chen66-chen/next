'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Users,
  MessageSquare,
  FileText,
  Settings,
  LayoutDashboard
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

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
    <div className="container mx-auto py-10">
      <div className="flex items-center mb-8">
        <LayoutDashboard className="h-6 w-6 mr-2" />
        <h1 className="text-2xl font-bold">管理控制台</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* 用户管理卡片 */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Users className="h-5 w-5 mr-2 text-blue-600" />
              用户管理
            </CardTitle>
            <CardDescription>
              管理系统用户和权限
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">-</p>
            <p className="text-sm text-gray-500">注册用户总数</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/users')} className="w-full">
              进入管理
            </Button>
          </CardFooter>
        </Card>

        {/* 评论管理卡片 */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageSquare className="h-5 w-5 mr-2 text-green-600" />
              评论管理
            </CardTitle>
            <CardDescription>
              审核和管理用户评论
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">-</p>
            <p className="text-sm text-gray-500">待审核评论</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/comments')} className="w-full">
              进入管理
            </Button>
          </CardFooter>
        </Card>

        {/* 内容管理卡片 */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <FileText className="h-5 w-5 mr-2 text-purple-600" />
              内容管理
            </CardTitle>
            <CardDescription>
              管理博客文章和页面
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold">-</p>
            <p className="text-sm text-gray-500">已发布文章</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/posts')} className="w-full">
              进入管理
            </Button>
          </CardFooter>
        </Card>

        {/* 系统设置卡片 */}
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Settings className="h-5 w-5 mr-2 text-gray-600" />
              系统设置
            </CardTitle>
            <CardDescription>
              配置网站参数和选项
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mt-6">设置网站名称、描述等基本信息</p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => router.push('/admin/settings')} className="w-full">
              进入设置
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mt-10">
        <Card>
          <CardHeader>
            <CardTitle>系统状态</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">系统运行正常。更多系统监控功能正在开发中...</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 