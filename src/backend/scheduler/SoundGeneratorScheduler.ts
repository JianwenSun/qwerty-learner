import { AbstractScheduler, Scheduled } from './Scheduler';
import { TTSService } from '../service/tts/TTSService';
import { VoiceType } from '../types/VoiceType';
import { SoundDao } from '../dao/SoundDao';

// 句子 mp3 生成定时服务
@Scheduled()
export class SoundGeneratorScheduler extends AbstractScheduler {
  private ttsService: TTSService;
  private soundDao: SoundDao;

  constructor() {
    super();
    this.ttsService = new TTSService();
    this.soundDao = new SoundDao();
  }

  get name(): string {
    return 'SoundGeneratorScheduler';
  }

  get interval(): number {
    return 10000; // 10秒
  }

  async execute(): Promise<void> {
    try {
      console.log('Starting sentence sound generation task...');

      // 获取所有句子及其音频状态
      const sentenceStatuses = await this.ttsService.getTTSStatus();

      console.log(`Found ${sentenceStatuses.length} sentences`);

      // 为每个句子生成不同声色的 mp3 文件
      for (const status of sentenceStatuses) {
        for (const voiceType of Object.values(VoiceType)) {
          try {
            // 检查是否已经存在对应声色的音频
            const soundStatus = status.soundStatus.find(s => s.voiceType === voiceType);
            if (!soundStatus || !soundStatus.generated) {
              console.log(`Generating sound for sentence ${status.id} with voice type ${voiceType}`);

              // 生成并保存 TTS
              await this.ttsService.generateAndSaveTTS(status.id, voiceType);

              console.log(`Generated sound for sentence ${status.id} with voice type ${voiceType}`);
            }
          } catch (error) {
            console.error(`Error generating sound for sentence ${status.id} with voice type ${voiceType}:`, error);
          }
        }
      }

      console.log('Sentence sound generation task completed');
    } catch (error) {
      console.error('Error in sentence sound generation service:', error);
    }
  }
}
