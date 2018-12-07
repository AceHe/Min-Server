const eventproxy = require('eventproxy');  //控制并发
const uuidv1 = require('uuid/v1'); 		   //生成随机ID

const Categorized = require("../module/category");
const Tag = require("../module/tag");
const Article = require("../module/article");

const router = require('../../utils/request');

// 获取指定文章
router.post('/article/id',function(req,res){
    Article.findOne({ uuid: req.body.uuid },"-_id",function(err, result){
        res.json({
            code: 0,
            data: result,
            message: '操作成功',
            success: true,
        })
    })
})

// 添加新文章
router.post('/article/create',function(req,res){

	let newArticle = {
		'uuid' : uuidv1(),
		'description' : req.body.description,
		'renderedContent' : req.body.renderedContent,
		'markdown' : req.body.markdown,
		'title' : req.body.title,
		'thumb' : req.body.thumb,
		'category' : req.body.category,
		'tag' : req.body.tag,
		'meta': {
			'pvs' : 0,
			'ups' : 0,
			'comments': 0
		},
		'createdAt' : req.body.createdAt,
		'updatedAt' : req.body.updatedAt,
		'source' : req.body.source,
		'from' : req.body.from,
		'hots' : req.body.hots
	};

	Categorized.updateOne( 
		{ uuid: req.body.category.uuid },
		{ $inc: { count: 1} },
		function(err, result){
			console.log( '分类加一' )
		})

	for( let item of req.body.tag ){
		Tag.updateOne( 
			{ uuid: item.uuid },
			{ $inc: { count: 1} },
			function(err, result){
				console.log( '标签加一' )
			})
	}

	Article.create( newArticle, function(err, result){
		return res.json({
			code: 0,
			message: '成功发布文章',
			success: true
		})
	})
})

// 删除文章
router.delete('/article',function(req, res){

	// 分类计数
	if( req.body.category.uuid ){
		Categorized.updateOne( 
			{ uuid: req.body.category.uuid },
			{ $inc: { count: -1} },
			function(err, result){
				console.log( '分类减一' )
			})
	}

	// 标签计数
	if( req.body.tag.length > 0 ){
		for( let item of req.body.tag ){
			Tag.updateOne( 
				{ uuid: item.uuid },
				{ $inc: { count: -1} },
				function(err, result){
					console.log( '标签减一' )
				})
		}
	}

	Article.deleteOne({ uuid: req.body.uuid }, function(err, result){
		res.json({
			code: 0,
			message: '删除成功',
			success: true
		})
	})
})

// 修改文章
router.put('/article',function(req, res){
	Article.updateOne( 
		{uuid: req.body.uuid}, req.body,
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
	Article.countDocuments({}).exec(function(err, result){
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