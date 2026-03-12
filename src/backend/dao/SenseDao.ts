import { PrismaClient } from '@prisma/client';
import { DbConnection } from './DbConnection';
import type { ITXClientDenyList } from '@prisma/client/runtime/library';
import { SenseCreateInput } from '../models/SenseModel';
import { SenseEntity } from './entity/sense';

// 语义存储类
export class SenseDao {
  private prisma: PrismaClient | Omit<PrismaClient, ITXClientDenyList>; // 兼容事务中的prisma实例

  constructor(prisma?: PrismaClient | Omit<PrismaClient, ITXClientDenyList>) {
    this.prisma = prisma || new PrismaClient();
  }

  /**
   * 存储语义数据
   * @param input 语义创建输入
   * @returns 存储的语义
   */
  async saveSense(input: SenseCreateInput): Promise<SenseEntity> {
    try {
      // 检查语义是否已存在
      const existingSense = await this.prisma.sense.findFirst({
        where: {
          content: input.content,
          sensesId: input.sensesId,
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      if (existingSense) {
        console.log(`语义已存在: ${input.content}`);
        return new SenseEntity(
          existingSense.id,
          existingSense.content,
          existingSense.pos,
          existingSense.sensesId,
          existingSense.isDeleted
        );
      }

      const createdSense = await this.prisma.sense.create({
        data: {
          content: input.content,
          pos: input.pos,
          sensesId: input.sensesId
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      return new SenseEntity(
        createdSense.id,
        createdSense.content,
        createdSense.pos,
        createdSense.sensesId,
        createdSense.isDeleted
      );
    } catch (error) {
      console.error('存储语义失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID查询语义
   * @param id 语义ID
   * @returns 语义对象
   */
  async findSenseById(id: number): Promise<SenseEntity | null> {
    try {
      const sense = await this.prisma.sense.findUnique({
        where: {
          id: id
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      if (!sense) {
        return null;
      }

      return new SenseEntity(
        sense.id,
        sense.content,
        sense.pos,
        sense.sensesId,
        sense.isDeleted
      );
    } catch (error) {
      console.error('查询语义失败:', error);
      throw error;
    }
  }

  /**
   * 根据Senses ID查询语义列表
   * @param sensesId Senses ID
   * @returns 语义数组
   */
  async findSensesBySensesId(sensesId: number): Promise<SenseEntity[]> {
    try {
      const senses = await this.prisma.sense.findMany({
        where: {
          sensesId: sensesId,
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      return senses.map(sense => new SenseEntity(
        sense.id,
        sense.content,
        sense.pos,
        sense.sensesId,
        sense.isDeleted
      ));
    } catch (error) {
      console.error('查询语义失败:', error);
      throw error;
    }
  }

  /**
   * 查询所有语义
   * @returns 语义数组
   */
  async findAllSenses(): Promise<SenseEntity[]> {
    try {
      const senses = await this.prisma.sense.findMany({
        where: {
          isDeleted: false
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      return senses.map(sense => new SenseEntity(
        sense.id,
        sense.content,
        sense.pos,
        sense.sensesId,
        sense.isDeleted
      ));
    } catch (error) {
      console.error('查询所有语义失败:', error);
      throw error;
    }
  }

  /**
   * 更新语义
   * @param id 语义ID
   * @param content 新的语义内容
   * @param pos 新的词性
   * @returns 更新后的语义
   */
  async updateSense(id: number, content: string, pos?: string): Promise<SenseEntity> {
    try {
      const updatedSense = await this.prisma.sense.update({
        where: {
          id: id
        },
        data: {
          content: content,
          ...(pos && { pos: pos }),
          modifyAt: new Date()
        },
        select: {
          id: true,
          content: true,
          pos: true,
          sensesId: true,
          isDeleted: true
        }
      });

      return new SenseEntity(
        updatedSense.id,
        updatedSense.content,
        updatedSense.pos,
        updatedSense.sensesId,
        updatedSense.isDeleted
      );
    } catch (error) {
      console.error('更新语义失败:', error);
      throw error;
    }
  }

  /**
   * 软删除语义
   * @param id 语义ID
   * @returns 删除后的语义
   */
  async deleteSense(id: number): Promise<{ id: number; isDeleted: boolean }> {
    try {
      return await this.prisma.sense.update({
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
      console.error('删除语义失败:', error);
      throw error;
    }
  }

  async disconnect() {
    // 调用DbConnection的disconnect方法
    await DbConnection.getInstance().disconnect();
  }
}