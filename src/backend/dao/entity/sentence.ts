import { PracticeType } from "./practice";

export enum ClauseType {
    Simple = 'simple',
    Complex = 'complex',
}

export interface Chunk {
    index: number; // 必选：索引
    content: string; // 必选：内容
    contentCn: string; // 必选：中文翻译
    function: string; // 必选：功能
    tokenIndexes: number[]; // 必选：令牌索引
    grammarType: string; // 必选：语法类型
    explanation: string; // 必选：解释
}

// 推荐：子句接口（可选关联对象）
export interface Clause {
    id: number; // 必选：主键字段
    sentenceId: number; // 必选：外键字段（数据库必存）
    index: number; // 必选：索引
    type: ClauseType; // 必选：子句类型
    explanation: string; // 必选：解释
    chunkIndexes: string; // 必选：块索引
    sentence?: { // 可选：关联句子对象（仅查询时返回）
        id: number;
        chapterId?: number;
        content: string;
        contentCn: string;
        explanation: string;
        tokens: string;
        words: string;
        passageId?: number;
        createdAt?: Date;
    };
}

// 推荐：句子接口（可选关联对象）
export interface Sentence {
    id: number; // 必选：主键字段
    dictionaryId: number; // 必选：外键字段（数据库必存）
    chapterId?: number; // 可选：章节ID
    passageId?: number; // 可选：外键字段
    content: string; // 必选：句子内容
    contentCn: string; // 必选：句子中文翻译
    explanation: string; // 必选：解释
    words: string[]; // 必选：单词
    chunks: Chunk[];
    createdAt: Date; // 可选：创建时间
    dictionary?: { // 可选：关联字典对象（仅查询时返回）
        id: number;
        name: string;
        describe: string;
        imageUrl: string;
        categoryId: number;
        chapterNum: number;
        createdAt: Date;
    };
    chapter?: { // 可选：关联章节对象（仅查询时返回）
        id: number;
        name: string;
        describe: string;
        dictionaryId: number;
        createdAt?: Date;
    };
    passage?: { // 可选：关联短文对象（仅查询时返回）
        id: number;
        title: string;
        content: string;
        contentCn: string;
        author: string;
        source: string;
        difficulty: string;
        wordCount: number;
        sentenceCount: number;
        createdAt: Date;
    };
    clauses?: Array<{ // 可选：关联子句对象（仅查询时返回）
        id: number;
        sentenceId: number;
        index: number;
        type: ClauseType;
        explanation: string;
        chunkIndexes: string;
    }>;
    practices?: Array<{ // 可选：关联练习对象（仅查询时返回）
        id: number;
        sentenceId: number;
        type: PracticeType;
        content: string;
        contentCn: string;
        sort: number;
    }>;
}