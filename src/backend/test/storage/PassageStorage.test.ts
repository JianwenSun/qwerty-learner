import { PassageService } from '../../service/PassageService';
import { Sentence } from '../../analyzer/model';
import { PrismaClient } from '@prisma/client';
import { describe, expect, it } from '@jest/globals';

describe('PassageStorageTest', () => {
  describe('savePassage', () => {
    it('should save a new passage successfully', async () => {
      const prisma = new PrismaClient();

      try {
        // 清理测试数据
        await prisma.passage.deleteMany({ where: { title: 'Test Passage' } });
        await prisma.sentence.deleteMany({ where: { content: { contains: 'Test' } } });
        await prisma.word.deleteMany({ where: { content: { contains: 'Test' } } });

        await prisma.$transaction(async (prisma) => {
          const passageService = new PassageService(prisma);

          // 测试用例：存储新文章
          const testPassageData = {
            title: 'Test Passage',
            content: 'This is a test passage with multiple sentences. One evening, Lily was walking home through the woods.',
            author: 'Test Author',
            source: 'Test Source'
          };

          const testSentences: Sentence[] = [
            {
              content: '“Why do you glow even though you’re so small?” Lily asked.',
              contentCn: '这是第一个句子。',
              tokens: [
                { content: '“Why', words: ['Why'], explain: '疑问词' },
                { content: 'do', words: ['do'], explain: '动词' },
                { content: 'you', words: ['you'], explain: '代词' },
                { content: 'glow', words: ['glow'], explain: '动词' },
                { content: 'even', words: ['even'], explain: '副词' },
                { content: 'though', words: ['though'], explain: '副词' },
                { content: 'you’re', words: ['you’re'], explain: '代词' },
                { content: 'so', words: ['so'], explain: '副词' },
                { content: 'small', words: ['small'], explain: '形容词' },
                { content: '?”', words: [], explain: '' },
              ],
              chunks: [
                { index: 0, content: '“Why do you glow even though you’re so small?”', contentCn: '这是第一个句子', function: '主要内容', tokenIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9] },
              ]
            },
            {
              content: 'One evening, Lily was walking home through the woods.',
              contentCn: '这是第二个句子。',
              tokens: [
                { content: 'One', words: ['One'], explain: '数词' },
                { content: 'evening', words: ['evening'], explain: '名词' },
                { content: ',', words: [], explain: '' },
                { content: 'Lily', words: ['Lily'], explain: '代词' },
                { content: 'was', words: ['was'], explain: '系动词' },
                { content: 'walking', words: ['walking'], explain: '动词' },
                { content: 'home', words: ['home'], explain: '名词' },
                { content: 'through', words: ['through'], explain: '介词' },
                { content: 'the', words: ['the'], explain: '定冠词' },
                { content: 'woods', words: ['woods'], explain: '名词' },
                { content: '.', words: [], explain: '' }
              ],
              chunks: [
                { index: 0, content: 'One evening,', contentCn: '一天晚上', function: '主要内容', tokenIndexes: [0, 1, 2] },
                { index: 0, content: 'Lily was walking home', contentCn: '莉莉正在回家', function: '主要内容', tokenIndexes: [3, 4, 5, 6] },
                { index: 0, content: 'through the woods.', contentCn: '通过树林', function: '主要内容', tokenIndexes: [7, 8, 9] }
              ]
            }
          ];

          const savedPassage = await passageService.savePassage(testPassageData, testSentences);
          expect(savedPassage).toBeDefined();
          expect(savedPassage.title).toBe(testPassageData.title);
          expect(savedPassage.author).toBe(testPassageData.author);
          expect(savedPassage.source).toBe(testPassageData.source);
          expect(savedPassage.sentenceCount).toBe(testSentences.length);

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

    it('should handle saving existing passage', async () => {
      const prisma = new PrismaClient();

      try {
        // 清理测试数据
        await prisma.passage.deleteMany({ where: { title: 'Test Passage' } });
        await prisma.sentence.deleteMany({ where: { content: { contains: 'Test' } } });
        await prisma.word.deleteMany({ where: { content: { contains: 'Test' } } });

        await prisma.$transaction(async (prisma) => {
          const passageService = new PassageService(prisma);

          // 测试用例：存储已存在的文章
          const testPassageData = {
            title: 'Test Passage',
            content: 'This is a test passage with multiple sentences.',
            author: 'Test Author',
            source: 'Test Source'
          };

          const testSentences: Sentence[] = [
            {
              content: 'This is a sentence in an existing passage.',
              contentCn: '这是已存在文章中的一个句子。',
              tokens: [
                { content: 'This', words: ['This'], explain: '代词' },
                { content: 'is', words: ['is'], explain: '系动词' },
                { content: 'a', words: ['a'], explain: '不定冠词' },
                { content: 'sentence', words: ['sentence'], explain: '名词' },
                { content: 'in', words: ['in'], explain: '介词' },
                { content: 'an', words: ['an'], explain: '不定冠词' },
                { content: 'existing', words: ['existing'], explain: '形容词' },
                { content: 'passage', words: ['passage'], explain: '名词' },
                { content: '.', words: [], explain: '' }
              ],
              chunks: [
                { index: 0, content: 'This is a sentence in an existing passage', contentCn: '这是已存在文章中的一个句子', function: '主要内容', tokenIndexes: [0, 1, 2, 3, 4, 5, 6, 7] },
                { index: 1, content: '.', contentCn: '。', function: '标点符号', tokenIndexes: [8] }
              ]
            }
          ];

          const savedPassage = await passageService.savePassage(testPassageData, testSentences);
          expect(savedPassage).toBeDefined();

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
