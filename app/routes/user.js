var express = require('express');
var app = express();    //定义app
var User = require("../module/user")

var jwt = require('jsonwebtoken');      //用来创建和确认用户信息摘要
var config = require('../../config');
app.set('superSecret', config.secret);  // 设置app 的超级密码--用来生成摘要的密码

var router = express.Router();

router.post('/login',function(req,res){
    User.findOne({
        name: req.body.name //根据用户输入用户名进行匹配
    },function(err,user){   //登录验证
        if(err){
            res.json({
                success: false,
                message: "登录失败"
            });
        };

        if(!user){
            res.json({
                success: false,
                message: "用户名找不到"
            });
        }else if(user){
            if(user.password != req.body.password){
                res.json({
                    success: false,
                    message: "密码错误"
                });
            }else{
                var token = jwt.sign({name:'foo'},app.get('superSecret'));//获取token
                res.json({
                    success: true,
                    message: "登录成功",
                    data: {
                        token: token
                    }
                });
            }
        }
    })
})

router.post('/logout',function(req,res){
    res.json({
        success: true,
        message: "登出成功"
    });
})

router.put('/',function(req,res){})

router.get('/info',function(req,res){
    User.findOne({},{
        _id: false,
        __v: false,
        password: false
    },function(err, user){
        res.json({
            success: true,
            data: user
        })
    })
})

module.exports = router; //导出路由