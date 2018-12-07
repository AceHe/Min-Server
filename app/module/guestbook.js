var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出guestbook模块
module.exports = mongoose.model('guestbook',new Schema({
	uuid: String,
	person: {
        ip: String,
        avatar: String,
        name: String,
        email: String,
        site: String,
        address: String,
        navigator: String,
        comment: String,
        createdAt: String,
        ups: Number
    }
}))