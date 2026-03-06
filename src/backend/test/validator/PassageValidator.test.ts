import { PassageValidator } from '../../validator/PassageValidator';
import { PassageInput, PassageAnalysisOutput, Sentence, Token, Chunk } from '../../analyzer/model';
import { describe, expect, it } from '@jest/globals';

describe('PassageValidatorTest', () => {
  describe('validateInput', () => {
    it('should validate valid passage input', () => {
      const validPassage: PassageInput = {
        title: 'Test Passage',
        author: 'Test Author',
        content: 'Hello world! This is a test passage.'
      };

      const result = PassageValidator.validateInput(validPassage);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject passage input without title', () => {
      const noTitlePassage: any = {
        content: 'Hello world!'
      };

      const result = PassageValidator.validateInput(noTitlePassage);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passage input without content', () => {
      const noContentPassage: any = {
        title: 'Test Passage'
      };

      const result = PassageValidator.validateInput(noContentPassage);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passage input with invalid author type', () => {
      const invalidAuthorPassage: any = {
        title: 'Test Passage',
        content: 'Hello world!',
        author: 123 // 应该是字符串
      };

      const result = PassageValidator.validateInput(invalidAuthorPassage);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should validate minimal valid passage input', () => {
      const minimalPassage: PassageInput = {
        title: 'Minimal Passage',
        content: 'Hello!'
      };

      const result = PassageValidator.validateInput(minimalPassage);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('validateOutput', () => {
    it('should validate valid passage analysis output', () => {
      // 创建有效的token和chunk
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: '问候语'
      };

      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const validSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [validToken, { content: 'world', words: ['world'], explain: '名词' }, { content: '!', words: [], explain: '' }],
        chunks: [validChunk, { index: 1, content: '!', contentCn: '！', function: '标点', tokenIndexes: [2] }]
      };

      const validOutput: PassageAnalysisOutput = {
        input: {
          title: 'Test Passage',
          content: 'Hello world!'
        },
        sentences: [validSentence],
        words: ['hello', 'world']
      };

      const result = PassageValidator.validateOutput(validOutput);
      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject passage output without input field', () => {
      // 创建有效的token和chunk
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: '问候语'
      };

      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const validSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [validToken, { content: 'world', words: ['world'], explain: '名词' }, { content: '!', words: [], explain: '' }],
        chunks: [validChunk, { index: 1, content: '!', contentCn: '！', function: '标点', tokenIndexes: [2] }]
      };

      const noInputOutput: PassageAnalysisOutput = {
        sentences: [validSentence],
        words: ['hello', 'world']
      } as any;

      const result = PassageValidator.validateOutput(noInputOutput);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passage output without sentences field', () => {
      const noSentencesOutput: PassageAnalysisOutput = {
        input: {
          title: 'Test Passage',
          content: 'Hello world!'
        },
        words: ['hello', 'world']
      } as any;

      const result = PassageValidator.validateOutput(noSentencesOutput);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passage output without words field', () => {
      // 创建有效的token和chunk
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: '问候语'
      };

      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const validSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [validToken, { content: 'world', words: ['world'], explain: '名词' }, { content: '!', words: [], explain: '' }],
        chunks: [validChunk, { index: 1, content: '!', contentCn: '！', function: '标点', tokenIndexes: [2] }]
      };

      const noWordsOutput: PassageAnalysisOutput = {
        input: {
          title: 'Test Passage',
          content: 'Hello world!'
        },
        sentences: [validSentence]
      } as any;

      const result = PassageValidator.validateOutput(noWordsOutput);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });

    it('should reject passage output with invalid sentence', () => {
      // 创建有效的token和chunk
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: '问候语'
      };

      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const invalidSentence: Sentence = {
        content: 'Hello world!',
        contentCn: '你好，世界！',
        tokens: [], // 空tokens
        chunks: [validChunk]
      };

      const invalidSentenceOutput: PassageAnalysisOutput = {
        input: {
          title: 'Test Passage',
          content: 'Hello world!'
        },
        sentences: [invalidSentence],
        words: ['hello', 'world']
      };

      const result = PassageValidator.validateOutput(invalidSentenceOutput);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
    });
  });

  describe('validateInputOrThrow', () => {
    it('should not throw error for valid input', () => {
      const validInput: PassageInput = {
        title: 'Test Passage',
        content: 'Hello world!'
      };

      expect(() => {
        PassageValidator.validateInputOrThrow(validInput);
      }).not.toThrow();
    });

    it('should throw error for invalid input', () => {
      const invalidInput: PassageInput = {
        content: 'Hello world!'
      } as any; // 缺少title

      expect(() => {
        PassageValidator.validateInputOrThrow(invalidInput);
      }).toThrow();
    });
  });
});
