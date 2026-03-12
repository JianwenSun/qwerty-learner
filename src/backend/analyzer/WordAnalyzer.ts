import { WordInput, WordOutput, Sense } from './model';

// 单词分析器
export class WordAnalyzer {
  /**
   * 分析单词，生成释义和词性
   * @param input 单词输入
   * @returns 单词分析结果
   */
  async analyzeWord(input: WordInput): Promise<WordOutput> {
    try {
      // 这里可以实现实际的单词分析逻辑
      // 例如调用外部 API 获取单词的释义和词性
      // 目前使用模拟数据
      const senses: Sense[] = this.generateMockSenses(input.content);

      return {
        senses
      };
    } catch (error) {
      console.error('单词分析失败:', error);
      throw error;
    }
  }

  /**
   * 生成模拟的单词释义和词性
   * @param word 单词
   * @returns 释义数组
   */
  private generateMockSenses(word: string): Sense[] {
    // 模拟不同单词的释义和词性
    const mockData: Record<string, Sense[]> = {
      'hello': [
        { content: '你好', pos: '感叹词' },
        { content: '喂', pos: '感叹词' }
      ],
      'world': [
        { content: '世界', pos: '名词' },
        { content: '地球', pos: '名词' }
      ],
      'test': [
        { content: '测试', pos: '名词' },
        { content: '测试', pos: '动词' }
      ]
    };

    return mockData[word.toLowerCase()] || [
      { content: '未知', pos: '未知' }
    ];
  }
}
