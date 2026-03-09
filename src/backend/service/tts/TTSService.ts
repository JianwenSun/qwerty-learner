import { VoiceType } from '../../types/VoiceType';
import { streamQwen3TTS } from './QWen3TTS';
import { streamGTTS } from './GTTS';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import crypto from 'crypto';
import { SentenceSoundDAO, SentenceStatus, SoundStatus, RawSentenceStatus, RawSoundStatus } from '../../storage/dao/SentenceSoundDAO';
import config from '../../config/config';

// TTS 服务
export class TTSService {
  private sentenceSoundDAO: SentenceSoundDAO;

  constructor() {
    this.sentenceSoundDAO = new SentenceSoundDAO();
  }

  /**
   * 生成句子的 mp3 文件
   * @param text 句子文本
   * @param voiceType 声色类型
   * @returns 生成的 mp3 文件数据
   */
  async generateSpeech(text: string, voiceType: VoiceType): Promise<Buffer> {
    try {
      console.log(`Generating speech for text: ${text} with voice type: ${voiceType} using ${config.tts.engine} TTS engine`);

      // 根据配置选择 TTS 引擎
      let mp3Buffer: Buffer;
      if (config.tts.engine === 'qwen3') {
        // 调用 QWen3TTS 生成 MP3 数据
        mp3Buffer = await streamQwen3TTS(text, voiceType);
      } else {
        // 调用 gTTS 生成 MP3 数据
        mp3Buffer = await streamGTTS(text, voiceType);
      }

      // 确保 artifact/sounds 目录存在
      const soundsDir = path.join(process.cwd(), 'artifact', 'sounds');
      if (!fs.existsSync(soundsDir)) {
        fs.mkdirSync(soundsDir, { recursive: true });
      }

      // 生成文件名（以voiceType作为前缀，使用句子内容作为文件名，替换特殊字符）
      const safeFileName = `${voiceType}_${text.replace(/[<>:"/\\|?*]/g, '_').substring(0, 80)}.mp3`;
      const outputPath = path.join(soundsDir, safeFileName);

      const bytes = new Uint8Array(mp3Buffer)

      // 保存 MP3 文件
      fs.writeFileSync(outputPath, bytes);
      console.log(`MP3 文件已保存到: ${outputPath}`);

      // 进行 gzip 压缩
      const gzippedBuffer = zlib.gzipSync(bytes);
      console.log(`MP3 数据已压缩，压缩前大小: ${mp3Buffer.length} 字节，压缩后大小: ${gzippedBuffer.length} 字节`);

      return gzippedBuffer;
    } catch (error) {
      console.error(`Error generating speech for text ${text}:`, error);
      throw error;
    }
  }

  /**
   * 生成字符串的哈希值
   * @param str 输入字符串
   * @returns 32 字符的哈希值
   */
  generateHash(str: string): string {
    // 使用SHA-256算法生成哈希值
    const hash = crypto.createHash('sha256');
    hash.update(str);
    return hash.digest('hex');
  }

  /**
   * 获取所有句子的TTS生成状态
   */
  async getTTSStatus(): Promise<SentenceStatus[]> {
    const rawResults = await this.sentenceSoundDAO.getAllSentencesWithSoundStatus();

    // 处理返回的数据格式，确保包含所有声音类型的状态
    const voiceTypes = Object.values(VoiceType);

    return rawResults.map((result: RawSentenceStatus): SentenceStatus => {
      // 解析soundStatus JSON数组
      let existingSounds: RawSoundStatus[] = [];
      if (result.soundStatus) {
        try {
          existingSounds = typeof result.soundStatus === 'string' ? JSON.parse(result.soundStatus) : result.soundStatus;
        } catch (error) {
          console.error('Error parsing soundStatus:', error);
          existingSounds = [];
        }
      }

      // 构建完整的声音状态
      const soundStatus: SoundStatus[] = voiceTypes.map(voiceType => {
        const existingSound = existingSounds.find((sound: RawSoundStatus) => sound.voiceType === voiceType);
        return {
          voiceType,
          generated: !!existingSound,
          generatedAt: existingSound?.generatedAt ? new Date(existingSound.generatedAt) : null
        };
      });

      return {
        id: result.id,
        content: result.content,
        soundStatus
      };
    });
  }

  /**
   * 根据ID查找句子
   * @param sentenceId 句子ID
   */
  async findSentenceById(sentenceId: number) {
    return this.sentenceSoundDAO.findSentenceById(sentenceId);
  }

  /**
   * 生成并保存TTS音频
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   */
  async generateAndSaveTTS(sentenceId: number, voiceType: VoiceType) {
    // 查找句子
    const sentence = await this.sentenceSoundDAO.findSentenceById(sentenceId);
    if (!sentence) {
      throw new Error('Sentence not found');
    }

    // 生成TTS
    const mp3Data = await this.generateSpeech(sentence.content, voiceType);

    // 检查是否已存在对应声音类型的音频
    const existingSentenceSound = await this.sentenceSoundDAO.findSentenceSound(sentence.id, voiceType);

    if (existingSentenceSound) {
      // 更新现有音频
      await this.sentenceSoundDAO.updateSentenceSound(
        existingSentenceSound.id,
        this.generateHash(`${sentence.content}-${voiceType}`),
        new Uint8Array(mp3Data)
      );
    } else {
      // 创建新音频记录
      await this.sentenceSoundDAO.createSentenceSound(
        sentence.id,
        voiceType,
        this.generateHash(`${sentence.content}-${voiceType}`),
        new Uint8Array(mp3Data)
      );
    }
  }

  /**
   * 删除句子的音频
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   */
  async deleteTTS(sentenceId: number, voiceType: VoiceType) {
    // 查找音频记录
    const sentenceSound = await this.sentenceSoundDAO.findSentenceSound(sentenceId, voiceType);
    if (!sentenceSound) {
      throw new Error('Audio not found');
    }

    // 删除音频记录
    await this.sentenceSoundDAO.deleteSentenceSound(sentenceSound.id);
  }

  /**
   * 获取句子的音频
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   */
  async getTTS(sentenceId: number, voiceType: VoiceType) {
    return this.sentenceSoundDAO.findSentenceSound(sentenceId, voiceType);
  }
}
