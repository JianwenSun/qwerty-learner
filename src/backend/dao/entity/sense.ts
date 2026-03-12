// Sense 实体类
export class SenseEntity {
  constructor(
    public id: number,
    public content: string,
    public pos: string,
    public sensesId: number,
    public isDeleted: boolean
  ) { }
}