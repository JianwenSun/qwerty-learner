// 语义更新 DTO
export class SenseUpdateDto {
  content: string;
  pos: string;

  constructor(content: string, pos: string) {
    this.content = content;
    this.pos = pos;
  }
}
