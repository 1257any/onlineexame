
    
const Router = require('koa-router');
var router = new Router({
	prefix: '/create_examination'
});

const create_examination = require('../controllers/create_examination');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter user');
// 	await next();
// });

router.post('/paperInfo',create_examination.paperInfo);
// router.post('/q_checkin',create_examination.q_checkin);
module.exports = router;
