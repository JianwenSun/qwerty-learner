import { PrismaClient } from '@prisma/client';
import { DbConnection } from './DbConnection';
import { ITXClientDenyList } from '@prisma/client/runtime/library';
import { SentenceEntity } from './entity/sentence';
import { SentenceDto } from '../dto/SentenceDto';
import { TokenDto } from '../dto/TokenDto';

// 句子存储类
export class SentenceDao {
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
  async saveSentence(sentence: SentenceDto, passageId?: number | null, chapterId?: number | null): Promise<SentenceEntity> {
    try {

      // 检查句子是否已存在
      const existingSentence = await this.prisma.sentence.findFirst({
        where: {
          content: sentence.content,
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          contentCn: true,
          tokens: true,
          words: true,
          explanation: true,
          chapterId: true,
          isDeleted: true
        }
      });

      if (existingSentence) {
        console.log(`句子已存在: ${sentence.content}`);
        return new SentenceEntity(
          existingSentence.id,
          existingSentence.content,
          existingSentence.contentCn,
          existingSentence.tokens,
          existingSentence.words,
          existingSentence.explanation,
          existingSentence.chapterId,
          existingSentence.isDeleted
        );
      }

      // 直接执行，因为我们已经在测试中使用了事务
      // 存储单词
      await this.saveWordsWithPrisma(sentence.tokens, this.prisma);

      // 存储句子
      const sentenceData = {
        content: sentence.content,
        contentCn: sentence.contentCn,
        tokens: JSON.stringify(sentence.tokens),
        words: JSON.stringify(sentence.tokens.map(token => token.content)),
        explanation: '', // 可以根据需要添加解释
        chapterId: chapterId || null,
      };

      // 如果提供了passageId，添加多对多关联
      if (passageId) {
        (sentenceData as any).passages = {
          connect: [{ id: passageId }]
        };
      }

      const createdSentence = await this.prisma.sentence.create({
        data: sentenceData,
        select: {
          id: true,
          content: true,
          contentCn: true,
          tokens: true,
          words: true,
          explanation: true,
          chapterId: true,
          isDeleted: true
        }
      });

      return new SentenceEntity(
        createdSentence.id,
        createdSentence.content,
        createdSentence.contentCn,
        createdSentence.tokens,
        createdSentence.words,
        createdSentence.explanation,
        createdSentence.chapterId,
        createdSentence.isDeleted
      );
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
  async saveWordsWithPrisma(tokens: TokenDto[], prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>): Promise<void> {
    try {
      for (const token of tokens) {
        for (const wordPos of token.words) {
          // 检查单词是否已存在
          const existingWord = await prisma.word.findFirst({
            where: {
              content: wordPos.word,
              isDeleted: false
            }
          });

          if (!existingWord) {
            await prisma.word.create({
              data: {
                content: wordPos.word,
                ukphone: '', // 默认空值，实际应用中应该从API获取
                usphone: '' // 默认空值，实际应用中应该从API获取
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


  async disconnect(): Promise<void> {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }

  /**
   * 根据内容查询句子
   * @param content 句子内容
   * @returns 句子对象
   */
  async findSentenceByContent(content: string): Promise<SentenceEntity | null> {
    try {
      const sentence = await this.prisma.sentence.findFirst({
        where: {
          content: content,
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          contentCn: true,
          tokens: true,
          words: true,
          explanation: true,
          chapterId: true,
          isDeleted: true
        }
      });

      if (!sentence) {
        return null;
      }

      return new SentenceEntity(
        sentence.id,
        sentence.content,
        sentence.contentCn,
        sentence.tokens,
        sentence.words,
        sentence.explanation,
        sentence.chapterId,
        sentence.isDeleted
      );
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
  async findSentenceById(id: number): Promise<SentenceEntity | null> {
    try {
      const sentence = await this.prisma.sentence.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          content: true,
          contentCn: true,
          tokens: true,
          words: true,
          explanation: true,
          chapterId: true,
          isDeleted: true
        }
      });

      if (!sentence) {
        return null;
      }

      return new SentenceEntity(
        sentence.id,
        sentence.content,
        sentence.contentCn,
        sentence.tokens,
        sentence.words,
        sentence.explanation,
        sentence.chapterId,
        sentence.isDeleted
      );
    } catch (error) {
      console.error('查询句子失败:', error);
      throw error;
    }
  }

  /**
   * 查询所有句子
   * @returns 句子数组
   */
  async findAllSentences(): Promise<SentenceEntity[]> {
    try {
      const sentences = await this.prisma.sentence.findMany({
        where: {
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          contentCn: true,
          tokens: true,
          words: true,
          explanation: true,
          chapterId: true,
          isDeleted: true
        }
      });

      return sentences.map(sentence => new SentenceEntity(
        sentence.id,
        sentence.content,
        sentence.contentCn,
        sentence.tokens,
        sentence.words,
        sentence.explanation,
        sentence.chapterId,
        sentence.isDeleted
      ));
    } catch (error) {
      console.error('查询所有句子失败:', error);
      throw error;
    }
  }
}
