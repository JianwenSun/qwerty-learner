import { PrismaClient } from '@prisma/client';
import { VoiceType } from '../../types/VoiceType';

// 原始声音状态类型（从数据库查询返回）
export interface RawSoundStatus {
  voiceType: string;
  generated: boolean;
  generatedAt: string | null;
}

// 声音状态类型
export interface SoundStatus {
  voiceType: VoiceType;
  generated: boolean;
  generatedAt: Date | null;
}

// 原始句子状态类型（从数据库查询返回）
export interface RawSentenceStatus {
  id: number;
  content: string;
  soundStatus: RawSoundStatus[] | string | null;
}

// 句子状态类型
export interface SentenceStatus {
  id: number;
  content: string;
  soundStatus: SoundStatus[];
}

// 句子音频DAO类
export class SentenceSoundDAO {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  /**
   * 获取所有句子及其音频状态（使用join查询）
   */
  async getAllSentencesWithSoundStatus(): Promise<RawSentenceStatus[]> {
    return this.prisma.$queryRaw<RawSentenceStatus[]>`
      SELECT 
        s.id, 
        s.content, 
        JSON_ARRAYAGG(
          JSON_OBJECT(
            'voiceType', ss.voice_type,
            'generated', TRUE,
            'generatedAt', ss.create_at
          )
        ) as soundStatus
      FROM 
        sentences s
      LEFT JOIN 
        sentence_sounds ss ON s.id = ss.sentence_id
      WHERE 
        s.is_deleted = false
      GROUP BY 
        s.id, s.content
    `;
  }

  /**
   * 根据ID查找句子
   * @param sentenceId 句子ID
   */
  async findSentenceById(sentenceId: number) {
    return this.prisma.sentence.findFirst({
      where: {
        id: sentenceId,
        isDeleted: false
      }
    });
  }

  /**
   * 查找特定句子和声音类型的音频记录
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   */
  async findSentenceSound(sentenceId: number, voiceType: VoiceType) {
    return this.prisma.sentenceSound.findFirst({
      where: {
        sentenceId,
        voiceType
      }
    });
  }

  /**
   * 创建新的音频记录
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   * @param hash 哈希值
   * @param mp3Data MP3数据
   */
  async createSentenceSound(sentenceId: number, voiceType: VoiceType, hash: string, mp3Data: Uint8Array) {
    return this.prisma.sentenceSound.create({
      data: {
        sentenceId,
        voiceType,
        hash,
        mp3Data
      }
    });
  }

  /**
   * 更新现有音频记录
   * @param id 音频记录ID
   * @param hash 哈希值
   * @param mp3Data MP3数据
   */
  async updateSentenceSound(id: number, hash: string, mp3Data: Uint8Array) {
    return this.prisma.sentenceSound.update({
      where: {
        id
      },
      data: {
        hash,
        mp3Data,
        modifyAt: new Date()
      }
    });
  }

  /**
   * 真删除音频记录
   * @param id 音频记录ID
   */
  async deleteSentenceSound(id: number) {
    return this.prisma.sentenceSound.delete({
      where: {
        id
      }
    });
  }
}
