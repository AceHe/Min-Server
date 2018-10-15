var mongo = require('./db.js');
var app = require('./routes.js');
var config = require('./config.js');

// 设置启动端口
var port = config.port; 

// 启动服务
app.listen(port);
console.log('Magic happens at http://localhost:' + port);
