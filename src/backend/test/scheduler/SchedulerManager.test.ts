import { SchedulerManager } from '../../scheduler/SchedulerManager';
import { ScheduledService } from '../../scheduler/Scheduler';

// 模拟一个 ScheduledService 实现
class MockScheduledService extends ScheduledService {
  get name(): string {
    return 'MockScheduledService';
  }

  get interval(): number {
    return 1000;
  }

  async execute(): Promise<void> {
    // 模拟执行
  }
}

describe('SchedulerManager', () => {
  let schedulerManager: SchedulerManager;
  let mockService: MockScheduledService;

  beforeEach(() => {
    schedulerManager = new SchedulerManager();
    mockService = new MockScheduledService();
  });

  describe('addService', () => {
    it('should add a service to the manager', () => {
      schedulerManager.addService(mockService);
      const services = schedulerManager.getServices();
      expect(services.length).toBe(1);
      expect(services[0]).toBe(mockService);
    });

    it('should add multiple services to the manager', () => {
      const mockService2 = new MockScheduledService();
      schedulerManager.addService(mockService);
      schedulerManager.addService(mockService2);
      const services = schedulerManager.getServices();
      expect(services.length).toBe(2);
      expect(services).toContain(mockService);
      expect(services).toContain(mockService2);
    });
  });

  describe('getServices', () => {
    it('should return an empty array when no services are added', () => {
      const services = schedulerManager.getServices();
      expect(services.length).toBe(0);
    });

    it('should return the added services', () => {
      schedulerManager.addService(mockService);
      const services = schedulerManager.getServices();
      expect(services.length).toBe(1);
      expect(services[0]).toBe(mockService);
    });
  });

  describe('startAll', () => {
    it('should start all added services', () => {
      // 模拟 start 方法
      const startSpy = jest.spyOn(mockService, 'start').mockImplementation(() => { });
      schedulerManager.addService(mockService);
      schedulerManager.startAll();
      expect(startSpy).toHaveBeenCalled();
    });
  });
});
