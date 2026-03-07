import { PrismaClient } from '@prisma/client';
import { Sentence, Token } from '../analyzer/model';
import { DbConnection } from './DbConnection';
import { ITXClientDenyList } from '@prisma/client/runtime/library';

// 句子存储类
export class SentenceStorage {
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>; // 兼容事务中的prisma实例

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
  }
  /**
   * 存储句子数据
   * @param sentence 句子数据
   * @param passageId 文章ID
   * @returns 存储的句子
   */
  async saveSentence(sentence: Sentence, passageId?: number | null, chapterId?: number | null) {
    try {

      // 检查句子是否已存在
      const existingSentence = await this.prisma.sentence.findFirst({
        where: {
          content: sentence.content,
          isDeleted: false
        }
      });

      if (existingSentence) {
        console.log(`句子已存在: ${sentence.content}`);
        return existingSentence;
      }

      // 直接执行，因为我们已经在测试中使用了事务
      // 存储单词
      await this.saveWordsWithPrisma(sentence.tokens, this.prisma);

      // 存储句子
      const sentenceData: any = {
        content: sentence.content,
        contentCn: sentence.contentCn,
        tokens: JSON.stringify(sentence.tokens),
        words: JSON.stringify(sentence.tokens.map(token => token.content)),
        explanation: '', // 可以根据需要添加解释
        soundId: 1, // 默认为1，实际应该根据情况设置
        chapterId: chapterId || null,
      };

      // 如果提供了passageId，添加多对多关联
      if (passageId) {
        sentenceData.passages = {
          connect: [{ id: passageId }]
        };
      }

      return await this.prisma.sentence.create({
        data: sentenceData
      });
    } catch (error) {
      console.error('存储句子失败:', error);
      throw error;
    }
  }

  /**
   * 存储单词数据（使用指定的prisma实例，用于事务）
   * @param tokens 单词标记数组
   * @param prisma Prisma实例
   */
  async saveWordsWithPrisma(tokens: Token[], prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    try {
      for (const token of tokens) {
        for (const word of token.words) {
          // 检查单词是否已存在
          const existingWord = await prisma.word.findFirst({
            where: {
              content: word,
              isDeleted: false
            }
          });

          if (!existingWord) {
            await prisma.word.create({
              data: {
                content: word,
                tokenIndexes: '', // 可以根据需要添加索引
                senseIds: '' // 可以根据需要添加语义ID
              }
            });
          }
        }
      }
    } catch (error) {
      console.error('存储单词失败:', error);
      throw error;
    }
  }


  async disconnect() {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }

  /**
   * 根据内容查询句子
   * @param content 句子内容
   * @returns 句子对象
   */
  async findSentenceByContent(content: string) {
    try {
      return await this.prisma.sentence.findFirst({
        where: {
          content: content,
          isDeleted: false
        }
      });
    } catch (error) {
      console.error('查询句子失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID查询句子
   * @param id 句子ID
   * @returns 句子对象
   */
  async findSentenceById(id: number) {
    try {
      return await this.prisma.sentence.findUnique({
        where: {
          id: id
        }
      });
    } catch (error) {
      console.error('查询句子失败:', error);
      throw error;
    }
  }

  /**
   * 查询所有句子
   * @returns 句子数组
   */
  async findAllSentences() {
    try {
      return await this.prisma.sentence.findMany({
        where: {
          isDeleted: false
        }
      });
    } catch (error) {
      console.error('查询所有句子失败:', error);
      throw error;
    }
  }
}
