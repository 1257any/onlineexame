
//当前进入的是教师管理
    
var sessionIsExam = {}

//添加教师
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');
exports.add_teacher = async function(ctx, next){
	try {
		const data = ctx.request.body;
		console.log("body"+JSON.stringify(ctx.request.body))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		const results = await query(
            // `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
            `insert  into user values('1','${data.id}','${data.username}','${data.password}','${data.name}',null,null)`
        );
        // console.log("result"+JSON.stringify(results));
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

 
    

//查询教师
exports.query_teacher = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('para'+data.managerId)
		const results = await query(
            `select * from user where user_type = '1' or user_type = '2'`
        );
        console.log("result",    JSON.stringify(results));
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
//搜索教师
exports.search_teacher = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		if(data.searchType == '1'){
			 results = await query(
				`select * from user where
				username  like '%${data.content}%'`
			);
		}
		if(data.searchType == '2'){
			 results = await query(
				`select * from user where
				id like '%${data.content}%'`
			);
		}
		if(data.searchType == '3'){
			 results = await query(
				`select * from user where
				class_id like '%${data.content}%'`
			);
		}
        console.log("result",    JSON.stringify(results));
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
//删除教师

exports.delete_teacher = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content'+data.content)
		const results = await query(
            `delete  from user where
			  id= '${data.id}'`
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

//修改教师
exports.change_teacher= async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('content'+data.content)
		const results = await query(
            `update user set  username='${data.name}',id ='${data.id}' where
			 id='${data.old_id}'`
        );
        console.log("result",JSON.stringify(results));
		if(!results.length){
			ctx.body = {
                respCode: 1,
				results,
				respMsg:'更新成功'
			};
		}else {
      		ctx.body = {
				respCode:"-1",
				respMsg : '跟新失败'
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






