
    

const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/teacher_manager'
});

const teacher_manager = require('../controllers/teacher_manager');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter exam');
// 	await next();
// });
router.post('/add_teacher',teacher_manager.add_teacher);
router.post('/query_teacher',teacher_manager.query_teacher);
router.post('/delete_teacher',teacher_manager.delete_teacher);
router.post('/change_teacher',teacher_manager.change_teacher);
router.post('/search_teacher',teacher_manager.search_teacher);
module.exports = router;

