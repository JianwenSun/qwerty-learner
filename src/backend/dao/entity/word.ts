// 推荐：单词接口（可选关联对象）
export interface Word {
    id: number; // 必选：主键字段
    content: string; // 必选：单词内容
    tokenIndexes: string; // 必选：令牌索引
    senseIds: string; // 必选：词义ID
    createdAt?: number; // 可选：创建时间
    sentences?: Array<{ // 可选：关联句子对象（仅查询时返回）
        id: number;
        dictionaryId: number;
        courseId: number;
        content: string;
        content_cn: string;
        explanation: string;
        tokens: string;
        words: string;
    }>;
    senses?: Array<{ // 可选：关联词义对象（仅查询时返回）
        id: number;
        wordId: number;
        pos: string;
        content_cn: string;
        content: string;
        example_ids: number[];
        updated_at: string;
        created_at: string;
    }>;
}