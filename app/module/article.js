var mongoose = require('mongoose'); //引入mongoose依赖
var Schema = mongoose.Schema; 		//mongoose的一切都是以Schema开始的

// 使用modules.exports导出Article模块
module.exports = mongoose.model('article',new Schema({
    uuid: String,
    description: String,
    renderedContent: String,
    markdown: String,
    title: String,
    thumb: String,
    category: {
        uuid: String,
        icon: String,
        name: String
    },
    tag: [{
        uuid: String,
        icon: String,
        name: String     
    }],
    meta: {
        pvs: Number,
        ups: Number,
        comments: Number
    },
    createdAt: String,
    updatedAt: String,
    source: Number,
    from: String,
    hots: Boolean,
    comments: Array
}))