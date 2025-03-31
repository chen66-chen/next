'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Settings,
  Save
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function SiteSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    siteName: '我的博客',
    siteDescription: '一个使用Next.js构建的现代博客系统',
    logo: '',
    footer: '© 2025 我的博客. All rights reserved.'
  });

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      } else {
        // 这里可以添加获取设置的API调用
        setLoading(false);
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('设置保存成功（演示）');
  };

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
      <h1 className="text-2xl font-bold mb-8">系统设置</h1>
      
      <Card>
        <CardHeader>
          <div className="flex items-center">
            <Settings className="h-5 w-5 mr-2 text-gray-500" />
            <CardTitle>网站基本设置</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <Label htmlFor="siteName">网站名称</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="siteDescription">网站描述</Label>
                <Input
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                />
              </div>
              
              <div>
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  name="logo"
                  value={settings.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />
              </div>
              
              <div>
                <Label htmlFor="footer">页脚文本</Label>
                <Input
                  id="footer"
                  name="footer"
                  value={settings.footer}
                  onChange={handleChange}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.push('/admin')}>
            返回
          </Button>
          <Button onClick={handleSubmit}>
            <Save className="h-4 w-4 mr-2" />
            保存设置
          </Button>
        </CardFooter>
      </Card>
      
      <div className="text-center mt-8">
        <p className="text-sm text-gray-500">设置功能目前处于演示阶段，更多功能开发中...</p>
      </div>
    </div>
  );
} 