// 句子 DTO
import { TokenDto } from './TokenDto';
import { ChunkDto } from './ChunkDto';

export class SentenceDto {
  content: string;
  contentCn: string;
  tokens: TokenDto[];
  chunks: ChunkDto[];

  constructor(content: string, contentCn: string, tokens: TokenDto[], chunks: ChunkDto[]) {
    this.content = content;
    this.contentCn = contentCn;
    this.tokens = tokens;
    this.chunks = chunks;
  }
}
