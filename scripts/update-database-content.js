const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateArticleContent() {
  console.log('开始更新文章内容...');

  try {
    // 使用 Prisma 查找并更新 Linux 基础指南文章
    const article = await prisma.post.findUnique({
      where: { slug: 'linux-basic-guide' }
    });

    if (!article) {
      console.log('找不到 linux-basic-guide 文章');
      return;
    }

    // 新的文章内容 - Markdown 格式
    const newContent = `# Linux基础入门指南

## 什么是Linux？

Linux是一个开源的类Unix操作系统，由Linus Torvalds在1991年创建。它是目前世界上使用最广泛的服务器操作系统，也是Android系统的基础。

## 常用命令

### 文件操作命令
- \`ls\` - 列出目录内容
- \`cd\` - 切换目录
- \`pwd\` - 显示当前工作目录
- \`mkdir\` - 创建新目录
- \`rm\` - 删除文件或目录
- \`cp\` - 复制文件或目录
- \`mv\` - 移动或重命名文件

### 文本处理命令
- \`cat\` - 查看文件内容
- \`grep\` - 搜索文本
- \`sed\` - 流编辑器
- \`awk\` - 文本处理工具

### 系统管理命令
- \`ps\` - 显示进程状态
- \`top\` - 监控系统资源使用
- \`df\` - 显示磁盘使用情况
- \`du\` - 显示目录空间使用情况

## Linux文件系统

Linux文件系统采用树状结构，主要目录包括：

- \`/bin\` - 基本命令
- \`/boot\` - 启动文件
- \`/dev\` - 设备文件
- \`/etc\` - 配置文件
- \`/home\` - 用户目录
- \`/lib\` - 共享库
- \`/usr\` - 用户程序
- \`/var\` - 可变数据

## 用户权限

Linux使用权限系统控制文件访问：
- 读(r) - 4
- 写(w) - 2
- 执行(x) - 1

使用 \`chmod\` 命令修改权限，如 \`chmod 755 file.txt\`

## 推荐资源

1. 《鸟哥的Linux私房菜》
2. Linux官方文档
3. Linux基金会网站

希望这篇指南对Linux初学者有所帮助！`;

    // 更新文章内容
    await prisma.post.update({
      where: { slug: 'linux-basic-guide' },
      data: { content: newContent }
    });

    console.log('成功更新了 linux-basic-guide 文章内容');
  } catch (error) {
    console.error('更新文章内容时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行更新
updateArticleContent(); 