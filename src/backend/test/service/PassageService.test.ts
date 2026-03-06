import { PassageService } from '../../storage/PassageStorage';
import { Sentence } from '../../analyzer/model';
import { describe, expect, it, beforeEach, afterEach } from '@jest/globals';

describe('PassageServiceTest', () => {
  let passageService: PassageService;

  beforeEach(() => {
    passageService = new PassageService();
  });

  afterEach(async () => {
    // 断开连接
    try {
      await passageService.disconnect();
    } catch (error) {
      console.error('断开连接失败:', error);
    }
  });

  describe('savePassage', () => {
    it('should save a new passage successfully', async () => {
      // 测试用例：存储新文章
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

      const passageData = {
        title: 'Test Passage',
        content: 'Hello world! This is a test passage.',
        author: 'Test Author',
        source: 'Test Source'
      };

      const savedPassage = await passageService.savePassage(passageData, [testSentence]);
      expect(savedPassage).toBeDefined();
      expect(savedPassage.title).toBe('Test Passage');
    });

    it('should return existing passage when saving duplicate', async () => {
      // 测试用例：存储已存在的文章
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

      // 先存储一次
      const passageData = {
        title: 'Test Passage',
        content: 'Hello world! This is a test passage.',
        author: 'Test Author'
      };

      await passageService.savePassage(passageData, [testSentence]);
      
      // 再次存储相同的文章
      const savedPassage = await passageService.savePassage(passageData, [testSentence]);
      expect(savedPassage).toBeDefined();
      expect(savedPassage.title).toBe('Test Passage');
    });

    it('should save passage with minimal data', async () => {
      // 测试用例：存储最小化数据的文章
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

      const passageData = {
        title: 'Minimal Passage',
        content: 'Hello world!'
      };

      const savedPassage = await passageService.savePassage(passageData, [testSentence]);
      expect(savedPassage).toBeDefined();
      expect(savedPassage.title).toBe('Minimal Passage');
    });
  });
});
