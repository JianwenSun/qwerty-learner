# 项目结构规则（仅当前项目）

src
├── backend 后端 nodejs 代码
    ├── controllers 控制器
    ├── models 数据模型
    ├── routes 路由
    ├── storage 存储层
        ├── entity 数据库模型
        ├── db 数据库
        └── file 文件存储
        └── utils 工具函数
├── frontend 前端 ts 代码
└── shared 前后端公共代码
    ├── models 数据模型
    ├── services 服务层
    └── utils 工具函数
