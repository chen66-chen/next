import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSettings, saveSettings, SiteSettings } from './actions';

// 获取系统设置
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

    // 获取系统设置
    const settings = await getSettings();
    
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '获取系统设置失败' },
      { status: 500 }
    );
  }
}

// 更新系统设置
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
    const data: Partial<SiteSettings> = await req.json();
    
    // 验证数据
    if (Object.keys(data).length === 0) {
      return NextResponse.json(
        { error: '请提供至少一个设置项' },
        { status: 400 }
      );
    }
    
    // 保存设置
    const updatedSettings = await saveSettings(data);
    
    return NextResponse.json(updatedSettings);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || '保存系统设置失败' },
      { status: 500 }
    );
  }
} 