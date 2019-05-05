
    
const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/main'
});

const homepage = require('../controllers/homepage');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter user');
// 	await next();
// });

router.get('/subject_info',homepage.subject_info);
router.get('/get_class_info',homepage.get_class_info)
module.exports = router;
