// Sentence 实体类
export class SentenceEntity {
  constructor(
    public id: number,
    public content: string,
    public contentCn: string | null,
    public tokens: string,
    public words: string,
    public explanation: string | null,
    public chapterId: number | null,
    public isDeleted: boolean
  ) { }
}
