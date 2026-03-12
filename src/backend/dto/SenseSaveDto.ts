
// Sense 更新 保存语义输入类
export class SenseSaveDto {
  content: string;
  pos: string;
  sensesId: number;

  constructor(content: string, pos: string, sensesId: number) {
    this.content = content;
    this.pos = pos;
    this.sensesId = sensesId;
  }
}
