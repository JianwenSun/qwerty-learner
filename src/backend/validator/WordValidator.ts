export class WordValidator {
  /**
   * 验证单词是否有效
   * @param word 单词字符串
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validate(word: string): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证单词是否为非空字符串
    if (!word || typeof word !== 'string') {
      errors.push('Word must be a non-empty string');
      return { valid: false, errors };
    }

    // 验证单词长度
    if (word.length === 0) {
      errors.push('Word cannot be empty');
    }

    if (word.length > 50) {
      errors.push('Word length cannot exceed 50 characters');
    }

    // 验证单词是否只包含字母
    if (!/^[a-zA-Z]+$/.test(word)) {
      errors.push('Word must only contain alphabetic characters');
    }

    // 验证单词是否为数字
    if (!isNaN(Number(word))) {
      errors.push('Word cannot be a number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证单词是否有效，如果无效则抛出错误
   * @param word 单词字符串
   * @throws 验证错误异常
   */
  static validateOrThrow(word: string): void {
    const { valid, errors } = this.validate(word);
    if (!valid) {
      throw new Error(`Word validation failed: ${errors.join(', ')}`);
    }
  }

  /**
   * 验证单词数组
   * @param words 单词数组
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validateWords(words: string[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(words)) {
      errors.push('Words must be an array');
      return { valid: false, errors };
    }

    // 验证数组不为空
    if (words.length === 0) {
      errors.push('Words array must not be empty');
    }

    // 验证每个单词
    words.forEach((word, index) => {
      const wordErrors = this.validate(word);
      if (wordErrors.errors.length > 0) {
        wordErrors.errors.forEach(error => {
          errors.push(`Word ${index}: ${error}`);
        });
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证单词数组，如果无效则抛出错误
   * @param words 单词数组
   * @throws 验证错误异常
   */
  static validateWordsOrThrow(words: string[]): void {
    const { valid, errors } = this.validateWords(words);
    if (!valid) {
      throw new Error(`Words validation failed: ${errors.join(', ')}`);
    }
  }
}
