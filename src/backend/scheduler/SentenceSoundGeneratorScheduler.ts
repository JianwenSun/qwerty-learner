import { AbstractScheduler, Scheduled } from './Scheduler';
import { TTSService } from '../service/tts/TTSService';
import { PrismaClient } from '@prisma/client';
import { VoiceType } from '../types/VoiceType';

// 句子 mp3 生成定时服务
@Scheduled()
export class SentenceSoundGeneratorScheduler extends AbstractScheduler {
  private ttsService: TTSService;
  private prisma: PrismaClient;

  constructor() {
    super();
    this.ttsService = new TTSService();
    this.prisma = new PrismaClient();
  }

  get name(): string {
    return 'SentenceSoundGeneratorScheduler';
  }

  get interval(): number {
    return 10000; // 10秒
  }

  async execute(): Promise<void> {
    try {
      console.log('Starting sentence sound generation task...');

      // 查找所有未删除的句子
      const sentences = await this.prisma.sentence.findMany({
        where: {
          isDeleted: false
        }
      });

      console.log(`Found ${sentences.length} sentences`);

      // 为每个句子生成不同声色的 mp3 文件
      for (const sentence of sentences) {
        for (const voiceType of Object.values(VoiceType)) {
          try {
            // 检查是否已经存在对应声色的 mp3 文件
            const existingSentenceSound = await this.prisma.sentenceSound.findFirst({
              where: {
                sentenceId: sentence.id,
                voiceType: voiceType,
              }
            });

            if (!existingSentenceSound) {
              console.log(`Generating sound for sentence ${sentence.id} with voice type ${voiceType}`);

              // 生成 mp3 文件
              const mp3Data = await this.ttsService.generateSpeech(sentence.content, voiceType);

              // 生成哈希值
              const hash = this.ttsService.generateHash(`${sentence.content}-${voiceType}`);

              // 存储到 SentenceSound 表
              await this.prisma.sentenceSound.create({
                data: {
                  sentenceId: sentence.id,
                  voiceType: voiceType,
                  hash: hash,
                  mp3Data: new Uint8Array(mp3Data)
                }
              });

              console.log(`Generated sound for sentence ${sentence.id} with voice type ${voiceType}`);
            }
          } catch (error) {
            console.error(`Error generating sound for sentence ${sentence.id} with voice type ${voiceType}:`, error);
          }
        }
      }

      console.log('Sentence sound generation task completed');
    } catch (error) {
      console.error('Error in sentence sound generation service:', error);
    }
  }
}
