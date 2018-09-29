var express = require('express');
var app = express();    //定义app
var Tag = require("../module/tag");

var router = express.Router();

// 添加新标签
router.post('/tag',function(req,res){
	// 数据验证
	if( req.body.tag == '' || req.body.tag.length > 15 ){
		res.json({
			code: 1,
    		message: "标签名称不合法，请重新输入",
    		success: true
		})
		return;
	}


	// 首先查找数据库是不是有此标签
	Tag.find({ tag: req.body.tag }, function(err, result){
		// 如果有此标签 则返回无法添加
		if( result.length > 0 ){
			res.json({
				code: 1,
				data: result,
        		message: "已有此标签，无法添加",
        		success: true
    		})
		}

		// 如果无此标签 则向数组 push 新标签
		else {
			let newTag = {
				"id" : Date.parse(new Date)/1000,
				"tag" : req.body.tag,
				"articleNum" : 0,
			}
			Tag.create( newTag, function(err, result){
				res.json({
					code: 0,
					message: '成功添加标签',
					success: true
				})
			})
		}

	})
})

// 删除标签
router.delete('/tag',function(req, res){
	Tag.remove({ id: req.body.id }, function(err, result){
		res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改标签
router.put('/tag',function(req, res){
	Tag.update( 
		{id: req.body.id},
		{$set: {tag: req.body.newtag}},
		function(err, result){
			res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部标签
router.get('/tag',function(req,res){
    Tag.find({},"-_id -__v",function(err, result){
        res.json({
            code: 0,
            data: result,
            message: '操作成功',
            success: true,
        })
    })
})

module.exports = router; //导出路由