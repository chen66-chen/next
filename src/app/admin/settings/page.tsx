'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Settings,
  Save,
  Loader2,
  Globe,
  MessagesSquare,
  FileImage,
  Link,
  Search
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';

interface SiteSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  logo: string;
  favicon: string;
  footer: string;
  postsPerPage: number;
  allowComments: boolean;
  moderateComments: boolean;
  socialLinks: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    github?: string;
    linkedin?: string;
  };
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
  };
}

export default function SiteSettings() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState<SiteSettings>({
    siteName: '',
    siteDescription: '',
    siteUrl: '',
    logo: '',
    favicon: '',
    footer: '',
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    socialLinks: {},
    seo: {}
  });

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      } else {
        fetchSettings();
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router]);

  // 获取系统设置
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings');
      if (!response.ok) throw new Error('获取系统设置失败');
      
      const data = await response.json();
      setSettings(data);
    } catch (error) {
      console.error(error);
      toast.error('获取系统设置失败');
    } finally {
      setLoading(false);
    }
  };

  // 保存系统设置
  const handleSaveSettings = async () => {
    setSaving(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || '保存设置失败');
      }
      
      toast.success('设置已保存');
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || '保存设置失败');
    } finally {
      setSaving(false);
    }
  };

  // 处理普通字段变更
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // 处理嵌套字段 (格式如: "socialLinks.twitter")
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setSettings(prev => ({
        ...prev,
        [parent]: {
          ...(prev[parent as keyof SiteSettings] as Record<string, string>),
          [child]: value
        }
      }));
    } else {
      // 数字转换
      if (name === 'postsPerPage') {
        setSettings(prev => ({
          ...prev,
          [name]: parseInt(value) || 10
        }));
      } else {
        setSettings(prev => ({
          ...prev,
          [name]: value
        }));
      }
    }
  };

  // 处理Switch开关变更
  const handleSwitchChange = (name: string, checked: boolean) => {
    setSettings(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  // 加载状态
  if (status === 'loading' || loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-8">系统设置</h1>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">基本设置</TabsTrigger>
          <TabsTrigger value="appearance">外观</TabsTrigger>
          <TabsTrigger value="comments">评论</TabsTrigger>
          <TabsTrigger value="social">社交链接</TabsTrigger>
          <TabsTrigger value="seo">SEO</TabsTrigger>
        </TabsList>
        
        {/* 基本设置 */}
        <TabsContent value="general">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Globe className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>网站基本信息</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">网站名称</Label>
                <Input
                  id="siteName"
                  name="siteName"
                  value={settings.siteName}
                  onChange={handleChange}
                  placeholder="我的博客"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteDescription">网站描述</Label>
                <Textarea
                  id="siteDescription"
                  name="siteDescription"
                  value={settings.siteDescription}
                  onChange={handleChange}
                  placeholder="一个使用Next.js构建的现代博客系统"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="siteUrl">网站URL</Label>
                <Input
                  id="siteUrl"
                  name="siteUrl"
                  value={settings.siteUrl}
                  onChange={handleChange}
                  placeholder="https://yourdomain.com"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="footer">页脚文本</Label>
                <Input
                  id="footer"
                  name="footer"
                  value={settings.footer}
                  onChange={handleChange}
                  placeholder="© 2025 我的博客. All rights reserved."
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 外观设置 */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <FileImage className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>网站外观</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo URL</Label>
                <Input
                  id="logo"
                  name="logo"
                  value={settings.logo}
                  onChange={handleChange}
                  placeholder="https://example.com/logo.png"
                />
                {settings.logo && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">预览:</p>
                    <img 
                      src={settings.logo} 
                      alt="Logo预览" 
                      className="h-10 object-contain"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="favicon">Favicon URL</Label>
                <Input
                  id="favicon"
                  name="favicon"
                  value={settings.favicon}
                  onChange={handleChange}
                  placeholder="https://example.com/favicon.ico"
                />
                {settings.favicon && (
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 mb-1">预览:</p>
                    <img 
                      src={settings.favicon} 
                      alt="Favicon预览" 
                      className="h-6 object-contain"
                      onError={(e) => e.currentTarget.style.display = 'none'}
                    />
                  </div>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="postsPerPage">每页显示文章数</Label>
                <Input
                  id="postsPerPage"
                  name="postsPerPage"
                  type="number"
                  min="1"
                  max="50"
                  value={settings.postsPerPage}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 评论设置 */}
        <TabsContent value="comments">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <MessagesSquare className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>评论设置</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowComments"
                  checked={settings.allowComments}
                  onCheckedChange={(checked: boolean) => handleSwitchChange('allowComments', checked)}
                />
                <Label htmlFor="allowComments">
                  允许评论
                </Label>
              </div>
              <p className="text-sm text-gray-500 ml-7">开启此选项允许用户在文章下发表评论</p>
              
              <Separator />
              
              <div className="flex items-center space-x-2">
                <Switch
                  id="moderateComments"
                  checked={settings.moderateComments}
                  onCheckedChange={(checked: boolean) => handleSwitchChange('moderateComments', checked)}
                  disabled={!settings.allowComments}
                />
                <Label htmlFor="moderateComments" className={!settings.allowComments ? 'text-gray-400' : ''}>
                  评论审核
                </Label>
              </div>
              <p className="text-sm text-gray-500 ml-7">开启此选项后，所有评论需要管理员审核后才能显示</p>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* 社交链接 */}
        <TabsContent value="social">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Link className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>社交媒体链接</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="socialLinks.twitter">Twitter</Label>
                <Input
                  id="socialLinks.twitter"
                  name="socialLinks.twitter"
                  value={settings.socialLinks.twitter || ''}
                  onChange={handleChange}
                  placeholder="https://twitter.com/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socialLinks.facebook">Facebook</Label>
                <Input
                  id="socialLinks.facebook"
                  name="socialLinks.facebook"
                  value={settings.socialLinks.facebook || ''}
                  onChange={handleChange}
                  placeholder="https://facebook.com/yourpage"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socialLinks.instagram">Instagram</Label>
                <Input
                  id="socialLinks.instagram"
                  name="socialLinks.instagram"
                  value={settings.socialLinks.instagram || ''}
                  onChange={handleChange}
                  placeholder="https://instagram.com/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socialLinks.github">GitHub</Label>
                <Input
                  id="socialLinks.github"
                  name="socialLinks.github"
                  value={settings.socialLinks.github || ''}
                  onChange={handleChange}
                  placeholder="https://github.com/yourusername"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="socialLinks.linkedin">LinkedIn</Label>
                <Input
                  id="socialLinks.linkedin"
                  name="socialLinks.linkedin"
                  value={settings.socialLinks.linkedin || ''}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/yourusername"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* SEO设置 */}
        <TabsContent value="seo">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <Search className="h-5 w-5 mr-2 text-gray-500" />
                <CardTitle>SEO设置</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seo.metaTitle">默认Meta标题</Label>
                <Input
                  id="seo.metaTitle"
                  name="seo.metaTitle"
                  value={settings.seo.metaTitle || ''}
                  onChange={handleChange}
                  placeholder="默认Meta标题（如果未设置将使用网站名称）"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seo.metaDescription">默认Meta描述</Label>
                <Textarea
                  id="seo.metaDescription"
                  name="seo.metaDescription"
                  value={settings.seo.metaDescription || ''}
                  onChange={handleChange}
                  placeholder="默认Meta描述（如果未设置将使用网站描述）"
                  rows={3}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="seo.keywords">关键词</Label>
                <Input
                  id="seo.keywords"
                  name="seo.keywords"
                  value={settings.seo.keywords || ''}
                  onChange={handleChange}
                  placeholder="以逗号分隔的关键词"
                />
                <p className="text-xs text-gray-500">使用逗号分隔多个关键词，例如: 博客,Next.js,React</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      <div className="mt-8 flex justify-end">
        <Button
          variant="outline"
          className="mr-2"
          onClick={() => router.push('/admin')}
        >
          返回
        </Button>
        <Button
          onClick={handleSaveSettings}
          disabled={saving}
        >
          {saving ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              保存中...
            </>
          ) : (
            <>
              <Save className="mr-2 h-4 w-4" />
              保存设置
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 