import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getAllPosts, createPost, PostCreateData, getAllCategories, getAllTags } from './actions';

// 获取所有文章
export async function GET(req: NextRequest) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    // 获取分页参数
    const searchParams = req.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const showDrafts = searchParams.get('drafts') === 'true';

    // 获取文章列表
    const result = await getAllPosts(page, limit, showDrafts);
    
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取文章列表失败' },
      { status: 500 }
    );
  }
}

// 创建文章
export async function POST(req: NextRequest) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    // 获取请求数据
    const data: PostCreateData = await req.json();
    
    // 验证必填字段
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: '标题和内容为必填项' },
        { status: 400 }
      );
    }
    
    // 如果没有提供作者ID，使用当前用户
    if (!data.authorId) {
      data.authorId = session.user.id;
    }
    
    // 创建文章
    const post = await createPost(data);
    
    return NextResponse.json(post, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '创建文章失败' },
      { status: 500 }
    );
  }
}

// 获取所有分类
export async function OPTIONS(req: NextRequest) {
  try {
    // 检查权限
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'admin') {
      return NextResponse.json(
        { error: '无权访问' },
        { status: 403 }
      );
    }

    // 获取请求类型
    const type = req.nextUrl.searchParams.get('type');
    
    if (type === 'categories') {
      const categories = await getAllCategories();
      return NextResponse.json({ categories });
    } else if (type === 'tags') {
      const tags = await getAllTags();
      return NextResponse.json({ tags });
    } else {
      // 默认返回两者
      const [categories, tags] = await Promise.all([
        getAllCategories(),
        getAllTags()
      ]);
      
      return NextResponse.json({ categories, tags });
    }
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取分类/标签失败' },
      { status: 500 }
    );
  }
} 