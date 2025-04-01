const { PrismaClient } = require('@prisma/client');
const { v4: uuidv4 } = require('uuid');

const prisma = new PrismaClient();

// 示例文章数据
const posts = [
  {
    title: "Linux基础入门指南",
    content: "从零开始学习Linux的基础知识，包括常用命令、文件系统和基本操作。\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "从零开始学习Linux的基础知识，包括常用命令、文件系统和基本操作。",
    coverImage: "/images/4.jpg",
    slug: "linux-basic-guide",
    published: true,
    tags: ["Linux", "入门", "命令行"]
  },
  {
    title: "Linux文件系统详解",
    content: "深入理解Linux文件系统的结构、类型和管理方法，掌握文件操作的核心概念。\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "深入理解Linux文件系统的结构、类型和管理方法，掌握文件操作的核心概念。",
    coverImage: "/images/7.jpg",
    slug: "linux-filesystem",
    published: true,
    tags: ["Linux", "文件系统", "存储"]
  },
  {
    title: "Linux Shell脚本编程精通",
    content: "学习Shell脚本编程的核心概念和技巧，提高自动化能力和工作效率。\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "学习Shell脚本编程的核心概念和技巧，提高自动化能力和工作效率。",
    coverImage: "/images/9.jpg",
    slug: "linux-shell-scripting",
    published: true,
    tags: ["Linux", "Shell", "Bash", "脚本编程"]
  },
  {
    title: "今天学习了网络安全",
    content: "今天学习了各种网络安全知识，包括防火墙、入侵检测系统等。\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "今天学习了各种网络安全知识，包括防火墙、入侵检测系统等。",
    coverImage: "/images/network-security.jpg",
    slug: "network-security-learning",
    published: true,
    tags: ["网络安全", "学习笔记"]
  },
  {
    title: "Markdown快速入门示例",
    content: "# Markdown基础语法\n\n## 标题\n使用`#`表示标题，一级标题用一个`#`，二级标题用两个`#`...\n\n## 列表\n- 无序列表项1\n- 无序列表项2\n\n1. 有序列表项1\n2. 有序列表项2\n\n## 强调\n*斜体*或_斜体_\n**粗体**或__粗体__\n\n## 链接和图片\n[链接文字](URL)\n![图片描述](图片URL)\n\n## 代码\n行内代码：`code`\n代码块：\n```\nfunction example() {\n  return '这是代码块';\n}\n```\n\n## 引用\n> 这是引用文本\n\n## 表格\n| 表头1 | 表头2 |\n| ----- | ----- |\n| 内容1 | 内容2 |\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "快速学习Markdown的基础语法，包括标题、列表、强调、链接、图片、代码、引用和表格等元素。",
    coverImage: "/images/markdown.jpg",
    slug: "markdown-quick-start",
    published: true,
    tags: ["Markdown", "教程", "写作"]
  },
  {
    title: "AI研究笔记: 注意力机制",
    content: "# 注意力机制基础\n\n注意力机制（Attention Mechanism）是深度学习中的关键创新，它使模型能够在处理序列数据时关注最相关的部分。\n\n## 自注意力（Self-Attention）\n\n自注意力允许模型考虑序列中所有位置之间的关系，计算方式如下：\n\n1. 为每个输入位置计算查询（Query）、键（Key）和值（Value）\n2. 计算每个查询与所有键的点积，获得注意力分数\n3. 对分数进行softmax归一化\n4. 使用归一化的分数对值进行加权求和\n\n```python\ndef self_attention(Q, K, V):\n    # Q, K, V是查询、键、值矩阵\n    scores = tf.matmul(Q, K, transpose_b=True) / sqrt(d_k)\n    attention_weights = tf.nn.softmax(scores, axis=-1)\n    output = tf.matmul(attention_weights, V)\n    return output\n```\n\n## 多头注意力（Multi-Head Attention）\n\n多头注意力是自注意力的扩展，它允许模型同时关注来自不同表示子空间的信息。\n\n这是示例内容，您可以在管理后台编辑。",
    excerpt: "介绍深度学习中的注意力机制，包括自注意力和多头注意力的原理和实现。",
    coverImage: "/images/ai-research.jpg",
    slug: "ai-attention-mechanism",
    published: true,
    tags: ["AI", "深度学习", "注意力机制", "研究笔记"]
  }
];

// 导入函数
async function importPosts() {
  console.log('开始导入示例文章到数据库...');
  
  try {
    // 首先获取或创建默认分类
    const category = await prisma.category.upsert({
      where: { 
        id: 'tech-articles' // 使用固定ID
      },
      update: { name: '技术文章' },
      create: { 
        id: 'tech-articles',
        name: '技术文章' 
      },
    });
    
    // 获取默认管理员用户
    const adminUser = await prisma.user.findFirst({
      where: { role: 'admin' },
    });
    
    if (!adminUser) {
      throw new Error('找不到管理员用户，请先创建一个管理员账号');
    }
    
    let successCount = 0;
    let skipCount = 0;
    
    // 导入每篇文章
    for (const postData of posts) {
      // 检查文章是否已存在
      const existingPost = await prisma.post.findUnique({
        where: { slug: postData.slug },
      });
      
      if (existingPost) {
        console.log(`文章已存在，跳过: ${postData.title}`);
        skipCount++;
        continue;
      }
      
      // 处理标签
      const tagConnections = postData.tags.map(tag => ({
        where: { name: tag },
        create: { name: tag }
      }));
      
      // 创建文章
      await prisma.post.create({
        data: {
          title: postData.title,
          content: postData.content,
          excerpt: postData.excerpt,
          coverImage: postData.coverImage,
          slug: postData.slug,
          published: postData.published,
          author: {
            connect: { id: adminUser.id }
          },
          category: {
            connect: { id: category.id }
          },
          tags: {
            connectOrCreate: tagConnections
          }
        }
      });
      
      console.log(`成功导入文章: ${postData.title}`);
      successCount++;
    }
    
    console.log('\n导入完成!');
    console.log(`成功导入: ${successCount} 篇文章`);
    console.log(`跳过(已存在): ${skipCount} 篇文章`);
    
  } catch (error) {
    console.error('导入失败:', error);
  } finally {
    await prisma.$disconnect();
  }
}

// 执行导入
importPosts(); 