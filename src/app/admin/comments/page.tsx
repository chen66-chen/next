'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  Filter, 
  RefreshCw, 
  ChevronLeft, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

type Comment = {
  id: string;
  content: string;
  postId: string;
  postSlug: string;
  status: string;
  createdAt: string;
  user: {
    id: string;
    name: string;
    image: string;
  };
};

export default function CommentsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('pending');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 检查用户是否有管理员权限
  useEffect(() => {
    if (status === 'authenticated') {
      // @ts-ignore - 我们已经在JWT中添加了role字段
      if (session?.user?.role !== 'admin') {
        router.push('/');
        toast.error('您没有访问此页面的权限');
      } else {
        fetchComments();
      }
    } else if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [session, status, router, currentTab, currentPage]);

  // 获取评论列表
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `/api/admin/comments?status=${currentTab}&page=${currentPage}&limit=10`
      );
      
      if (response.ok) {
        const data = await response.json();
        setComments(data.comments || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        toast.error('获取评论失败');
      }
    } catch (error) {
      console.error('获取评论列表出错:', error);
      toast.error('获取评论列表出错');
    } finally {
      setLoading(false);
    }
  };

  // 批准评论
  const approveComment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/comments/${id}/approve`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        toast.success('评论已批准');
        // 更新评论列表
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        toast.error('批准评论失败');
      }
    } catch (error) {
      console.error('批准评论出错:', error);
      toast.error('批准评论出错');
    }
  };

  // 拒绝评论
  const rejectComment = async (id: string) => {
    try {
      const response = await fetch(`/api/admin/comments/${id}/reject`, {
        method: 'PUT',
      });
      
      if (response.ok) {
        toast.success('评论已拒绝');
        // 更新评论列表
        setComments(comments.filter(comment => comment.id !== id));
      } else {
        toast.error('拒绝评论失败');
      }
    } catch (error) {
      console.error('拒绝评论出错:', error);
      toast.error('拒绝评论出错');
    }
  };

  // 获取状态标签
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">待审核</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">已批准</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">已拒绝</Badge>;
      default:
        return <Badge variant="outline">未知</Badge>;
    }
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
      <h1 className="text-2xl font-bold mb-8">评论管理</h1>
      
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>评论列表</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={fetchComments}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              刷新
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="pending" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">待审核</TabsTrigger>
              <TabsTrigger value="approved">已批准</TabsTrigger>
              <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              <TabsTrigger value="">全部</TabsTrigger>
            </TabsList>
            
            <TabsContent value={currentTab} className="space-y-4">
              {loading ? (
                <div className="text-center py-8">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                  <p className="mt-2 text-sm text-gray-500">加载中...</p>
                </div>
              ) : comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <div 
                      key={comment.id} 
                      className="border rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          {/* 用户头像 */}
                          <div className="flex-shrink-0">
                            {comment.user?.image ? (
                              <img 
                                src={comment.user.image} 
                                alt={comment.user.name || '用户'} 
                                className="w-10 h-10 rounded-full"
                              />
                            ) : (
                              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">{(comment.user?.name || '?')[0]}</span>
                              </div>
                            )}
                          </div>
                          
                          {/* 评论内容 */}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center mb-1">
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                                {comment.user?.name || '匿名用户'}
                              </p>
                              <span className="mx-2 text-gray-300">•</span>
                              <p className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                              </p>
                              <span className="mx-2 text-gray-300">•</span>
                              {getStatusBadge(comment.status)}
                            </div>
                            <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap break-words">
                              {comment.content}
                            </p>
                            <div className="mt-2 text-xs text-gray-500">
                              文章ID: {comment.postId}
                            </div>
                          </div>
                        </div>
                        
                        {/* 操作按钮 */}
                        {comment.status === 'pending' && (
                          <div className="flex space-x-2 ml-4">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => approveComment(comment.id)}
                              className="text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="h-4 w-4 mr-1" />
                              批准
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => rejectComment(comment.id)}
                              className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              拒绝
                            </Button>
                          </div>
                        )}
                        
                        {comment.status === 'rejected' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => approveComment(comment.id)}
                            className="text-green-600 hover:text-green-700 border-green-600 hover:bg-green-50"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            批准
                          </Button>
                        )}
                        
                        {comment.status === 'approved' && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => rejectComment(comment.id)}
                            className="text-red-600 hover:text-red-700 border-red-600 hover:bg-red-50"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            拒绝
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {/* 分页控制 */}
                  {totalPages > 1 && (
                    <div className="flex justify-center items-center space-x-2 mt-6">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <ChevronLeft className="h-4 w-4" />
                      </Button>
                      <span className="text-sm">
                        第 {currentPage} 页，共 {totalPages} 页
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage >= totalPages}
                      >
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-8">
                  <AlertCircle className="h-10 w-10 text-gray-400 mx-auto" />
                  <p className="mt-2 text-sm text-gray-500">暂无{currentTab === 'pending' ? '待审核' : currentTab === 'approved' ? '已批准' : currentTab === 'rejected' ? '已拒绝' : ''}评论</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
} 