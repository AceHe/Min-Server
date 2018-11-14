var Categorized = require("../module/category");
const Tag = require("../module/tag");

var router = require('../../utils/request');

// 获取全部分类
router.get('/category',function(req,res){
	Categorized.find({},{
        _id: false,
        __v: false,
    },function(err, result){
        return res.json({
            code: 0,
            success: true,
            data: result
        })
    })
})

// 获取全部标签
router.get('/tag',function(req,res){
	Tag.find({},{
        _id: false,
        __v: false,
    },function(err, result){
        return res.json({
            code: 0,
            success: true,
            data: result
        })
    })
})

module.exports = router; //导出路由