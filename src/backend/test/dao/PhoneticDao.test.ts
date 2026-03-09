import { PhoneticService } from '../../service/PhoneticService';

describe('PhoneticService', () => {
  let phoneticService: PhoneticService;

  beforeEach(() => {
    phoneticService = new PhoneticService();
  });

  describe('generatePhonetic', () => {
    it('should generate phonetic for a word', async () => {
      const word = 'test';
      const phonetic = await phoneticService.generatePhonetic(word);
      expect(phonetic).toBeDefined();
      expect(typeof phonetic).toBe('string');
    });

    it('should handle empty word', async () => {
      const word = '';
      const phonetic = await phoneticService.generatePhonetic(word);
      expect(phonetic).toBeDefined();
      expect(typeof phonetic).toBe('string');
    });
  });
});
