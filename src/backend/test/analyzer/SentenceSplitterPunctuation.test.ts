import { SentenceSplitter } from '../../analyzer/SentenceSplitter';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceSplitter', () => {
  describe('punctuation handling', () => {
    it('should handle question marks and exclamation marks in sentences', async () => {
      // 测试用例: 包含问号和叹号
      const testContent = 'What is your name? My name is John! Nice to meet you.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Question and Exclamation Test',
        content: testContent,
        author: 'Unknown'
      };

      // 创建 SentenceSplitter 实例
      const sentenceSplitter = new SentenceSplitter();

      // 调用分析方法
      const result = await sentenceSplitter.analysis(testInput);

      // 验证结果
      expect(result.sentences.length).toBeGreaterThan(0);
      
      // 验证每个句子都以有效的结束符结尾
      const validEndings = ['.', '?', '!'];
      result.sentences.forEach((sentence) => {
        expect(sentence.trim()).not.toBe('');
        const lastChar = sentence[sentence.length - 1];
        expect(validEndings).toContain(lastChar);
      });
    });
  });
});
