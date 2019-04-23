//获取试卷
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.get_question = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('content'+data.content)
		// let userName = localStorage.userName;
		// console.log('userName'+userName)
		// const results = await query(
        //     `select class_name  from user where username = '${userName}'`
        // );
        // console.log("result",JSON.stringify(results));
	// 	if(!results.length){
			ctx.body = {
				respCode: 1,
				results,
                respMsg:'跟新成功'
			};
	// 	}else {
    //   		ctx.body = {
	// 			respCode:"-1",
	// 			respMsg : '跟新失败'
	// 		};
    // }
		connection.end();
  }catch(e){
  }
};

//提交答案
exports.paper_answer = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		const results = await query(
            `update user set  name='${data.name}',  password='${data.password}',class_name= '${data.classId}' where
			 id='${data.stuId}'`
        );
        console.log("result",JSON.stringify(results));
		if(!results.length){
			ctx.body = {
				respCode: 1,
				results,
                respMsg:'跟新成功'
			};
		}else {
      		ctx.body = {
				respCode:"-1",
				respMsg : '跟新失败'
			};
    }
		connection.end();
  }catch(e){
  }
};


//查看成绩
exports.get_grade = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		const results = await query(
            `update user set  name='${data.name}',  password='${data.password}',class_name= '${data.classId}' where
			 id='${data.stuId}'`
        );
        console.log("result",JSON.stringify(results));
		if(!results.length){
			ctx.body = {
				respCode: 1,
				results,
                respMsg:'跟新成功'
			};
		}else {
      		ctx.body = {
				respCode:"-1",
				respMsg : '跟新失败'
			};
    }
		connection.end();
  }catch(e){
  }
};
