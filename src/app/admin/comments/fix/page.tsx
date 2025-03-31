'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
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

export default function FixedCommentsManagement() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState<string | null>(null);

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

  // 获取评论列表 - 使用修复版API
  const fetchComments = async () => {
    setLoading(true);
    setError(null);
    try {
      // 使用修复的API端点
      const response = await fetch(
        `/api/admin/fix-comments?status=${currentTab}&page=${currentPage}&limit=10`
      );
      
      if (response.ok) {
        const data = await response.json();
        console.log("API返回数据:", data);
        setComments(data.comments || []);
        setTotalPages(data.pagination?.pages || 1);
      } else {
        const errorData = await response.json();
        console.error("API错误:", errorData);
        setError(errorData.error || '获取评论失败');
        toast.error('获取评论失败');
      }
    } catch (error) {
      console.error('获取评论列表出错:', error);
      setError(String(error));
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
        fetchComments();
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
        fetchComments();
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
      <h1 className="text-2xl font-bold mb-8">评论管理 (修复版)</h1>
      
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
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md">
              <p className="font-semibold">发生错误:</p>
              <p className="text-sm">{error}</p>
            </div>
          )}
          <Tabs defaultValue="" value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-4">
              <TabsTrigger value="pending">待审核</TabsTrigger>
              <TabsTrigger value="approved">已批准</TabsTrigger>
              <TabsTrigger value="rejected">已拒绝</TabsTrigger>
              <TabsTrigger value="">全部</TabsTrigger>
            </TabsList>
            
            <TabsContent value={currentTab} className="space-y-4">
              {loading ? (
                <div className="flex justify-center items-center py-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : comments.length > 0 ? (
                <>
                  {comments.map((comment) => (
                    <div 
                      key={comment.id}
                      className="p-4 border border-gray-200 rounded-md hover:bg-gray-50"
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
                          {comment.user?.image && (
                            <img 
                              src={comment.user.image} 
                              alt={comment.user.name || '用户'} 
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{comment.user?.name || '匿名用户'}</p>
                              <p className="text-xs text-gray-500">
                                {new Date(comment.createdAt).toLocaleString()}
                              </p>
                            </div>
                            <div>
                              {getStatusBadge(comment.status)}
                            </div>
                          </div>
                          <div className="mt-2 text-sm">
                            {comment.content}
                          </div>
                          <div className="mt-3 flex justify-between items-center">
                            <div className="text-xs text-gray-500">
                              文章ID: {comment.postId}
                            </div>
                            <div className="flex space-x-2">
                              {(comment.status === 'pending' || comment.status === 'rejected') && (
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
                              
                              {(comment.status === 'pending' || comment.status === 'approved') && (
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
                        </div>
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