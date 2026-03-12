import { PassageDao } from '../dao/PassageDao';
import { PassageSaveDto } from '../dto/PassageSaveDto';
import { SentenceDto } from '../dto/SentenceDto';

// 文章服务类
export class PassageService {
  private passageDao: PassageDao;

  constructor() {
    this.passageDao = new PassageDao();
  }

  /**
   * 存储文章数据
   * @param input 文章输入数据DTO
   * @param sentences 句子数组
   * @returns 存储的文章
   */
  async savePassage(input: PassageSaveDto, sentences: SentenceDto[]) {
    try {
      // 通过 PassageDao 存储文章数据
      const passage = await this.passageDao.savePassage(
        {
          title: input.title,
          content: input.content,
          author: input.author,
          source: input.source
        },
        sentences
      );

      return passage;
    } catch (error) {
      console.error('存储文章数据失败:', error);
      throw error;
    }
  }
}
