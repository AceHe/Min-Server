var mongoose = require('./db.js');
var app = require('./routes.js');

// 启动服务
var port = process.env.PORT || 8080; // 设置启动端口
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
