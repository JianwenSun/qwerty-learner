import { SentenceSplitter } from '../../analyzer/SentenceSplitter';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceSplitter', () => {
  describe('hyphenated words handling', () => {
    it('should handle hyphenated words in sentences', async () => {
      // 测试用例: 包含连字符单词
      const testContent = 'We need to have a face-to-face meeting. The state-of-the-art technology is impressive.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Hyphenated Words Test',
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
