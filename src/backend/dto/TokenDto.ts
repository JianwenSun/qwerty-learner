// 单词标记 DTO
import { WordPosDto } from './WordPosDto';

export class TokenDto {
  content: string;
  words: WordPosDto[];
  explain: string;

  constructor(content: string, words: WordPosDto[], explain: string) {
  this.content = content;
    this.words = words;
    this.explain = explain;
  }
}
