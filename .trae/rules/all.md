# bo 层

- bo 层是业务逻辑层，负责处理业务逻辑、验证数据、调用 dao 层等。
- bo 层的 model 需要定义到 models 目录下。

# dao 层

- dao 层是唯一直接与数据库交互的层级，所有增、删、改、查操作必须通过 dao 层完成。
- dao 仅与 prisma 交互，不直接操作数据库。
- dao 层类命名 Dao，如 PassageDao、SentenceDao 等。
- dao 层必须定义明确返回值，不允许使用 any
- dao 层函数入参及返回值，只要超过三个属性必须封装成类。
- dao 层函数入参必须来源于 bo 层。
- dao 层函数返回值必须来源于 dao 层 entity。

# dto 层

- dto 层必须使用 class-validator 校验请求参数
- dto 层必须定义明确返回值，不允许使用 any

# vo 层

- vo 层是视图层，负责将数据库模型转换为前端需要的格式。
- vo 层的 model 需要定义到 vo 目录下。
- vo 层的 model 类必须以 Vo 结尾，如 PassageVo、SentenceVo 等。

# controller 层

- controller 只允许和 service 层交互
- controller 必须使用 dto 接收请求 request 参数及返回响应数据
- controller 层必须使用 vo 返回 response 数据

# service 层

- service 只能通过 dao 层与数据库交互，不允许直接访问 prisma 数据库实例
- service 层必须使用 dto 接收请求参数
- service 层与 dao 层交互时，必须使用 dto 转换数据格式
- service 层函数入参及返回值，只要超过三个属性必须封装成类。

# 项目专属规则（仅当前项目）

- controller 只和 service 层交互，不直接操作数据库
- controller 层必须使用 dto 接收请求参数
- controller 层必须使用 vo 返回响应数据

# 数据库规则

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

# 测试规则

- 测试框架统一使用 jtest
- 单元测试按照项目结构将测试文件组织在对应的目录下
- 每个组件的测试文件必须以组件名命名，例如：Button.test.tsx
- 单元测试按照模块组织，单元测试文件放到对应的模块下

# 调试

- 由 AI Agent 自动生成的调试文件、测试文件等用户验证或辅助的文件，存放到根目录 debug 文件夹下

# 项目专属规则（仅当前项目）

- 技术栈：NodeJs + TypeScript
- 禁止使用 any 类型
- 所有组件必须导出类型定义
- 提交前必须通过 ESLint 检查

# default

- 严格按照 以上规则进行检查, 不允许违反任何规则
