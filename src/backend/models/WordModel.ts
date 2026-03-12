// 单词输入类
export class WordInput {
  constructor(
    public content: string,
    public ukphone: string,
    public usphone: string,
    public senses: Array<{ content: string; pos: string }>
  ) { }
}

// 单词数组输入类
export class WordsInput {
  constructor(
    public words: WordInput[]
  ) { }
}
