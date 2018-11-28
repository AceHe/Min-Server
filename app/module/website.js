var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出Archive模块
module.exports = mongoose.model('website',new Schema({
    siteName: String,
	userName: String,
	slogan: String,
	avatar: String,
	intro: String,
	hobby: String,
	skills: String,
	tag: String,
	address: String,
	follower: Number,
	following: Number,
	socals: [{
		icon: String,
		url: String,
		title: String
	}]
}))