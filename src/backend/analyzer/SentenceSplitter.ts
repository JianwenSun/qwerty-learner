import { callChat } from '../ai/ai';
import { PassageInput, SentenceSplitOutput } from './model';

// 句子切分器类
export class SentenceSplitter {
  /**
   * 分析短文
   * @param input 短文输入
   * @returns 分析结果
   * @throws 格式错误异常
   */
  async analysis(input: PassageInput): Promise<SentenceSplitOutput> {

    const systemInput = `你是一个英文短文分析器，需要将输入的短文分割成句子，并以JSON格式返回。
返回格式必须是{"sentences": ["句子1", "句子2", ...]}。
注意：
1. 不要包含标题和作者信息；
2. 当遇到"... said, "...""这样的结构时，将其拆分为两个句子："... said." 和 "..."；
3. 移除所有双引号；
4. 确保每个句子都以句号、问号或叹号结尾；
5. 确保每个句子的首字母都是大写。`;
    const userInput = `请分析以下短文，将其分割成句子：\n标题: ${input.title}\n作者: ${input.author}\n内容: ${input.content}`;

    try {
      // 调用大模型
      const response = await callChat(systemInput, userInput);

      // 检查响应是否为空
      if (!response || response.length === 0) {
        throw new Error('大模型返回空响应，请检查服务是否运行，以及模型名称是否正确。');
      }

      // 解析JSON响应
      let parsedResponse;
      try {
        parsedResponse = JSON.parse(response);
        console.log('Parsed response:', JSON.stringify(parsedResponse, null, 2));
      } catch (error) {
        console.error('JSON parse error:', error);
        throw new Error(`大模型返回格式错误，无法解析JSON。原始响应：${response}`);
      }

      // 如果是对象数组，尝试提取text字段
      const processedSentences = [];
      for (const sentence of parsedResponse.sentences) {
        let processedSentence;
        if (typeof sentence === 'string') {
          processedSentence = sentence;
        } else if (typeof sentence === 'object' && sentence.text) {
          processedSentence = sentence.text;
        } else {
          throw new Error('大模型返回格式错误，sentences数组中包含非字符串元素');
        }

        // 过滤掉标题和作者信息
        if (!processedSentence.startsWith('标题:') && !processedSentence.startsWith('作者:') && !processedSentence.startsWith('Title:') && !processedSentence.startsWith('Author:')) {
          // 确保句子首字母大写
          const capitalizedSentence = processedSentence.charAt(0).toUpperCase() + processedSentence.slice(1);
          processedSentences.push(capitalizedSentence);
        }
      }
      parsedResponse.sentences = processedSentences;
      console.log('Processed sentences:', parsedResponse.sentences);

      // 构建返回结果
      return {
        input,
        sentences: parsedResponse.sentences
      };
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      } else {
        throw new Error('分析过程中发生未知错误');
      }
    }
  }
}
