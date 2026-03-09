import { PhoneticGeneratorService } from '../../scheduler/PhoneticGeneratorScheduler';

describe('PhoneticGeneratorService', () => {
  let phoneticGeneratorService: PhoneticGeneratorService;

  beforeEach(() => {
    phoneticGeneratorService = new PhoneticGeneratorService();
  });

  describe('name', () => {
    it('should return the correct service name', () => {
      expect(phoneticGeneratorService.name).toBe('PhoneticGeneratorService');
    });
  });

  describe('interval', () => {
    it('should return the correct interval', () => {
      expect(phoneticGeneratorService.interval).toBe(3600000); // 1小时
    });
  });

  describe('execute', () => {
    it('should execute without throwing an error', async () => {
      // 执行服务，不应该抛出错误
      await expect(phoneticGeneratorService.execute()).resolves.not.toThrow();
    });
  });
});
