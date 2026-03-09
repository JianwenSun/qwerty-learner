// 推荐：字典接口（可选关联对象）
export interface Dictionary {
    id: number; // 必选：主键字段
    name: string; // 必选：字典名称
    describe: string; // 必选：字典描述
    imageUrl: string; // 必选：字典图片URL
    categoryId: number; // 必选：外键字段（数据库必存）
    chapterNum: number; // 必选：章节数量
    createdAt: number; // 必选：创建时间
    category?: { // 可选：关联分类对象（仅查询时返回）
        id: number;
        name: string;
        describe: string;
        createdAt?: number;
    };
    chapters?: Array<{ // 可选：关联章节对象（仅查询时返回）
        id: number;
        name: string;
        describe: string;
        dictionaryId: number;
        createdAt?: number;
    }>;
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
}