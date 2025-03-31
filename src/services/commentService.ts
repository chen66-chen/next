import prisma from '@/lib/prisma';

export interface CommentData {
  content: string;
  postId: string;
  postSlug: string;
  userId?: string;
  parentId?: string;
  authorName?: string;
  authorEmail?: string;
  authorImage?: string;
}

export const commentService = {
  /**
   * 获取文章评论
   * @param postId 文章ID
   * @param postSlug 文章Slug
   */
  async getComments(postId: string, postSlug?: string) {
    const query: any = {};
    
    if (postId) {
      query.postId = postId;
    }
    
    if (postSlug) {
      query.postSlug = postSlug;
    }
    
    // 获取顶级评论（没有父评论的评论）
    const comments = await prisma.comment.findMany({
      where: {
        ...query,
        parentId: null
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            image: true,
          }
        },
        replies: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return comments;
  },

  /**
   * 创建评论
   * @param data 评论数据
   */
  async createComment(data: CommentData) {
    // 区分已登录用户和匿名用户
    if (data.userId) {
      // 已登录用户
      return await prisma.comment.create({
        data: {
          content: data.content,
          postId: data.postId,
          postSlug: data.postSlug,
          userId: data.userId,
          ...(data.parentId && { parentId: data.parentId })
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            }
          }
        }
      });
    } else {
      // 匿名用户（需要创建临时用户）
      // 检查是否已有相同邮箱的用户
      const existingUser = data.authorEmail ? 
        await prisma.user.findUnique({
          where: { email: data.authorEmail }
        }) : null;

      if (existingUser) {
        // 使用已存在的用户
        return await prisma.comment.create({
          data: {
            content: data.content,
            postId: data.postId,
            postSlug: data.postSlug,
            userId: existingUser.id,
            ...(data.parentId && { parentId: data.parentId })
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              }
            }
          }
        });
      } else {
        // 创建新用户
        return await prisma.$transaction(async (tx) => {
          const user = await tx.user.create({
            data: {
              name: data.authorName || '匿名用户',
              email: data.authorEmail,
              image: data.authorImage || `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
            }
          });

          return await tx.comment.create({
            data: {
              content: data.content,
              postId: data.postId,
              postSlug: data.postSlug,
              userId: user.id,
              ...(data.parentId && { parentId: data.parentId })
            },
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                }
              }
            }
          });
        });
      }
    }
  }
}; 