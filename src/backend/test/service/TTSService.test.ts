import { TTSService } from '../../service/tts/TTSService';
import { VoiceType } from '../../types/VoiceType';

describe('TTSService', () => {
  let ttsService: TTSService;

  beforeEach(() => {
    ttsService = new TTSService();
  });

  describe('generateSpeech', () => {
    it('should generate speech for a text with Male voice', async () => {
      const text = 'Hello, world!';
      const voiceType = VoiceType.Male;
      const mp3Data = await ttsService.generateSpeech(text, voiceType);
      expect(mp3Data).toBeDefined();
      expect(mp3Data instanceof Buffer).toBe(true);
    });

    it('should generate speech for a text with Female voice', async () => {
      const text = 'Hello, world!';
      const voiceType = VoiceType.Female;
      const mp3Data = await ttsService.generateSpeech(text, voiceType);
      expect(mp3Data).toBeDefined();
      expect(mp3Data instanceof Buffer).toBe(true);
    });

    it('should handle empty text', async () => {
      const text = '';
      const voiceType = VoiceType.Male;
      const mp3Data = await ttsService.generateSpeech(text, voiceType);
      expect(mp3Data).toBeDefined();
      expect(mp3Data instanceof Buffer).toBe(true);
    });
  });

  describe('generateHash', () => {
    it('should generate a 32-character hash', () => {
      const str = 'test';
      const hash = ttsService.generateHash(str);
      expect(hash).toBeDefined();
      expect(typeof hash).toBe('string');
      expect(hash.length).toBe(32);
    });

    it('should generate the same hash for the same input', () => {
      const str = 'test';
      const hash1 = ttsService.generateHash(str);
      const hash2 = ttsService.generateHash(str);
      expect(hash1).toBe(hash2);
    });
  });
});
