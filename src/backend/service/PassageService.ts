import { PrismaClient } from '@prisma/client';
import { PassageInput, Sentence } from '../analyzer/model';
import { SentenceDao } from '../dao/SentenceDao';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

// 文章服务类
export class PassageService {
  private sentenceDao: SentenceDao;
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>;

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
    this.sentenceDao = new SentenceDao(prisma);
  }

  /**
   * 存储文章数据
   * @param input 文章输入
   * @param sentences 句子数组
   * @returns 存储的文章
   */
  async savePassage(input: PassageInput, sentences: Sentence[]) {
    try {
      // 检查文章是否已存在
      const existingPassage = await this.prisma.passage.findFirst({
        where: {
          title: input.title
        }
      });

      if (existingPassage) {
        console.log(`文章已存在: ${input.title}`);
        // 即使文章已存在，也存储句子
        for (const sentence of sentences) {
          await this.sentenceDao.saveSentence(sentence, existingPassage.id, null);
        }
        // 更新sentenceCount
        const updatedPassage = await this.prisma.passage.update({
          where: {
            id: existingPassage.id
          },
          data: {
            sentenceCount: existingPassage.sentenceCount + sentences.length
          }
        });
        return updatedPassage;
      }

      // 计算单词数和句子数
      const wordCount = this.calculateWordCount(sentences);
      const sentenceCount = sentences.length;

      // 存储文章
      const passage = await this.prisma.passage.create({
        data: {
          title: input.title,
          content: input.content,
          contentCn: '', // 可以根据需要添加中文翻译
          author: input.author,
          source: input.source || '', // 使用传入的source，默认为空
          wordCount: wordCount,
          sentenceCount: sentenceCount,
          createAt: new Date() // 使用Date对象
        }
      });

      // 存储句子
      for (const sentence of sentences) {
        await this.sentenceDao.saveSentence(sentence, passage.id, null); // 默认为null，实际应该根据情况设置
      }

      return passage;
    } catch (error) {
      console.error('存储文章失败:', error);
      throw error;
    }
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
