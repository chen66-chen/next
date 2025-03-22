// 根据文章类别设置不同的主题颜色
interface ThemeColors {
  primary: string;
  secondary: string;
  particles: string;
}

const categoryThemes: Record<string, ThemeColors> = {
  // 网络安全文章 - AI安全守卫主题
  "网络安全": {
    primary: "#00ff41",   // 荧光绿 - 终端风格
    secondary: "#00e8ff", // 青色 - 防御系统
    particles: "#ff3e3e"  // 红色 - 攻击表示
  },
  // 蜜罐主题
  "蜜罐": {
    primary: "#ff9d00",   // 橙色 - 蜜罐
    secondary: "#00ff41", // 荧光绿
    particles: "#ffffff"  // 白色粒子
  },
  // 渗透测试主题
  "渗透测试": {
    primary: "#ff3e3e",   // 红色 - 攻击
    secondary: "#00e8ff", // 青色 - 防御
    particles: "#ffffff"  // 白色粒子
  },
  // 技术文章 - 蓝色调
  "技术": {
    primary: "#3b82f6",
    secondary: "#06b6d4",
    particles: "#a5f3fc"
  },
  // 思考文章 - 紫色调
  "思考": {
    primary: "#8b5cf6",
    secondary: "#c026d3",
    particles: "#e879f9"
  },
  // 生活文章 - 绿色调
  "生活": {
    primary: "#10b981",
    secondary: "#84cc16",
    particles: "#d9f99d"
  },
  // 随笔文章 - 橙色调
  "随笔": {
    primary: "#f59e0b",
    secondary: "#ef4444",
    particles: "#fca5a5"
  },
  // 默认主题 - 蓝紫色调
  "默认": {
    primary: "#5d6bf8",
    secondary: "#e83e8c",
    particles: "#90cdf4"
  }
};

// 获取主题颜色
export const getThemeColors = (category: string): ThemeColors => {
  const normalizedCategory = category.toLowerCase();
  
  // 尝试匹配完整类别
  for (const key in categoryThemes) {
    if (key.toLowerCase() === normalizedCategory) {
      return categoryThemes[key];
    }
  }
  
  // 尝试部分匹配
  for (const key in categoryThemes) {
    if (normalizedCategory.includes(key.toLowerCase()) || 
        key.toLowerCase().includes(normalizedCategory)) {
      return categoryThemes[key];
    }
  }
  
  // 没有匹配时返回默认主题
  return categoryThemes["默认"];
};

// 根据滚动位置和类别获取动画参数
export const getAnimationParams = (
  scrollY: number, 
  category: string
): { speed: number; amplitude: number; frequency: number } => {
  // 基础参数
  let params = {
    speed: 0.5,
    amplitude: 0.2,
    frequency: 0.5
  };
  
  // 根据类别调整参数
  switch (category.toLowerCase()) {
    case "技术":
      params.speed = 0.3;
      params.amplitude = 0.15;
      params.frequency = 0.7;
      break;
    case "思考":
      params.speed = 0.6;
      params.amplitude = 0.3;
      params.frequency = 0.4;
      break;
    case "生活":
      params.speed = 0.4;
      params.amplitude = 0.2;
      params.frequency = 0.6;
      break;
    case "随笔":
      params.speed = 0.7;
      params.amplitude = 0.25;
      params.frequency = 0.5;
      break;
  }
  
  // 根据滚动稍微调整参数以增加变化
  const scrollFactor = Math.min(scrollY / 1000, 1);
  params.speed += scrollFactor * 0.3;
  params.amplitude += scrollFactor * 0.1;
  
  return params;
};

export default {
  getThemeColors,
  getAnimationParams
}; 