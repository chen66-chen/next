/**
 * 敏感词过滤服务
 * 
 * 功能：
 * - 检测文本中是否包含敏感词
 * - 过滤文本中的敏感词（替换为 *）
 * - 可配置的敏感词列表
 */

export class SensitiveWordFilter {
  private sensitiveWords: Set<string>;
  
  constructor(words: string[]) {
    this.sensitiveWords = new Set(words);
  }
  
  /**
   * 检查文本是否包含敏感词
   */
  containsSensitiveWords(text: string): boolean {
    if (!text) return false;
    
    for (const word of this.sensitiveWords) {
      if (text.toLowerCase().includes(word.toLowerCase())) {
        return true;
      }
    }
    return false;
  }
  
  /**
   * 过滤文本中的敏感词（替换为 *）
   */
  filterText(text: string): string {
    if (!text) return text;
    
    let filteredText = text;
    for (const word of this.sensitiveWords) {
      // 创建不区分大小写的正则表达式
      const regex = new RegExp(word, 'gi');
      filteredText = filteredText.replace(regex, match => '*'.repeat(match.length));
    }
    return filteredText;
  }
  
  /**
   * 添加新的敏感词
   */
  addWord(word: string): void {
    this.sensitiveWords.add(word);
  }
  
  /**
   * 添加多个敏感词
   */
  addWords(words: string[]): void {
    for (const word of words) {
      this.sensitiveWords.add(word);
    }
  }
  
  /**
   * 移除敏感词
   */
  removeWord(word: string): void {
    this.sensitiveWords.delete(word);
  }
  
  /**
   * 获取所有敏感词
   */
  getAllWords(): string[] {
    return Array.from(this.sensitiveWords);
  }
}

// 导出默认实例
export const sensitiveWordFilter = new SensitiveWordFilter([
  // 常见敏感词
  '赌博', '色情', '暴力', '政治', '反动', '黄赌毒',
  '诈骗', '欺诈', '传销', '洗钱', '非法',
  '黑客', '破解', '攻击', 'hack', 'crack',
  // 您可以添加更多敏感词
]); 