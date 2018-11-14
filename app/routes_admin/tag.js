const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Tag = require("../module/tag");
const router = require('../../utils/request');

// 添加新标签
router.post('/tag',function(req,res){
	// 数据验证
	if( req.body.name == '' || req.body.name.length > 15 ){
		return res.json({
			code: -1,
    		message: "标签名称不合法，请重新输入",
    		success: true
		})
	}


	// 首先查找数据库是不是有此标签
	Tag.find({ name: req.body.name }, function(err, result){
		// 如果有此标签 则返回无法添加
		if( result.length > 0 ){
			return res.json({
				code: -1,
				data: result,
        		message: "已有此标签，无法添加",
        		success: true
    		})
		}

		// 如果无此标签 则向数组 push 新标签
		else {
			let newTag = {
				"uuid" : uuidv1(),
				"name" : req.body.name,
				"count" : 0,
				"icon" : '',
			}
			Tag.create( newTag, function(err, result){
				return res.json({
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
	Tag.remove({ uuid: req.body.uuid }, function(err, result){
		return res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改标签
router.put('/tag',function(req, res){
	Tag.update( 
		{ uuid: req.body.uuid },
		{ $set: {tag: req.body.newtag}},
		function(err, result){
			return res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 分页获取标签
router.post('/tagbypage',function(req,res){

	// 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 获得总条目数
	Tag.countDocuments({}).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Tag.find({},{ _id: 0, __v: 0 })
		.skip((req.body.page - 1) * req.body.limt)
        .limit(req.body.limt)
        .sort({'_id':-1})
        .exec(function(err, result){
        	ep.emit('data_event', result);
        })

    // 全部并发完成后，统一处理
	ep.all('total_event', 'data_event', function (total, data) {
		return res.json({
            code: 0,
            data: data,
            total: total,
            message: '操作成功',
            success: true,
        })
	});
})

module.exports = router; //导出路由