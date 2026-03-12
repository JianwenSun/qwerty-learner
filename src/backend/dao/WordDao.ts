import { PrismaClient } from '@prisma/client';
import { DbConnection } from './DbConnection';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { WordEntity } from './entity/word';

// 单词存储类
export class WordDao {
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>; // 兼容事务中的prisma实例

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
  }

  async saveWord(word: string, ukphone: string, usphone: string): Promise<WordEntity> {
    try {
      // 检查单词是否已存在
      const existingWord = await this.prisma.word.findFirst({
        where: {
          content: word,
          isDeleted: false
        }
      });

      if (existingWord) {
        return new WordEntity(
          existingWord.id,
          existingWord.content,
          existingWord.ukphone,
          existingWord.usphone,
          existingWord.isDeleted
        );
      }

      // 创建新单词
      const newWord = await this.prisma.word.create({
        data: {
          content: word,
          ukphone: ukphone,
          usphone: usphone
        }
      });

      return new WordEntity(
        newWord.id,
        newWord.content,
        newWord.ukphone,
        newWord.usphone,
        newWord.isDeleted
      );
    } catch (error) {
      console.error('存储单词失败:', error);
      throw error;
    }
  }

  async saveWords(words: Array<{ content: string; ukphone: string; usphone: string }>): Promise<WordEntity[]> {
    try {
      const savedWords: WordEntity[] = [];

      for (const word of words) {
        const savedWord = await this.saveWord(word.content, word.ukphone, word.usphone);
        savedWords.push(savedWord);
      }

      return savedWords;
    } catch (error) {
      console.error('批量存储单词失败:', error);
      throw error;
    }
  }

  async findWord(word: string): Promise<WordEntity | null> {
    try {
      const foundWord = await this.prisma.word.findFirst({
        where: {
          content: word,
          isDeleted: false
        }
      });

      if (!foundWord) {
        return null;
      }

      return new WordEntity(
        foundWord.id,
        foundWord.content,
        foundWord.ukphone,
        foundWord.usphone,
        foundWord.isDeleted
      );
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