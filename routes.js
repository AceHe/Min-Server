var app = require('./express.js');

//基础路由
// app.get('/',function(req,res){
//     res.send("ok");
// })

//接口路由 设置访问路径
var userRoute = require('./app/routes/user');
app.use('/user', userRoute);

var categorizedRoute = require('./app/routes/categorized');
app.use('/blog', categorizedRoute);

var tagRoute = require('./app/routes/tag');
app.use('/blog', tagRoute);

module.exports = app;