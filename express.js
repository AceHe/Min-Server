var express = require('express');
var config = require('./config'); //读取配置文件config.js信息
var bodyParser = require('body-parser');
var morgan = require('morgan');
var jwt = require('jsonwebtoken');//用来创建和确认用户信息摘要

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");

	if (req.method == 'OPTIONS') {
		res.send(200); //让options请求快速返回
	} else {
		next();
	}
});

// 设置 app 的超级密码 -- 用来生成Token的密码
app.set('superSecret', config.secret);

//用 bodyParser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

module.exports = app;