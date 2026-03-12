import { Sentence, Token, Chunk } from '../analyzer/model';
import { SentenceTokenValidator } from './SentenceTokenValidator';
import { SentenceChunkValidator } from './SentenceChunkValidator';

export class SentenceValidator {
  /**
   * 验证句子结构
   * @param sentence 句子对象
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validate(sentence: Sentence): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证必填字段
    if (!sentence.content || typeof sentence.content !== 'string') {
      errors.push('Sentence content is required and must be a string');
    }

    if (!sentence.contentCn || typeof sentence.contentCn !== 'string') {
      errors.push('Sentence contentCn is required and must be a string');
    }

    // 验证tokens
    if (!Array.isArray(sentence.tokens)) {
      errors.push('Sentence tokens must be an array');
    } else {
      const tokenErrors = SentenceTokenValidator.validateTokens(sentence.tokens);
      errors.push(...tokenErrors.errors);
    }

    // 验证chunks
    if (!Array.isArray(sentence.chunks)) {
      errors.push('Sentence chunks must be an array');
    } else {
      const chunkErrors = SentenceChunkValidator.validateChunks(sentence.chunks, sentence.tokens?.length || 0);
      errors.push(...chunkErrors.errors);

      // 验证所有tokenIndexes的和是否等于tokens数量
      if (Array.isArray(sentence.tokens) && sentence.tokens.length > 0) {
        const tokenCount = sentence.tokens.length;
        const tokenIndexesSet = new Set<number>();

        sentence.chunks.forEach(chunk => {
          if (chunk.tokenIndexes && Array.isArray(chunk.tokenIndexes)) {
            chunk.tokenIndexes.forEach(index => tokenIndexesSet.add(index));
          }
        });

        // 只验证非标点符号的token是否都被包含
        const nonPunctuationTokens = sentence.tokens.filter(token => {
          return !/^[^\w\s]+$/.test(token.content);
        });

        const nonPunctuationTokenIndexes = Array.from(tokenIndexesSet).filter(index => {
          const token = sentence.tokens![index];
          return !/^[^\w\s]+$/.test(token.content);
        });

        if (nonPunctuationTokenIndexes.length !== nonPunctuationTokens.length) {
          errors.push(`Non-punctuation token indexes count (${nonPunctuationTokenIndexes.length}) does not match non-punctuation tokens count (${nonPunctuationTokens.length})`);
        }

        // 验证tokenIndexes是否按顺序递增
        const allTokenIndexes: number[] = [];
        sentence.chunks.forEach(chunk => {
          if (chunk.tokenIndexes && Array.isArray(chunk.tokenIndexes)) {
            allTokenIndexes.push(...chunk.tokenIndexes);
          }
        });

        for (let i = 1; i < allTokenIndexes.length; i++) {
          if (allTokenIndexes[i] <= allTokenIndexes[i - 1]) {
            errors.push('Token indexes must be in ascending order');
            break;
          }
        }

        // 验证chunks是否按index递增
        for (let i = 1; i < sentence.chunks.length; i++) {
          if (sentence.chunks[i].index <= sentence.chunks[i - 1].index) {
            errors.push('Chunks must be in ascending order by index');
            break;
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证句子结构，如果无效则抛出错误
   * @param sentence 句子对象
   * @throws 验证错误异常
   */
  static validateOrThrow(sentence: Sentence): void {
    const { valid, errors } = this.validate(sentence);
    if (!valid) {
      throw new Error(`Sentence validation failed: ${errors.join(', ')}`);
    }
  }




}