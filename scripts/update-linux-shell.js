const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function updateLinuxShell() {
  console.log('开始更新Linux Shell脚本编程文章内容...');

  try {
    // 更新Linux Shell脚本编程文章
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

在Shell脚本中定义变量时，等号两边不能有空格：

\`\`\`bash
# 定义变量
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

Shell提供了丰富的字符串操作功能：

\`\`\`bash
STR="Hello World"

# 字符串长度
echo ${#STR}  # 输出: 11

# 子字符串
echo ${STR:0:5}  # 输出: Hello

# 字符串替换
echo ${STR/World/Linux}  # 输出: Hello Linux
\`\`\`

#### 数组

Bash支持一维数组：

\`\`\`bash
# 定义数组
FRUITS=("Apple" "Banana" "Cherry")

# 访问数组元素
echo ${FRUITS[0]}  # 输出: Apple

# 所有元素
echo ${FRUITS[@]}  # 输出: Apple Banana Cherry

# 数组长度
echo ${#FRUITS[@]}  # 输出: 3
\`\`\`

## 流程控制

### 条件语句

#### if-else 语句

\`\`\`bash
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
\`\`\`

#### case 语句

\`\`\`bash
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
\`\`\`

### 循环语句

#### for 循环

\`\`\`bash
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
\`\`\`

#### while 循环

\`\`\`bash
#!/bin/bash

COUNT=0
while [ $COUNT -lt 5 ]
do
  echo "计数: $COUNT"
  ((COUNT++))
done
\`\`\`

#### until 循环

\`\`\`bash
#!/bin/bash

COUNT=0
until [ $COUNT -ge 5 ]
do
  echo "计数: $COUNT"
  ((COUNT++))
done
\`\`\`

## 函数

### 函数定义与调用

\`\`\`bash
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
\`\`\`

## 文件操作

### 读取文件

\`\`\`bash
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
\`\`\`

### 文件测试操作符

\`\`\`bash
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
\`\`\`

## 正则表达式

Shell脚本支持正则表达式进行模式匹配：

\`\`\`bash
#!/bin/bash

STRING="Linux Shell 脚本编程"

# 使用正则表达式匹配
if [[ $STRING =~ "Shell" ]]
then
  echo "匹配成功"
fi

# 使用grep进行正则匹配
echo $STRING | grep -E "Shell"
\`\`\`

## 实用技巧

### 命令替换

\`\`\`bash
# 旧语法
CURRENT_DATE=\`date\`

# 新语法（推荐）
CURRENT_DATE=$(date)

echo "当前日期是: $CURRENT_DATE"
\`\`\`

### 重定向

\`\`\`bash
# 将输出重定向到文件
echo "Hello World" > output.txt

# 追加到文件
echo "Another line" >> output.txt

# 重定向错误
command 2> error.log

# 重定向标准输出和错误
command > output.txt 2>&1
\`\`\`

### 调试脚本

\`\`\`bash
# 添加在脚本开头
set -x  # 打开调试模式
set -e  # 遇到错误时退出
\`\`\`

### 信号处理

\`\`\`bash
#!/bin/bash

# 捕获Ctrl+C信号
trap "echo '捕获到Ctrl+C信号，清理工作...'; exit" SIGINT

# 脚本结束时执行清理
trap "echo '脚本结束，开始清理...'" EXIT

echo "脚本正在运行，按Ctrl+C终止..."
sleep 60
\`\`\`

## 高级主题

### 进程管理

\`\`\`bash
# 在后台运行命令
command &

# 查看进程ID
echo $!  # 最后一个后台进程ID
echo $$  # 当前Shell进程ID

# 等待后台进程
wait $PID
\`\`\`

### 脚本参数

\`\`\`bash
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
\`\`\`

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
    
    console.log('文章内容更新完成');
  } catch (error) {
    console.error('更新文章内容时出错:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 运行更新脚本
updateLinuxShell().catch(console.error); 