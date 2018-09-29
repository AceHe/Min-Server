var express = require('express');
var app = express();    //定义app
var Categorized = require("../module/category")

var router = express.Router();

// 添加新分类
router.post('/category',function(req,res){
	// 数据验证
	if( req.body.category == '' || req.body.category.length > 20 ){
		res.json({
			code: 1,
    		message: "分类名称不合法，请重新输入",
    		success: true
		})
		return;
	}


	// 首先查找数据库是不是有此分类
	Categorized.find({ cate: req.body.category }, function(err, result){
		// 如果有此标签 则返回无法添加
		if( result.length > 0 ){
			res.json({
				code: 1,
				data: result,
        		message: "已有此标签，无法添加",
        		success: true
    		})
		}

		// 如果无此分类 则向数组 push 新分类
		else {
			let newCate = {
				"id" : Date.parse(new Date)/1000,
				"cate" : req.body.category,
				"articleNum" : 0,
			}
			Categorized.create( newCate, function(err, result){
				res.json({
					code: 0,
					message: '成功添加标签',
					success: true
				})
			})
		}

	})
})

// 删除分类
router.delete('/category',function(req, res){
	Categorized.remove({ id: req.body.id }, function(err, result){
		res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改分类
router.put('/category',function(req, res){
	Categorized.update( 
		{id: req.body.id},
		{$set: {cate: req.body.newcate}},
		function(err, result){
			res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部分类
router.get('/category',function(req,res){
    Categorized.find({},"-_id -__v",function(err, result){
        res.json({
            code: 0,
            data: result,
            message: '操作成功',
            success: true,
        })
    })
})

module.exports = router; //导出路由