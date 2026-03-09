// 存储所有注册的定时服务类
const registeredSchedulers: Array<new () => AbstractScheduler> = [];

// 定时服务装饰器
export function Scheduled() {
  return function <T extends new () => AbstractScheduler>(constructor: T) {
    registeredSchedulers.push(constructor);
    return constructor;
  };
}

// 定时服务抽象类
export abstract class AbstractScheduler {
  // 服务名称
  abstract get name(): string;

  // 执行间隔（毫秒）
  abstract get interval(): number;

  // 执行任务
  abstract execute(): Promise<void>;

  // 执行状态标志
  private isExecuting: boolean = false;

  // 启动服务
  start(): void {
    setInterval(async () => {
      // 检查是否正在执行
      if (this.isExecuting) {
        console.log(`${this.name} is already executing, skipping this interval`);
        return;
      }

      try {
        this.isExecuting = true;
        await this.execute();
      } catch (error) {
        console.error(`Error executing ${this.name}:`, error);
      } finally {
        this.isExecuting = false;
      }
    }, this.interval);
    console.log(`${this.name} started with interval ${this.interval}ms`);
  }
}

// 获取所有注册的定时服务类
export function getRegisteredSchedulers(): Array<new () => AbstractScheduler> {
  return registeredSchedulers;
}
