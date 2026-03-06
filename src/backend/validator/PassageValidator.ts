import { PassageAnalysisOutput, PassageInput } from '../analyzer/model';
import { SentenceValidator } from './SentenceValidator';

// 短文验证器类
export class PassageValidator {
  /**
   * 验证短文输入结构是否满足要求
   * @param passage 待验证的短文输入
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validateInput(passage: PassageInput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证必填字段
    if (!passage.title || typeof passage.title !== 'string') {
      errors.push('短文缺少有效的title字段');
    }

    if (!passage.content || typeof passage.content !== 'string') {
      errors.push('短文缺少有效的content字段');
    }

    // author字段是可选的，但如果存在，必须是字符串
    if (passage.author !== undefined && typeof passage.author !== 'string') {
      errors.push('短文的author字段必须是字符串');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证短文分析输出结构是否满足要求
   * @param output 待验证的短文分析输出
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validateOutput(output: PassageAnalysisOutput): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证input字段
    if (!output.input) {
      errors.push('短文分析输出缺少input字段');
    } else {
      const inputValidation = this.validateInput(output.input);
      errors.push(...inputValidation.errors);
    }

    // 验证sentences字段
    if (!output.sentences || !Array.isArray(output.sentences)) {
      errors.push('短文分析输出缺少有效的sentences数组');
    } else {
      // 验证每个句子
      output.sentences.forEach((sentence, index) => {
        const sentenceValidation = SentenceValidator.validate(sentence);
        if (!sentenceValidation.valid) {
          errors.push(`第${index}个句子验证失败: ${sentenceValidation.errors.join('; ')}`);
        }
      });
    }

    // 验证words字段
    if (!output.words || !Array.isArray(output.words)) {
      errors.push('短文分析输出缺少有效的words数组');
    } else {
      // 验证words数组中的元素是否都是字符串
      output.words.forEach((word, index) => {
        if (typeof word !== 'string') {
          errors.push(`第${index}个单词不是字符串`);
        }
      });
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证短文输入结构并抛出错误
   * @param passage 待验证的短文输入
   * @throws 验证错误
   */
  static validateInputOrThrow(passage: PassageInput): void {
    const result = this.validateInput(passage);
    if (!result.valid) {
      throw new Error(`短文输入结构验证失败：${result.errors.join('; ')}`);
    }
  }

  /**
   * 验证短文分析输出结构并抛出错误
   * @param output 待验证的短文分析输出
   * @throws 验证错误
   */
  static validateOutputOrThrow(output: PassageAnalysisOutput): void {
    const result = this.validateOutput(output);
    if (!result.valid) {
      throw new Error(`短文分析输出结构验证失败：${result.errors.join('; ')}`);
    }
  }
}
