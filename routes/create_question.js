
    
const Router = require('koa-router');
var router = new Router({
	prefix: '/create_question'
});

const create_question = require('../controllers/create_question');

//不管什么类型（get,post,put,del等等）的请求，都会经过这个中间件
// router.all('/*', async function(ctx, next){
// 	console.log('enter user');
// 	await next();
// });

router.get('/knowledgePoint',create_question.knowledgePoint);
router.post('/q_checkin',create_question.q_checkin);
module.exports = router;
