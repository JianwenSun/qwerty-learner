// TTS 生成请求 DTO
export class TTSGenerateDto {
  sentenceId: number;
  voiceType: string;

  constructor(sentenceId: number, voiceType: string) {
    this.sentenceId = sentenceId;
    this.voiceType = voiceType;
  }
}
