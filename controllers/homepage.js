
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');

exports.subject_info = async function(ctx, next){
	console.log('ctx'+JSON.stringify(ctx))
	ctx.body = {
		"respCode": "1",
  "data": [{
    "subjectid": 1,
    "subjectname": "java"
  }, {
    "subjectid": 2,
    "subjectname": "前端"
  }]
	}
	}

	exports.get_class_info = async function(ctx, next){
		try {
	
			const connection = connectionModel.getConnection();
			const query = bluebird.promisify(connection.query.bind(connection));
			const data = await query(
							`select  class_id ,class_name  from class exam_content`
					);
					console.log('paper'+data);
			if(data.length){
				ctx.body = {
									respCode: 1,
									data
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
		}
	