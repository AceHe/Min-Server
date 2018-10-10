var express = require('express');
var app = express();    //定义app
var Article = require("../module/article");
var eventproxy = require('eventproxy'); //控制并发

var router = express.Router();

// 获取指定文章
router.post('/article/id',function(req,res){
    Article.find({ id: req.body.id },"-_id",function(err, result){
        res.json({
            code: 0,
            data: result,
            message: '操作成功',
            success: true,
        })
    })
})

// 添加新文章
router.post('/article',function(req,res){

	let newArticle = {
		"id": Date.parse(new Date)/1000,
	    "title": req.body.artic.title,
	    "markdown": req.body.artic.markdown,
	    "render": req.body.artic.render,
	    "category": req.body.artic.category,
	    "tags": req.body.artic.tags,
	    "upload_time": req.body.artic.upload_time,
	    "read_num": req.body.artic.read_num || 0,
	    "author": req.body.artic.author || 'hemin',
	    "top": req.body.artic.top || 'false'
	};

	Article.create( newArticle, function(err, result){
		res.json({
			code: 0,
			message: '成功发布文章',
			success: true
		})
	})

})

// 删除文章
router.delete('/article',function(req, res){
	Article.remove({ id: req.body.id }, function(err, result){
		res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改文章
router.put('/article',function(req, res){
	Article.update( 
		{id: req.body.artic.id}, req.body.artic,
		function(err, result){
			res.json({
				code: 0,
				message: '修改成功',
				success: true
			})
		})
})

// 获取全部文章
router.post('/articlebypage',function(req,res){
    // 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 获得总条目数
	Article.count({}).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Article.find({},{ _id:0, __v:0 })
		.skip((req.body.page - 1) * req.body.limt)
        .limit(req.body.limt)
        .sort({'_id':-1})
        .exec(function(err, result){
        	ep.emit('data_event', result);
        })

    // 全部并发完成后，统一处理
	ep.all('total_event', 'data_event', function (total, data) {
		res.json({
            code: 0,
            data: data,
            total: total,
            message: '操作成功',
            success: true,
        })
	});
})

module.exports = router; //导出路由