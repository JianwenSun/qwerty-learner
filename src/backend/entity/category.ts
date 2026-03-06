// 推荐：分类接口（可选关联对象）
export interface Category {
  id: number; // 必选：主键字段
  name: string; // 必选：分类名称
  describe: string; // 必选：分类描述
  createdAt?: number; // 可选：创建时间
  dictionaries?: Array<{ // 可选：关联字典对象（仅查询时返回）
    id: number;
    name: string;
    describe: string;
    imageUrl: string;
    categoryId: number;
    chapterNum: number;
    createdAt: number;
  }>;
}