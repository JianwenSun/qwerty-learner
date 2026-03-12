import { validate } from '../validator/Validator';
import { SenseDao } from '../dao/SenseDao';
import { SenseCreateInput } from '../models/SenseModel';
import { SenseSaveDto } from '../dto/SenseSaveDto';
import { SenseUpdateDto } from '../dto/SenseUpdateDto';
import { isNotEmpty, trim } from '../utils/stringUtils';

export class SenseService {
  private senseDao: SenseDao;

  constructor() {
    this.senseDao = new SenseDao();
  }

  /**
   * 保存语义
   * @param input 语义保存数据DTO
   * @returns 保存的语义
   */
  async saveSense(input: SenseSaveDto) {
    try {
      // 使用Validator验证输入
      const validContent = validate(input.content, '语义内容');
      const validPos = validate(input.pos, '词性');

      // 存储语义
      const senseInput = new SenseCreateInput(validContent, validPos, input.sensesId);
      return await this.senseDao.saveSense(senseInput);
    } catch (error) {
      console.error('保存语义失败:', error);
      throw error;
    }
  }

  /**
   * 根据ID查询语义
   * @param id 语义ID
   * @returns 语义对象
   */
  async getSenseById(id: number) {
    try {
      return await this.senseDao.findSenseById(id);
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
  async getSensesBySensesId(sensesId: number) {
    try {
      return await this.senseDao.findSensesBySensesId(sensesId);
    } catch (error) {
      console.error('查询语义失败:', error);
      throw error;
    }
  }

  /**
   * 查询所有语义
   * @returns 语义数组
   */
  async getAllSenses() {
    try {
      return await this.senseDao.findAllSenses();
    } catch (error) {
      console.error('查询所有语义失败:', error);
      throw error;
    }
  }

  /**
   * 更新语义
   * @param id 语义ID
   * @param updateDto 语义更新数据
   * @returns 更新后的语义
   */
  async updateSense(id: number, updateDto: SenseUpdateDto) {
    try {
      // 校验语义内容
      const validContent = trim(updateDto.content);
      if (!isNotEmpty(validContent)) {
        throw new Error('语义内容不能为空');
      }

      // 校验词性（如果提供）
      let validPos = updateDto.pos;
      if (updateDto.pos) {
        validPos = trim(updateDto.pos);
        if (!isNotEmpty(validPos)) {
          throw new Error('词性不能为空');
        }
      }

      // 更新语义
      return await this.senseDao.updateSense(id, validContent, validPos);
    } catch (error) {
      console.error('更新语义失败:', error);
      throw error;
    }
  }

  /**
   * 删除语义
   * @param id 语义ID
   * @returns 删除后的语义
   */
  async deleteSense(id: number) {
    try {
      return await this.senseDao.deleteSense(id);
    } catch (error) {
      console.error('删除语义失败:', error);
      throw error;
    }
  }

  /**
   * 断开数据库连接
   */
  async disconnect() {
    await this.senseDao.disconnect();
  }
}