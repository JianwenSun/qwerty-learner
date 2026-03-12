// Senses 创建输入类
export class SensesCreateInput {
  constructor(
    public wordId: number,
    public ukphone: string,
    public usphone: string,
    public soundId?: string
  ) { }
}
