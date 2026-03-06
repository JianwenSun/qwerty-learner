import { SentenceSplitter } from '../../analyzer/SentenceSplitter';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceSplitter', () => {
  describe('whitespace handling', () => {
    it('should handle extra spaces within sentences', async () => {
      // 测试用例: 句子中包含多余空格
      const testContent = 'Hello   world. This   is   a   test.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Whitespace Test',
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
      
      // 验证每个句子都不包含多余的空格
      result.sentences.forEach((sentence) => {
        expect(sentence).not.toContain('   ');
        expect(sentence).not.toContain('  ');
      });
    });

    it('should handle leading and trailing spaces', async () => {
      // 测试用例: 句子前后包含空格
      const testContent = '   Hello world.   This is a test.   ';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Leading Trailing Whitespace Test',
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
      
      // 验证每个句子都不包含前导或尾随空格
      result.sentences.forEach((sentence) => {
        expect(sentence).toBe(sentence.trim());
        expect(sentence).not.toContain('   ');
        expect(sentence).not.toContain('  ');
      });
    });

    it('should handle mixed whitespace characters', async () => {
      // 测试用例: 混合空白字符
      const testContent = 'Hello\tworld.\nThis is\ta\ttest.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Mixed Whitespace Test',
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
      
      // 验证每个句子都不包含制表符或换行符，且没有多余的空格
      result.sentences.forEach((sentence) => {
        expect(sentence).not.toContain('\t');
        expect(sentence).not.toContain('\n');
        expect(sentence).not.toContain('   ');
        expect(sentence).not.toContain('  ');
      });
    });
  });
});
