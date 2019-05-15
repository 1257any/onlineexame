//获取试卷
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.get_question = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		console.log(data.username);
		let exam_id;
		const exam_class = await query(
			`select class_id,id from user where
			 username='${data.username}'`
		);
		//先根据用户名查到用户所在班级
		// console.log("班级", JSON.stringify(exam_class));
		if (exam_class.length) {
			//根据所在班级查询试卷id
			 exam_id = await query(
				`select  paper_exam_id,end_time from create_exam where
				class_id='${exam_class[0].class_id}'`
			)
		   console.log("试卷"+JSON.stringify(exam_id))
			// ctx.body = {
			// 	respCode:"1",
			// 	exam_id
			// };
			if (exam_id.length) {
				//根据试卷id查到试卷的题型
				const question = await query(
					`select * from exam_content where paper_exam_id='${exam_id[0].paper_exam_id}'`
				)
				if (question.length) {
					let allquestion = [];
					for(let i = 0; i < question.length; i++) {
						console.log("试题数量及题型"+JSON.stringify(question))
						let sm_question;
						//把题目都查出来了
						// console.log("把题目内容查出来"+JSON.stringify(sm_question))
						for(let j =0 ;j<question[i].num;j++){
							  sm_question = await query(
								`select * from question_insert where knowlege_type ='${question[i].knowledge}' and question_type = '${question[i].question_type-1}'`
						)
							allquestion.push(sm_question[j])
						}
						// console.log('allquestion'+allquestion[0].question_type)
						
						console.log('allquestion'+JSON.stringify(allquestion))
						console.log('sm'+JSON.stringify(sm_question))
						// ctx.body = {
						// 	respCode: "1",
						// 	allquestion
						// };
					}
					//查单选题和双选题
					for(let k=0;k<allquestion.length-1;k++){
						// console.log('k',k)
						// console.log('allque'+allquestion[k].question_type)
						let zore =allquestion[k].question_type?allquestion[k].question_type:'';
						// console.log('zore'+zore)
						if(zore=='0'||zore=='1'){
							// console.log('success')
							const choice = await query(
								`select * from question_select where question_id='${allquestion[k].id}'`
							)
							let choice_arr=[];
							// console.log('choice'+JSON.stringify(choice[0]))
							let get_choice = choice.map((item)=>{
									choice_arr.push(item.content)
							})
							allquestion[k].choice = choice_arr
						}
						// console.log('具体题目'+JSON.stringify(allquestion))
					}
					ctx.body = {
						respCode: "1",
						allquestion,
						endtime:exam_id[0].end_time,
						paper_exam_id:exam_id[0].paper_exam_id,
						stu_id:exam_class[0].id
					};
					
				} else {
					ctx.body = {
						respCode: "-1",
						respMsg: '暂无考试'
					};
				}
			} else {
				ctx.body = {
					respCode: "-1",
					respMsg: '暂无考试'
				};
			}
		} else {
			ctx.body = {
				respCode: "-1",
				respMsg: '暂无考试'
			};
		}
		// 	if(results.length){
		// 		ctx.body = {
		// 			respCode: 1,
		// 			results,
		//             respMsg:'跟新成功'
		// 		};
		// 	}else {
		//   		ctx.body = {
		// 			respCode:"-1",
		// 			respMsg : '跟新失败'
		// 		};
		// }
		connection.end();
	} catch (e) {
		console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
	}
};

//提交答案
exports.paper_answer = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		
		answer = JSON.parse(data.answer);
		console.log('content' +  answer.length)
		for(let j =0;j<answer.length;j++){
			console.log("come here");
			 results = await query(
						`insert into student_answer values(null,'${answer[j].paper_id}','${answer[j].stu_id}','${answer[j].qusetion_id}','${answer[j].answer}','${answer[j].content}','${answer[j].question_type}')`
					)
					console.log("result", JSON.stringify(results));
		}
		// JSON.parse(data.answer).map((item)=>{
		// 			const results = await query(
		// 				`insert into student_answer values(null,'${item.paper_id}','${item.stu_id}','${item.qusetion_id}','${item.answer}','${data.answer[j].content}')`
		// 			)
		// 			// console.log('item'+item.answer)
		// })
		if (!results.length) {
			ctx.body = {
				respCode: 1,
				results,
				respMsg: '交卷成功'
			};
		} else {
			ctx.body = {
				respCode: "-1",
				respMsg: '跟新失败'
			};
		}
		connection.end();
	} catch (e) {
		console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
	
	}
};


//查看成绩
exports.get_grade = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data));
		console.log('content111' + data.length)
		// const user_id = localStorage.user_id
			console.log("come here");
			const studentInfo = await query(
						`select * from student_grade where student_id = '${data.user_id}'`
					)
		
		// const results = await query(
        //     // `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
        //     `insert  into class values('${data.name}','${data.classId}','${data.subjectId}',null,null,null)`
        // );
		// data.map((item)=>{
		// 	const results = await query(
		// 		`insert into student_answer values(null,'$(data.paper_id)','$(data.stu_id)','$(item.qusetion_id)','$(item.answer)','$(item.content)')`
		// 	)
		// })
		// console.log("result", JSON.stringify(results));
		if (studentInfo.length) {
			ctx.body = {
				respCode: 1,
				studentInfo,
				respMsg: '跟新成功'
			};
		} else {
			ctx.body = {
				respCode: "-1",
				respMsg: '暂无可查询成绩'
			};
		}
		connection.end();
	} catch (e) {
		console.log('[/user/login] error:', e.message, e.stack);
		ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
	}
};
