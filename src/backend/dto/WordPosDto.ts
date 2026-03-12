// 单词词性 DTO
export class WordPosDto {
  word: string;
  pos: string;

  constructor(word: string, pos: string) {
    this.word = word;
    this.pos = pos;
  }
}
