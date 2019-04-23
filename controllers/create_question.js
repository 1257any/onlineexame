
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.knowledgePoint = async function(ctx, next){
  // try {
	// 	const data = ctx.request.body;
	// 	console.log("body"+JSON.stringify(ctx))
	// 	//console.log(ctx.request)

	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	// console.log('para'+data.managerId)
	// 	if(data.searchType == '1'){
	// 		if(data.content==''){
	// 			results = await query(
	// 				`insert into question_insert values   where `
	// 			);
	// 		}else{
	// 			results = await query(
	// 				`select * from student_grade where
	// 				student_id like '%${data.content}%'`
	// 			);
	// 		}	
	// 	}
	// 	if(data.searchType == '2'){
	// 		 results = await query(
	// 			`select * from student_grade where
	// 			username like '%${data.content}%'`
	// 		);
	// 	}
	// 	if(data.searchType == '3'){
	// 		 results = await query(
	// 			`select * from student_grade where
	// 			class_id like '%${data.content}%'`
	// 		);
	// 	}
	// 	// const results = await query(
	// 	// 	`select * from student_grade where
	// 	// 	  student_id like '%${data.content}%' or
  //       //       username like '%${data.content}%' or
  //       //       class_id like '%${data.content}%'`
	// 	// );
	// 	// const results = [];
	// 	if(results.length){
	// 		let user = results[0];
	// 		ctx.body = {
	// 			respCode: 1,
  //           studentInfo: [{
  //               "grade": user.grade,
  //                "username": user.username,
  //                'student_id':user.student_id,
  //               "class_id":user.class_id,
  //               'paper_exam_id':user.paper_exam_id,
  //       }]
	// 		};
	// 	}else {
  //     ctx.body = {
	// 			respCode: -1,
	// 			respMsg : '无该搜素内容'
	// 		};
  //   }
	// 	connection.end();
  // }catch(e){
  //   console.log('[/user/login] error:', e.message, e.stack);
  //   ctx.body = {
	// 		respCode: e.code || -1,
	// 		respMsg: e.message
	// 	};
  // }
	try {
    const data = ctx.request.body;


      ctx.body = {
        "respCode" : "1",
        "data": [{
          "gradeId": "2",
          "pointId": 1,
          "pointName": "js基础",
          "subjectId": "1"
        }, {
          "gradeId": "2",
          "pointId": 2,
          "pointName": "html",
          "subjectId": "1"
        },{
          "gradeId": "2",
          "pointId": 3,
          "pointName": "css",
          "subjectId": "1"
        },{
          "gradeId": "2",
          "pointId": 4,
          "pointName": "js面向对象",
          "subjectId": "1"
        },{
          "gradeId": "2",
          "pointId": 5,
          "pointName": "Vue",
          "subjectId": "1"
        },{
          "gradeId": "2",
          "pointId": 6,
          "pointName": "Angular",
          "subjectId": "1"
        }]
      }

  }catch(e){
    console.log('[/exam/query] error:', e.message, e.stack);
    ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
  }
};
exports.q_checkin = async function(ctx, next){
	try {
		const data = ctx.request.body;
		console.log('data'+data)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
    
    const results = await query(
			`insert into question_insert values(null,null,'${data.gradeId}','${data.type}','${data.pointId}','${data.questionstem}','${data.answer}') `
    );
    console.log('result'+JSON.stringify(results))
    let questionTag = ['A','B','C','D','E','F','G'];
    //选择题
    if(data.choice){
      let choice =[...data.choice];
      // console.log( )
      if(choice&&choice.length>1){
        for(let i = 0 ;i<choice.length;i++){
          const  selectType =  await query(
            `insert into question_select values(null,'${choice[i]}','${questionTag[i]}','${results.insertId}') `
          );
        }
       
      }
    }
   
    if(results.affectedRows){
      ctx.body = {
        respCode: 1,
        respMsg: '添加成功'
      };
    }
  }catch(e){
    console.log('[/user/change_password] error:', e.message, e.stack);
    ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
  }
}
