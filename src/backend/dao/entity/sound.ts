// Sound 实体类
export class SoundEntity {
  constructor(
    public id: string,
    public voiceType: string,
    public gender: string,
    public url: string | null,
    public mp3Data: Uint8Array | null,
    public isDeleted: boolean
  ) {}
}

// 句子实体类
export class SentenceEntity {
  constructor(
    public id: number,
    public content: string,
    public isDeleted: boolean
  ) {}
}

// 句子声音关联实体类
export class SentenceSoundEntity {
  constructor(
    public sentenceId: number,
    public soundId: string
  ) {}
}
