# 项目专属规则（仅当前项目）

- 数据库：MySQL
- 使用 prisma 作为 ORM 工具
- 数据库表名采用下划线命名法，如 sentence_sounds、passages 等
- 数据库表除了多对多的关系表，其他表都必须有主键、必须有 create_at、modified_at、is_deleted 字段
- create_at、modified_at、is_deleted 字段必须是时间类型
- create_at 字段默认值为当前时间、不能为空，modified_at 字段默认值为 null
- 创建数据时, 必须设置 create_at 字段
- 修改数据时, 必须设置 modified_at 字段
- 删除数据时, 必须设置 is_deleted 字段为 1, 同时设置 deleted_at 字段为当前时间
- is_deleted 字段默认值为 0、不能为空
- prisma 模型中，字段名采用驼峰命名法，如 voiceType 对应 voice_type
- 每次数据库变更需要重新生成 model，同时数据库迁移文件，确保数据库结构与代码保持一致
