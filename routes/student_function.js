
    

const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/student_function'
});

const student_function = require('../controllers/student_function');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter exam');
// 	await next();
// });
router.post('/get_question',student_function.get_question);
router.post('/paper_answer',student_function.paper_answer);
router.post('/get_grade',student_function.get_grade)
module.exports = router;

