import { Token } from '../analyzer/model';

export class SentenceTokenValidator {
  /**
   * 验证单个Token结构
   * @param token Token对象
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validate(token: Token): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证content字段
    if (!token.content || typeof token.content !== 'string') {
      errors.push('Token content is required and must be a string');
    }

    // 验证words字段
    if (!Array.isArray(token.words)) {
      errors.push('Token words must be an array');
    } else {
      // 验证words数组中的每个元素（如果数组非空）
      token.words.forEach((word, index) => {
        // 支持两种格式：字符串数组或WordPos对象数组
        if (typeof word === 'object' && word !== null) {
          // 验证WordPos对象
          if (!word.word || typeof word.word !== 'string') {
            errors.push(`Token words[${index}].word must be a non-empty string`);
          }
          if (!word.pos || typeof word.pos !== 'string') {
            errors.push(`Token words[${index}].pos must be a non-empty string`);
          }
        } else {
          errors.push(`Token words[${index}] must be a WordPos object`);
        }
      });
    }

    // 验证explain字段
    if (token.explain !== undefined && typeof token.explain !== 'string') {
      errors.push('Token explain must be a string');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证单个Token结构，如果无效则抛出错误
   * @param token Token对象
   * @throws 验证错误异常
   */
  static validateOrThrow(token: Token): void {
    const { valid, errors } = this.validate(token);
    if (!valid) {
      throw new Error(`Token validation failed: ${errors.join(', ')}`);
    }
  }

  /**
   * 验证Token数组
   * @param tokens Token数组
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validateTokens(tokens: Token[]): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(tokens)) {
      errors.push('Tokens must be an array');
      return {
        valid: false,
        errors
      };
    }

    // 验证tokens数组不为空
    if (tokens.length === 0) {
      errors.push('Tokens array must not be empty');
    }

    // 验证每个Token
    tokens.forEach((token, index) => {
      const tokenErrors = this.validate(token);
      if (tokenErrors.errors.length > 0) {
        tokenErrors.errors.forEach(error => {
          errors.push(`Token ${index}: ${error}`);
        });
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证Token数组，如果无效则抛出错误
   * @param tokens Token数组
   * @throws 验证错误异常
   */
  static validateTokensOrThrow(tokens: Token[]): void {
    const { valid, errors } = this.validateTokens(tokens);
    if (!valid) {
      throw new Error(`Tokens validation failed: ${errors.join(', ')}`);
    }
  }
}
