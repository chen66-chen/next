'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  UserIcon,
  RefreshCw, 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

export default function UsersManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      } else {
        // 这里可以添加获取用户列表的API调用
        setLoading(false);
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
      <h1 className="text-2xl font-bold mb-8">用户管理</h1>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>用户列表</CardTitle>
            <Button
              variant="outline"
              size="sm"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <UserIcon className="h-10 w-10 text-gray-400 mx-auto" />
            <p className="mt-2 text-sm text-gray-500">用户管理功能正在开发中...</p>
            <Button variant="outline" className="mt-4" onClick={() => router.push('/admin/comments')}>
              去评论管理
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 