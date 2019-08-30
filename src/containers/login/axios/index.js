import axios from 'axios'
import * as URL from '@components/interfaceURL.js'

//用户登录
// export const axiosLogin = function(body,success,error){
//   console.log("body"+body)
//   axios.post(URL.login,{
//     body:{
//       className : body.className,
//       loginType : body.loginType,
//       managerId : body.managerId,
//       password : body.password
//     }
//   })
//   .then((res)=>{
//     success(res.data);
//   })
//   .catch(function (err) {
//       error(err);
//   });
// }


export const axiosLogin = function(body,success,error){

  // 发送请求前处理request的数据
  axios.defaults.transformRequest = [function (data) {
    let newData = ''
    for (let k in data) {
    newData += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) + '&'
    }
    return newData
  }]

  axios.post(URL.login,{
      className : body.className,
      loginType : body.loginType,
      managerId : body.managerId,
      password : body.password
  },{
    headers : {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
  .then((res)=>{
    success(res);
  })
  .catch(function (err) {e
      error(err);
  });
}
// test et2eeweeee