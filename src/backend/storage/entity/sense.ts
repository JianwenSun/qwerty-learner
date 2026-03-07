// 推荐：词义接口（可选关联对象）
export interface Sense {
  id: number; // 必选：主键字段
  wordId: number; // 必选：外键字段（数据库必存）
  pos: string; // 必选：词性
  content_cn: string; // 必选：中文释义
  content: string; // 必选：英文释义
  example_ids: number[]; // 必选：例句ID列表
  updated_at: string; // 必选：更新时间
  created_at: string; // 必选：创建时间
  word?: { // 可选：关联单词对象（仅查询时返回）
    id: number;
    type: string;
    content: string;
    tokenIndexes: string;
    senseIds: string;
    createdAt?: number;
  };
}