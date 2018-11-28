var app = require('./express.js');

//登录，登出，用户信息
var userRoute = require('./app/routes_admin/user');
app.use('/api/user', userRoute);

//博客分类 增删改查
var categorizedRoute = require('./app/routes_admin/category');
app.use('/api/admin', categorizedRoute);

//博客标签 增删改查
var tagRoute = require('./app/routes_admin/tag');
app.use('/api/admin', tagRoute);

//博客文章 增删改查
var articleRoute = require('./app/routes_admin/article');
app.use('/api/admin', articleRoute);

//网站配置
var websiteRoute = require('./app/routes_admin/website');
app.use('/api/admin', websiteRoute);

//友情链接
var friendlinkRoute = require('./app/routes_admin/friendlink');
app.use('/api/admin', friendlinkRoute);




// 博客前端 api 接口路径
var blogRoute = require('./app/routes_blog/index');
app.use('/api/blog', blogRoute);

var blogGuestbook = require('./app/routes_blog/guestbook');
app.use('/api/blog', blogGuestbook);

module.exports = app;