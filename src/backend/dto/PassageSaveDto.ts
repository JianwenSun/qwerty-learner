// 文章保存 DTO
export class PassageSaveDto {
  title: string;
  author?: string;
  content: string;
  source?: string;

  constructor(title: string, content: string, author?: string, source?: string) {
    this.title = title;
    this.content = content;
    this.author = author;
    this.source = source;
  }
} 