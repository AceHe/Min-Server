const eventproxy = require('eventproxy');  //控制并发

const Categorized = require("../module/category");
const Tag = require("../module/tag");
const Article = require("../module/article");
const Archive = require("../module/archive");

const router = require('../../utils/request');

// 获取全部分类
router.get('/category',function(req,res){
	Categorized.find({},{
        _id: false,
        __v: false,
    },function(err, result){
        return res.json({
            code: 0,
            data: result,
            success: true
        })
    })
})

// 获取全部标签
router.get('/tag',function(req,res){
	Tag.find({},{
        _id: false,
        __v: false,
    },function(err, result){
        return res.json({
            code: 0,
            data: result,
            success: true
        })
    })
})

// 获取热门文章列表
router.get('/hot',function(req,res){
	Article.find({ hots: true },{
		_id: 0, 
		__v: 0,
		renderedContent: 0,
        markdown: 0
    },function(err, result){
        return res.json({
            code: 0,
            data: result,
            success: true
        })
    })
})

// 获取归档
router.get('/archive',function(req,res){
	// 得到一个 eventproxy 实例
	var ep = new eventproxy();

	Article.countDocuments({}, function(err, result){
		ep.emit('total_event', result);
	})

	Archive.find({},{
		_id: 0, 
		__v: 0,
    },function(err, result){
    	ep.emit('data_event', result);
    })

    // 全部并发完成后，统一处理
	ep.all('total_event', 'data_event', function (total, data) {
		res.json({
            code: 0,
            data: data,
            total: total,
            message: '操作成功',
            success: true
        })
	});
})

// 获取文章列表
router.post('/article',function(req,res){

	// 得到一个 eventproxy 实例
	var ep = new eventproxy();

	// 区分来自于 分类、标签、关键词 的文章列表查询
	let findObj = {};
	if( req.body.key === 'category' ){
		findObj = {'category.name': req.body.val};
	}
	else if( req.body.key === 'tag' ){
		findObj = {'tag.name': req.body.val};
	}

	// 获得总条目数
	Article.countDocuments(findObj).exec(function(err, result){
		ep.emit('total_event', result);
	})

	// 分页查询
	Article.find( findObj ,{ 
		_id: 0, 
		__v: 0,
		renderedContent: 0,
        markdown: 0
	})
	.skip( (req.body.page - 1) * req.body.limt )
    .limit( req.body.limt )
    .sort( {'_id': -1} )
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
            success: true
        })
	});
})

// 获取文章内容--by uuid
router.post('/article/uuid',function(req,res){

	Article.update( 
		{ uuid: req.body.uuid },
		{ $inc: { 'meta.pvs': 1} },
		function(err, result){
			console.log( '阅读加一' )
		})

	Article.findOne({ uuid: req.body.uuid },{
        _id: false,
        __v: false,
    })
    .exec(function(err, result){
        res.json({
            code: 0,
            data: result,
            success: true
        })
    })
})


module.exports = router; //导出路由