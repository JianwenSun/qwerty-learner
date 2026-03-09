# 项目结构规则（仅当前项目）

src
├── backend 后端 nodejs 代码
    ├── controllers 控制器
    ├── models 数据模型
    ├── routes 路由
    ├── service 服务层
    ├── config 系统配置文件
    ├── dao 存储层
        ├── entity 数据库模型
        ├── service 数据库服务层
        └── utils 工具函数
├── frontend 前端 ts 代码
└── shared 前后端公共代码
    ├── model 数据模型
    ├── service 服务层
    └── utils 工具函数
