var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出Archive模块
module.exports = mongoose.model('friendlink',new Schema({
	uuid: String,
	site: String,
	avatar: String,
	name: String,
	slogan: String,
	github: String
}))