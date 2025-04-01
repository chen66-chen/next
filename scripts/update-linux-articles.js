const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLinuxArticles() {
  console.log('开始更新Linux-1文章内容...');

  try {
    // 更新 linux-1 文章
    await updateLinux1Article();
    
    console.log('Linux-1文章内容更新完成');
  } catch (error) {
    console.error('更新文章内容时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 更新Linux基础入门指南文章
async function updateLinux1Article() {
  const linuxArticle = await prisma.post.findFirst({
    where: {
      OR: [
        { slug: 'linux-1' },
        { slug: 'linux-basic-guide' }
      ]
    }
  });

  if (!linuxArticle) {
    console.log('找不到Linux基础入门指南文章');
    return;
  }

  const newContent = `# Linux基础入门指南

## 什么是Linux？

Linux是一个开源的类Unix操作系统，由Linus Torvalds在1991年创建。它是目前世界上使用最广泛的服务器操作系统，也是Android系统的基础。与其他操作系统不同，Linux是完全免费的，任何人都可以运行、研究、分享和修改软件。

## Linux的主要特点

- **开源免费**：Linux是自由软件，用户可以自由使用、复制、分发和修改
- **多用户多任务**：Linux支持多个用户同时登录系统，每个用户可以同时运行多个程序
- **安全稳定**：Linux有良好的安全机制和权限设计，系统稳定性高
- **可移植性强**：可以在多种硬件平台上运行，从嵌入式设备到超级计算机
- **标准化**：遵循POSIX标准，具有良好的兼容性

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

## Linux发行版介绍

Linux有众多发行版，每个发行版都有其特点和适用场景：

### Ubuntu
Ubuntu是最流行的Linux发行版之一，特别适合Linux新手。它提供了友好的用户界面和大量的软件包，使用户能够轻松地完成日常任务。

### Debian
Debian是一个由社区驱动的自由软件项目，以其稳定性和安全性著称。它是许多其他发行版的基础，包括Ubuntu。

### CentOS/RHEL
CentOS是Red Hat Enterprise Linux的社区版本，广泛用于服务器环境。它提供了长期支持和企业级的稳定性。

### Fedora
Fedora是一个由Red Hat赞助的社区项目，它注重创新和前沿技术。它通常包含最新的软件包和功能。

### Arch Linux
Arch Linux是一个轻量级的滚动发行版，适合高级用户。它提供了最新的软件包和高度的定制性。

## 推荐资源

1. 《鸟哥的Linux私房菜》
2. Linux官方文档
3. Linux基金会网站
4. [Linux命令大全](https://www.linuxcool.com/)
5. [Linux Journey](https://linuxjourney.com/)

希望这篇指南对Linux初学者有所帮助！`;

  // 更新文章内容
  await prisma.post.update({
    where: { id: linuxArticle.id },
    data: { content: newContent }
  });

  console.log(`成功更新了文章: Linux基础入门指南 (${linuxArticle.slug})`);
}

// 运行更新脚本
updateLinuxArticles().catch(console.error); 