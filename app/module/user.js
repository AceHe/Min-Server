// 引入mongoose依赖
var mongoose = require('mongoose');

// mongoose的一切都是以Schema开始的
var Schema = mongoose.Schema; 		

// 使用modules.exports导出User模块
// Mongoose 会自动找到名称是 model 名字复数形式的 collection： user --> users
// 利用模板的方式启动模板，并导出
module.exports = mongoose.model('user',new Schema({
    avatar: String,
    name: String,
    password: String,
    roles: Array
}))