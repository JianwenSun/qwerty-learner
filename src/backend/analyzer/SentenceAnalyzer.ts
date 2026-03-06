import { callChat } from '../ai/ai';
import { Sentence } from './model';
import { SentenceValidator } from '../validator/SentenceValidator';

// 句子分析器类
export class SentenceAnalyzer {

  // 构建大模型请求
  private static readonly SYSTEM_PROMPT = `你是一个专业的英文句子分析器，需要对输入的英文句子进行详细分析。请严格按照以下要求执行：
                1. 翻译功能：将输入的英文句子准确、完整地翻译成中文，确保包含所有信息。

                2. 单词标记（tokens）拆分：
                  - 将句子拆分为单词级别的标记
                  - 特别注意处理缩写、所有格等非独立单词形式
                  - 对每个标记必须提供以下信息：
                    - content: 标记的原始内容（如 "I", "'m", "mother's"）
                    - words: 拆分后的完整单词数组（如 ["I"], ["am"], ["mother"])
                    - explain: 对标记的解释说明（如 "代词"，"缩写，表示 'am'"，"s格，表示归属"）
                  - 重要示例：
                    - 对于 "I'm"，必须拆分为两个标记：
                      - { content: "I", words: ["I"], explain: "代词" }
                      - { content: "'m", words: ["am"], explain: "缩写，表示 'am'" }
                    - 对于 "mother's"，应该拆分为一个标记：
                      - { content: "mother's", words: ["mother"], explain: "s格，表示归属" }
                  - 注意：
                    - 所有token的content加起来，正好是完整的句子内容
                    - 缩写部分必须作为单独的标记，如 "'m", "'s", "'re" 等
                    - 所有格部分必须作为单独的标记，如 "'s"，"'d" 等
                    - 缩略词部分必须作为单独的标记，如 "U.S.A."，"etc." 等，对应的words数组应当为["U.S.A."]，["etc."]
                    - 当content是独立的完整单词，words可以为空数组
                    - words中的元素必须是完整的单词
                    - 标点符号（如 "."，","，":"，";"，"?"，"!"）不需要解释, explain为空字符串

                3. 意群（chunks）拆分：
                  - 整个句子必须被完整地拆分为多个意群，意群数量应合理，通常为2-4个
                  - 每个意群的内容和功能必须不同，不能重复生成相同的意群
                  - **标点符号不能单独成为一个意群**，必须包含在与其相关的意群中
                  - 对每个意群必须提供以下信息：
                    - content: 意群的原始内容
                    - contentCn: 意群的中文翻译（必须提供，不能为空，必须准确）
                    - function: 意群在句子中的功能（如 "主要谓语部分"，"时间状语"）
                    - tokenIndexes: 意群包含的单词标记索引数组（必须是连续的数字数组，且不能超出tokens数组的长度范围）
                  - 示例：对于句子 "I'm going to the park with my friend this afternoon."
                    必须严格拆分为以下意群：
                    - { content: "I'm going to the park with my friend", contentCn: "我要和我的朋友去公园", function: "主要谓语部分", tokenIndexes: [0, 1, 2, 3, 4, 5, 6, 7, 8] }
                    - { content: "this afternoon.", contentCn: "今天下午。", function: "时间状语", tokenIndexes: [9, 10, 11] }

                4. 输出格式：
                  - 必须返回纯JSON格式，不包含任何额外文本
                  - JSON必须包含以下字段：
                    - content: 原始英文句子（必须与输入一致）
                    - contentCn: 完整的中文翻译
                    - tokens: 单词标记数组（必须包含所有单词，顺序正确）
                    - chunks: 意群数组（必须按照示例格式拆分`;

  /**
   * 分析句子
   * @param input 英文句子
   * @returns 分析结果
   * @throws 格式错误异常
   */
  async analysis(input: string): Promise<Sentence> {

    const userInput = `请分析以下句子：${input}`;
    try {
      const chatResponse = await callChat(SentenceAnalyzer.SYSTEM_PROMPT, userInput);
      // 调试：打印原始响应
      console.log('Raw response from API:', chatResponse);

      // 检查响应是否为空
      if (!chatResponse || chatResponse.length === 0) {
        throw new Error('大模型返回空响应，请检查服务是否运行，以及模型名称是否正确。');
      }

      // 解析JSON响应
      let sentence;
      try {
        sentence = JSON.parse(chatResponse) as Sentence;
      } catch (error) {
        console.error('JSON parse error:', error);
        console.error('Raw chat response:', chatResponse);
        throw error;
      }

      // 为每个chunk添加index字段
      if (sentence.chunks && sentence.chunks.length > 0) {
        sentence.chunks.forEach((chunk, index) => {
          chunk.index = index;
        });
      }

      // 使用SentenceValidator验证结果
      SentenceValidator.validateOrThrow(sentence);

      return sentence;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('分析过程中发生未知错误');
      }
    }
  }
}
