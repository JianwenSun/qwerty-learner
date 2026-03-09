import { PrismaClient } from '@prisma/client';

// 数据库连接管理类
export class DbConnection {
  private static instance: DbConnection;
  private prisma: PrismaClient;

  private constructor() {
    // 创建PrismaClient实例，提供空对象作为选项
    this.prisma = new PrismaClient({});
  }

  // 获取单例实例
  public static getInstance(): DbConnection {
    if (!DbConnection.instance) {
      DbConnection.instance = new DbConnection();
    }
    return DbConnection.instance;
  }

  // 获取PrismaClient实例
  public getPrisma(): PrismaClient {
    return this.prisma;
  }

  // 断开连接
  public async disconnect() {
    await this.prisma.$disconnect();
  }
}