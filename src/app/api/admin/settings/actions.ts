import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 系统设置接口
export interface SiteSettings {
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

/**
 * 获取系统设置
 */
export async function getSettings() {
  // 获取所有设置
  const settings = await prisma.setting.findMany();
  
  // 将设置转换为对象
  const settingsObject: Record<string, any> = {};
  
  for (const setting of settings) {
    try {
      // 尝试解析JSON值
      settingsObject[setting.key] = JSON.parse(setting.value);
    } catch (e) {
      // 如果不是JSON，直接使用值
      settingsObject[setting.key] = setting.value;
    }
  }
  
  // 设置默认值
  const defaultSettings: SiteSettings = {
    siteName: '我的博客',
    siteDescription: '一个使用Next.js构建的现代博客系统',
    siteUrl: 'https://yourdomain.com',
    logo: '',
    favicon: '',
    footer: '© 2025 我的博客. All rights reserved.',
    postsPerPage: 10,
    allowComments: true,
    moderateComments: true,
    socialLinks: {},
    seo: {}
  };
  
  // 合并默认设置和数据库设置
  return {
    ...defaultSettings,
    ...settingsObject
  };
}

/**
 * 保存系统设置
 */
export async function saveSettings(data: Partial<SiteSettings>) {
  const updatePromises = Object.entries(data).map(async ([key, value]) => {
    // 将对象转换为JSON字符串存储
    const valueToStore = typeof value === 'object' ? JSON.stringify(value) : String(value);
    
    // 使用upsert确保存在则更新，不存在则创建
    return prisma.setting.upsert({
      where: { key },
      update: { value: valueToStore },
      create: { key, value: valueToStore }
    });
  });
  
  // 批量更新所有设置
  await Promise.all(updatePromises);
  
  // 返回更新后的完整设置
  return getSettings();
} 