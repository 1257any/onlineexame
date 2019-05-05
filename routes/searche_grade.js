
    

const Router = require('koa-router');
var router = new Router({
  //路由前缀
	prefix: '/main'
});

const grade = require('../controllers/searche_grade');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter exam');
// 	await next();
// });

router.post('/score_search',grade.search_grade);

module.exports = router;

