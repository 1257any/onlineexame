
//当前进入的是考试管理

var sessionIsExam = {}

//查询班级
const bluebird = require('bluebird');//promise化
const connectionModel = require('../models/connection');
exports.paperInfo = async function (ctx, next) {
  try {
    const data = ctx.request.body;
    console.log("body" + JSON.stringify(ctx.request.body))
    //console.log(ctx.request)

    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    const results = await query(
      // `insert  into class values('${data.name}','${data.classId}','${data.subjectId}','',null)`
      `select  * from  create_exam`
    );
    console.log("result" + JSON.stringify(results));

    // ctx.body = {
    //           "respCode" : "1",
    //           "total" : "50",
    //           "data": [{
    //             "autoTotalScore": 0,
    //             "classId": 1,
    //             "className": "西脱1711",
    //             "examDate": "2018-01-30",
    //             "instId": 12,
    //             "managerId": 1,
    //             "managerList": [{
    //               "instId": 0,
    //               "managerId": 1,
    //               "name": "欧洋",
    //               "roleId": 0,
    //               "status": 0
    //             }],
    //             "name": "欧洋",
    //             "paperId": 2,
    //             "status": 1,
    //             "stuId": 0,
    //             "subjectName": "java",
    //             "totalscore": 0
    //           },{
    //             "autoTotalScore": 0,
    //             "classId": 1,
    //             "className": "涉外1711",
    //             "examDate": "2018-02-30",
    //             "instId": 13,
    //             "managerId": 1,
    //             "managerList": [{
    //               "instId": 0,
    //               "managerId": 1,
    //               "name": "欧洋",
    //               "roleId": 0,
    //               "status": 0
    //             },{
    //               "instId": 1,
    //               "managerId": 2,
    //               "name": "李倩文",
    //               "roleId": 0,
    //               "status": 0
    //             }],
    //             "name": "欧洋",
    //             "paperId": 2,
    //             "status": 1,
    //             "stuId": 0,
    //             "subjectName": "web前端",
    //             "totalscore": 0
    //           }]
    //         }    
    if (results.length) {
      // let user = results[0];
      ctx.body = {
        respCode: 1,
        results
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
exports.get_all_papers = async function (ctx, next) {
  try {
    const result = ctx.request.body;
    // console.log("body"+JSON.stringify(ctx.request.body))
    //console.log(ctx.request)

    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    const data = await query(
      `select * from user where class_id = '${result.classId}'`
    );
    console.log('tesst' + data);
    if (data.length) {
      ctx.body = {
        respCode: 1,
        data
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

exports.get_stu_papers = async function (ctx, next) {
  try {
    const result = ctx.request.body;
    // console.log("body"+JSON.stringify(ctx.request.body))
    //console.log(ctx.request)

    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    const data = await query(
      `select * from exam_content`
    );
    console.log('paperewtw' + JSON.stringify(data));
    if (data.length) {
      ctx.body = {
        respCode: 1,
        data
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



//查询教师
exports.create_exam = async function (ctx, next) {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    Date.prototype.format = function (fmt) {
      var o = {
        "M+": this.getMonth() + 1,                 //月份 
        "d+": this.getDate(),                    //日 
        "h+": this.getHours(),                   //小时 
        "m+": this.getMinutes(),                 //分 
        "s+": this.getSeconds(),                 //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds()             //毫秒 
      };
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
      }
      return fmt;
    }
    //字符串转化为data类型
    let startTime = new Date(data.startTime).format("yyyy-MM-dd hh:mm:ss");
    let endTime = new Date(data.endTime).format("yyyy-MM-dd hh:mm:ss");
    console.log('startTime' + typeof startTime)
    const class_id = await query(
      `select class_id from class where class_name = '${data.classId}'`
    )
    console.log("class" + JSON.stringify(class_id))
    const results = await query(
      `insert into create_exam values(null,'${class_id[0].class_id}','${data.examName}','${data.classId}','${data.paperId}','${startTime}','${endTime}','${data.paperId}',null,null)`
    );
    console.log("result", JSON.stringify(results));
    if (results.length) {
      ctx.body = {
        respCode: 1,
        results

      };
    } else {
      ctx.body = {
        "respCode": "1",
        "respMsg": "创建考试成功"
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
//搜索教师
exports.set_teacher = async function (ctx, next) {
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
  } catch (e) {
    console.log('[/user/login] error:', e.message, e.stack)
    console.log("e" + e)
    ctx.body = {
      respCode: e.code || -1,
      respMsg: e.message
    };
  }
};
//修改教师
exports.get_stu_answer = async function (ctx, next) {
  try {
    const result = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    // 	// console.log('a'+JSON.stringify(data.params.managerId));
    console.log('stuId' + result.stuId)
    const data = await query(
      `select * from  student_answer where student_no ='${result.stuId}'`
    );
    console.log("data", JSON.stringify(data));
    if (data.length) {
      ctx.body = {
        "respCode": "1",
        data
        // "data": [{
        //   "answer": "a",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 1,
        //   "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空题干？",
        //   "type": 1
        // }, {
        //   "answer": "b",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 2,
        //   "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空的飞洒发斯蒂芬啊大丰收sad",
        //   "type": 1
        // }, {
        //   "answer": "c",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 3,
        //   "questionstem": "简答简答简答简答简答简答简答简答简答简答简答简答简答简答的飞洒发斯蒂芬啊大丰收sad",
        //   "type": 5
        // }, {
        //   "answer": "d",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 4,
        //   "questionstem": "dfja简答简答简答简答简答简答简答简答简答slkfjalksdjflkasjti题干？",
        //   "type": 5
        // }, {
        //   "answer": "e",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 5,
        //   "questionstem": "的飞洒发斯简答简答简答简答简答简答简答简答简答简答简答简答蒂芬啊大丰收sad",
        //   "type": 5
        // }, {
        //   "answer": "f",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 6,
        //   "questionstem": "程序题的飞程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题洒发斯蒂芬啊大丰收sad",
        //   "type": 6
        // }, {
        //   "answer": "g",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 7,
        //   "questionstem": "dfjaslkfjalksdjf程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题程序题lkasjti题干？",
        //   "type": 6
        // }, {
        //   "answer": "h",
        //   "gradeId": 0,
        //   "pointId": 0,
        //   "questionId": 8,
        //   "questionstem": "填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空填空的飞洒发斯蒂芬啊大丰收sad",
        //   "type": 1
        // }]


      };
    } else {
      ctx.body = {
        respCode: "-1",
        respMsg: '暂无作答'
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
//修改教师
exports.submit_score = async function (ctx, next) {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    // console.log('a'+JSON.stringify(data.params.managerId));
    // console.log('content'+data.content)
    //非选择题的总分
    // const username = localStorage.userName;
    const results = await query(
      `insert into student_grade value(null,'${data.totalScore}',null,'${data.stuId}',null,'${data.username}','${data.classId}')`
    );
    console.log("result", JSON.stringify(results));
    if (!results.length) {
      ctx.body = {
        respCode: 1,
        results,
        respMsg: '更新成功'
      };
    } else {
      ctx.body = {
        "respCode": "1",
        "respMsg": "提交成功"
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
//修改教师
exports.search_papers = async function (ctx, next) {
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
      "respCode": "1",
      "total": "23",
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
  } catch (e) {
    console.log('[/user/login] error:', e.message, e.stack);
    ctx.body = {
      respCode: e.code || -1,
      respMsg: e.message
    };
  };
}
//开始阅卷
exports.auto_read = async function (ctx, next) {
  try {
    const data = ctx.request.body;
    const connection = connectionModel.getConnection();
    const query = bluebird.promisify(connection.query.bind(connection));
    // console.log('a'+JSON.stringify(data.params.managerId));
    // console.log('content'+data.content)
    let auto_score = 0;
    const results = await query(
      `select question_id,answer from  student_answer where  student_no = '${data.stuId}' and  (question_type = '0' or question_type = '1' or question_type = '2')`
    );
    // results.map((item,index)=>{
      for(let i =0;i<results.length;i++){
        let answer =await query(
          `select answer from question_insert where id = '${results[i].question_id}'`
        )
        console.log('answer'+JSON.stringify(answer));
        if(results[i].answer == answer[0].answer){
          auto_score +=2;
          console.log('score'+auto_score)
        }
      }
     
    // })
    console.log("result", JSON.stringify(results));
    if (results.length) {
      ctx.body = {
        respCode: 1,
        auto_score,
        respMsg: '更新成功'
      };
    } else {
      ctx.body = {
        "respCode": "1"
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
}
