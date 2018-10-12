var config = require('../config');
var app = require('../express');
var jwt = require('jsonwebtoken');      //用来创建和确认用户信息摘要
app.set('superSecret', config.secret);  // 设置 app 的超级密码--用来生成摘要的密码

var setToken = function() {
	var token = jwt.sign({name:'admin'},app.get('superSecret'));

	// 设置全局变量
	global.tokenInfo = token;

	return token;
}

// 设置token
module.exports = setToken