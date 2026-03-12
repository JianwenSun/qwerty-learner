import { AbstractScheduler, Scheduled } from './Scheduler';
import { SenseService } from '../service/SenseService';

@Scheduled()
export class SenseScheduler extends AbstractScheduler {
  private senseService: SenseService;

  constructor() {
    super();
    this.senseService = new SenseService();
  }

  get name(): string {
    return 'SenseScheduler';
  }

  get interval(): number {
    // 每小时执行一次
    return 60 * 60 * 1000;
  }

  async execute(): Promise<void> {
    try {
      console.log(`[${new Date().toISOString()}] Executing SenseScheduler...`);

      // 这里可以实现语义相关的定时任务逻辑
      // 例如：
      // 1. 检查需要更新的语义数据
      // 2. 清理无效的语义记录
      // 3. 批量处理语义数据

      // 示例：获取所有语义并打印数量
      const senses = await this.senseService.getAllSenses();
      console.log(`Found ${senses.length} senses in the database`);

      // 这里可以添加具体的业务逻辑
      // 例如：更新语义状态、同步外部数据源等

      console.log(`[${new Date().toISOString()}] SenseScheduler executed successfully`);
    } catch (error) {
      console.error(`Error executing SenseScheduler:`, error);
      throw error;
    }
  }
}