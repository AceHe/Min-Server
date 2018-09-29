var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出Categorized模块
module.exports = mongoose.model('categorized',new Schema({
	id: Number,
	cate: String,
	articleNum: Number
}))