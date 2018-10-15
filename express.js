var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var authToken = require('./utils/authToken'); 

var app = express();

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type, Content-Length, Authorization, Accept, X-Requested-With, X-Token");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("Content-Type", "application/json;charset=utf-8");

	next();
});

// 请求拦截
app.use(function (req, res, next) {
	if( !authToken(req.get("X-Token")) ){
		return res.json({
			code: 2,
			success: false,
			message: "身份验证失败, 多次异常操作后将会Block IP!"
		})
	}else{
		next();
	}
});

//用 bodyParser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

module.exports = app;