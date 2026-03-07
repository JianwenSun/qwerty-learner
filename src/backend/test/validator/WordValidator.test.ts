import { WordValidator } from '../../validator/WordValidator';

describe('WordValidator', () => {
  describe('validate', () => {
    it('should return valid for a valid word', () => {
      const result = WordValidator.validate('hello');
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid for an empty string', () => {
      const result = WordValidator.validate('');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must be a non-empty string');
    });

    it('should return invalid for a number', () => {
      const result = WordValidator.validate('123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word cannot be a number');
    });

    it('should return invalid for a word with non-alphabetic characters', () => {
      const result = WordValidator.validate('hello123');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must only contain alphabetic characters');
    });

    it('should return invalid for a word with special characters', () => {
      const result = WordValidator.validate('hello!');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must only contain alphabetic characters');
    });

    it('should return invalid for a word that is too long', () => {
      const longWord = 'a'.repeat(51);
      const result = WordValidator.validate(longWord);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word length cannot exceed 50 characters');
    });

    it('should return invalid for null', () => {
      const result = WordValidator.validate(null as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must be a non-empty string');
    });

    it('should return invalid for undefined', () => {
      const result = WordValidator.validate(undefined as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must be a non-empty string');
    });

    it('should return invalid for a number type', () => {
      const result = WordValidator.validate(123 as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word must be a non-empty string');
    });
  });

  describe('validateOrThrow', () => {
    it('should not throw for a valid word', () => {
      expect(() => WordValidator.validateOrThrow('hello')).not.toThrow();
    });

    it('should throw for an invalid word', () => {
      expect(() => WordValidator.validateOrThrow('123')).toThrow();
    });
  });

  describe('validateWords', () => {
    it('should return valid for a valid array of words', () => {
      const result = WordValidator.validateWords(['hello', 'world']);
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should return invalid for an empty array', () => {
      const result = WordValidator.validateWords([]);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Words array must not be empty');
    });

    it('should return invalid for a non-array', () => {
      const result = WordValidator.validateWords('hello' as any);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Words must be an array');
    });

    it('should return invalid for an array with invalid words', () => {
      const result = WordValidator.validateWords(['hello', '123', 'world!']);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Word 1: Word cannot be a number');
      expect(result.errors).toContain('Word 2: Word must only contain alphabetic characters');
    });
  });

  describe('validateWordsOrThrow', () => {
    it('should not throw for a valid array of words', () => {
      expect(() => WordValidator.validateWordsOrThrow(['hello', 'world'])).not.toThrow();
    });

    it('should throw for an array with invalid words', () => {
      expect(() => WordValidator.validateWordsOrThrow(['hello', '123'])).toThrow();
    });
  });
});
