var express = require('express');
var app = express();    //定义app
var Tag = require("../module/tag")

var router = express.Router();

// 添加新标签
router.post('/tag',function(req,res){
	// 数据验证
	if( req.body.tag == '' || req.body.tag.length > 20 ){
		res.json({
			code: 1,
    		message: "标签名称不合法，请重新输入",
    		success: true
		})
		return;
	}


	// 首先查找数据库是不是有此标签
	Tag.findOne(
		{ "data": {"$elemMatch": {"tag": req.body.tag}} },
		{"data.$": 1},
		function(err, result){
			// 如果有此标签 则返回无法添加
			if( result ){
				res.json({
					code: 1,
	        		message: "已有此标签，无法添加",
	        		success: true
	    		})
			}

			// 如果无此标签 则向数组 push 新标签
			else {
				let newTag = {
					"tag" : req.body.tag,
					"articleNum" : 0,
				}
				Tag.update({}, {$addToSet: {data: newTag} },function(err, result){
					res.json({
						code: 0,
						message: '成功添加标签',
						success: true
					})
				})
			}
		}
	)
})

// 删除标签
router.delete('/tag',function(req, res){
	Tag.update({}, {$pull: {data: {tag: req.body.tag}} },function(err, result){
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
		{"data.tag": req.body.oldtag}, 
		{ $set:{"data.$.tag": req.body.newtag}},
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
    Tag.findOne({},"-_id ",function(err, categorized){
        res.json({
            code: 0,
            data: categorized.data,
            message: '操作成功',
            success: true,
        })
    })
})

module.exports = router; //导出路由