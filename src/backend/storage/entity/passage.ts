import { Dictionary } from "./dictionary";

// 推荐：英文短文接口（可选关联对象）
export interface Passage {
    id: number; // 必选：主键字段
    title: string; // 必选：短文标题
    content: string; // 必选：短文内容
    contentCn: string; // 必选：短文中文翻译
    author: string; // 必选：作者
    source: string; // 必选：来源
    wordCount: number; // 必选：单词数量
    sentenceCount: number; // 必选：句子数量
    createdAt: number; // 必选：创建时间
    dictionaryId: number; // 必选：关联字典ID
    dictionary?: Dictionary; // 可选：关联字典对象（仅查询时返回）
    sentences?: Array<{ // 可选：关联句子对象（仅查询时返回）
        id: number;
        dictionaryId: number;
        courseId: number;
        content: string;
        contentCn: string;
        explanation: string;
        tokens: string;
        words: string;
        passageId?: number;
    }>;
    words?: Array<{ // 可选：关联单词对象（仅查询时返回）
        id: number;
        type: string; // 单词类型
        content: string;
        tokenIndexes: string;
        senseIds: string;
        createdAt?: number;
    }>;
}