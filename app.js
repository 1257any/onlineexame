const Koa = require('koa');
const app = new Koa();
const path = require('path');
const serve = require("koa-static");
const http = require('http');

//静态资源托管irn
app.use(serve(path.join(__dirname+"/dist")));
// app.use(serve(path.join(__dirname+"/data")));
console.log("dirname"+path.join(__dirname))

//用来解析body的中间件，比方说你通过post来传递表单，json数据，或者上传文件，
//在koa中是不容易获取的，通过koa-bodyparser解析之后，在koa中this.body就能直接获取到数据。
const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

//路由配置
const routes = ['user','exam','homepage','searche_grade','class_manager','student_manager','teacher_manager','create_question','create_examination','student_function','examination_manager'];
routes.forEach((router) => {
	app.use(require(`./routes/${router}`).routes());
});

// app.use(async ctx => {
//   ctx.body = 'Hello World';
// });

app.listen(8080);