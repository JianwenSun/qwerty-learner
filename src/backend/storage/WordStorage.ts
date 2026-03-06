import { PrismaClient, Word } from '@prisma/client';
import { DbConnection } from './DbConnection';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

export class WordStorage {
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>; // 兼容事务中的prisma实例

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
  }

  async saveWord(word: string): Promise<Word> {
    try {
      // 检查单词是否已存在
      const existingWord = await this.prisma.word.findFirst({
        where: {
          content: word,
          isDeleted: false
        }
      });

      if (existingWord) {
        return existingWord;
      }

      // 创建新单词
      const newWord = await this.prisma.word.create({
        data: {
          content: word,
          tokenIndexes: '',
          senseIds: ''
        }
      });

      return newWord;
    } catch (error) {
      console.error('存储单词失败:', error);
      throw error;
    }
  }

  async saveWords(words: string[]): Promise<Word[]> {
    try {
      const savedWords: Word[] = [];

      for (const word of words) {
        const savedWord = await this.saveWord(word);
        savedWords.push(savedWord);
      }

      return savedWords;
    } catch (error) {
      console.error('批量存储单词失败:', error);
      throw error;
    }
  }

  async findWord(word: string): Promise<Word | null> {
    try {
      return await this.prisma.word.findFirst({
        where: {
          content: word,
          isDeleted: false
        }
      });
    } catch (error) {
      console.error('查找单词失败:', error);
      throw error;
    }
  }

  async disconnect() {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }
}