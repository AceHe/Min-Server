var express = require('express');
var app = express();    //定义app
var Article = require("../module/article")

var router = express.Router();

// 获取全部文章
router.get('/article',function(req,res){
    Article.find({},"-_id",function(err, result){
        res.json({
            code: 0,
            data: result,
            message: '操作成功',
            success: true,
        })
    })
})

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

module.exports = router; //导出路由