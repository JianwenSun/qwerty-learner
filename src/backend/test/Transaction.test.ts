import { PrismaClient } from '@prisma/client';
import { Sentence } from '../analyzer/model';
import { SentenceStorage } from '../storage/SentenceStorage';
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';

describe('TransactionTest', () => {
  let prisma: PrismaClient;

  beforeEach(async () => {
    prisma = new PrismaClient();
  });

  afterEach(async () => {
    // 清理测试数据
    await prisma.sentence.deleteMany({
      where: {
        content: {
          in: [
            'Transaction test sentence 1',
            'Transaction test sentence 2',
            'Transaction rollback test 1',
            'Transaction rollback test 2'
          ]
        }
      }
    });
    await prisma.$disconnect();
  });

  describe('testTransactionSuccess', () => {
    it('should successfully execute transaction with multiple operations', async () => {
      // 使用事务确保所有操作要么全部成功，要么全部失败
      await prisma.$transaction(async (prisma) => {
        const sentenceStorage = new SentenceStorage(prisma);

        // 测试用例：存储两个句子
        const testSentence1: Sentence = {
          content: 'Transaction test sentence 1',
          contentCn: '事务测试句子1',
          tokens: [
            { content: 'Transaction', words: ['Transaction'], explain: '名词' },
            { content: 'test', words: ['test'], explain: '名词' },
            { content: 'sentence', words: ['sentence'], explain: '名词' },
            { content: '1', words: ['1'], explain: '数字' }
          ],
          chunks: [
            { index: 0, content: 'Transaction test sentence 1', contentCn: '事务测试句子1', function: '主要内容', tokenIndexes: [0, 1, 2, 3] }
          ]
        };

        const testSentence2: Sentence = {
          content: 'Transaction test sentence 2',
          contentCn: '事务测试句子2',
          tokens: [
            { content: 'Transaction', words: ['Transaction'], explain: '名词' },
            { content: 'test', words: ['test'], explain: '名词' },
            { content: 'sentence', words: ['sentence'], explain: '名词' },
            { content: '2', words: ['2'], explain: '数字' }
          ],
          chunks: [
            { index: 0, content: 'Transaction test sentence 2', contentCn: '事务测试句子2', function: '主要内容', tokenIndexes: [0, 1, 2, 3] }
          ]
        };

        // 存储两个句子
        await sentenceStorage.saveSentence(testSentence1);
        await sentenceStorage.saveSentence(testSentence2);
      });

      // 验证数据是否已保存
      const sentenceStorage = new SentenceStorage();
      const sentence1 = await sentenceStorage.findSentenceByContent('Transaction test sentence 1');
      const sentence2 = await sentenceStorage.findSentenceByContent('Transaction test sentence 2');

      expect(sentence1).toBeDefined();
      expect(sentence2).toBeDefined();
    });
  });

  describe('testTransactionRollback', () => {
    it('should rollback transaction when error occurs', async () => {
      // 清理可能存在的测试数据
      await prisma.sentence.deleteMany({
        where: {
          content: {
            in: ['Transaction rollback test 1', 'Transaction rollback test 2']
          }
        }
      });

      // 预期事务会失败并回滚
      await expect(async () => {
        // 使用事务，故意在第二个操作时抛出错误
        await prisma.$transaction(async (prisma) => {
          const sentenceStorage = new SentenceStorage(prisma);

          // 测试用例：存储两个句子，第二个故意失败
          const testSentence1: Sentence = {
            content: 'Transaction rollback test 1',
            contentCn: '事务回滚测试句子1',
            tokens: [
              { content: 'Transaction', words: ['Transaction'], explain: '名词' },
              { content: 'rollback', words: ['rollback'], explain: '名词' },
              { content: 'test', words: ['test'], explain: '名词' },
              { content: '1', words: ['1'], explain: '数字' }
            ],
            chunks: [
              { index: 0, content: 'Transaction rollback test 1', contentCn: '事务回滚测试句子1', function: '主要内容', tokenIndexes: [0, 1, 2, 3] }
            ]
          };

          // 存储第一个句子
          await sentenceStorage.saveSentence(testSentence1);

          // 故意抛出错误，触发回滚
          throw new Error('故意触发事务回滚');

          // 下面的代码不会执行
          const testSentence2: Sentence = {
            content: 'Transaction rollback test 2',
            contentCn: '事务回滚测试句子2',
            tokens: [
              { content: 'Transaction', words: ['Transaction'], explain: '名词' },
              { content: 'rollback', words: ['rollback'], explain: '名词' },
              { content: 'test', words: ['test'], explain: '名词' },
              { content: '2', words: ['2'], explain: '数字' }
            ],
            chunks: [
              { index: 0, content: 'Transaction rollback test 2', contentCn: '事务回滚测试句子2', function: '主要内容', tokenIndexes: [0, 1, 2, 3] }
            ]
          };

          await sentenceStorage.saveSentence(testSentence2);
        });
      }).rejects.toThrow('故意触发事务回滚');

      // 验证数据是否已回滚
      const sentenceStorage = new SentenceStorage();
      const sentence1 = await sentenceStorage.findSentenceByContent('Transaction rollback test 1');
      const sentence2 = await sentenceStorage.findSentenceByContent('Transaction rollback test 2');

      expect(sentence1).toBeNull();
      expect(sentence2).toBeNull();
    });
  });
});
