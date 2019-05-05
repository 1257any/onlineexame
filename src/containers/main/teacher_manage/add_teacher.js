import React from 'react'

import { Form,Input,Select,Row,Col,Button } from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
import {Modal,message} from 'antd'

import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class AddTeacher extends React.Component {
  constructor(){
    super()
    this.state = {
    }
  }

  //选择班级
  handleChange(value) {
    console.log(`selected ${value}`);
  }

  // //获取工号
  // getManagerId(){
  //   httpServer({
  //     method:'post',
  //     url : URL.get_manager_id
  //   },{
  //     className : 'ManagerServiceImpl',
  //     type : 5,
  //   })
  //   .then((res)=>{
  //     this.setState({managerId:res.data.results[0].id});
  //   })
  // }

  //提交
  handleSubmit(e) {
    e.preventDefault();
    if(localStorage.user_type === '2'){
      this.props.form.validateFields((err, values) => {
        if (!err) {
          httpServer({
            method:'post',
            url : URL.add_teacher
          },{
            id:values.id,
            name : values.name,
            username : values.username,
            password : values.password,
          })
        }
      });
    }
   
  }

  componentWillMount(){
    if(localStorage.user_type === '1'){
      return Modal.error({
        title: '系统提示',
        content: '你没有权限',
        okText : '确定'
      }); 
    }
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    //表单布局
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 , offset : 4},
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return(
      <div>
        {/* <BreadcrumbCustom pathList={this.state.pathList}></BreadcrumbCustom> */}
        <div className="add-student-content">
          <Form onSubmit={this.handleSubmit.bind(this)}>
            <FormItem
              {...formItemLayout}
              label="工号"
            >
              {getFieldDecorator('id')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="姓名"
            >
              {getFieldDecorator('name')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="用户名"
            >
              {getFieldDecorator('username')(
                <Input />
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="密码"
            >
              {getFieldDecorator('password')(
                <Input />
              )}
            </FormItem>
            <Row>
              <Col span={12} offset={4}>
                <Button type="primary" htmlType="submit" className="f-r">添加</Button>
              </Col>
            </Row>
          </Form>
        </div>
      </div>
    )
  }
}

export default Form.create()(AddTeacher)
