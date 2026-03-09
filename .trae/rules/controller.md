# 项目专属规则（仅当前项目）

- controller 只和 service 层交互，不直接操作数据库
- controller 层必须使用 dto 接收请求参数、返回响应数据
- controller 层必须使用 vo 转换响应数据
- dto 层必须使用 class-validator 校验请求参数
