// 反馈类型
export enum FeedbackType {
  THINKING = 'thinking',    // 思考中
  INSPIRED = 'inspired',    // 灵感触发
  CONFUSED = 'confused',    // 困惑
  AGREE = 'agree',          // 赞同
  DISAGREE = 'disagree',    // 不赞同
  LOVE = 'love'             // 喜欢
}

// 反馈项数据
export interface FeedbackItem {
  id: string;
  type: FeedbackType;
  count: number;
  paragraphId: string;
  textContent: string;
  timestamp: number;
}

// 文章段落反馈数据
export interface ParagraphFeedback {
  paragraphId: string;
  feedbacks: FeedbackItem[];
  hotness: number; // 热度值，基于反馈总量计算
}

// 文章整体的反馈数据
export interface ArticleFeedback {
  articleId: string;
  totalFeedbacks: number;
  paragraphFeedbacks: ParagraphFeedback[];
}

// 用户提交的反馈
export interface UserFeedback {
  userId?: string;
  type: FeedbackType;
  paragraphId: string;
  textContent: string;
} 