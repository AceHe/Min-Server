const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Website = require("../module/website");
const router = require('../../utils/request');

// 修改 网站配置
router.post('/website',function(req, res){

	// 获得总条目数
	Website.countDocuments({}).exec(function(err, total){
		let newSite = {
			siteName: req.body.siteName,
			userName: req.body.userName,
			slogan: req.body.slogan,
			avatar: req.body.avatar,
			intro: req.body.intro,
			hobby: req.body.hobby,
			skills: req.body.skills,
			tag: req.body.tag,
			address: req.body.address,
			follower: req.body.follower,
			following: req.body.following,
			socals: req.body.socals
		}

		if( total == 0 ){
			Website.create( newSite, function(err, result){
				return res.json({
					code: 0,
					message: '网站配置成功',
					success: true
				})
			})
		} else {
			Website.update( newSite,
				function(err, result){
					return res.json({
						code: 0,
						message: '网站配置成功',
						success: true
					})
				})
		}
	})

})

// 获取 网站配置
router.get('/website',function(req, res){

	Website.findOne({},{ _id: 0, __v: 0 })
        .exec(function(err, result){
        	res.json({
	            code: 0,
	            data: result,
	            success: true
	        })
        })

})

module.exports = router; //导出路由