import { SentenceSplitter } from '../../analyzer/SentenceSplitter';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceSplitter', () => {
  describe('basic sentences', () => {
    it('should split basic sentences correctly', async () => {
      // 测试用例: 基本句子
      const testContent = 'Hello world. This is a test.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Basic Sentences Test',
        content: testContent,
        author: 'Unknown'
      };

      // 创建 SentenceSplitter 实例
      const sentenceSplitter = new SentenceSplitter();

      // 调用分析方法
      const result = await sentenceSplitter.analysis(testInput);

      // 验证结果
      expect(result.sentences).toHaveLength(2);
      expect(result.sentences[0]).toBe('Hello world.');
      expect(result.sentences[1]).toBe('This is a test.');
    });

    it('should validate sentence endings', async () => {
      // 测试用例: 基本句子
      const testContent = 'Hello world. This is a test? Is this working!';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Sentence Endings Test',
        content: testContent,
        author: 'Unknown'
      };

      // 创建 SentenceSplitter 实例
      const sentenceSplitter = new SentenceSplitter();

      // 调用分析方法
      const result = await sentenceSplitter.analysis(testInput);

      // 验证结果
      expect(result.sentences).toHaveLength(3);
      expect(result.sentences[0].endsWith('.')).toBe(true);
      expect(result.sentences[1].endsWith('?')).toBe(true);
      expect(result.sentences[2].endsWith('!')).toBe(true);
    });
  });
});
