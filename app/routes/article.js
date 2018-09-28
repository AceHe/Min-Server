var express = require('express');
var app = express();    //定义app
var Article = require("../module/article")

var router = express.Router();

// 获取全部文章
router.get('/article',function(req,res){
    Article.findOne({},"-_id ",function(err, result){
        res.json({
            code: 0,
            data: result.data,
            message: '操作成功',
            success: true,
        })
    })
})

module.exports = router; //导出路由