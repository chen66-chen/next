const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLinuxArticles() {
  console.log('开始更新Linux文章内容...');

  try {
    // 更新 linux-1 文章
    await updateLinux1Article();
    // 更新 linux-2 文章
    await updateLinux2Article();
    // 更新 linux-3 文章
    await updateLinux3Article();
    
    console.log('所有Linux文章内容更新完成');
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

// 更新Linux文件系统详解文章
async function updateLinux2Article() {
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
}

// 更新Linux Shell脚本编程精通文章
async function updateLinux3Article() {
  const linuxArticle = await prisma.post.findFirst({
    where: {
      OR: [
        { slug: 'linux-3' },
        { slug: 'linux-shell-scripting' }
      ]
    }
  });

  if (!linuxArticle) {
    console.log('找不到Linux Shell脚本编程文章');
    return;
  }

  const newContent = `# Linux Shell脚本编程精通

## 什么是Shell脚本？

Shell脚本是一种在Linux/Unix环境中运行的脚本语言，它将一系列命令组织在一个文件中顺序执行。Shell脚本为系统管理、自动化任务、数据处理提供了强大的工具。常见的Shell包括Bash(Bourne Again Shell)、Zsh、Fish等，其中Bash是Linux系统中最常用的Shell。

## Shell脚本基础

### 创建第一个Shell脚本

1. 创建一个文本文件，扩展名为.sh（例如 myscript.sh）
2. 文件第一行添加 shebang，指定解释器：\`#!/bin/bash\`
3. 添加脚本内容
4. 赋予执行权限：\`chmod +x myscript.sh\`
5. 运行脚本：\`./myscript.sh\`

### 基本语法

#### 变量

\`\`\`bash
# 定义变量（注意等号两边不能有空格）
NAME="Linux"
AGE=30

# 使用变量
echo "名称: $NAME, 存在时间: $AGE 年"

# 只读变量
readonly CONSTANT="不可改变的值"

# 删除变量
unset AGE
\`\`\`

#### 字符串操作

```bash
STR="Hello World"

# 字符串长度
echo ${#STR}  # 输出: 11

# 子字符串
echo ${STR:0:5}  # 输出: Hello

# 字符串替换
echo ${STR/World/Linux}  # 输出: Hello Linux
```

#### 数组

```bash
# 定义数组
FRUITS=("Apple" "Banana" "Cherry")

# 访问数组元素
echo ${FRUITS[0]}  # 输出: Apple

# 所有元素
echo ${FRUITS[@]}  # 输出: Apple Banana Cherry

# 数组长度
echo ${#FRUITS[@]}  # 输出: 3
```

## 流程控制

### 条件语句

#### if-else 语句

```bash
#!/bin/bash

AGE=25

if [ $AGE -lt 18 ]
then
  echo "未成年"
elif [ $AGE -ge 18 ] && [ $AGE -lt 60 ]
then
  echo "成年人"
else
  echo "老年人"
fi
```

#### case 语句

```bash
#!/bin/bash

FRUIT="Apple"

case $FRUIT in
  "Apple")
    echo "这是苹果"
    ;;
  "Banana")
    echo "这是香蕉"
    ;;
  "Cherry")
    echo "这是樱桃"
    ;;
  *)
    echo "未知水果"
    ;;
esac
```

### 循环语句

#### for 循环

```bash
#!/bin/bash

# 基本for循环
for i in 1 2 3 4 5
do
  echo "数字: $i"
done

# 遍历数组
FRUITS=("Apple" "Banana" "Cherry")
for FRUIT in "${FRUITS[@]}"
do
  echo "水果: $FRUIT"
done

# C风格for循环
for ((i=0; i<5; i++))
do
  echo "计数: $i"
done
```

#### while 循环

```bash
#!/bin/bash

COUNT=0
while [ $COUNT -lt 5 ]
do
  echo "计数: $COUNT"
  ((COUNT++))
done
```

#### until 循环

```bash
#!/bin/bash

COUNT=0
until [ $COUNT -ge 5 ]
do
  echo "计数: $COUNT"
  ((COUNT++))
done
```

## 函数

### 函数定义与调用

```bash
#!/bin/bash

# 定义函数
function greet {
  echo "Hello, $1!"
}

# 调用函数
greet "World"  # 输出: Hello, World!

# 带返回值的函数
function add {
  local RESULT=$(($1 + $2))
  echo $RESULT
}

# 获取函数返回值
SUM=$(add 5 3)
echo "5 + 3 = $SUM"  # 输出: 5 + 3 = 8
```

## 文件操作

### 读取文件

```bash
#!/bin/bash

# 逐行读取文件
while read LINE
do
  echo "$LINE"
done < filename.txt

# 使用cat和循环
cat filename.txt | while read LINE
do
  echo "$LINE"
done
```

### 文件测试操作符

```bash
FILE="test.txt"

# 检查文件是否存在
if [ -f "$FILE" ]
then
  echo "$FILE 存在"
fi

# 检查目录是否存在
if [ -d "/tmp" ]
then
  echo "/tmp 目录存在"
fi

# 检查文件是否可读
if [ -r "$FILE" ]
then
  echo "$FILE 可读"
fi
```

## 正则表达式

```bash
#!/bin/bash

STRING="Linux Shell 脚本编程"

# 使用正则表达式匹配
if [[ $STRING =~ "Shell" ]]
then
  echo "匹配成功"
fi

# 使用grep进行正则匹配
echo $STRING | grep -E "Shell"
```

## 实用技巧

### 命令替换

```bash
# 旧语法
CURRENT_DATE=\`date\`

# 新语法（推荐）
CURRENT_DATE=$(date)

echo "当前日期是: $CURRENT_DATE"
```

### 重定向

```bash
# 将输出重定向到文件
echo "Hello World" > output.txt

# 追加到文件
echo "Another line" >> output.txt

# 重定向错误
command 2> error.log

# 重定向标准输出和错误
command > output.txt 2>&1
```

### 调试脚本

```bash
# 添加在脚本开头
set -x  # 打开调试模式
set -e  # 遇到错误时退出
```

### 信号处理

```bash
#!/bin/bash

# 捕获Ctrl+C信号
trap "echo '捕获到Ctrl+C信号，清理工作...'; exit" SIGINT

# 脚本结束时执行清理
trap "echo '脚本结束，开始清理...'" EXIT

echo "脚本正在运行，按Ctrl+C终止..."
sleep 60
```

## 高级主题

### 进程管理

```bash
# 在后台运行命令
command &

# 查看进程ID
echo $!  # 最后一个后台进程ID
echo $$  # 当前Shell进程ID

# 等待后台进程
wait $PID
```

### 脚本参数

```bash
#!/bin/bash

# 参数获取
echo "脚本名称: $0"
echo "第一个参数: $1"
echo "第二个参数: $2"
echo "所有参数: $@"
echo "参数个数: $#"

# 使用getopts处理选项
while getopts "a:b:" OPTION
do
  case $OPTION in
    a)
      echo "选项 -a 的值: $OPTARG"
      ;;
    b)
      echo "选项 -b 的值: $OPTARG"
      ;;
    ?)
      echo "无效选项"
      exit 1
      ;;
  esac
done
```

## 最佳实践

1. **脚本文档化** - 添加注释解释脚本用途和使用方法
2. **错误处理** - 使用条件检查和退出码处理错误情况
3. **模块化** - 将通用功能封装为函数以便重用
4. **安全性** - 验证用户输入，避免注入攻击
5. **可维护性** - 使用一致的代码风格和命名约定

## 结论

Shell脚本是Linux/Unix环境中自动化任务的强大工具。通过掌握本文介绍的基础知识和高级技巧，你将能够编写高效、可靠的Shell脚本来简化日常工作和系统管理任务。随着实践经验的积累，你可以创建更加复杂和实用的脚本来满足各种需求。`;

  // 更新文章内容
  await prisma.post.update({
    where: { id: linuxArticle.id },
    data: { content: newContent }
  });

  console.log(`成功更新了文章: Linux Shell脚本编程精通 (${linuxArticle.slug})`);
}

// 运行更新脚本
updateLinuxArticles().catch(console.error); 