// Senses 实体类
export class SensesEntity {
  constructor(
    public id: number,
    public wordId: number,
    public ukphone: string,
    public usphone: string,
    public soundId: string | null,
    public isDeleted: boolean
  ) { }
}