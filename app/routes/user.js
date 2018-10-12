var express = require('express');
var app = express();    //定义app
var User = require("../module/user")

var setToken = require('../../utils/setToken'); 
var authToken = require('../../utils/authToken'); 

var router = express.Router();

router.post('/login',function(req,res){
    User.findOne({
        name: req.body.name //根据用户输入用户名进行匹配
    },function(err,user){   //登录验证
        if(err){
            res.json({
                code: 1,
                success: false,
                message: "登录失败"
            });
        };

        if(!user){
            res.json({
                code: 1,
                success: false,
                message: "用户名找不到"
            });
        }else if(user){
            if(user.password != req.body.password){
                res.json({
                    code: 1,
                    success: false,
                    message: "密码错误"
                });
            }else{
                res.json({
                    code: 0,
                    success: true,
                    message: "登录成功",
                    data: {
                        token: setToken() // 设置token
                    }
                });
            }
        }
    })
})

router.post('/logout',function(req,res){
    res.json({
        code: 0,
        success: true,
        message: "登出成功"
    });
})

router.put('/',function(req,res){})

router.get('/info',function(req,res){

    if( !authToken(req.get("X-Token")) ){
        return res.json({
            code: 2,
            success: false,
            message: "身份验证失败, 多次异常操作后将会Block IP!"
        })
    }

    User.findOne({},{
        _id: false,
        __v: false,
        password: false
    },function(err, user){
        res.json({
            code: 0,
            success: true,
            data: user
        })
    })
})

module.exports = router; //导出路由