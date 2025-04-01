'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  FileText,
  RefreshCw, 
  PlusCircle,
  Pencil,
  Trash2,
  Check,
  X,
  Loader2,
  Eye,
  EyeOff
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  coverImage?: string;
  author: {
    id: string;
    name: string;
  };
  category?: {
    id: string;
    name: string;
  };
  tags: {
    id: string;
    name: string;
  }[];
}

interface Category {
  id: string;
  name: string;
}

interface Tag {
  id: string;
  name: string;
}

export default function PostsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showDrafts, setShowDrafts] = useState(true);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newTag, setNewTag] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    coverImage: '',
    slug: '',
    published: false,
    categoryId: 'none',
  });
  const [actionLoading, setActionLoading] = useState(false);

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      } else {
        fetchPosts();
        fetchMetadata();
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router, currentPage, showDrafts]);

  // 获取文章列表
  const fetchPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/posts?page=${currentPage}&limit=10&drafts=${showDrafts}`
      );
      if (!response.ok) throw new Error('获取文章列表失败');
      
      const data = await response.json();
      setPosts(data.posts);
      setTotalPages(data.pagination.pages);
    } catch (error) {
      console.error(error);
      toast.error('获取文章列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取分类和标签
  const fetchMetadata = async () => {
    try {
      const response = await fetch(`/api/admin/posts?_method=OPTIONS`);
      if (!response.ok) throw new Error('获取分类和标签失败');
      
      const data = await response.json();
      setCategories(data.categories || []);
      setTags(data.tags || []);
    } catch (error) {
      console.error(error);
      toast.error('获取分类和标签失败');
    }
  };

  // 创建文章
  const handleAddPost = async () => {
    if (!formData.title || !formData.content) {
      toast.error('请填写标题和内容');
      return;
    }

    setActionLoading(true);
    try {
      // 构建请求数据
      const postData = {
        ...formData,
        // 如果categoryId是'none'则发送null
        categoryId: formData.categoryId === 'none' ? null : formData.categoryId,
        // @ts-ignore - 我们已经在JWT中添加了id字段
        authorId: session?.user?.id,
        tags: selectedTags
      };

      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '创建文章失败');
      
      toast.success('文章创建成功');
      setIsAddDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || '创建文章失败');
    } finally {
      setActionLoading(false);
    }
  };

  // 更新文章
  const handleUpdatePost = async () => {
    if (!selectedPost) return;

    setActionLoading(true);
    try {
      // 构建请求数据
      const updateData = {
        ...(formData.title !== selectedPost.title ? { title: formData.title } : {}),
        ...(formData.content ? { content: formData.content } : {}),
        ...(formData.excerpt !== selectedPost.excerpt ? { excerpt: formData.excerpt } : {}),
        ...(formData.coverImage ? { coverImage: formData.coverImage } : {}),
        ...(formData.slug !== selectedPost.slug ? { slug: formData.slug } : {}),
        ...(formData.published !== selectedPost.published ? { published: formData.published } : {}),
        ...(formData.categoryId !== (selectedPost.category?.id || 'none') ? { categoryId: formData.categoryId === 'none' ? null : formData.categoryId } : {}),
        tags: selectedTags
      };

      if (Object.keys(updateData).length === 0) {
        toast.error('请至少修改一个字段');
        setActionLoading(false);
        return;
      }

      const response = await fetch(`/api/admin/posts/${selectedPost.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || '更新文章失败');
      
      toast.success('文章更新成功');
      setIsEditDialogOpen(false);
      resetForm();
      fetchPosts();
    } catch (error: any) {
      toast.error(error.message || '更新文章失败');
    } finally {
      setActionLoading(false);
    }
  };

  // 打开删除确认对话框
  const openDeleteDialog = (post: Post) => {
    setSelectedPost(post);
    setIsDeleteDialogOpen(true);
  };

  // 删除文章
  const handleDeletePost = async () => {
    if (!selectedPost) return;
    
    setActionLoading(true);
    try {
      const response = await fetch(`/api/admin/posts/${selectedPost.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('删除文章失败');
      
      // 更新文章列表
      setPosts(posts.filter(p => p.id !== selectedPost.id));
      setIsDeleteDialogOpen(false);
      setSelectedPost(null);
      toast.success('文章已删除');
    } catch (error) {
      console.error(error);
      toast.error('删除文章失败');
    } finally {
      setActionLoading(false);
    }
  };

  // 打开编辑对话框
  const openEditDialog = async (post: Post) => {
    setSelectedPost(post);
    setFormData({
      title: post.title,
      content: '', // 先置空，然后获取完整内容
      excerpt: post.excerpt || '',
      coverImage: post.coverImage || '',
      slug: post.slug,
      published: post.published,
      categoryId: post.category?.id || 'none',
    });
    
    // 设置已选标签
    setSelectedTags(post.tags.map(tag => tag.name));
    
    // 获取完整文章内容
    try {
      const response = await fetch(`/api/admin/posts/${post.id}`);
      if (!response.ok) throw new Error('获取文章详情失败');
      
      const data = await response.json();
      setFormData(prev => ({
        ...prev,
        content: data.content
      }));
    } catch (error) {
      console.error(error);
      toast.error('获取文章详情失败');
    }
    
    setIsEditDialogOpen(true);
  };

  // 处理标签
  const handleAddTag = () => {
    if (!newTag.trim()) return;
    
    if (!selectedTags.includes(newTag)) {
      setSelectedTags(prev => [...prev, newTag]);
    }
    
    setNewTag('');
  };

  const handleRemoveTag = (tag: string) => {
    setSelectedTags(prev => prev.filter(t => t !== tag));
  };

  // 生成Slug
  const generateSlug = () => {
    if (!formData.title) {
      toast.error('请先填写标题');
      return;
    }
    
    const slug = formData.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
      
    setFormData({
      ...formData,
      slug
    });
  };

  // 重置表单
  const resetForm = () => {
    setFormData({
      title: '',
      content: '',
      excerpt: '',
      coverImage: '',
      slug: '',
      published: false,
      categoryId: 'none',
    });
    setSelectedTags([]);
    setNewTag('');
    setSelectedPost(null);
  };

  // 分页处理
  const handlePagination = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // 切换显示草稿
  const toggleShowDrafts = () => {
    setShowDrafts(prev => !prev);
    setCurrentPage(1);
  };

  // 加载状态
  if (status === 'loading') {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  // 格式化日期
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">内容管理</h1>
        <Button onClick={() => setIsAddDialogOpen(true)}>
          <PlusCircle className="h-4 w-4 mr-2" />
          新建文章
        </Button>
      </div>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>文章列表</CardTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  checked={showDrafts}
                  onCheckedChange={toggleShowDrafts}
                  id="show-drafts"
                />
                <Label htmlFor="show-drafts">显示草稿</Label>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={fetchPosts}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                刷新
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : posts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>标题</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>作者</TableHead>
                    <TableHead>创建时间</TableHead>
                    <TableHead>更新时间</TableHead>
                    <TableHead className="text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {posts.map((post) => (
                    <TableRow key={post.id}>
                      <TableCell className="font-medium">
                        <div className="truncate max-w-[200px]" title={post.title}>
                          {post.title}
                        </div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]" title={post.excerpt}>
                          {post.excerpt || '无摘要'}
                        </div>
                      </TableCell>
                      <TableCell>
                        {post.published ? (
                          <Badge variant="success" className="bg-green-100 text-green-800">已发布</Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-100 text-gray-800">草稿</Badge>
                        )}
                      </TableCell>
                      <TableCell>{post.author?.name || '-'}</TableCell>
                      <TableCell>{formatDate(post.createdAt)}</TableCell>
                      <TableCell>{formatDate(post.updatedAt)}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => openEditDialog(post)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => openDeleteDialog(post)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {/* 分页 */}
              {totalPages > 1 && (
                <div className="flex justify-center mt-4 gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePagination(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    上一页
                  </Button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <Button
                      key={page}
                      variant={page === currentPage ? "default" : "outline"}
                      size="sm"
                      onClick={() => handlePagination(page)}
                    >
                      {page}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePagination(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    下一页
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-10 w-10 text-gray-400 mx-auto" />
              <p className="mt-2 text-sm text-gray-500">暂无文章</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* 添加文章对话框 */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>创建新文章</DialogTitle>
            <DialogDescription>
              编写并发布一篇新文章
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">内容</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">标题 *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="文章标题"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">内容 *</Label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="文章内容"
                  rows={12}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="excerpt">摘要</Label>
                <Textarea
                  id="excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="文章摘要"
                  rows={3}
                />
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="slug">
                  Slug
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 text-xs"
                    onClick={generateSlug}
                  >
                    从标题生成
                  </Button>
                </Label>
                <Input
                  id="slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="article-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="coverImage">封面图片URL</Label>
                <Input
                  id="coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">分类</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value: string) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无分类</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">标签</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="添加标签"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    添加
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="published">
                  {formData.published ? '立即发布' : '保存为草稿'}
                </Label>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleAddPost} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {formData.published ? '发布文章' : '保存草稿'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑文章对话框 */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>编辑文章</DialogTitle>
            <DialogDescription>
              修改文章内容和设置
            </DialogDescription>
          </DialogHeader>
          <Tabs defaultValue="content" className="w-full">
            <TabsList className="mb-4">
              <TabsTrigger value="content">内容</TabsTrigger>
              <TabsTrigger value="settings">设置</TabsTrigger>
            </TabsList>
            <TabsContent value="content" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-title">标题</Label>
                <Input
                  id="edit-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="文章标题"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-content">内容</Label>
                <Textarea
                  id="edit-content"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="文章内容"
                  rows={12}
                  className="resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-excerpt">摘要</Label>
                <Textarea
                  id="edit-excerpt"
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="文章摘要"
                  rows={3}
                />
              </div>
            </TabsContent>
            <TabsContent value="settings" className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="edit-slug">
                  Slug
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="ml-2 text-xs"
                    onClick={generateSlug}
                  >
                    从标题生成
                  </Button>
                </Label>
                <Input
                  id="edit-slug"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="article-url-slug"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-coverImage">封面图片URL</Label>
                <Input
                  id="edit-coverImage"
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">分类</Label>
                <Select
                  value={formData.categoryId}
                  onValueChange={(value: string) => setFormData({ ...formData, categoryId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="选择分类" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">无分类</SelectItem>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tags">标签</Label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {selectedTags.map(tag => (
                    <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => handleRemoveTag(tag)}
                      />
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    id="edit-newTag"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    placeholder="添加标签"
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button type="button" onClick={handleAddTag} variant="outline">
                    添加
                  </Button>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="edit-published"
                  checked={formData.published}
                  onCheckedChange={(checked: boolean) => setFormData({ ...formData, published: checked })}
                />
                <Label htmlFor="edit-published">
                  {formData.published ? '已发布' : '草稿'}
                </Label>
              </div>
            </TabsContent>
          </Tabs>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              取消
            </Button>
            <Button onClick={handleUpdatePost} disabled={actionLoading}>
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中
                </>
              ) : (
                <>
                  <Check className="mr-2 h-4 w-4" />
                  {formData.published ? '更新并发布' : '保存为草稿'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除文章确认框 */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>确认删除文章</AlertDialogTitle>
            <AlertDialogDescription>
              您确定要删除文章 "{selectedPost?.title}" 吗？此操作无法撤销。
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePost}
              disabled={actionLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  处理中
                </>
              ) : (
                <>
                  <Trash2 className="mr-2 h-4 w-4" />
                  确认删除
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
} 