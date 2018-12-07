const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID
const md5 = require('md5-node'); 		   //md5

const Guestbook = require("../module/guestbook");
const router = require('../../utils/request');

var getClientIp = require('../../utils/getClientIp');

// 添加留言
router.post('/guestbook',function(req,res){

	let newComment = {
		uuid: uuidv1(),
		person: {
	        ip: getClientIp(req),
	        avatar: 'https://www.gravatar.com/avatar/' + md5(req.body.email) + '?s=100&r=pg&d=identicon',
	        name: req.body.name,
	        email: req.body.email,
	        site: req.body.site,
	        address: '中国',
	        navigator: req.headers['user-agent'],
	        comment: req.body.comment,
	        createdAt: new Date().getTime(),
	        ups: 0
	    }
	}
	Guestbook.create( newComment, function(err, result){
		return res.json({
			code: 0,
			message: '成功添加留言',
			success: true
		})
	})
})

// 点赞留言
router.put('/guestbook',function(req, res){
	Guestbook.update(
		{ uuid: req.body.uuid },
		{ $inc: {'person.ups': 1} },
		function(err, result){
			return res.json({
				code: 0,
				message: '点赞留言',
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