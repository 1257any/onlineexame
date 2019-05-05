/*
let baseUrl = "/sxt_exam/Servlet"paper_info
//管理员登录
export const  login = baseUrl;
//得到科目信息
export const subject_info = baseUrl;
//得到班级信息
export const get_class_info = baseUrl;
//得到知识点
export const knowledge_point = baseUrl;
//提交题目信息（试题录入）
export const q_checkin = baseUrl;
//出卷
export const paper_info = baseUrl;

//成绩查询
export const search_score = baseUrl;

//查询所有学生（得到一页数据）
export const get_student = baseUrl;
//查询学生（模糊搜索）
export const search_student = baseUrl;
//删除学生
export const delete_student = baseUrl;
//修改学生
export const change_student = baseUrl;
//添加学生
export const add_student = baseUrl;

//查询班级学生（得到一页数据）
export const get_class = baseUrl;
//查询班级（模糊搜索）
export const search_class = baseUrl;
//删除班级
export const delete_class = baseUrl;
//修改班级
export const change_class = baseUrl;
//添加班级
export const add_class = baseUrl;

//查询教师（得到一页数据）
export const get_teacher = baseUrl;
//查询教师（模糊搜索）
export const search_teacher = baseUrl;
//修改老师
export const change_teacher = baseUrl;
//删除老师
export const delete_teacher = baseUrl;
//添加老师
export const add_teacher = baseUrl;

//创建考试
export const create_exam = baseUrl;

//查询试卷（得到一页数据）
export const get_papers = baseUrl;

//获取工号
export const get_manager_id = baseUrl;

//设置阅卷老师
export const set_teacher = baseUrl;

//获取所有的试卷
export const get_all_papers = baseUrl;

//获取主观题题目以及学生答案
export const get_stu_answer = baseUrl;

//提交主观题学生答案
export const submit_score = baseUrl;

//搜索试卷
export const search_papers = baseUrl;

//修改密码
export const change_password = baseUrl;

//自动阅卷
export const auto_read = baseUrl;

//得到试卷编号
export const get_paperId = baseUrl;

*/







//管理员登录
export const  login = "/user/login";
// export const  login = "data/login.json";
//得到科目信息
// export const subject_info = "data/subject_info.json";
export const subject_info = "main/subject_info";
//得到班级信息
export const get_class_info = "main/get_class_info";
//得到知识点
export const knowledge_point = "create_question/knowledgePoint";
//提交题目信息（试题录入）
export const q_checkin = "create_question/q_checkin";
//出卷
export const paper_info = "create_examination/paperInfo";
//获得所有试卷
export const get_stu_papers = "examination_manager/get_stu_papers";

//成绩查询
export const search_score = "main/score_search";

//查询所有学生（得到一页数据）
export const get_student = "student_manager/query_student";
//查询学生（模糊搜索）
export const search_student = "student_manager/search_student";
//删除学生
export const delete_student = "student_manager/delete_student";
//修改学生
export const change_student = "student_manager/change_student";
//添加学生
export const add_student = "student_manager/add_student";

//查询班级学生（得到一页数据）
export const get_class = "class_manager/query_class";
//删除班级
export const delete_class = "class_manager/delete_class";
//修改班级
export const change_class = "class_manager/change_class";
//添加班级
export const add_class = "class_manager/add_class";
// 搜索班级
export const search_class = "class_manager/search_class";

//查询教师（得到一页数据）
export const get_teacher = "teacher_manager/query_teacher";
//查询教师（模糊搜索）
export const search_teacher = "teacher_manager/search_teacher";
//修改老师
export const change_teacher = "teacher_manager/change_teacher";
//删除老师
export const delete_teacher = "teacher_manager/delete_teacher";
//添加老师
export const add_teacher = "teacher_manager/add_teacher";

//创建考试
export const create_exam = "examination_manager/create_exam";

//查询试卷（得到一页数据）
export const get_papers = "examination_manager/paperInfo";


//设置阅卷老师
export const set_teacher = "examination_manager/set_teacher";

//获取所有的试卷
export const get_all_papers = "examination_manager/get_all_papers";

//获取主观题题目以及学生答案
export const get_stu_answer = "examination_manager/get_stu_answer";

//提交主观题学生答案
export const submit_score = "examination_manager/submit_score";

//搜索试卷
export const search_papers = "examination_manager/search_papers";

//修改密码
export const change_password = "user/change_password";

//自动阅卷
export const auto_read = "examination_manager/auto_read";

//得到试卷编号
// export const get_paperId = "examination_manager/get_paperId";

// 学生端 获取试卷
export const  get_question="student_function/get_question"

//提交试卷

export const  paper_answer="student_function/paper_answer"

//查看成绩
export const  get_grade="student_function/get_grade"

/*
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'
*/
