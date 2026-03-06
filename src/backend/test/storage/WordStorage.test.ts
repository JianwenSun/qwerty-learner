import { WordStorage } from '../../storage/WordStorage';
import { PrismaClient } from '@prisma/client';
import { describe, expect, it } from '@jest/globals';

describe('WordStorageTest', () => {
  describe('saveWord', () => {
    it('should save a new word successfully', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const wordStorage = new WordStorage(prisma);
          const savedWord = await wordStorage.saveWord('test');
          expect(savedWord).toBeDefined();
          expect(savedWord.content).toBe('test');

          // 测试成功后故意抛出错误触发回滚
          throw new Error('Test rollback');
        });
      } catch (error) {
        if (error instanceof Error && error.message !== 'Test rollback') {
          throw error;
        }
      } finally {
        await prisma.$disconnect();
      }
    });

    it('should return existing word when saving duplicate', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const wordStorage = new WordStorage(prisma);
          // 先存储一次
          await wordStorage.saveWord('test');
          // 再次存储相同的单词
          const savedWord = await wordStorage.saveWord('test');
          expect(savedWord).toBeDefined();
          expect(savedWord.content).toBe('test');

          // 测试成功后故意抛出错误触发回滚
          throw new Error('Test rollback');
        });
      } catch (error) {
        if (error instanceof Error && error.message !== 'Test rollback') {
          throw error;
        }
      } finally {
        await prisma.$disconnect();
      }
    });
  });

  describe('saveWords', () => {
    it('should save multiple words successfully', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const wordStorage = new WordStorage(prisma);
          const words = ['hello', 'world', 'test'];
          const savedWords = await wordStorage.saveWords(words);
          expect(savedWords).toBeDefined();
          expect(savedWords.length).toBe(words.length);

          // 测试成功后故意抛出错误触发回滚
          throw new Error('Test rollback');
        });
      } catch (error) {
        if (error instanceof Error && error.message !== 'Test rollback') {
          throw error;
        }
      } finally {
        await prisma.$disconnect();
      }
    });

    it('should handle duplicate words in batch save', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const wordStorage = new WordStorage(prisma);
          // 先存储一个单词
          await wordStorage.saveWord('test');
          // 批量存储包含已存在单词的列表
          const words = ['test', 'new', 'word'];
          const savedWords = await wordStorage.saveWords(words);
          expect(savedWords).toBeDefined();
          expect(savedWords.length).toBe(words.length);

          // 测试成功后故意抛出错误触发回滚
          throw new Error('Test rollback');
        });
      } catch (error) {
        if (error instanceof Error && error.message !== 'Test rollback') {
          throw error;
        }
      } finally {
        await prisma.$disconnect();
      }
    });
  });
});
