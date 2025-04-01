export interface StyleConfig {
  id: string;
  name: string;
  description: string;
  authorFilter: string;
  bgColor: string;
  borderColor: string;
  buttonBgColor: string;
  route: string;
  cardClass: string;
}

// 每种风格的配置
export const styleConfigs: StyleConfig[] = [
  {
    id: 'style1',
    name: '技术风格',
    description: '简约、清新的设计风格，以蓝色云彩为主题，给人一种宁静舒适的感觉。',
    authorFilter: 'Chryssolion Chen',
    bgColor: 'bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-950/20 dark:to-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    buttonBgColor: 'border-site1-accent text-site1-primary hover:bg-site1-accent/10',
    route: '/style1',
    cardClass: 'post-card post-card-site1 group h-full'
  },
  {
    id: 'style3',
    name: '小臣小窝风格',
    description: '深色系设计，简洁且专注于内容的呈现，适合程序员和开发者阅读。',
    authorFilter: 'Echo',
    bgColor: 'bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900/50 dark:to-gray-800/50',
    borderColor: 'border-gray-300 dark:border-gray-700',
    buttonBgColor: 'border-site3-accent text-site3-primary hover:bg-site3-accent/10',
    route: '/style3',
    cardClass: 'post-card post-card-site3 group h-full'
  },
  {
    id: 'style4',
    name: '臣风格',
    description: '简约大方的云朵设计，清新自然的配色，展现博客的独特魅力。',
    authorFilter: '昆昆鱼',
    bgColor: 'bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/30 dark:to-slate-800/30',
    borderColor: 'border-slate-200 dark:border-slate-700',
    buttonBgColor: 'border-site4-accent text-site4-primary hover:bg-site4-accent/10',
    route: '/style4',
    cardClass: 'post-card-site4 group h-full'
  },
  {
    id: 'style5',
    name: '2.0风格',
    description: '全屏动漫背景，文章内容卡片式布局，清新自然的UI设计。',
    authorFilter: 'Chryssolion Chen2',
    bgColor: 'bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-indigo-950/20 dark:to-purple-900/20',
    borderColor: 'border-indigo-200 dark:border-indigo-800',
    buttonBgColor: 'border-[#8897a3] text-[#213b53] hover:bg-[#8897a3]/10',
    route: '/style5',
    cardClass: 'bg-white/90 shadow-md rounded-lg overflow-hidden h-full'
  }
]; 