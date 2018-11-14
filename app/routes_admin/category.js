const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Categorized = require("../module/category");
const router = require('../../utils/request');

// 添加新分类
router.post('/category',function(req,res){
	// 数据验证
	if( req.body.name == '' || req.body.name.length > 20 ){
		return res.json({
			code: -1,
    		message: "分类名称不合法，请重新输入",
    		success: true
		})
	}


	// 首先查找数据库是不是有此分类
	Categorized.find({ name: req.body.name }, function(err, result){
		// 如果有此分类 则返回无法添加
		if( result.length > 0 ){
			return res.json({
				code: -1,
				data: result,
        		message: "已有此分类，无法添加",
        		success: true
    		})
		}

		// 如果无此分类 则向数组 push 新分类
		else {
			let newCate = {
				"uuid" : uuidv1(),
				"name" : req.body.name,
				"count" : 0,
				"icon" : '',
				"img" : '',
			}
			Categorized.create( newCate, function(err, result){
				return res.json({
					code: 0,
					message: '成功添加分类',
					success: true
				})
			})
		}

	})
})

// 删除分类
router.delete('/category',function(req, res){
	Categorized.remove({ uuid: req.body.uuid }, function(err, result){
		return res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改分类
router.put('/category',function(req, res){
	Categorized.update( 
		{ uuid: req.body.uuid },
		{ $set: {name: req.body.newcate} },
		function(err, result){
			return res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部分类
router.post('/categorybypage',function(req,res){

    // 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 获得总条目数
	Categorized.countDocuments({}).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Categorized.find({},{ _id: 0, __v: 0 })
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