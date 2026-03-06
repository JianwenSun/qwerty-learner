
// 单词标记接口
export interface Token {
    content: string; // 必选：内容
    words: string[]; // 必选：拆分后的单词
    explain: string; // 必选：解释
}

// 意群接口
export interface Chunk {
    index: number; // 必选：索引
    content: string; // 必选：内容
    contentCn: string; // 必选：中文翻译
    function: string; // 必选：功能
    tokenIndexes: number[]; // 必选：单词索引
}

// 句子分析输出接口
export interface Sentence {
    content: string; // 必选：英文句子
    contentCn: string; // 必选：中文翻译
    tokens: Token[]; // 必选：单词标记
    chunks: Chunk[]; // 必选：意群
}

// 短文输入接口
export interface PassageInput {
    title: string;
    author?: string;
    content: string;
}

// 句子切分输出接口
export interface SentenceSplitOutput {
    input: PassageInput;
    sentences: string[];
}

export interface PassageAnalysisOutput {
    input: PassageInput;
    sentences: Sentence[]
    words: string[],
}