import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// 文章创建接口
export interface PostCreateData {
  title: string;
  content: string;
  excerpt?: string;
  coverImage?: string;
  slug?: string;
  published?: boolean;
  authorId: string;
  categoryId?: string;
  tags?: string[];
}

// 文章更新接口
export interface PostUpdateData {
  title?: string;
  content?: string;
  excerpt?: string;
  coverImage?: string;
  slug?: string;
  published?: boolean;
  categoryId?: string;
  tags?: string[];
}

/**
 * 获取所有文章
 */
export async function getAllPosts(page = 1, limit = 10, showDrafts = false) {
  const skip = (page - 1) * limit;
  
  const whereClause = showDrafts ? {} : { published: true };
  
  try {
    const [posts, total] = await Promise.all([
      prisma.post.findMany({
        where: whereClause,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          },
          category: true,
          tags: true
        },
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      }),
      prisma.post.count({ where: whereClause })
    ]);
    
    return {
      posts,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    };
  } catch (error) {
    console.error('获取文章列表失败:', error);
    throw error;
  }
}

/**
 * 获取单个文章
 */
export async function getPostById(id: string) {
  try {
    return prisma.post.findUnique({
      where: { id },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        category: true,
        tags: true
      }
    });
  } catch (error) {
    console.error('获取文章详情失败:', error);
    throw error;
  }
}

/**
 * 创建新文章
 */
export async function createPost(data: PostCreateData) {
  const { title, content, excerpt, coverImage, slug, published = false, authorId, categoryId, tags = [] } = data;

  // 生成slug（如果未提供）
  const postSlug = slug || title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');
  
  // 检查slug是否已存在
  const existingPost = await prisma.post.findUnique({
    where: { slug: postSlug }
  });
  
  if (existingPost) {
    throw new Error('文章slug已存在，请使用不同的标题或自定义slug');
  }

  // 准备创建文章
  const postData: any = {
    title,
    content,
    slug: postSlug,
    published,
    authorId,
  };

  // 添加可选字段
  if (excerpt) postData.excerpt = excerpt;
  if (coverImage) postData.coverImage = coverImage;
  if (categoryId) postData.categoryId = categoryId;
  
  // 处理标签
  if (tags && tags.length > 0) {
    // 标签关联数据
    postData.tags = {
      connectOrCreate: tags.map(tagName => ({
        where: { name: tagName },
        create: { name: tagName }
      }))
    };
  }
  
  // 创建文章
  const post = await prisma.post.create({
    data: postData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      category: {
        select: {
          id: true,
          name: true,
        }
      },
      tags: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
  
  return post;
}

/**
 * 更新文章
 */
export async function updatePost(id: string, data: PostUpdateData) {
  const { title, content, excerpt, coverImage, slug, published, categoryId, tags } = data;
  
  // 构建更新数据
  const updateData: any = {};
  
  if (title !== undefined) updateData.title = title;
  if (content !== undefined) updateData.content = content;
  if (excerpt !== undefined) updateData.excerpt = excerpt;
  if (coverImage !== undefined) updateData.coverImage = coverImage;
  if (published !== undefined) updateData.published = published;
  if (categoryId !== undefined) updateData.categoryId = categoryId;
  
  // 如果提供了新的slug
  if (slug !== undefined) {
    // 检查slug是否已存在（除了当前文章）
    const existingPost = await prisma.post.findFirst({
      where: {
        slug,
        id: { not: id }
      }
    });
    
    if (existingPost) {
      throw new Error('Slug已被其他文章使用');
    }
    
    updateData.slug = slug;
  }
  
  // 如果提供了标签，更新标签
  if (tags && tags.length > 0) {
    updateData.tags = {
      // 先断开所有标签
      set: [],
      // 重新连接或创建标签
      connectOrCreate: tags.map(tagName => ({
        where: { name: tagName },
        create: { name: tagName }
      }))
    };
  }
  
  // 更新文章
  const post = await prisma.post.update({
    where: { id },
    data: updateData,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        }
      },
      category: {
        select: {
          id: true,
          name: true,
        }
      },
      tags: {
        select: {
          id: true,
          name: true,
        }
      }
    }
  });
  
  return post;
}

/**
 * 删除文章
 */
export async function deletePost(id: string) {
  // 检查文章是否存在
  const post = await prisma.post.findUnique({
    where: { id }
  });
  
  if (!post) {
    throw new Error('文章不存在');
  }
  
  // 删除文章前先断开标签关联
  await prisma.post.update({
    where: { id },
    data: {
      tags: {
        set: [],
      },
    },
  });
  
  // 删除文章
  await prisma.post.delete({
    where: { id }
  });
  
  return { success: true };
}

/**
 * 获取所有分类
 */
export async function getAllCategories() {
  return prisma.category.findMany({
    orderBy: {
      name: 'asc'
    }
  });
}

/**
 * 获取所有标签
 */
export async function getAllTags() {
  return prisma.tag.findMany({
    orderBy: {
      name: 'asc'
    }
  });
} 