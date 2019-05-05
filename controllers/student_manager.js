
//当前进入的是班级管理

var sessionIsExam = {}

//添加学生
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.add_student = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		console.log("body" + JSON.stringify(ctx.request.body))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// `INSERT INTO user_table (username, password) VALUES('${username}', '${password}')`
		// console.log("name"+data.classId)
		// console.log('stubjectID'+data.subjectId)
		// const classId = JSON.parse(data.classId);
		const results = await query(
			// `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
			`insert  into user values('0','${data.student_id}','${data.name}','123','${data.name}','${data.classId}','${data.classId}')`
		);
		// console.log("result"+JSON.stringify(results));
		if (!results.length) {
			let user = results[0];
			ctx.body = {
				respCode: 1,
				respMsg: '添加成功'
			};
		} else {
			ctx.body = {
				respCode: -1,
				respMsg: 'null'
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




//查询班级
exports.query_student = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		// console.log('para'+data.managerId)
		const results = await query(
			`select * from user where user_type = '0'`
		);
		console.log("result", JSON.stringify(results));
		if (results.length) {
			ctx.body = {
				respCode: 1,
				results

			};
		} else {
			ctx.body = {
				respCode: -1,
				respMsg: '暂无可操作数据'
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
//搜索学生
exports.search_student = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content' + data.content)
		if (data.searchType == '1') {
			results = await query(
				`select * from user where
				name  like '%${data.content}%'`
			);
		}
		if (data.searchType == '2') {
			results = await query(
				`select * from user where
				id like '%${data.content}%'`
			);
		}
		if (data.searchType == '3') {
			results = await query(
				`select * from user where
				class_name like '%${data.content}%'`
			);
		}
		console.log("result", JSON.stringify(results));
		if (results.length) {
			ctx.body = {
				respCode: 1,
				results
			};
		} else {
			ctx.body = {
				respCode: -1,
				respMsg: '无匹配数据'
			};
		}
		connection.end();
	} catch (e) {
		console.log('[/user/login] error:', e.message, e.stack)
		console.log("e" + e)
		ctx.body = {
			respCode: e.code || -1,
			respMsg: e.message
		};
	}
};
//删除学生

exports.delete_student = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content' + data.content)
		const results = await query(
			`delete  from user where
			  id= '${data.stuId}'`
		);
		console.log("result", JSON.stringify(results));
		if (!results.length) {
			ctx.body = {
				respCode: 1,
				respMsg: '成功删除'
			};
		} else {
			ctx.body = {
				respCode: "-1",
				respMsg: '删除失败'
			};
		}
		connection.end();
	} catch (e) {
	}
};

//修改班级
exports.change_student = async function (ctx, next) {
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// console.log('a'+JSON.stringify(data.params.managerId));
		console.log('content' + data.content)
		const results = await query(
			`update user set  name='${data.name}',  password='${data.password}',class_name= '${data.classId}' where
			 id='${data.stuId}'`
		);
		console.log("result", JSON.stringify(results));
		if (!results.length) {
			ctx.body = {
				respCode: 1,
				results,
				respMsg: '跟新成功'
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






