const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID
const md5 = require('md5-node'); 		   //md5

var getClientIp = require('../../utils/getClientIp');

const Comment = require("../module/comment");
const Article = require("../module/article");

const router = require('../../utils/request');

// 添加文章评论
router.post('/comments',function(req,res){
	let newComment = {
		uuid: uuidv1(),
		articleUuid: req.body.uuid,
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
	    },
	    reply: []
	}

	Comment.create( newComment, 
		function(err, result){
			return res.json({
				code: 0,
				message: '成功添加评论',
				success: true
			})
		}
	)

	Article.updateOne( 
		{ uuid: req.body.uuid },
		{ $inc: { 'meta.comments': 1} },
		function(err, result){
			console.log( '评论加一' )
		}
	)
})

//点赞文章评论
router.put('/comments',function(req,res){

	Comment.updateOne( 
		{ uuid: req.body.commentUuid }, 
		{ $inc: { 'person.ups': 1} }, 
		function(err, result){
		return res.json({
			code: 0,
			message: '点赞留言',
			success: true
		})
	})

})


// 回复评论
router.post('/comments/reply',function(req,res){
	let newReply = {
		uuid: uuidv1(),
        replyPerson: {
            name: req.body.replyName,
            site: req.body.replySite
        },
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

	Comment.updateOne( 
		{ uuid: req.body.uuid }, 
		{ $push: { 'reply': newReply } }, 
		function(err, result){
		return res.json({
			code: 0,
			message: '成功回复评论',
			success: true
		})
	})

})

// 点赞回复
router.put('/comments/reply',function(req,res){

	Comment.updateOne( 
		{ 
			uuid: req.body.commentUuid,
			'reply.uuid': req.body.replyUuid
		},
		{ $inc: { 'reply.$.person.ups': 1} }, 
		function(err, result){
			return res.json({
				code: 0,
				message: '点赞回复',
				success: true
			})
		}
	)

})


module.exports = router; //导出路由