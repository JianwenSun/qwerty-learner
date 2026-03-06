import { SentenceChunkValidator } from '../../validator/SentenceChunkValidator';
import { Chunk } from '../../analyzer/model';

describe('SentenceChunkValidator', () => {
  describe('validate', () => {
    it('should validate valid chunk successfully', () => {
      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const result = SentenceChunkValidator.validate(validChunk, 3);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject chunk without index field', () => {
      const invalidChunk = {
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk index is required and must be a number');
    });

    it('should reject chunk with non-number index', () => {
      const invalidChunk = {
        index: '0' as any,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk index is required and must be a number');
    });

    it('should reject chunk without content field', () => {
      const invalidChunk = {
        index: 0,
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk content is required and must be a string');
    });

    it('should reject chunk with empty content', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: '',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk content is required and must be a string');
    });

    it('should reject chunk without contentCn field', () => {
      const invalidChunk = {
        index: 0,
        content: 'Hello world',
        function: '主要内容',
        tokenIndexes: [0, 1]
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk contentCn is required and must be a string');
    });

    it('should reject chunk with empty contentCn', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk contentCn is required and must be a string');
    });

    it('should reject chunk without function field', () => {
      const invalidChunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        tokenIndexes: [0, 1]
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk function is required and must be a string');
    });

    it('should reject chunk with empty function', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '',
        tokenIndexes: [0, 1]
      };

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk function is required and must be a string');
    });

    it('should reject chunk without tokenIndexes field', () => {
      const invalidChunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容'
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk tokenIndexes must be an array');
    });

    it('should reject chunk with non-array tokenIndexes', () => {
      const invalidChunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: '0,1' as any
      } as Chunk;

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk tokenIndexes must be an array');
    });

    it('should reject chunk with non-number tokenIndex', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, '1' as any]
      };

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk tokenIndexes[1] must be a number');
    });

    it('should reject chunk with out-of-range tokenIndex', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 5]
      };

      const result = SentenceChunkValidator.validate(invalidChunk, 3);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk tokenIndexes[1] is out of range');
    });

    it('should reject chunk with non-ascending tokenIndexes', () => {
      const invalidChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [1, 0]
      };

      const result = SentenceChunkValidator.validate(invalidChunk);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk tokenIndexes must be in ascending order');
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw error for valid chunk', () => {
      const validChunk: Chunk = {
        index: 0,
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      };

      expect(() => SentenceChunkValidator.validateOrThrow(validChunk)).not.toThrow();
    });

    it('should throw error for invalid chunk', () => {
      const invalidChunk = {
        content: 'Hello world',
        contentCn: '你好，世界',
        function: '主要内容',
        tokenIndexes: [0, 1]
      } as Chunk;

      expect(() => SentenceChunkValidator.validateOrThrow(invalidChunk)).toThrow();
    });
  });

  describe('validateChunks', () => {
    it('should validate valid chunks array successfully', () => {
      const validChunks: Chunk[] = [
        {
          index: 0,
          content: 'Hello world',
          contentCn: '你好，世界',
          function: '主要内容',
          tokenIndexes: [0, 1]
        },
        {
          index: 1,
          content: '!',
          contentCn: '！',
          function: '标点符号',
          tokenIndexes: [2]
        }
      ];

      const result = SentenceChunkValidator.validateChunks(validChunks, 3);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject non-array chunks', () => {
      const invalidChunks = 'not an array' as any;

      const result = SentenceChunkValidator.validateChunks(invalidChunks);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunks must be an array');
    });

    it('should reject chunks array with invalid chunk', () => {
      const invalidChunks: Chunk[] = [
        {
          index: 0,
          content: 'Hello world',
          contentCn: '你好，世界',
          function: '主要内容',
          tokenIndexes: [0, 1]
        },
        {
          content: '!',
          contentCn: '！',
          function: '标点符号',
          tokenIndexes: [2]
        } as Chunk
      ];

      const result = SentenceChunkValidator.validateChunks(invalidChunks);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Chunk 1: Chunk index is required and must be a number');
    });
  });

  describe('validateChunksOrThrow', () => {
    it('should not throw error for valid chunks array', () => {
      const validChunks: Chunk[] = [
        {
          index: 0,
          content: 'Hello world',
          contentCn: '你好，世界',
          function: '主要内容',
          tokenIndexes: [0, 1]
        },
        {
          index: 1,
          content: '!',
          contentCn: '！',
          function: '标点符号',
          tokenIndexes: [2]
        }
      ];

      expect(() => SentenceChunkValidator.validateChunksOrThrow(validChunks)).not.toThrow();
    });

    it('should throw error for invalid chunks array', () => {
      const invalidChunks: Chunk[] = [
        {
          index: 0,
          content: 'Hello world',
          contentCn: '你好，世界',
          function: '主要内容',
          tokenIndexes: [0, 1]
        },
        {
          content: '!',
          contentCn: '！',
          function: '标点符号',
          tokenIndexes: [2]
        } as Chunk
      ];

      expect(() => SentenceChunkValidator.validateChunksOrThrow(invalidChunks)).toThrow();
    });
  });
});
