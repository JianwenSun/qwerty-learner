// 推荐：声音接口
export interface Sound {
  id: number; // 必选：主键字段
  path: string; // 必选：声音文件路径
  createdAt?: number; // 可选：创建时间
}