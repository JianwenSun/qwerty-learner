import { PrismaClient } from '@prisma/client';
import { VoiceType } from '../types/VoiceType';
import { SoundEntity, SentenceEntity, SentenceSoundEntity } from './entity/sound';

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

// 声音DAO类
export class SoundDao {
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
            'voiceType', so.voice_type,
            'generated', TRUE,
            'generatedAt', so.create_at
          )
        ) as soundStatus
      FROM 
        sentences s
      LEFT JOIN 
        sentence_sounds ss ON s.id = ss.sentence_id
      LEFT JOIN
        sounds so ON ss.sound_id = so.id
      WHERE 
        s.is_deleted = false AND so.is_deleted = false
      GROUP BY 
        s.id, s.content
    `;
  }

  /**
   * 根据ID查找句子
   * @param sentenceId 句子ID
   */
  async findSentenceById(sentenceId: number): Promise<SentenceEntity | null> {
    const sentence = await this.prisma.sentence.findFirst({
      where: {
        id: sentenceId,
        isDeleted: false
      },
      select: {
        id: true,
        content: true,
        isDeleted: true
      }
    });

    if (!sentence) {
      return null;
    }

    return new SentenceEntity(
      sentence.id,
      sentence.content,
      sentence.isDeleted
    );
  }

  /**
   * 查找特定句子和声音类型的音频记录
   * @param sentenceId 句子ID
   * @param voiceType 声音类型
   */
  async findSoundBySentenceAndVoiceType(sentenceId: number, voiceType: VoiceType): Promise<SoundEntity[]> {
    const sounds = await this.prisma.$queryRaw<Array<{ id: string; voiceType: string; gender: string; url: string | null; mp3Data: Uint8Array | null; isDeleted: boolean }>>`
      SELECT 
        so.id, so.voice_type as voiceType, so.gender, so.url, so.mp3_data as mp3Data, so.is_deleted as isDeleted
      FROM 
        sounds so
      JOIN 
        sentence_sounds ss ON so.id = ss.sound_id
      WHERE 
        ss.sentence_id = ${sentenceId} AND so.voice_type = ${voiceType} AND so.is_deleted = false
    `;

    return sounds.map(sound => new SoundEntity(
      sound.id,
      sound.voiceType,
      sound.gender,
      sound.url,
      sound.mp3Data,
      sound.isDeleted
    ));
  }

  /**
   * 创建新的音频记录并关联到句子
   * @param voiceType 声音类型
   * @param gender 性别
   * @param hash 哈希值
   * @param mp3Data MP3数据
   * @param sentenceId 句子ID
   */
  async createSoundAndAssociateWithSentence(voiceType: VoiceType, gender: string, hash: string, mp3Data: Uint8Array, sentenceId: number): Promise<SoundEntity> {
    return this.prisma.$transaction(async (prisma): Promise<SoundEntity> => {
      // 创建声音记录
      const sound = await prisma.sound.create({
        data: {
          voiceType,
          gender,
          url: null,
          mp3Data,
          isDeleted: false
        }
      });

      // 关联到句子
      await prisma.sentenceSound.create({
        data: {
          sentenceId,
          soundId: sound.id
        }
      });

      return new SoundEntity(
        sound.id,
        sound.voiceType,
        sound.gender,
        sound.url,
        sound.mp3Data,
        sound.isDeleted
      );
    });
  }

  /**
   * 更新现有音频记录
   * @param id 音频记录ID
   * @param hash 哈希值
   * @param mp3Data MP3数据
   */
  async updateSound(id: string, hash: string, mp3Data: Uint8Array): Promise<SoundEntity> {
    const sound = await this.prisma.sound.update({
      where: {
        id
      },
      data: {
        mp3Data,
        modifyAt: new Date()
      },
      select: {
        id: true,
        voiceType: true,
        gender: true,
        url: true,
        mp3Data: true,
        isDeleted: true
      }
    });
    return new SoundEntity(
      sound.id,
      sound.voiceType,
      sound.gender,
      sound.url,
      sound.mp3Data,
      sound.isDeleted
    );
  }

  /**
   * 软删除音频记录
   * @param id 音频记录ID
   */
  async deleteSound(id: string): Promise<{ id: string; isDeleted: boolean }> {
    return this.prisma.sound.update({
      where: {
        id
      },
      data: {
        isDeleted: true,
        modifyAt: new Date()
      },
      select: {
        id: true,
        isDeleted: true
      }
    });
  }

  /**
   * 断开音频与句子的关联
   * @param sentenceId 句子ID
   * @param soundId 音频ID
   */
  async disconnectSoundFromSentence(sentenceId: number, soundId: string): Promise<{ sentenceId: number; soundId: string }> {
    return this.prisma.sentenceSound.delete({
      where: {
        sentenceId_soundId: {
          sentenceId,
          soundId
        }
      },
      select: {
        sentenceId: true,
        soundId: true
      }
    });
  }
}