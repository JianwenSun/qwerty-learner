import { SentenceSoundGeneratorService } from '../../scheduler/SentenceSoundGeneratorScheduler';

describe('SentenceSoundGeneratorService', () => {
  let sentenceSoundGeneratorService: SentenceSoundGeneratorService;

  beforeEach(() => {
    sentenceSoundGeneratorService = new SentenceSoundGeneratorService();
  });

  describe('name', () => {
    it('should return the correct service name', () => {
      expect(sentenceSoundGeneratorService.name).toBe('SentenceSoundGeneratorService');
    });
  });

  describe('interval', () => {
    it('should return the correct interval', () => {
      expect(sentenceSoundGeneratorService.interval).toBe(1800000); // 30分钟
    });
  });

  describe('execute', () => {
    it('should execute without throwing an error', async () => {
      // 执行服务，不应该抛出错误
      await expect(sentenceSoundGeneratorService.execute()).resolves.not.toThrow();
    }, 10000); // 增加超时时间到10秒
  });
});
