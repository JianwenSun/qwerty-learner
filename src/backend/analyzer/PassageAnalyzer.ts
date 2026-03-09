import { PassageInput, PassageAnalysisOutput } from './model';
import { SentenceSplitter } from './SentenceSplitter';
import { SentenceAnalyzer } from './SentenceAnalyzer';
import { PassageValidator } from '../validator/PassageValidator';

// 句子分析器类
export class PassageAnalyzer {
  /**
   * 分析短文
   * @param input 短文输入
   * @returns 分析结果
   * @throws 格式错误异常
   */
  async analysis(input: PassageInput): Promise<PassageAnalysisOutput> {
    try {
      // 验证输入
      PassageValidator.validateInputOrThrow(input);

      // 1. 使用 SentenceSplitter 拆分句子
      const sentenceSplitter = new SentenceSplitter();
      const splitResult = await sentenceSplitter.analysis(input);

      // 2. 使用 SentenceAnalyzer 分析每个句子
      const sentenceAnalyzer = new SentenceAnalyzer();
      const wordsSet = new Set<string>();

      // 并行处理句子分析
      const analysisPromises = splitResult.sentences.map(async (sentenceStr) => {
        const analysisResult = await sentenceAnalyzer.analysis(sentenceStr);
        // 提取单词到集合中
        for (const token of analysisResult.tokens) {
          // 从words数组中提取单词
          for (const word of token.words) {
            wordsSet.add(word.toLowerCase());
          }
          
          // 如果words数组为空，且content是一个有效的单词，则从content中提取
          if (token.words.length === 0 && token.content) {
            // 去除首尾空格
            const trimmedContent = token.content.trim();
            // 只允许字母、数字和连字符（如face-to-face）
            const isValid = /^[a-zA-Z0-9-]+$/.test(trimmedContent);
            if (isValid && trimmedContent) {
              wordsSet.add(trimmedContent.toLowerCase());
            }
          }
        }
        return analysisResult;
      });

      // 等待所有分析完成
      const analyzedSentences = await Promise.all(analysisPromises);

      // 3. 构建返回结果
      const result: PassageAnalysisOutput = {
        input: input,
        sentences: analyzedSentences,
        words: Array.from(wordsSet)
      };

      // 验证输出
      PassageValidator.validateOutputOrThrow(result);

      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('分析过程中发生未知错误');
      }
    }
  }
}
