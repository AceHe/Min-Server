var express = require('express');
var app = express();    //定义app
var Categorized = require("../module/categorized")

var router = express.Router();

// 添加新分类
router.post('/categorized',function(req,res){
	// 数据验证
	if( req.body.categorized == '' || req.body.categorized.length > 20 ){
		res.json({
			code: 1,
    		message: "分类名称不合法，请重新输入",
    		success: true
		})
		return;
	}


	// 首先查找数据库是不是有此分类
	Categorized.findOne(
		{ "data": {"$elemMatch": {"cate": req.body.categorized}} },
		{"data.$": 1},
		function(err, result){
			// 如果有此分类 则返回无法添加
			if( result ){
				res.json({
					code: 1,
	        		message: "已有此分类，无法添加",
	        		success: true
	    		})
			}

			// 如果无此分类 则向数组 push 新分类
			else {
				let newCate = {
					"cate" : req.body.categorized,
					"articleNum" : 0,
				}
				Categorized.update({}, {$addToSet: {data: newCate} },function(err, result){
					res.json({
						code: 0,
						message: '成功添加分类',
						success: true
					})
				})
			}
		}
	)
})

// 删除分类
router.delete('/categorized',function(req, res){
	Categorized.update({}, {$pull: {data: {cate: req.body.categorized}} },function(err, result){
		res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改分类
router.put('/categorized',function(req, res){
	Categorized.update( 
		{"data.cate": req.body.oldcate}, 
		{ $set:{"data.$.cate": req.body.newcate}},
		function(err, result){
			res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部分类
router.get('/categorized',function(req,res){
    Categorized.findOne({},"-_id ",function(err, categorized){
        res.json({
            code: 0,
            data: categorized.data,
            message: '操作成功',
            success: true,
        })
    })
})

module.exports = router; //导出路由