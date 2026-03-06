import { PassageAnalyzer } from '../../analyzer/PassageAnalyzer';
import { PassageInput } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('PassageAnalyzer', () => {
  describe('analysis', () => {
    it('should analyze valid passage successfully', async () => {
      // 测试用例1：有效的短文输入
      const validPassage: PassageInput = {
        title: 'Test Passage',
        author: 'Test Author',
        content: 'Hello world! This is a test passage. It has multiple sentences.'
      };

      const analyzer = new PassageAnalyzer();
      const result = await analyzer.analysis(validPassage);

      expect(result.input).toEqual(validPassage);
      expect(result.sentences.length).toBeGreaterThan(0);
    });

    it('should analyze minimal passage successfully', async () => {
      // 测试用例2：只有标题和内容的短文
      const minimalPassage: PassageInput = {
        title: 'Minimal Passage',
        content: 'Single sentence test.'
      };

      const analyzer = new PassageAnalyzer();
      const result = await analyzer.analysis(minimalPassage);

      expect(result.input).toEqual(minimalPassage);
      expect(result.sentences.length).toBe(1);
    });

    it('should throw error for empty content passage', async () => {
      // 测试用例3：空内容的短文
      const emptyContentPassage: PassageInput = {
        title: 'Empty Content',
        content: ''
      };

      const analyzer = new PassageAnalyzer();
      await expect(analyzer.analysis(emptyContentPassage)).rejects.toThrow();
    });

    it('should analyze complex passage successfully', async () => {
      // 测试用例4：复杂内容的短文
      const complexPassage: PassageInput = {
        title: 'Complex Passage',
        author: 'Complex Author',
        content: 'This is the first sentence. Here\'s the second one! And this is the third, which is a bit longer. Finally, the fourth sentence concludes the passage.'
      };

      const analyzer = new PassageAnalyzer();
      const result = await analyzer.analysis(complexPassage);

      expect(result.input).toEqual(complexPassage);
      expect(result.sentences.length).toBeGreaterThan(0);
    });
  });
});
