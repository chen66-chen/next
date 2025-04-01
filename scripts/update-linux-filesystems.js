const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLinuxFilesystem() {
  console.log('开始更新Linux文件系统详解文章内容...');

  try {
    // 更新Linux文件系统详解文章
    const linuxArticle = await prisma.post.findFirst({
      where: {
        OR: [
          { slug: 'linux-2' },
          { slug: 'linux-filesystem' }
        ]
      }
    });

    if (!linuxArticle) {
      console.log('找不到Linux文件系统详解文章');
      return;
    }

    const newContent = `# Linux文件系统详解

## 文件系统概述

Linux文件系统是操作系统的核心组成部分，负责管理磁盘上的数据存储和组织。Linux支持多种文件系统格式，包括ext4、XFS、Btrfs等。文件系统提供了一种在物理存储设备上组织文件的方法，使用户和程序可以方便地访问和管理这些文件。

## 主要文件系统类型

### Ext4
- 第四代扩展文件系统
- 最常用的Linux文件系统
- 支持大文件(最大16TB)和大分区(最大1EB)
- 提供日志功能保护数据
- 向后兼容Ext2/Ext3

### XFS
- 高性能64位日志文件系统
- 适合大文件和高吞吐量场景
- 可扩展性强，支持单个文件系统高达8EB
- 具有高效的元数据管理
- 支持在线调整大小(仅限增加)

### Btrfs
- B-tree文件系统，也称为"Butter FS"
- 支持写时复制(CoW)技术
- 内置RAID功能
- 子卷和快照功能
- 数据校验和自我修复能力
- 支持在线调整大小(增加和减少)

### ZFS
- 高级存储文件系统(在Linux上通过模块使用)
- 数据完整性验证和自动修复
- 透明压缩和重复数据删除
- 快照和克隆功能
- 集成卷管理

## 目录结构标准

Linux采用文件系统层次标准(FHS)组织目录：

| 目录 | 用途 |
|------|------|
| /bin | 基本命令 |
| /boot | 启动文件 |
| /dev | 设备文件 |
| /etc | 配置文件 |
| /home | 用户目录 |
| /lib | 库文件 |
| /mnt | 挂载点 |
| /opt | 可选软件 |
| /proc | 进程信息 |
| /root | root用户目录 |
| /tmp | 临时文件 |
| /usr | 用户程序 |
| /var | 可变数据 |

## 文件管理命令

### 分区和格式化
- \`fdisk\` - 分区工具
- \`mkfs\` - 创建文件系统
- \`e2fsck\` - 检查文件系统错误
- \`parted\` - 分区管理工具
- \`gparted\` - 图形化分区工具

### 挂载管理
- \`mount\` - 挂载文件系统
- \`umount\` - 卸载文件系统
- \`/etc/fstab\` - 文件系统表配置
- \`blkid\` - 显示块设备属性
- \`lsblk\` - 列出块设备

### 空间管理
- \`df\` - 显示磁盘空间使用情况
- \`du\` - 显示目录空间使用情况
- \`quota\` - 用户磁盘配额管理
- \`ncdu\` - 交互式磁盘使用分析工具

## 高级特性

### 日志功能
日志文件系统可以记录对文件系统的更改，提高系统崩溃后的恢复能力。通过保存将要执行的操作，系统可以在重启后检查日志并完成未完成的操作或回滚失败的操作。

### 快照
某些文件系统(如Btrfs和ZFS)支持创建文件系统状态的快照，便于备份和恢复。快照是文件系统在特定时间点的只读视图，可以快速创建而不消耗额外空间(除非原始数据被修改)。

### RAID支持
软件RAID允许跨多个磁盘创建冗余阵列，提高性能和可靠性。Linux提供md(multiple devices)驱动程序来支持软件RAID，常见的RAID级别包括：

- RAID 0 (条带化) - 提高性能，无冗余
- RAID 1 (镜像) - 提供数据冗余
- RAID 5 (条带化+奇偶校验) - 平衡性能和冗余
- RAID 10 (镜像+条带化) - 高性能和冗余

## 性能优化

- **调整挂载选项**
  - \`noatime\` - 不更新访问时间
  - \`nodiratime\` - 不更新目录访问时间
  - \`data=writeback\` - 提高ext4性能

- **选择合适的文件系统**
  - 大量小文件 - ext4或XFS
  - 大文件 - XFS
  - 需要快照和数据完整性 - Btrfs或ZFS

- **调整文件系统参数**
  - 使用\`tune2fs\`调整ext文件系统参数
  - 使用\`xfs_admin\`调整XFS参数

- **I/O调度器选择**
  - 使用\`deadline\`或\`noop\`调度器用于SSD
  - 使用\`cfq\`调度器用于HDD

## 故障排除与修复

- \`fsck\` - 检查并修复文件系统错误
- \`testdisk\` - 修复分区表和恢复丢失的分区
- \`debugfs\` - ext文件系统调试工具
- \`xfs_repair\` - XFS文件系统修复工具

## 结论

在选择文件系统时，应根据具体应用场景、性能需求和数据安全要求进行评估。理解Linux文件系统的工作原理和特性有助于有效地管理和优化系统存储。`;

    // 更新文章内容
    await prisma.post.update({
      where: { id: linuxArticle.id },
      data: { content: newContent }
    });

    console.log(`成功更新了文章: Linux文件系统详解 (${linuxArticle.slug})`);
    
    console.log('文章内容更新完成');
  } catch (error) {
    console.error('更新文章内容时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行更新脚本
updateLinuxFilesystem().catch(console.error); 