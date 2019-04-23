
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.search_grade = async function(ctx, next){
	try {
		const data = ctx.request.body;
		console.log("body"+JSON.stringify(ctx))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('para'+data.managerId)
		if(data.searchType == '1'){
			if(data.content==''){
				results = await query(
					`select * from student_grade`
				);
			}else{
				results = await query(
					`select * from student_grade where
					student_id like '%${data.content}%'`
				);
			}	
		}
		if(data.searchType == '2'){
			 results = await query(
				`select * from student_grade where
				username like '%${data.content}%'`
			);
		}
		if(data.searchType == '3'){
			 results = await query(
				`select * from student_grade where
				class_id like '%${data.content}%'`
			);
		}
		// const results = await query(
		// 	`select * from student_grade where
		// 	  student_id like '%${data.content}%' or
        //       username like '%${data.content}%' or
        //       class_id like '%${data.content}%'`
		// );
		// const results = [];
		if(results.length){
			let user = results[0];
			ctx.body = {
				respCode: 1,
            studentInfo: [{
                "grade": user.grade,
                 "username": user.username,
                 'student_id':user.student_id,
                "class_id":user.class_id,
                'paper_exam_id':user.paper_exam_id,
        }]
			};
		}else {
      ctx.body = {
				respCode: -1,
				respMsg : '无该搜素内容'
			};
    }
		connection.end();
  }catch(e){
    console.log('[/user/login] error:', e.message, e.stack);
    ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
  }
};

