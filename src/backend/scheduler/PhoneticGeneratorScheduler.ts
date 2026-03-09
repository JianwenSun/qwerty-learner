import { AbstractScheduler, Scheduled } from './Scheduler';
import { PhoneticService } from '../service/PhoneticService';
import { PrismaClient } from '@prisma/client';

// 音标生成定时服务
@Scheduled()
export class PhoneticGeneratorScheduler extends AbstractScheduler {
  private phoneticService: PhoneticService;
  private prisma: PrismaClient;

  constructor() {
    super();
    this.phoneticService = new PhoneticService();
    this.prisma = new PrismaClient();
  }

  get name(): string {
    return 'PhoneticGeneratorScheduler';
  }

  get interval(): number {
    return 10000; // 10秒
  }

  async execute(): Promise<void> {
    try {
      console.log('Starting phonetic generation task...');

      // 查找没有音标的单词
      const wordsWithoutPhonetic = await this.prisma.word.findMany({
        where: {
          isDeleted: false,
          // 假设单词表中有一个 phonetic 字段，这里需要根据实际情况调整
        }
      });

      console.log(`Found ${wordsWithoutPhonetic.length} words without phonetic`);

      // 为每个单词生成音标
      for (const word of wordsWithoutPhonetic) {
        try {
          const phonetic = await this.phoneticService.generatePhonetic(word.content);
          console.log(`Generated phonetic for word ${word.content}: ${phonetic}`);

          // 更新单词的音标
          // 这里需要根据实际情况调整字段名
          // await this.prisma.word.update({
          //   where: { id: word.id },
          //   data: { phonetic }
          // });
        } catch (error) {
          console.error(`Error generating phonetic for word ${word.content}:`, error);
        }
      }

      console.log('Phonetic generation task completed');
    } catch (error) {
      console.error('Error in phonetic generation service:', error);
    }
  }
}
