import { AbstractScheduler, getRegisteredSchedulers } from './Scheduler';

// 定时服务管理器
export class SchedulerManager {
  private schedulers: AbstractScheduler[] = [];

  // 构造函数，自动注册所有标记了@Scheduled装饰器的服务
  constructor() {
    this.autoRegisterSchedulers();
  }

  // 自动注册所有标记了@Scheduled装饰器的服务
  private autoRegisterSchedulers(): void {
    const registeredSchedulerClasses = getRegisteredSchedulers();
    registeredSchedulerClasses.forEach(SchedulerClass => {
      try {
        const scheduler = new SchedulerClass();
        this.schedulers.push(scheduler);
        console.log(`Auto-registered scheduled service: ${scheduler.name}`);
      } catch (error) {
        console.error(`Error registering scheduler ${SchedulerClass.name}:`, error);
      }
    });
  }

  // 添加定时服务
  addScheduler(scheduler: AbstractScheduler): void {
    this.schedulers.push(scheduler);
  }

  // 启动所有定时服务
  startAll(): void {
    this.schedulers.forEach(scheduler => {
      scheduler.start();
    });
    console.log(`Started ${this.schedulers.length} scheduled services`);
  }

  // 获取所有定时服务
  getSchedulers(): AbstractScheduler[] {
    return this.schedulers;
  }

  // 启动指定的定时服务
  startScheduler(scheduler: AbstractScheduler): void {
    const index = this.schedulers.indexOf(scheduler);
    if (index !== -1) {
      scheduler.start();
      console.log(`Started scheduled service: ${scheduler.name}`);
    } else {
      console.error('Scheduler not found in scheduler manager');
    }
  }

  // 根据服务名称启动指定的定时服务
  startSchedulerByName(schedulerName: string): void {
    const scheduler = this.schedulers.find(s => s.name === schedulerName);
    if (scheduler) {
      scheduler.start();
      console.log(`Started scheduled service: ${schedulerName}`);
    } else {
      console.error(`Scheduler with name ${schedulerName} not found in scheduler manager`);
    }
  }
}
