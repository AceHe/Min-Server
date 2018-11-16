var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出guestbook模块
module.exports = mongoose.model('guestbook',new Schema({
	uuid: String,
    author: {
		uuid: String,
		ip: String,
		name: String,
		site: String,
		email: String,
		avatar: String
    },
    renderedContent: String,
    ups: Number,
    createdAt: String
}))