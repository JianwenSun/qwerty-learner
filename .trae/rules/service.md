# 项目专属规则（仅当前项目）

- service 只和 dao 层交互，不直接操作数据库
- service 层必须使用 dto 接收请求参数、返回响应数据
- service 层与 dao 层交互，不直接与 prisma 数据库交互

- scheduler 不能直接与 prisma 数据库交互，只能通过 service 层与数据库交互
