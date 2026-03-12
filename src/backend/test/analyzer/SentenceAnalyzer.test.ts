import { SentenceAnalyzer } from '../../analyzer/SentenceAnalyzer';
import { describe, expect, it } from '@jest/globals';

describe('SentenceAnalyzer', () => {
  describe('analysis', () => {
    it('should analyze sentence successfully', async () => {
      const testSentence = '"What\'s that?" she asked softly.';

      const sentenceAnalyzer = new SentenceAnalyzer();
      const result = await sentenceAnalyzer.analysis(testSentence);

      expect(result.content).toBeDefined();
      expect(result.contentCn).toBeDefined();
      expect(result.tokens.length).toBeGreaterThan(0);
      expect(result.chunks.length).toBeGreaterThan(0);
      expect(result.tokens.some(token => token.content.includes('What'))).toBe(true);
      expect(result.tokens.some(token => token.content.includes('she'))).toBe(true);
      expect(result.tokens.some(token => token.content.includes('asked'))).toBe(true);
    });
  });
});
