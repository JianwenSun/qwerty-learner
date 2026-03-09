// 推荐：章节接口（可选关联对象）
export interface Chapter {
  id: number; // 必选：主键字段
  name: string; // 必选：章节名称
  describe: string; // 必选：章节描述
  dictionaryId: number; // 必选：外键字段（数据库必存）
  createdAt?: number; // 可选：创建时间
  dictionary?: { // 可选：关联字典对象（仅查询时返回）
    id: number;
    name: string;
    describe: string;
    imageUrl: string;
    categoryId: number;
    chapterNum: number;
    createdAt: number;
  };
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