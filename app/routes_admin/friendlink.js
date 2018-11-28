const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Friendlink = require("../module/friendlink");
const router = require('../../utils/request');

// 添加新友链
router.post('/friendlink',function(req,res){
	// 数据验证
	if( req.body.site == '' ){
		return res.json({
			code: -1,
    		message: "友链名称不合法，请重新输入",
    		success: true
		})
	}


	// 首先查找数据库是不是有此友链
	Friendlink.find({ site: req.body.site }, function(err, result){
		// 如果有此友链 则返回无法添加
		if( result.length > 0 ){
			return res.json({
				code: -1,
				data: result,
        		message: "已有此友链，无法添加",
        		success: true
    		})
		}

		// 如果无此友链 则向数组 push 新友链
		else {
			let newLink = {
				"uuid" : uuidv1(),
				"site" : req.body.site,
				"avatar" : req.body.avatar,
				"name" : req.body.name,
				"slogan" : req.body.slogan,
				"github" : req.body.github,
			}
			Friendlink.create( newLink, function(err, result){
				return res.json({
					code: 0,
					message: '成功添加友链',
					success: true
				})
			})
		}

	})
})

// 删除分类
router.delete('/friendlink',function(req, res){
	Friendlink.remove({ uuid: req.body.uuid }, function(err, result){
		return res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改分类
router.put('/friendlink',function(req, res){
	let newLink = {
		"uuid" : req.body.uuid,
		"site" : req.body.site,
		"avatar" : req.body.avatar,
		"name" : req.body.name,
		"slogan" : req.body.slogan,
		"github" : req.body.github,
	}
	Friendlink.update( 
		{ uuid: req.body.uuid },
		newLink,
		function(err, result){
			return res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部分类
router.post('/friendlinkbypage',function(req,res){

    // 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 获得总条目数
	Friendlink.countDocuments({}).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Friendlink.find({},{ _id: 0, __v: 0 })
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
