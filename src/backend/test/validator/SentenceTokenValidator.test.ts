import { SentenceTokenValidator } from '../../validator/SentenceTokenValidator';
import { Token } from '../../analyzer/model';

describe('SentenceTokenValidator', () => {
  describe('validate', () => {
    it('should validate valid token successfully', () => {
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: 'Greeting'
      };

      const result = SentenceTokenValidator.validate(validToken);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject token without content field', () => {
      const invalidToken = {
        words: ['Hello'],
        explain: 'Greeting'
      } as Token;

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token content is required and must be a string');
    });

    it('should reject token with empty content', () => {
      const invalidToken: Token = {
        content: '',
        words: ['Hello'],
        explain: 'Greeting'
      };

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token content is required and must be a string');
    });

    it('should reject token without words field', () => {
      const invalidToken = {
        content: 'Hello',
        explain: 'Greeting'
      } as Token;

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token words must be an array');
    });

    it('should reject token with non-array words', () => {
      const invalidToken = {
        content: 'Hello',
        words: 'Hello' as any,
        explain: 'Greeting'
      } as Token;

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token words must be an array');
    });

    it('should reject token with empty words array', () => {
      const invalidToken: Token = {
        content: 'Hello',
        words: [],
        explain: 'Greeting'
      };

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject token with non-string word in words array', () => {
      const invalidToken: Token = {
        content: 'Hello',
        words: ['Hello', 123 as any],
        explain: 'Greeting'
      };

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token words[1] must be a non-empty string');
    });

    it('should reject token with empty string in words array', () => {
      const invalidToken: Token = {
        content: 'Hello',
        words: ['Hello', ''],
        explain: 'Greeting'
      };

      const result = SentenceTokenValidator.validate(invalidToken);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token words[1] must be a non-empty string');
    });

    it('should accept token without explain field', () => {
      const validToken = {
        content: 'Hello',
        words: ['Hello']
      } as Token;

      const result = SentenceTokenValidator.validate(validToken);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should accept token with empty explain', () => {
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: ''
      };

      const result = SentenceTokenValidator.validate(validToken);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw error for valid token', () => {
      const validToken: Token = {
        content: 'Hello',
        words: ['Hello'],
        explain: 'Greeting'
      };

      expect(() => SentenceTokenValidator.validateOrThrow(validToken)).not.toThrow();
    });

    it('should throw error for invalid token', () => {
      const invalidToken = {
        words: ['Hello'],
        explain: 'Greeting'
      } as Token;

      expect(() => SentenceTokenValidator.validateOrThrow(invalidToken)).toThrow();
    });
  });

  describe('validateTokens', () => {
    it('should validate valid tokens array successfully', () => {
      const validTokens: Token[] = [
        {
          content: 'Hello',
          words: ['Hello'],
          explain: 'Greeting'
        },
        {
          content: 'world',
          words: ['world'],
          explain: 'Planet'
        }
      ];

      const result = SentenceTokenValidator.validateTokens(validTokens);
      expect(result.valid).toBe(true);
      expect(result.errors.length).toBe(0);
    });

    it('should reject non-array tokens', () => {
      const invalidTokens = 'not an array' as any;

      const result = SentenceTokenValidator.validateTokens(invalidTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Tokens must be an array');
    });

    it('should reject tokens array with invalid token', () => {
      const invalidTokens: Token[] = [
        {
          content: 'Hello',
          words: ['Hello'],
          explain: 'Greeting'
        },
        {
          words: ['world'],
          explain: 'Planet'
        } as Token
      ];

      const result = SentenceTokenValidator.validateTokens(invalidTokens);
      expect(result.valid).toBe(false);
      expect(result.errors.length).toBeGreaterThan(0);
      expect(result.errors).toContain('Token 1: Token content is required and must be a string');
    });
  });

  describe('validateTokensOrThrow', () => {
    it('should not throw error for valid tokens array', () => {
      const validTokens: Token[] = [
        {
          content: 'Hello',
          words: ['Hello'],
          explain: 'Greeting'
        },
        {
          content: 'world',
          words: ['world'],
          explain: 'Planet'
        }
      ];

      expect(() => SentenceTokenValidator.validateTokensOrThrow(validTokens)).not.toThrow();
    });

    it('should throw error for invalid tokens array', () => {
      const invalidTokens: Token[] = [
        {
          content: 'Hello',
          words: ['Hello'],
          explain: 'Greeting'
        },
        {
          words: ['world'],
          explain: 'Planet'
        } as Token
      ];

      expect(() => SentenceTokenValidator.validateTokensOrThrow(invalidTokens)).toThrow();
    });
  });
});
