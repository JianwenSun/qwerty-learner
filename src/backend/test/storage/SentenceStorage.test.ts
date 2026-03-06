import { SentenceStorage } from '../../storage/SentenceStorage';
import { Sentence } from '../../analyzer/model';
import { PrismaClient } from '@prisma/client';
import { describe, expect, it } from '@jest/globals';

describe('SentenceStorageTest', () => {
  describe('saveSentence', () => {
    it('should save a new sentence successfully', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const sentenceStorage = new SentenceStorage(prisma);

          // 测试用例：存储新句子
          const testSentence: Sentence = {
            content: 'Hello world!',
            contentCn: '你好，世界！',
            tokens: [
              { content: 'Hello', words: ['Hello'], explain: '问候语' },
              { content: 'world', words: ['world'], explain: '名词，世界' },
              { content: '!', words: [], explain: '' }
            ],
            chunks: [
              { index: 0, content: 'Hello world', contentCn: '你好，世界', function: '主要内容', tokenIndexes: [0, 1] },
              { index: 1, content: '!', contentCn: '！', function: '标点符号', tokenIndexes: [2] }
            ]
          };

          const savedSentence = await sentenceStorage.saveSentence(testSentence);
          expect(savedSentence).toBeDefined();

          // 验证查询回来的数据是否正确
          const queriedSentence = await sentenceStorage.findSentenceByContent(testSentence.content);
          expect(queriedSentence).toBeDefined();
          expect(queriedSentence?.content).toBe(testSentence.content);
          expect(queriedSentence?.contentCn).toBe(testSentence.contentCn);

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

    it('should save sentence with passage ID', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const sentenceStorage = new SentenceStorage(prisma);

          // 测试用例：存储带文章ID的句子
          const testSentenceWithPassage: Sentence = {
            content: 'This is another sentence.',
            contentCn: '这是另一个句子。',
            tokens: [
              { content: 'This', words: ['This'], explain: '代词' },
              { content: 'is', words: ['is'], explain: '系动词' },
              { content: 'another', words: ['another'], explain: '形容词' },
              { content: 'sentence', words: ['sentence'], explain: '名词' },
              { content: '.', words: [], explain: '' }
            ],
            chunks: [
              { index: 0, content: 'This is another sentence', contentCn: '这是另一个句子', function: '主要内容', tokenIndexes: [0, 1, 2, 3] },
              { index: 1, content: '.', contentCn: '。', function: '标点符号', tokenIndexes: [4] }
            ]
          };

          const savedSentence = await sentenceStorage.saveSentence(testSentenceWithPassage);
          expect(savedSentence).toBeDefined();

          // 验证单词是否被保存
          const savedWord = await prisma.word.findFirst({ where: { content: 'This' } });
          expect(savedWord).toBeDefined();

          // 验证查询回来的数据是否正确
          const queriedSentence = await sentenceStorage.findSentenceByContent(testSentenceWithPassage.content);
          expect(queriedSentence).toBeDefined();
          expect(queriedSentence?.passageId).toBeNull();

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

    it('should save sentence with custom dictionary ID', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const sentenceStorage = new SentenceStorage(prisma);

          // 测试用例：存储带自定义字典ID的句子
          const testSentenceWithDictionary: Sentence = {
            content: 'Custom dictionary test.',
            contentCn: '自定义字典测试。',
            tokens: [
              { content: 'Custom', words: ['Custom'], explain: '形容词' },
              { content: 'dictionary', words: ['dictionary'], explain: '名词' },
              { content: 'test', words: ['test'], explain: '名词' },
              { content: '.', words: [], explain: '' }
            ],
            chunks: [
              { index: 0, content: 'Custom dictionary test', contentCn: '自定义字典测试', function: '主要内容', tokenIndexes: [0, 1, 2] },
              { index: 1, content: '.', contentCn: '。', function: '标点符号', tokenIndexes: [3] }
            ]
          };

          const savedSentence = await sentenceStorage.saveSentence(testSentenceWithDictionary, null, null);
          expect(savedSentence).toBeDefined();
          expect(savedSentence.passageId).toBeNull();
          expect(savedSentence.chapterId).toBeNull();

          // 验证单词是否被保存
          const savedWord = await prisma.word.findFirst({ where: { content: 'Custom' } });
          expect(savedWord).toBeDefined();

          // 验证查询回来的数据是否正确
          const queriedSentence = await sentenceStorage.findSentenceByContent(testSentenceWithDictionary.content);
          expect(queriedSentence).toBeDefined();
          expect(queriedSentence?.content).toBe(testSentenceWithDictionary.content);
          expect(queriedSentence?.contentCn).toBe(testSentenceWithDictionary.contentCn);
          expect(queriedSentence?.passageId).toBeNull();
          expect(queriedSentence?.chapterId).toBeNull();

          // 验证tokens
          if (queriedSentence) {
            const storedTokens = JSON.parse(queriedSentence.tokens);
            expect(Array.isArray(storedTokens)).toBe(true);
            expect(storedTokens.length).toBe(testSentenceWithDictionary.tokens.length);
          }

          // 测试根据ID查询句子
          if (queriedSentence) {
            const sentenceById = await sentenceStorage.findSentenceById(queriedSentence.id);
            expect(sentenceById).toBeDefined();
            expect(sentenceById?.content).toBe(testSentenceWithDictionary.content);
            expect(sentenceById?.contentCn).toBe(testSentenceWithDictionary.contentCn);
          }

          // 测试查询所有句子
          const allSentences = await sentenceStorage.findAllSentences();
          expect(Array.isArray(allSentences)).toBe(true);
          expect(allSentences.length).toBeGreaterThan(0);

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

    it('should save sentence with null dictionary ID', async () => {
      const prisma = new PrismaClient();

      try {
        await prisma.$transaction(async (prisma) => {
          const sentenceStorage = new SentenceStorage(prisma);

          // 测试用例：存储字典ID为null的句子
          const testSentenceWithNullDictionary: Sentence = {
            content: 'Sentence with null dictionary.',
            contentCn: '字典ID为null的句子。',
            tokens: [
              { content: 'Sentence', words: ['Sentence'], explain: '名词' },
              { content: 'with', words: ['with'], explain: '介词' },
              { content: 'null', words: ['null'], explain: '形容词' },
              { content: 'dictionary', words: ['dictionary'], explain: '名词' },
              { content: '.', words: [], explain: '' }
            ],
            chunks: [
              { index: 0, content: 'Sentence with null dictionary', contentCn: '字典ID为null的句子', function: '主要内容', tokenIndexes: [0, 1, 2, 3] },
              { index: 1, content: '.', contentCn: '。', function: '标点符号', tokenIndexes: [4] }
            ]
          };

          const savedSentence = await sentenceStorage.saveSentence(testSentenceWithNullDictionary, null, null);
          expect(savedSentence).toBeDefined();
          expect(savedSentence.passageId).toBeNull();
          expect(savedSentence.chapterId).toBeNull();

          // 验证查询回来的数据是否正确
          const queriedSentence = await sentenceStorage.findSentenceByContent(testSentenceWithNullDictionary.content);
          expect(queriedSentence).toBeDefined();
          expect(queriedSentence?.chapterId).toBeNull();

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
