var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var config = require('./config');
var isOriginAllowed = require('./utils/allowOrigin');

var app = express();

//设置访问权限
app.all('/api/*', function(req, res, next) {

	var reqOrigin = req.headers.origin;
	// isOriginAllowed(reqOrigin, config.allowOrigin)

	if( true ) {
	    res.header("Access-Control-Allow-Origin", '*');
	    res.header("Access-Control-Allow-Headers", "Content-Type, Cache-Control, Content-Length, Authorization, Accept, X-Requested-With, X-Token");
	    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
	    res.header("Content-Type", "application/json;charset=utf-8");
	    res.header("Cache-Control", "no-cache");

	    // OPTIONS 直接返回
	    // if( req.method == "OPTIONS" ) res.sendStatus(200);

		next();        
    } else {
        res.send({ 
        	code: -1,
            success: false,
        	message: '非法请求!多次恶意请求将会Black IP!' 
        });
    }
});

//用 bodyParser 来解析post和url信息中的参数
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 使用 morgan 将请求日志打印到控制台
app.use(morgan('dev'));

module.exports = app;