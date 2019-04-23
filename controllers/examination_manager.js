
//当前进入的是考试管理
    
var sessionIsExam = {}

//查询班级
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');
exports.paperInfo = async function(ctx, next){
	try {
		const data = ctx.request.body;
		console.log("body"+JSON.stringify(ctx.request.body))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		// const results = await query(
        //     // `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
        //     `insert  into user values('0','${data.id}','${data.username}','${data.password}','${data.name}',null,null)`
        // );
        // console.log("result"+JSON.stringify(results));
		// if(!results.length){
		// 	let user = results[0];
			ctx.body = {
                "respCode" : "1",
                "total" : "50",
                "data": [{
                  "autoTotalScore": 0,
                  "classId": 1,
                  "className": "西脱1711",
                  "examDate": "2018-01-30",
                  "instId": 12,
                  "managerId": 1,
                  "managerList": [{
                    "instId": 0,
                    "managerId": 1,
                    "name": "欧洋",
                    "roleId": 0,
                    "status": 0
                  }],
                  "name": "欧洋",
                  "paperId": 2,
                  "status": 1,
                  "stuId": 0,
                  "subjectName": "java",
                  "totalscore": 0
                },{
                  "autoTotalScore": 0,
                  "classId": 1,
                  "className": "涉外1711",
                  "examDate": "2018-02-30",
                  "instId": 13,
                  "managerId": 1,
                  "managerList": [{
                    "instId": 0,
                    "managerId": 1,
                    "name": "欧洋",
                    "roleId": 0,
                    "status": 0
                  },{
                    "instId": 1,
                    "managerId": 2,
                    "name": "李倩文",
                    "roleId": 0,
                    "status": 0
                  }],
                  "name": "欧洋",
                  "paperId": 2,
                  "status": 1,
                  "stuId": 0,
                  "subjectName": "web前端",
                  "totalscore": 0
                }]
              }              
	// 	}else {
    //   ctx.body = {
	// 			respCode: -1,
	// 			respMsg : 'null'
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
};
exports.get_all_papers = async function(ctx, next){
	try {
		// const data = ctx.request.body;
		// console.log("body"+JSON.stringify(ctx.request.body))
		//console.log(ctx.request)

		const connection = connectionModel.getConnection();
		const query = bluebird.promisify(connection.query.bind(connection));
		const data = await query(
            `select  paper_exam_id  from  exam_content`
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
};

 
    

//查询教师
exports.create_exam = async function(ctx, next){
	try {
		const data = ctx.request.body;
		const connection = connectionModel.getConnection();
        const query = bluebird.promisify(connection.query.bind(connection));
        Date.prototype.format = function(fmt) { 
            var o = { 
               "M+" : this.getMonth()+1,                 //月份 
               "d+" : this.getDate(),                    //日 
               "h+" : this.getHours(),                   //小时 
               "m+" : this.getMinutes(),                 //分 
               "s+" : this.getSeconds(),                 //秒 
               "q+" : Math.floor((this.getMonth()+3)/3), //季度 
               "S"  : this.getMilliseconds()             //毫秒 
           }; 
           if(/(y+)/.test(fmt)) {
                   fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
           }
            for(var k in o) {
               if(new RegExp("("+ k +")").test(fmt)){
                    fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
                }
            }
           return fmt; 
       }        
        //字符串转化为data类型
        let startTime = new Date(data.startTime).format("yyyy-MM-dd hh:mm:ss");
        let endTime = new Date(data.endTime).format("yyyy-MM-dd hh:mm:ss");
        console.log('startTime'+typeof startTime)
		const results = await query(
            `insert into create_exam values(null,'${data.classId}','${data.examName}',null,'${data.paperId}','${startTime}','${endTime}','${data.paperId}')`
        );
        console.log("result",JSON.stringify(results));
		if(results.length){
			ctx.body = {
                respCode: 1,
                results
                
			};
		}else {
      ctx.body = {
        "respCode": "1",
        "respMsg": "创建考试成功"
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
exports.set_teacher = async function(ctx, next){
	try {
	// 	const data = ctx.request.body;
	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	console.log('content'+data.content)
	// 	if(data.searchType == '1'){
	// 		 results = await query(
	// 			`select * from user where
	// 			name = like '%${data.content}%'`
	// 		);
	// 	}
	// 	if(data.searchType == '2'){
	// 		 results = await query(
	// 			`select * from user where
	// 			id like '%${data.content}%'`
	// 		);
	// 	}
	// 	if(data.searchType == '3'){
	// 		 results = await query(
	// 			`select * from user where
	// 			class_id like '%${data.content}%'`
	// 		);
	// 	}
    //     console.log("result",    JSON.stringify(results));
	// 	if(results.length){
	// 		ctx.body = {
    //             respCode: 1,
    //             results 
	// 		};
	// 	}else {
      ctx.body = {
        "data": [{
            "instId": 6,
            "managerId": 3,
            "name": "xiez",
            "roleId": 0,
            "status": 0
          }],
          "respCode": "1",
          "total": 1
			};
    // }
	// 	connection.end();
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

// exports.get_all_papers = async function(ctx, next){
// 	try {
// 	// 	const data = ctx.request.body;
// 	// 	const connection = connectionModel.getConnection();
// 	// 	const query = bluebird.promisify(connection.query.bind(connection));
// 	// 	// console.log('a'+JSON.stringify(data.params.managerId));
// 	// 	console.log('content'+data.content)
// 	// 	const results = await query(
//     //         `delete  from user where
// 	// 		  id= '${data.id}'`
//     //     );
//     //     console.log("result",JSON.stringify(results));
// 	// 	if(!results.length){
// 			ctx.body = {
//                 "data": [{
//                     "autoTotalScore": 0,
//                     "classId": 0,
//                     "instId": 1,
//                     "managerId": 0,
//                     "name": "张三",
//                     "paperId": 0,
//                     "status": 1,
//                     "stuId": 2,
//                     "totalscore": 0
//                   }, {
//                     "autoTotalScore": 0,
//                     "classId": 0,
//                     "instId": 3,
//                     "managerId": 0,
//                     "name": "李四",
//                     "paperId": 0,
//                     "status": 1,
//                     "stuId": 3,
//                     "totalscore": 0
//                   }, {
//                     "autoTotalScore": 0,
//                     "classId": 0,
//                     "instId": 4,
//                     "managerId": 0,
//                     "name": "王五",
//                     "paperId": 0,
//                     "status": 1,
//                     "stuId": 4,
//                     "totalscore": 0
//                   }],
//                   "respCode": "1",
//                   "total": 3
// 			};
// 	// 	}else {
//     //   		ctx.body = {
// 	// 			respCode:"-1",
// 	// 			respMsg : '删除失败'
// 	// 		};
//     // }
// 	// 	connection.end();
//   }catch(e){
//   }
// };

//修改教师
exports.get_stu_answer= async function(ctx, next){
	try {
	// 	const data = ctx.request.body;
	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	// console.log('content'+data.content)
	// 	const results = await query(
    //         `update user set  name='${data.name}' id ='${data.id}' where
	// 		 id='${data.old_id}'`
    //     );
    //     console.log("result",JSON.stringify(results));
	// 	if(!results.length){
			ctx.body = {
                
                    "respCode": "1",
                    "data": [{
                      "answer": "a",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 1,
                      "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空题干？",
                      "type": 1
                    }, {
                      "answer": "b",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 2,
                      "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空的飞洒发斯蒂芬啊大丰收sad",
                      "type": 1
                    }, {
                      "answer": "c",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 3,
                      "questionstem": "简答简答简答简答简答简答简答简答简答简答简答简答简答简答的飞洒发斯蒂芬啊大丰收sad",
                      "type": 5
                    }, {
                      "answer": "d",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 4,
                      "questionstem": "dfja简答简答简答简答简答简答简答简答简答slkfjalksdjflkasjti题干？",
                      "type": 5
                    }, {
                      "answer": "e",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 5,
                      "questionstem": "的飞洒发斯简答简答简答简答简答简答简答简答简答简答简答简答蒂芬啊大丰收sad",
                      "type": 5
                    }, {
                      "answer": "f",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 6,
                      "questionstem": "程序题的飞程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题洒发斯蒂芬啊大丰收sad",
                      "type": 6
                    }, {
                      "answer": "g",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 7,
                      "questionstem": "dfjaslkfjalksdjf程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题lkasjti题干？",
                      "type": 6
                    }, {
                      "answer": "h",
                      "gradeId": 0,
                      "pointId": 0,
                      "questionId": 8,
                      "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空的飞洒发斯蒂芬啊大丰收sad",
                      "type": 1
                    }]
                  
                  
			};
	// 	}else {
    //   		ctx.body = {
	// 			respCode:"-1",
	// 			respMsg : '跟新失败'
	// 		};
    // }
	// 	connection.end();
  }catch(e){
  }
};
//修改教师
exports.submit_score= async function(ctx, next){
	try {
	// 	const data = ctx.request.body;
	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	// console.log('content'+data.content)
	// 	const results = await query(
    //         `update user set  name='${data.name}' id ='${data.id}' where
	// 		 id='${data.old_id}'`
    //     );
    //     console.log("result",JSON.stringify(results));
	// 	if(!results.length){
	// 		ctx.body = {
    //             respCode: 1,
	// 			results,
	// 			respMsg:'更新成功'
	// 		};
	// 	}else {
      		ctx.body = {
                "respCode" : "1",
                "respMsg" : "提交成功"
			};
    // }
	// 	connection.end();
  }catch(e){
  }
};
//修改教师
exports.search_papers= async function(ctx, next){
	try {
	// 	const data = ctx.request.body;
	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	// console.log('content'+data.content)
	// 	const results = await query(
    //         `update user set  name='${data.name}' id ='${data.id}' where
	// 		 id='${data.old_id}'`
    //     );
    //     console.log("result",JSON.stringify(results));
	// 	if(!results.length){
	// 		ctx.body = {
    //             respCode: 1,
	// 			results,
	// 			respMsg:'更新成功'
	// 		};
	// 	}else {
      		ctx.body = {
				"respCode" : "1",
  "total" : "23",
  "data": [{
    "autoTotalScore": 0,
    "classId": 1,
    "className": "西脱1711",
    "examDate": "2018-01-30",
    "instId": 12,
    "managerId": 1,
    "managerList": [{
      "instId": 0,
      "managerId": 1,
      "name": "欧洋",
      "roleId": 0,
      "status": 0
    }],
    "name": "欧洋",
    "paperId": 2,
    "status": 1,
    "stuId": 0,
    "subjectName": "java",
    "totalscore": 0
  }]
			};
    // }
	// 	connection.end();
  }catch(e){
  }
};

//修改教师
exports.auto_read= async function(ctx, next){
	try {
	// 	const data = ctx.request.body;
	// 	const connection = connectionModel.getConnection();
	// 	const query = bluebird.promisify(connection.query.bind(connection));
	// 	// console.log('a'+JSON.stringify(data.params.managerId));
	// 	// console.log('content'+data.content)
	// 	const results = await query(
    //         `update user set  name='${data.name}' id ='${data.id}' where
	// 		 id='${data.old_id}'`
    //     );
    //     console.log("result",JSON.stringify(results));
	// 	if(!results.length){
	// 		ctx.body = {
    //             respCode: 1,
	// 			results,
	// 			respMsg:'更新成功'
	// 		};
	// 	}else {
      		ctx.body = {
                "respCode" : "1"
			};
    // }
	// 	connection.end();
  }catch(e){
  }
};







