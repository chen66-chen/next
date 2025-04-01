import fs from 'fs';
import path from 'path';
import { posts } from '../data/posts';

// 文章存储目录
const POSTS_DIR = path.join(process.cwd(), 'data/posts');

// 确保目录存在
if (!fs.existsSync(POSTS_DIR)) {
  fs.mkdirSync(POSTS_DIR, { recursive: true });
  console.log('创建目录成功:', POSTS_DIR);
}

// 转换文章格式
const convertedPosts = posts.map(post => {
  // 添加必要的额外字段，使其与管理后台生成的文章格式匹配
  return {
    ...post,
    published: true,
    content: `这是从示例文章导入的内容。\n\n${post.description}\n\n这里可以添加更多内容。`,
    // 确保有createdAt和updatedAt字段
    createdAt: post.date,
    updatedAt: new Date().toISOString(),
    // 转换标签格式
    tags: Array.isArray(post.tags) ? post.tags : []
  };
});

// 保存文章到JSON文件
let successCount = 0;
let errorCount = 0;

convertedPosts.forEach(post => {
  try {
    const filePath = path.join(POSTS_DIR, `${post.id}.json`);
    
    // 检查文件是否已存在
    if (fs.existsSync(filePath)) {
      console.log(`文件已存在，跳过: ${post.id}`);
      return;
    }
    
    // 使用UTF-8编码保存JSON文件
    fs.writeFileSync(filePath, JSON.stringify(post, null, 2), 'utf8');
    console.log(`成功保存文章: ${post.title} (${post.id})`);
    successCount++;
  } catch (error) {
    console.error(`保存文章失败 ${post.id}:`, error);
    errorCount++;
  }
});

console.log('\n迁移完成!');
console.log(`成功: ${successCount} 文章`);
console.log(`失败: ${errorCount} 文章`);
console.log('\n现在您可以在管理后台中查看和编辑这些文章了。'); 