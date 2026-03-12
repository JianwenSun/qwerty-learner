// Word 实体类
export class WordEntity {
  constructor(
    public id: number,
    public content: string,
    public ukphone: string,
    public usphone: string,
    public isDeleted: boolean
  ) {}
}
