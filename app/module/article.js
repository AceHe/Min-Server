var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出Categorized模块
module.exports = mongoose.model('article',new Schema({
	id: Number,
    title: String,
    markdown: String,
    render: String,
    category: String,
    tags: Array,
    upload_time: Number,
    read_num: Number,
    author: String,
    top: String
}))