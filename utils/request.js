var express = require('express');
var router = express.Router();
var authToken = require('./authToken');

// 获取客户端 IP
function getClientIp(req) {
    return req.headers['x-forwarded-for'] ||
    req.connection.remoteAddress ||
    req.socket.remoteAddress ||
    req.connection.socket.remoteAddress;
};

// 拦截白名单
var whiteList = ['/user/login'];

// 请求拦截
router.use(function (req, res, next) {
    // 判断该请求是否需要验证token
    var isAuthToken = true;
    if( whiteList.indexOf( req.originalUrl ) !== -1){
        isAuthToken = false;
    }

    // 验证 token
    if( isAuthToken && !authToken(req.get("X-Token")) ){
        return res.json({
            code: 2,
            success: false,
            data: {
                'ip': getClientIp(req),
                'time': Date.now()
            },
            message: "身份验证失败, 多次异常操作后将会Block IP!"
        })
    }else{
        next();
    }
});

module.exports = router;