var app = require('./express.js');

//接口路由 设置访问路径
// app.get('/',function(req,res){
//     res.send("ok");
// })

//登录，登出，用户信息
var userRoute = require('./app/routes/user');
app.use('/user', userRoute);

//博客分类 增删改查
var categorizedRoute = require('./app/routes/categorized');
app.use('/blog', categorizedRoute);

//博客标签 增删改查
var tagRoute = require('./app/routes/tag');
app.use('/blog', tagRoute);

//博客文章 增删改查
var articleRoute = require('./app/routes/article');
app.use('/blog', articleRoute);

module.exports = app;