
    

const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/class_manager'
});

const class_manager = require('../controllers/class_manager');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter exam');
// 	await next();
// });
router.post('/add_class',class_manager.add_class);
router.post('/query_class',class_manager.query_class);
router.post('/delete_class',class_manager.delete_class);
router.post('/change_class',class_manager.change_class);
router.post('/search_class',class_manager.search_class);
module.exports = router;

