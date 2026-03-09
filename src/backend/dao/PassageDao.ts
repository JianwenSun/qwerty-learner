import { PrismaClient } from '@prisma/client';
import { Sentence } from '../analyzer/model';
import { SentenceDao } from './SentenceDao';
import { DbConnection } from './DbConnection';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

// 文章存储类
export class PassageDao {

  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>;
  private sentenceDao: SentenceDao;

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
    this.sentenceDao = new SentenceDao(this.prisma);
  }

  /**
   * 存储文章数据
   * @param passageData 文章数据
   * @param sentences 句子数组
   * @param options 选项
   * @returns 存储的文章
   */
  async savePassage(passageData: {
    title: string;
    content: string;
    author?: string;
    source?: string;
    chapterId?: number;
  }, sentences: Sentence[]) {
    try {
      // 检查文章是否已存在
      let existingPassage = await this.prisma.passage.findFirst({
        where: {
          title: passageData.title,
          isDeleted: false
        }
      });

      if (!existingPassage) {
        // 计算单词数和句子数
        const wordCount = this.calculateWordCount(sentences);
        const sentenceCount = sentences.length;

        existingPassage = await this.prisma.passage.create({
          data: {
            title: passageData.title,
            content: passageData.content,
            contentCn: '', // 可以根据需要添加中文翻译
            author: passageData.author,
            source: passageData.source || '', // 默认为空字符串
            wordCount: wordCount,
            sentenceCount: sentenceCount,
            createAt: new Date(), // 时间戳
            chapterId: passageData.chapterId || null // 默认为null
          }
        });
      }

      // 如果没有事务支持（已经在事务中），直接执行
      for (const sentence of sentences) {
        await this.sentenceDao.saveSentence(sentence, existingPassage.id);
      }

      return existingPassage;
    } catch (error) {
      console.error('存储文章失败:', error);
      throw error;
    }
  }

  async disconnect() {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }

  /**
   * 计算单词数
   * @param sentences 句子数组
   * @returns 单词数
   */
  private calculateWordCount(sentences: Sentence[]): number {
    const wordSet = new Set<string>();

    for (const sentence of sentences) {
      for (const token of sentence.tokens) {
        for (const word of token.words) {
          wordSet.add(word.toLowerCase());
        }
      }
    }

    return wordSet.size;
  }
}
