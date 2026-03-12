import { PrismaClient } from '@prisma/client';
import { DbConnection } from './DbConnection';
import type { ITXClientDenyList } from '@prisma/client/runtime/library';
import { SensesCreateInput } from '../models/SensesModel';
import { SensesEntity } from './entity/senses';

// Senses 存储类
export class SensesDao {
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>; // 兼容事务中的prisma实例

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * 存储 Senses 数据
   * @param input Senses 创建输入
   * @returns 存储的 Senses
   */
  async saveSenses(input: SensesCreateInput): Promise<SensesEntity> {
    try {
      // 检查 Senses 是否已存在
      const existingSenses = await this.prisma.senses.findFirst({
        where: {
          wordId: input.wordId,
          isDeleted: false
        },
        select: {
          id: true,
          wordId: true,
          ukphone: true,
          usphone: true,
          soundId: true,
          isDeleted: true
        }
      });

      if (existingSenses) {
        console.log(`Senses 已存在: wordId=${input.wordId}`);
        return new SensesEntity(
          existingSenses.id,
          existingSenses.wordId,
          existingSenses.ukphone,
          existingSenses.usphone,
          existingSenses.soundId,
          existingSenses.isDeleted
        );
      }

      const createdSenses = await this.prisma.senses.create({
        data: {
          wordId: input.wordId,
          ukphone: input.ukphone,
          usphone: input.usphone,
          soundId: input.soundId || null
        },
        select: {
          id: true,
          wordId: true,
          ukphone: true,
          usphone: true,
          soundId: true,
          isDeleted: true
        }
      });

      return new SensesEntity(
        createdSenses.id,
        createdSenses.wordId,
        createdSenses.ukphone,
        createdSenses.usphone,
        createdSenses.soundId,
        createdSenses.isDeleted
      );
    } catch (error) {
      console.error('存储 Senses 失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID查询 Senses
   * @param id Senses ID
   * @returns Senses 对象
   */
  async findSensesById(id: number): Promise<SensesEntity | null> {
    try {
      const senses = await this.prisma.senses.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          wordId: true,
          ukphone: true,
          usphone: true,
          soundId: true,
          isDeleted: true
        }
      });

      if (!senses) {
        return null;
      }

      return new SensesEntity(
        senses.id,
        senses.wordId,
        senses.ukphone,
        senses.usphone,
        senses.soundId,
        senses.isDeleted
      );
    } catch (error) {
      console.error('查询 Senses 失败:', error);
      throw error;
    }
  }

  /**
   * 根据单词ID查询 Senses
   * @param wordId 单词ID
   * @returns Senses 对象
   */
  async findSensesByWordId(wordId: number): Promise<SensesEntity | null> {
    try {
      const senses = await this.prisma.senses.findFirst({
        where: {
          wordId: wordId,
          isDeleted: false
        },
        select: {
          id: true,
          wordId: true,
          ukphone: true,
          usphone: true,
          soundId: true,
          isDeleted: true
        }
      });

      if (!senses) {
        return null;
      }

      return new SensesEntity(
        senses.id,
        senses.wordId,
        senses.ukphone,
        senses.usphone,
        senses.soundId,
        senses.isDeleted
      );
    } catch (error) {
      console.error('查询单词 Senses 失败:', error);
      throw error;
    }
  }

  /**
   * 更新 Senses
   * @param id Senses ID
   * @param data 更新数据
   * @returns 更新后的 Senses
   */
  async updateSenses(id: number, data: { ukphone?: string; usphone?: string; soundId?: string | null }): Promise<SensesEntity> {
    try {
      const updatedSenses = await this.prisma.senses.update({
        where: {
          id: id
        },
        data: {
          ...data,
          modifyAt: new Date()
        },
        select: {
          id: true,
          wordId: true,
          ukphone: true,
          usphone: true,
          soundId: true,
          isDeleted: true
        }
      });

      return new SensesEntity(
        updatedSenses.id,
        updatedSenses.wordId,
        updatedSenses.ukphone,
        updatedSenses.usphone,
        updatedSenses.soundId,
        updatedSenses.isDeleted
      );
    } catch (error) {
      console.error('更新 Senses 失败:', error);
      throw error;
    }
  }

  /**
   * 软删除 Senses
   * @param id Senses ID
   * @returns 删除后的 Senses
   */
  async deleteSenses(id: number): Promise<{ id: number; isDeleted: boolean }> {
    try {
      return await this.prisma.senses.update({
        where: {
          id: id
        },
        data: {
          isDeleted: true,
          deleteAt: new Date()
        },
        select: {
          id: true,
          isDeleted: true
        }
      });
    } catch (error) {
      console.error('删除 Senses 失败:', error);
      throw error;
    }
  }

  async disconnect() {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }
}
