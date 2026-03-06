export enum PracticeType {
    Custom = 'custom',
    Word = 'word',
    Chunk = 'chunk',
    Sentence = 'sentence',
}

// 推荐：练习接口（可选关联对象）
export interface Practice {
    id: number; // 必选：主键字段
    name: string; // 必选：练习名称
    createdAt?: number; // 可选：创建时间
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

// 推荐：自定义练习接口
export interface CustomPractice extends Practice {
    type: PracticeType.Custom; // 必选：练习类型
    content: string; // 必选：练习内容
    contentCn: string; // 必选：练习内容中文
    phonetic_uk: string; // 必选：英式音标
    phonetic_us: string; // 必选：美式音标
    sort: number; // 必选：排序
}

// 推荐：单词练习接口
export interface WordPractice extends Practice {
    type: PracticeType.Word; // 必选：练习类型
    content: string; // 必选：练习内容
    contentCn: string; // 必选：练习内容中文
    wordId: number; // 必选：外键字段（数据库必存）
    sort: number; // 必选：排序
    word?: { // 可选：关联单词对象（仅查询时返回）
        id: number;
        type: string;
        content: string;
        tokenIndexes: string;
        senseIds: string;
        createdAt?: number;
    };
}

// 推荐：块练习接口
export interface ChunkPractice extends Practice {
    type: PracticeType.Chunk; // 必选：练习类型
    content: string; // 必选：练习内容
    contentCn: string; // 必选：练习内容中文
    words: string[]; // 必选：单词列表
    sort: number; // 必选：排序
}

// 推荐：句子练习接口
export interface SentencePractice extends Practice {
    type: PracticeType.Sentence; // 必选：练习类型
    content: string; // 必选：练习内容
    contentCn: string; // 必选：练习内容中文
    sentenceId: number; // 必选：外键字段（数据库必存）
    sort: number; // 必选：排序
    sentence?: { // 可选：关联句子对象（仅查询时返回）
        id: number;
        dictionaryId: number;
        courseId: number;
        content: string;
        contentCn: string;
        explanation: string;
        tokens: string;
        words: string;
        passageId?: number;
    };
}