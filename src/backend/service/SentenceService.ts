import { PassageAnalyzer } from './../analyzer/PassageAnalyzer';
import { PassageInput } from '../analyzer/model';
import { PassageService as PassageStorage } from '../storage/PassageStorage';
import { WordService } from './WordService';

// 句子服务类
export class SentenceService {
  private passageAnalyzer: PassageAnalyzer;
  private passageStorage: PassageStorage;
  private wordService: WordService;

  constructor() {
    this.passageAnalyzer = new PassageAnalyzer();
    this.passageStorage = new PassageStorage();
    this.wordService = new WordService();
  }

  // 分析并存储短文
  // @param input 短文输入
  // @returns 存储的文章
  async analyzeAndStorePassage(input: PassageInput) {
    try {
      // 1. 使用 PassageAnalyzer 分析短文
      console.log('Analyzing passage...');
      const analysisResult = await this.passageAnalyzer.analysis(input);
      console.log('Analysis completed successfully');

      // 2. 存储单词
      console.log('Storing words...');
      await this.wordService.processAndStoreWords(analysisResult.words);
      console.log('Words stored successfully');

      // 3. 使用 PassageStorage 存储分析结果
      console.log('Storing passage...');
      const storedPassage = await this.passageStorage.savePassage({
        title: input.title,
        content: input.content,
        author: input.author
      }, analysisResult.sentences);
      console.log('Passage stored successfully');
      console.log('Stored passage:', JSON.stringify(storedPassage, null, 2));

      return storedPassage;
    } catch (error) {
      console.error('Error analyzing and storing passage:', error);
      throw error;
    } finally {
      // 断开连接
      await this.wordService.disconnect();
      await this.passageStorage.disconnect();
    }
  }
}