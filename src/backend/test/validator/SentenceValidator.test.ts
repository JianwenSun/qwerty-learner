import { SentenceValidator } from '../../validator/SentenceValidator';
import { Sentence, Token, Chunk } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('SentenceValidatorTest', () => {
  describe('validate', () => {
    it('should validate valid sentence', () => {
      const validSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' },
          { content: 'world', words: ['world'], explain: '名词' },
          { content: '!', words: [], explain: '' }
        ],
        chunks: [
          { index: 0, content: 'Hello world', contentCn: '你好，世界', function: '主要内容', tokenIndexes: [0, 1] },
          { index: 1, content: '!', contentCn: '！', function: '标点符号', tokenIndexes: [2] }
        ]
      };

      const result = SentenceValidator.validate(validSentence);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject sentence without content field', () => {
      const noContentSentence: Sentence = {
        contentCn: '你好，世界！',
        tokens: [],
        chunks: []
      } as any;

      const result = SentenceValidator.validate(noContentSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence without contentCn field', () => {
      const noContentCnSentence: Sentence = {
        content: 'Hello world!',
        tokens: [],
        chunks: []
      } as any;

      const result = SentenceValidator.validate(noContentCnSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with non-array tokens', () => {
      const invalidTokensSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: 'not an array' as any,
        chunks: []
      };

      const result = SentenceValidator.validate(invalidTokensSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with non-array chunks', () => {
      const invalidChunksSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [],
        chunks: 'not an array' as any
      };

      const result = SentenceValidator.validate(invalidChunksSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with token missing content field', () => {
      const invalidTokenSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { words: ['Hello'], explain: '问候语' } as any // 缺少content
        ],
        chunks: []
      };

      const result = SentenceValidator.validate(invalidTokenSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with chunk missing required fields', () => {
      const invalidChunkSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' }
        ],
        chunks: [
          { content: 'Hello', contentCn: '你好', function: '主要内容' } as any // 缺少index和tokenIndexes
        ]
      };

      const result = SentenceValidator.validate(invalidChunkSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with mismatched token indexes count', () => {
      const mismatchedTokenIndexesSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' },
          { content: 'world', words: ['world'], explain: '名词' }
        ],
        chunks: [
          { index: 0, content: 'Hello', contentCn: '你好', function: '问候语', tokenIndexes: [0] }
          // 缺少tokenIndex 1
        ]
      };

      const result = SentenceValidator.validate(mismatchedTokenIndexesSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with unordered token indexes', () => {
      const unorderedTokenIndexesSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' },
          { content: 'world', words: ['world'], explain: '名词' }
        ],
        chunks: [
          { index: 0, content: 'Hello world', contentCn: '你好，世界', function: '主要内容', tokenIndexes: [1, 0] } // 顺序错误
        ]
      };

      const result = SentenceValidator.validate(unorderedTokenIndexesSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject sentence with unordered chunks', () => {
      const unorderedChunksSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' },
          { content: 'world', words: ['world'], explain: '名词' }
        ],
        chunks: [
          { index: 1, content: 'world', contentCn: '世界', function: '名词', tokenIndexes: [1] },
          { index: 0, content: 'Hello', contentCn: '你好', function: '问候语', tokenIndexes: [0] } // 顺序错误
        ]
      };

      const result = SentenceValidator.validate(unorderedChunksSentence);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw error for valid sentence', () => {
      const validSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [
          { content: 'Hello', words: ['Hello'], explain: '问候语' },
          { content: 'world', words: ['world'], explain: '名词' }
        ],
        chunks: [
          { index: 0, content: 'Hello world', contentCn: '你好，世界', function: '主要内容', tokenIndexes: [0, 1] }
        ]
      };

      expect(() => {
        SentenceValidator.validateOrThrow(validSentence);
      }).not.toThrow();
    });

    it('should throw error for invalid sentence', () => {
      const invalidSentence: Sentence = {
        contentCn: '你好，世界！',
        tokens: [],
        chunks: []
      } as any; // 缺少content

      expect(() => {
        SentenceValidator.validateOrThrow(invalidSentence);
      }).toThrow();
    });
  });
});
