import { Chunk } from '../analyzer/model';

export class SentenceChunkValidator {
  /**
   * 验证单个Chunk结构
   * @param chunk Chunk对象
   * @param tokenCount tokens数量（可选，用于验证tokenIndexes范围）
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validate(chunk: Chunk, tokenCount: number = 0): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 验证index字段
    if (typeof chunk.index !== 'number') {
      errors.push('Chunk index is required and must be a number');
    }

    // 验证content字段
    if (!chunk.content || typeof chunk.content !== 'string') {
      errors.push('Chunk content is required and must be a string');
    }

    // 验证contentCn字段
    if (!chunk.contentCn || typeof chunk.contentCn !== 'string') {
      errors.push('Chunk contentCn is required and must be a string');
    }

    // 验证function字段
    if (!chunk.function || typeof chunk.function !== 'string') {
      errors.push('Chunk function is required and must be a string');
    }

    // 验证tokenIndexes字段
    if (!Array.isArray(chunk.tokenIndexes)) {
      errors.push('Chunk tokenIndexes must be an array');
    } else {
      // 验证tokenIndexes数组中的每个元素
      chunk.tokenIndexes.forEach((tokenIndex, tokenIndexIdx) => {
        if (typeof tokenIndex !== 'number') {
          errors.push(`Chunk tokenIndexes[${tokenIndexIdx}] must be a number`);
        } else if (tokenCount > 0 && (tokenIndex < 0 || tokenIndex >= tokenCount)) {
          errors.push(`Chunk tokenIndexes[${tokenIndexIdx}] is out of range`);
        }
      });

      // 验证tokenIndexes是否按顺序递增
      for (let i = 1; i < chunk.tokenIndexes.length; i++) {
        if (chunk.tokenIndexes[i] <= chunk.tokenIndexes[i - 1]) {
          errors.push('Chunk tokenIndexes must be in ascending order');
          break;
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证单个Chunk结构，如果无效则抛出错误
   * @param chunk Chunk对象
   * @param tokenCount tokens数量（可选，用于验证tokenIndexes范围）
   * @throws 验证错误异常
   */
  static validateOrThrow(chunk: Chunk, tokenCount: number = 0): void {
    const { valid, errors } = this.validate(chunk, tokenCount);
    if (!valid) {
      throw new Error(`Chunk validation failed: ${errors.join(', ')}`);
    }
  }

  /**
   * 验证Chunk数组
   * @param chunks Chunk数组
   * @param tokenCount tokens数量（可选，用于验证tokenIndexes范围）
   * @returns 验证结果，包含是否有效和错误信息
   */
  static validateChunks(chunks: Chunk[], tokenCount: number = 0): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (!Array.isArray(chunks)) {
      errors.push('Chunks must be an array');
      return {
        valid: false,
        errors
      };
    }

    // 验证每个Chunk
    chunks.forEach((chunk, index) => {
      const chunkErrors = this.validate(chunk, tokenCount);
      if (chunkErrors.errors.length > 0) {
        chunkErrors.errors.forEach(error => {
          errors.push(`Chunk ${index}: ${error}`);
        });
      }
    });

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * 验证Chunk数组，如果无效则抛出错误
   * @param chunks Chunk数组
   * @param tokenCount tokens数量（可选，用于验证tokenIndexes范围）
   * @throws 验证错误异常
   */
  static validateChunksOrThrow(chunks: Chunk[], tokenCount: number = 0): void {
    const { valid, errors } = this.validateChunks(chunks, tokenCount);
    if (!valid) {
      throw new Error(`Chunks validation failed: ${errors.join(', ')}`);
    }
  }
}
