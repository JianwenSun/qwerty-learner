import { WordStorage } from '../storage/WordStorage';

export class WordService {
  private wordStorage: WordStorage;

  constructor() {
    this.wordStorage = new WordStorage();
  }

  async processAndStoreWords(words: string[]): Promise<void> {
    try {
      console.log(`开始处理 ${words.length} 个单词...`);

      // 校验单词
      const validWords = this.validateWords(words);

      // 存储单词
      await this.wordStorage.saveWords(validWords);

      console.log(`成功存储 ${validWords.length} 个单词`);
    } catch (error) {
      console.error('处理和存储单词失败:', error);
      throw error;
    }
  }

  private validateWords(words: string[]): string[] {
    // 去重并校验单词
    const validWords = new Set<string>();

    for (const word of words) {
      // 去除首尾空格
      const trimmedWord = word.trim();

      // 只允许字母、数字和连字符（如face-to-face）
      const isValid = /^[a-zA-Z0-9-]+$/.test(trimmedWord);

      if (isValid && trimmedWord) {
        validWords.add(trimmedWord.toLowerCase());
      }
    }

    return Array.from(validWords);
  }

  async disconnect() {
    await this.wordStorage.disconnect();
  }
}