### 博客地址
[小何才露尖尖角](https://www.hemin.vip)

### 博客接口开发
- Min-Blog(开发中)
- [Min-Admin](https://github.com/AceHe/Min-Admin)
- [Min-Server](https://github.com/AceHe/Min-Server)

### 项目说明
**Nodejs+Express+MongoDB 快速搭建 restful 风格的 api**

- **express**: nodejs框架
- **mongoose**: 用来方便的和mongodb交互
- **body-parser**: 方便我们从post请求中解析参数
- **morgan**: 把请求信息打印在控
- **jsonwebtoken**: 用来生成和确认token数据制台

### 使用说明
1. 克隆项目到本地
```
    git clone git@github.com:AceHe/Min-Server.git
```
2. 进入项目根目录,，安装所需依赖
```
    npm install
```
3. 启动项目
```
    node server.js
```

### 项目进度
正在开发中

### 项目目录
```
Min-Server/
   |
   ├──app/
   |   |
   |   ├──models/              * 模块 导出mongoose的Schema的model
   |   │   │      
   |   |   ├──categorized.js
   |   │   │
   |   |   └──user.js
   |   │
   |   └──routes/              * 路由 请求接口的路径及处理
   |       │      
   |       ├──categorized.js
   |       │
   |       └──user.js
   │
   ├──node_modules/              * 依赖环境安装后生成(npm install后自动生成)
   │
   ├──.gitignore 				 * git push 忽略文件
   │
   ├──config.js                  * 一些配置
   │
   ├──db.js                      * mongoose 配置
   │
   ├──express.js                 * express 配置
   │
   ├──package.json               * 项目依赖环境
   │
   ├──routes.js                  * 接口路由
   │
   └──server.js                  * 项目启动文件
```

### API数据结构
**TODO**