// 意群 DTO
export class ChunkDto {
  index: number;
  content: string;
  contentCn: string;
  function: string;
  tokenIndexes: number[];

  constructor(index: number, content: string, contentCn: string, func: string, tokenIndexes: number[]) {
    this.index = index;
    this.content = content;
    this.contentCn = contentCn;
    this.function = func;
    this.tokenIndexes = tokenIndexes;
  }
}
