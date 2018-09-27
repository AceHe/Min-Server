//读取配置文件config.js信息
var config = require('./config');

// 连接选项
var options = {
	keepAlive: 120, 					// 解决偶发性 “connection closed” 错误
	useNewUrlParser: true, 				// 新的 URL 字符串分析器
	autoIndex: false, 					// 不会自动建立索引
	reconnectTries: Number.MAX_VALUE, 	// 永不停止尝试重新连接
	reconnectInterval: 500, 			// 每 500ms 重新连接一次
	poolSize: 10, 						// 最大 socket 连接数
	bufferMaxEntries: 0 				// 0 代表链接错误时终止数据库操作
};

// 连接数据库
var mongoose = require('mongoose');
mongoose.connect(config.database, options);

// 连接成功
mongoose.connection.on('connected', function () {    
    console.log('[info] Mongoose open: ' + config.database);  
});    

// 连接异常
mongoose.connection.on('error',function (err) {    
    console.log('[info] Mongoose error: ' + err);  
});    
 
// 连接断开
mongoose.connection.on('disconnected', function () {    
    console.log('[info] Mongoose disconnected!');  
}); 

module.exports = mongoose;