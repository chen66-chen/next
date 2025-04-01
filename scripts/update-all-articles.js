const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateAllArticles() {
  console.log('开始批量更新所有文章内容...');

  try {
    // 获取所有文章
    const articles = await prisma.post.findMany();
    console.log(`找到 ${articles.length} 篇文章待更新`);

    // 更新每篇文章
    for (const article of articles) {
      // 根据文章slug选择要更新的内容
      let newContent = '';
      
      if (article.slug === 'linux-basic-guide') {
        newContent = getLinuxBasicGuideContent();
      } else if (article.slug === 'linux-filesystem') {
        newContent = getLinuxFileSystemContent();
      } else if (article.slug === 'linux-shell-scripting') {
        newContent = getLinuxShellScriptingContent();
      } else if (article.slug === 'ai-attention-mechanism') {
        newContent = getAIAttentionMechanismContent();
      } else if (article.slug === 'markdown-quick-start') {
        newContent = getMarkdownQuickStartContent();
      } else if (article.slug === 'network-security-learning') {
        newContent = getNetworkSecurityContent();
      } else {
        // 对于其他文章，生成通用内容
        newContent = `# ${article.title}

## 关于本文

这是关于${article.title}的详细内容。

## 主要内容

- 第一部分内容
- 第二部分内容
- 第三部分内容

## 详细说明

这里是详细的文章内容，将在之后补充。`;
      }

      // 更新文章内容
      await prisma.post.update({
        where: { id: article.id },
        data: { content: newContent }
      });

      console.log(`成功更新了文章: ${article.title} (${article.slug})`);
    }

    console.log('所有文章内容更新完成');
  } catch (error) {
    console.error('更新文章内容时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// Linux基础入门指南内容
function getLinuxBasicGuideContent() {
  return `# Linux基础入门指南

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
}

// Linux文件系统内容
function getLinuxFileSystemContent() {
  return `# Linux文件系统详解

## 文件系统概述

Linux文件系统是操作系统的核心组成部分，负责管理磁盘上的数据存储和组织。Linux支持多种文件系统格式，包括ext4、XFS、Btrfs等。

## 主要文件系统类型

### Ext4
- 第四代扩展文件系统
- 最常用的Linux文件系统
- 支持大文件和大分区
- 提供日志功能保护数据

### XFS
- 高性能64位日志文件系统
- 适合大文件和高吞吐量场景
- 可扩展性强

### Btrfs
- B-tree文件系统
- 支持写时复制(CoW)
- 内置RAID功能
- 子卷和快照功能

### ZFS
- 高级存储文件系统
- 数据完整性验证
- 自动修复功能
- 快照和克隆功能

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

### 挂载管理
- \`mount\` - 挂载文件系统
- \`umount\` - 卸载文件系统
- \`/etc/fstab\` - 文件系统表配置

### 空间管理
- \`df\` - 显示磁盘空间使用情况
- \`du\` - 显示目录空间使用情况
- \`quota\` - 用户磁盘配额管理

## 高级特性

### 日志功能
日志文件系统可以记录对文件系统的更改，提高系统崩溃后的恢复能力。

### 快照
某些文件系统(如Btrfs和ZFS)支持创建文件系统状态的快照，便于备份和恢复。

### RAID支持
软件RAID允许跨多个磁盘创建冗余数组，提高性能和可靠性。

## 性能优化

- 调整挂载选项(noatime, nodiratime)
- 使用适合工作负载的文件系统
- 定期进行碎片整理(对ext4可能有用)
- 调整文件系统参数(使用tune2fs等工具)

在选择文件系统时，应根据具体应用场景、性能需求和数据安全要求进行评估。`;
}

// Linux Shell脚本编程内容
function getLinuxShellScriptingContent() {
  return `# Linux Shell脚本编程精通

## 什么是Shell脚本？

Shell脚本是一种用Shell编写的脚本程序，可以执行一系列命令和操作，自动化完成重复性任务。最常用的Shell是Bash (Bourne Again SHell)。

## 基础语法

### 创建脚本文件
创建一个文本文件，添加以下第一行指定解释器：

\`\`\`bash
#!/bin/bash
# 这是一个注释
echo "Hello, World!"
\`\`\`

赋予执行权限：\`chmod +x script.sh\`
运行脚本：\`./script.sh\`

### 变量

\`\`\`bash
# 定义变量
NAME="Linux User"
AGE=25

# 使用变量
echo "Hello, $NAME"
echo "You are $AGE years old"

# 命令结果赋值给变量
CURRENT_DIR=$(pwd)
FILES=\`ls\`
\`\`\`

### 条件语句

\`\`\`bash
# if语句
if [ "$NAME" = "Linux User" ]; then
    echo "Name matches"
elif [ "$NAME" = "Admin" ]; then
    echo "You are admin"
else
    echo "Name does not match"
fi

# 测试文件
if [ -f "$FILE" ]; then
    echo "File exists"
fi

# 逻辑运算
if [ "$AGE" -gt 18 ] && [ "$NAME" = "Linux User" ]; then
    echo "Adult Linux User"
fi
\`\`\`

### 循环

\`\`\`bash
# for循环
for i in 1 2 3 4 5; do
    echo "Number: $i"
done

# while循环
COUNT=0
while [ $COUNT -lt 5 ]; do
    echo "Count: $COUNT"
    COUNT=$((COUNT+1))
done

# 遍历文件
for FILE in *.txt; do
    echo "Processing $FILE"
done
\`\`\`

## 函数

\`\`\`bash
# 定义函数
greeting() {
    echo "Hello, $1!"
    return 0
}

# 调用函数
greeting "World"

# 捕获返回值
greeting "User"
RESULT=$?
echo "Function returned: $RESULT"
\`\`\`

## 高级特性

### 正则表达式
\`\`\`bash
# 使用grep搜索文件内容
grep -E "^[0-9]+" file.txt

# 使用sed替换文本
sed -E 's/old/new/g' file.txt
\`\`\`

### 数组
\`\`\`bash
# 定义数组
FRUITS=("Apple" "Banana" "Cherry")

# 访问数组元素
echo \${FRUITS[0]}  # 输出 Apple

# 遍历数组
for FRUIT in "\${FRUITS[@]}"; do
    echo $FRUIT
done
\`\`\`

### 读取用户输入
\`\`\`bash
echo "Enter your name:"
read NAME
echo "Hello, $NAME"

# 读取带提示的输入
read -p "Enter your age: " AGE
echo "You are $AGE years old"
\`\`\`

## 实用技巧

### 错误处理
\`\`\`bash
# 退出前执行清理
trap "echo 'Script interrupted'; exit" SIGINT SIGTERM

# 错误时退出
set -e

# 自定义错误处理
error_handler() {
    echo "Error occurred at line $1"
    exit 1
}
trap 'error_handler $LINENO' ERR
\`\`\`

### 调试脚本
\`\`\`bash
# 启用调试模式
set -x

# 测试某些命令
DEBUG=true
if [ "$DEBUG" = true ]; then
    echo "Debug mode active"
fi
\`\`\`

Shell脚本是Linux系统管理和自动化的强大工具，掌握它可以大大提高工作效率。`;
}

// AI注意力机制内容
function getAIAttentionMechanismContent() {
  return `# AI研究笔记: 注意力机制

## 注意力机制概述

注意力机制（Attention Mechanism）是深度学习中的关键创新，它让模型能够在处理序列数据时关注最相关的部分。这一机制极大地提高了模型处理长序列数据的能力，是现代自然语言处理和计算机视觉等领域的基础技术。

## 为什么需要注意力机制？

传统的序列到序列（Seq2Seq）模型使用编码器-解码器架构，编码器将输入序列压缩成固定长度的向量，这导致了两个主要问题：

1. **信息瓶颈**：所有信息必须压缩到一个固定大小的向量中
2. **长距离依赖**：难以捕捉长序列中的远距离依赖关系

注意力机制通过允许解码器"关注"输入序列的不同部分，解决了这些问题。

## 注意力机制的基本原理

注意力机制的核心思想是计算查询（Query）与一组键值对（Key-Value pairs）的相关性，并据此加权值向量。

### 核心计算步骤

1. **相似度计算**：计算查询与每个键的相似度/相关性
2. **权重归一化**：使用softmax函数将相似度转换为概率分布
3. **加权求和**：根据归一化权重对值向量进行加权求和

数学表达如下：

Attention(Q, K, V) = ∑i (exp(score(Q, Ki)) / ∑j exp(score(Q, Kj))) * Vi

其中，score函数可以有多种实现：

- 点积注意力: score(Q, K) = Q · K
- 缩放点积注意力: score(Q, K) = (Q · K) / √dk
- 加性注意力: score(Q, K) = vT tanh(W1 Q + W2 K)

## 自注意力机制

自注意力（Self-Attention）是注意力机制的一种特殊形式，它允许序列中的每个元素关注同一序列中的所有元素，从而捕捉序列内部的依赖关系。

### 自注意力计算过程

在自注意力中，查询（Q）、键（K）和值（V）都来自同一输入序列的不同线性投影。计算步骤包括：

1. 从输入序列计算查询、键和值的投影
2. 计算注意力分数
3. 应用softmax获取权重
4. 加权求和产生输出

## 多头注意力机制

多头注意力（Multi-Head Attention）是自注意力的扩展，它将输入投影到多个子空间，并在每个子空间上独立计算注意力，然后合并结果。这允许模型同时从不同的表示子空间学习信息。

### 多头注意力计算

多头注意力分为以下步骤：

1. 创建多个查询、键、值的投影
2. 对每个头独立计算注意力
3. 合并所有头的输出
4. 进行最终的线性变换

## Transformer中的注意力机制

Transformer架构使用了三种不同的注意力机制：

1. **编码器中的自注意力**：每个编码器位置可以关注所有输入位置
2. **解码器中的掩码自注意力**：每个解码器位置只能关注当前及之前的位置
3. **编码器-解码器注意力**：解码器中的每个位置可以关注编码器输出的所有位置

这种组合使得Transformer模型能高效地处理序列转换任务。

## 注意力机制的应用

注意力机制已被广泛应用于多个领域：

### 自然语言处理
- 机器翻译
- 文本摘要
- 问答系统
- 情感分析

### 计算机视觉
- 图像描述
- 目标检测
- 视觉问答

### 语音处理
- 语音识别
- 语音合成

### 图形学习
- 图神经网络中节点特征聚合

## 最新研究进展

注意力机制的研究仍在快速发展，近期的一些进展包括：

- **稀疏注意力**：减少注意力计算复杂度
- **线性注意力**：改进注意力的计算效率
- **局部注意力**：关注局部上下文窗口
- **长距离Transformer**：处理超长序列的注意力变体

## 注意力机制的局限性

尽管注意力机制非常强大，但它也有一些限制：

1. **计算复杂度**：标准自注意力的复杂度为O(n²)，其中n是序列长度
2. **内存消耗**：需要存储注意力权重矩阵，对长序列来说内存占用很大
3. **位置信息缺失**：自注意力本身是位置无关的，需要额外添加位置编码

## 结论

注意力机制是深度学习最重要的创新之一，它彻底改变了序列数据处理的方式。通过允许模型动态关注输入的不同部分，注意力机制大大提高了模型的表达能力和性能。随着研究的不断深入，我们可以期待更高效、更强大的注意力变体出现。

## 参考文献

1. Vaswani, A., et al. (2017). "Attention is All You Need"
2. Bahdanau, D., et al. (2014). "Neural Machine Translation by Jointly Learning to Align and Translate"
3. Luong, M. T., et al. (2015). "Effective Approaches to Attention-based Neural Machine Translation"

*注：本笔记基于我对注意力机制的理解和研究，仅供学习参考。*`;
}

// Markdown快速入门内容
function getMarkdownQuickStartContent() {
  return `# Markdown快速入门指南

Markdown是一种轻量级标记语言，创建于2004年，目前被广泛用于撰写文档、笔记、博客文章等。它使用简单的文本格式标记，可以轻松转换为HTML和其他格式。

## 基础语法

### 标题

在Markdown中，使用 \`#\` 符号表示标题，一级标题用一个 \`#\`，二级标题用两个 \`#\`，依此类推，最多支持六级标题。

\`\`\`markdown
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
\`\`\`

### 段落和换行

在Markdown中，段落之间用一个或多个空行分隔。如果要在段落内换行，可以在行末加入两个空格后回车，或者直接使用HTML的 \`<br>\` 标签。

### 强调

\`\`\`markdown
*斜体文本* 或 _斜体文本_
**粗体文本** 或 __粗体文本__
***粗斜体文本*** 或 ___粗斜体文本___
\`\`\`

### 列表

#### 无序列表

\`\`\`markdown
- 项目1
- 项目2
  - 子项目A
  - 子项目B
\`\`\`

- 项目1
- 项目2
  - 子项目A
  - 子项目B

#### 有序列表

\`\`\`markdown
1. 第一项
2. 第二项
3. 第三项
\`\`\`

1. 第一项
2. 第二项
3. 第三项

### 链接

\`\`\`markdown
[链接文本](URL "可选标题")
\`\`\`

例如: [Markdown官方文档](https://daringfireball.net/projects/markdown/ "Markdown文档")

### 图片

\`\`\`markdown
![替代文本](图片URL "可选标题")
\`\`\`

### 引用

\`\`\`markdown
> 这是一个引用段落。
> 这是引用的第二行。
>
> 这是新的一段引用。
\`\`\`

> 这是一个引用段落。
> 这是引用的第二行。
>
> 这是新的一段引用。

### 代码

#### 行内代码

\`\`\`markdown
使用反引号包裹代码: \`var example = true\`
\`\`\`

#### 代码块

可以使用三个反引号(\`\`\`)开始和结束，还可以指定语言以启用语法高亮:

\`\`\`markdown
\`\`\`javascript
function example() {
  console.log("Hello, world!");
}
\`\`\`
\`\`\`

### 水平线

可以使用三个或更多的星号、减号或下划线来创建水平线:

\`\`\`markdown
***
---
___
\`\`\`

---

## 扩展语法

除了基础语法外，很多Markdown处理器还支持扩展语法。

### 表格

\`\`\`markdown
| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |
\`\`\`

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 单元格1 | 单元格2 | 单元格3 |
| 单元格4 | 单元格5 | 单元格6 |

### 任务列表

\`\`\`markdown
- [x] 完成的任务
- [ ] 未完成的任务
- [ ] 又一个未完成的任务
\`\`\`

### 脚注

\`\`\`markdown
这里有一个脚注引用[^1]

[^1]: 这是脚注内容
\`\`\`

### 删除线

\`\`\`markdown
~~删除这段文字~~
\`\`\`

~~删除这段文字~~

### 数学公式

有些Markdown处理器支持LaTeX数学公式:

\`\`\`markdown
$$
E = mc^2
$$
\`\`\`

## 推荐的Markdown编辑器

- **VS Code**: 安装Markdown扩展后非常强大
- **Typora**: 实时预览，所见即所得
- **Obsidian**: 适合知识管理和笔记
- **Dillinger**: 在线Markdown编辑器
- **HackMD/CodiMD**: 协作Markdown编辑

## 学习资源

1. [Markdown官方文档](https://daringfireball.net/projects/markdown/)
2. [GitHub Markdown指南](https://docs.github.com/en/github/writing-on-github)
3. [Markdown指南](https://www.markdownguide.org/)

希望这份快速入门指南对你有所帮助！随着实践，你会发现Markdown是一种非常高效的文档编写方式。`;
}

// 网络安全学习笔记内容
function getNetworkSecurityContent() {
  return `# 网络安全学习笔记

## 今日学习内容概述

今天我学习了多种网络安全概念和技术，包括防火墙配置、入侵检测系统和网络流量分析。下面是详细的学习笔记。

## 防火墙基础

### 什么是防火墙？

防火墙是一种网络安全设备，用于监控和控制网络流量，基于预定义的安全规则允许或阻止数据包。

### 防火墙类型

1. **包过滤防火墙**
   - 基于源/目标IP、端口和协议头分析
   - 简单高效，但功能有限

2. **状态检测防火墙**
   - 跟踪连接状态
   - 能够识别合法会话

3. **应用层防火墙**
   - 深度包检测
   - 能够理解应用层协议
   - 可检测特定应用威胁

4. **下一代防火墙(NGFW)**
   - 集成IPS功能
   - 应用程序识别
   - 用户身份管理

### 常见防火墙规则配置

\`\`\`bash
# 允许SSH连接
iptables -A INPUT -p tcp --dport 22 -j ACCEPT

# 允许Web流量
iptables -A INPUT -p tcp --dport 80 -j ACCEPT
iptables -A INPUT -p tcp --dport 443 -j ACCEPT

# 默认拒绝所有入站连接
iptables -A INPUT -j DROP
\`\`\`

## 入侵检测系统(IDS)

### IDS类型

1. **基于网络的IDS (NIDS)**
   - 分析网络流量
   - 例如: Snort, Suricata

2. **基于主机的IDS (HIDS)**
   - 监控主机上的活动
   - 例如: OSSEC, Wazuh

### 检测方法

- **签名检测**: 匹配已知攻击模式
- **异常检测**: 识别偏离正常行为的活动
- **启发式检测**: 使用规则和算法检测可疑行为

### Snort规则示例

\`\`\`
alert tcp any any -> 192.168.1.0/24 80 (content:"GET /admin"; msg:"Possible admin access attempt";)
\`\`\`

## 安全信息和事件管理(SIEM)

SIEM系统集中收集和分析来自网络设备、服务器和安全控制的日志数据，提供:

- 实时事件监控
- 日志管理和分析
- 安全警报和响应
- 合规性报告

常见SIEM解决方案:
- Splunk
- ELK Stack (Elasticsearch, Logstash, Kibana)
- QRadar
- ArcSight

## 网络扫描和漏洞评估

今天使用Nmap进行网络扫描:

\`\`\`bash
# 基本扫描
nmap 192.168.1.0/24

# 服务版本检测
nmap -sV 192.168.1.10

# 操作系统检测
nmap -O 192.168.1.10

# 全面扫描
nmap -A 192.168.1.10
\`\`\`

使用OpenVAS进行漏洞评估，发现了几个中危漏洞，包括:
- 过时的SSL/TLS版本
- 未打补丁的Web服务器软件
- 弱密码策略

## 安全加固建议

基于今天的学习，建议实施以下安全措施:

1. 实施最小权限原则
2. 定期更新所有系统和应用
3. 使用强密码和多因素认证
4. 定期备份关键数据
5. 监控网络流量和系统日志
6. 培训用户识别社会工程学攻击

## 后续学习计划

- 深入学习渗透测试方法
- 恶意软件分析技术
- 安全编码实践
- 云环境安全

今天的学习非常充实，期待明天继续深入网络安全领域的学习！`;
}

// 执行更新
updateAllArticles(); 