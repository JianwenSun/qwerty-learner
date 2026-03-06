import { SentenceSplitter } from '../../analyzer/SentenceSplitter';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceSplitter', () => {
  describe('dialogue handling', () => {
    it('should handle simple dialogue in sentences', async () => {
      // 测试用例: 包含对话
      const testContent = 'The teacher said, "Please open your books." The students obeyed.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Simple Dialogue Test',
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

    it('should handle complex dialogue in sentences', async () => {
      // 测试用例: 复杂对话
      const testContent = '"Where are you going?" she asked. "I\'m going to the store," he replied. "Can I come with you?" she said.';

      // 创建测试输入
      const testInput: PassageInput = {
        title: 'Complex Dialogue Test',
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
