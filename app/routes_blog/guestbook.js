const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Guestbook = require("../module/guestbook");
const router = require('../../utils/request');

var getClientIp = require('../../utils/getClientIp');

// 添加留言
router.post('/guestbook',function(req,res){
	// 数据验证
	if( req.body.content == '' || req.body.content.length > 240 ){
		return res.json({
			code: -1,
    		message: "有话好好说，别捣蛋！",
    		success: true
		})
	}

	// 验证通过 添加留言
	else{
		let newData = {
			"uuid": uuidv1(),
			"author": {
				"uuid": uuidv1(),
				"ip": getClientIp(req),
				"name": req.body.name,
				"email": req.body.email,
				"site": req.body.site,
				"avatar": "https://jooger.me/proxy/s.gravatar.com/avatar/bdc703b97b9ee52ea649b661e2656291?s=100&r=x&d=retro"
			},
			"renderedContent": req.body.content,
			"ups": 0,
			"createdAt": new Date().getTime()
		}
		Guestbook.create( newData, function(err, result){
			return res.json({
				code: 0,
				message: '成功添加留言',
				success: true
			})
		})		
	}
})

// 点赞留言
router.put('/guestbook',function(req, res){
	Guestbook.update(
		{ uuid: req.body.uuid },
		{ $set: {ups: req.body.ups + 1} },
		function(err, result){
			return res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取留言
router.post('/guestbookbypage',function(req,res){

    // 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 获得总条目数
	Guestbook.countDocuments({}).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Guestbook.find({},{ _id: 0, __v: 0 })
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
            success: true
        })
	});
})

module.exports = router; //导出路由