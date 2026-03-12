import { WordDao } from '../dao/WordDao';
import { SensesDao } from '../dao/SensesDao';
import { SenseDao } from '../dao/SenseDao';
import { SensesCreateInput } from '../models/SensesModel';
import { SenseCreateInput } from '../models/SenseModel';
import { WordsInput, WordInput } from '../models/WordModel';

export class WordService {
  private wordDao: WordDao;
  private sensesDao: SensesDao;
  private senseDao: SenseDao;

  constructor() {
    this.wordDao = new WordDao();
    this.sensesDao = new SensesDao();
    this.senseDao = new SenseDao();
  }

  async processAndStoreWords(wordsInput: WordsInput): Promise<void> {
    try {
      console.log(`开始处理 ${wordsInput.words.length} 个单词...`);

      // 校验单词
      const validWords = this.validateWords(wordsInput.words);

      // 存储单词
      for (const word of validWords) {
        // 存储单词
        const savedWord = await this.wordDao.saveWord(word.content, word.ukphone, word.usphone);

        // 存储 Senses
        const sensesInput = new SensesCreateInput(savedWord.id, word.ukphone, word.usphone);
        const savedSenses = await this.sensesDao.saveSenses(sensesInput);

        // 存储语义
        for (const sense of word.senses) {
          const senseInput = new SenseCreateInput(sense.content, sense.pos, savedSenses.id);
          await this.senseDao.saveSense(senseInput);
        }
      }

      console.log(`成功存储 ${validWords.length} 个单词`);
    } catch (error) {
      console.error('处理和存储单词失败:', error);
      throw error;
    }
  }

  private validateWords(words: WordInput[]): WordInput[] {
    // 去重并校验单词
    const validWords = new Map<string, WordInput>();

    for (const word of words) {
      // 去除首尾空格
      const trimmedWord = word.content.trim();

      // 只允许字母、数字和连字符（如face-to-face）
      const isValid = /^[a-zA-Z0-9-]+$/.test(trimmedWord);

      if (isValid && trimmedWord) {
        const normalizedWord = trimmedWord.toLowerCase();
        validWords.set(normalizedWord, {
          ...word,
          content: normalizedWord
        });
      }
    }

    return Array.from(validWords.values());
  }

  async disconnect() {
    await this.wordDao.disconnect();
    await this.sensesDao.disconnect();
    await this.senseDao.disconnect();
  }
}