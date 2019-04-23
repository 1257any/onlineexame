
//当前进入的是班级管理
    
var sessionIsExam = {}

//添加班级
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.add_class = async function(ctx, next){
	try {
		const data = ctx.request.body;
		console.log("body"+JSON.stringify(ctx.request.body))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
        // console.log('a'+JSON.stringify(data.params.managerId));
        // `INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`
        console.log("name"+data.classId)
        console.log('stubjectID'+data.subjectId)
        const classId = JSON.parse(data.classId);
		const results = await query(
            // `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
            `insert  into class values('${data.name}','${data.classId}','${data.subjectId}',null,null,null)`
        );
        console.log("result"+JSON.stringify(results));
		if(!results.length){
			let user = results[0];
			ctx.body = {
				respCode: 1,
				respMsg:'添加成功'
			};
		}else {
      ctx.body = {
				respCode: -1,
				respMsg : 'null'
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

 
    

//查询班级
exports.query_class = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('para'+data.managerId)
		const results = await query(
            `select * from class`
        );
        console.log("result",JSON.stringify(results));
		if(results.length){
			ctx.body = {
                respCode: 1,
                results
                
			};
		}else {
      ctx.body = {
				respCode: -1,
				respMsg : '暂无可操作数据'
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
//搜索班级
exports.search_class = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log(data.searchType)
		if(data.searchType == '1'){
			console.log('班级')
			 results = await query(
				`select * from class where
				  class_name like '%${data.content}%'`
			);
		}
		if(data.searchType == '2'){
			console.log('科目')
			 results = await query(
				`select * from class where
				   exam_subject like '%${data.content}%'`
			);
		}
		if(data.searchType == '3'){
			console.log('状态')
			 results = await query(
				`select * from class where
				  status like '%${data.content}%'`
			);
		}
        console.log("result",JSON.stringify(results));
		if(results.length){
			ctx.body = {
                respCode: 1,
                results 
			};
		}else {
      ctx.body = {
				respCode: -1,
				respMsg : '无匹配数据'
			};
    }
		connection.end();
  }catch(e){
	console.log('[/user/login] error:', e.message, e.stack)
	console.log("e"+e)
    ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
  }
};
//删除班级

exports.delete_class = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		const results = await query(
            `delete  from class where
			  class_id= '${data.classId}'`
        );
        console.log("result",JSON.stringify(results));
		if(!results.length){
			ctx.body = {
				respCode: 1,
                respMsg:'成功删除'
			};
		}else {
      		ctx.body = {
				respCode:"-1",
				respMsg : '删除失败'
			};
    }
		connection.end();
  }catch(e){
  }
};

//修改班级
exports.change_class = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		const results = await query(
            `update class set  class_name='${data.class_Name}', exam_subject ='${data.subject_name}',exam_subject_id='${data.subjectId}' where
			  class_id= '${data.classId}'`
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






