

const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');
let  exam_id = 1;
exports.paperInfo= async function(ctx, next){
    try {
		const data = ctx.request.body;
		console.log("body"+JSON.stringify(ctx))

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
        let question = JSON.parse(data.paperInfo);
        console.log(JSON.parse(data.paperInfo).questionObjects)
            for(let i =0; i<question.questionObjects.length;i++){
                for(let j in question.questionObjects[i].knowledgePointInfo){
                    console.log('j'+j);
                    console.log()
                    console.log(question.questionObjects[i])
                    const results = await query( `insert into exam_content values(null,'${exam_id}','${question.questionObjects[i].questionType}',${j},'${question.questionObjects[i].knowledgePointInfo[j]}',${question.questionObjects[i].score})`)
                }
                   
            }
            exam_id++;
		
		// const results = [];
		// if(results.length){
		// 	let user = results[0];
			ctx.body = {
				respCode: 1,
                respMsg:'出卷成功'
        // }]
			};
	// 	// }else {
    //   ctx.body = {
	// 			respCode: -1,
	// 			respMsg : '无该搜素内容'
	// 		};
    // }
		connection.end();
  }catch(e){
    console.log('[/user/login] error:', e.message, e.stack);
    ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
  }
  
}

