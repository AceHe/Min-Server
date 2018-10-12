var mongoose = require('./db.js');
var app = require('./routes.js');
var config = require('./config.js')

// 启动服务
var port = config.port; // 设置启动端口
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
