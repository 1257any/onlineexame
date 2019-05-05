
    
const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/examination_manager'
});

const examination_manager = require('../controllers/examination_manager');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter user');
// 	await next();
// });
router.post('/paperInfo',examination_manager.paperInfo);
router.post('/create_exam',examination_manager.create_exam);
router.post('/set_teacher',examination_manager.set_teacher);
router.post('/get_all_papers',examination_manager.get_all_papers);
router.post('/get_stu_answer',examination_manager.get_stu_answer);
router.post('/submit_score',examination_manager.submit_score);
router.post('/search_papers',examination_manager.search_papers);
router.post('/auto_read',examination_manager.auto_read);
router.post('/get_stu_papers',examination_manager.get_stu_papers);
// router.get('/get_class_info',homepage.get_class_info)
module.exports = router;
