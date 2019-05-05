
    

const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/student_manager'
});

const student_manager = require('../controllers/student_manager');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter exam');
// 	await next();
// });
router.post('/add_student',student_manager.add_student);
router.post('/query_student',student_manager.query_student);
router.post('/delete_student',student_manager.delete_student);
router.post('/change_student',student_manager.change_student);
router.post('/search_student',student_manager.search_student);
module.exports = router;

