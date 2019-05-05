import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import { Form } from 'antd';
import {Row,Col,Select,Input,Table, Icon, Divider,Button,Modal,message} from 'antd'
const Option = Select.Option;
const Search = Input.Search;
const FormItem = Form.Item;
const confirm = Modal.confirm;

import httpServer from '@components/httpServer.js';
import { connect } from 'react-redux'
import * as URL from '@components/interfaceURL.js'

class QueryStudent extends React.Component {
  constructor(){
    super()
    this.state = {
      selectedRowKeys : [], //选择的行
      data : [],
      pagination : {
        pageSize : 10,
        current : 1,
        total : 0,
        defaultCurrent : 1,
      },
      visibleChangeModal : false,//修改框是否显示
      curSelectClass : {//当前所选的学生
        key : 0,
        name : "",
        class : "",
        studentId : 1,
      },
      classInfo : [],//班级信息
    }
    this.searchKey = "1";//默认按照班级搜索  1班级 2科目  3状态
    this.turnStatus = "NORMAL"; //NORMAL:正常翻页   SEARCH:搜索翻页
    this.searchContent = ""; //搜索内容
  }


  //得到搜索的数据
  getSearchData(){
    httpServer({
      url : URL.get_grade,
      method:'post'
    },{
      className : 'StudentExamInfoServiceImpl',
      user_id:localStorage.user_id,
      content : this.searchContent,
      searchType : this.searchKey,
      page : this.state.pagination.current,
      rows : this.state.pagination.pageSize,
    })
    .then((res)=>{
      const data = [];
      for (let i = 0; i < res.data.studentInfo.length; i++) {
        data.push({
          key: i,
          name: res.data.studentInfo[i].username,
          class : res.data.studentInfo[i].class_id,
          examName : res.data.studentInfo[i].paper_exam_id,
          studentId : res.data.studentInfo[i].student_id,
          score : res.data.studentInfo[i].grade,
        });
      }
      // this.state.pagination.total = res.data.total;

      this.setState({
        data:data,
        pagination : this.state.pagination
      })

    })
  }

  //翻页
  handleTableChange(pagination, filters, sorter){
    const pager = this.state.pagination;
    pager.current = pagination.current;
    pager.pageSize = pagination.pageSize;
    this.setState({
      pagination: pager,
    });
    this.getSearchData();
  }


  componentWillMount(){
    this.getSearchData();
  }
  //搜索类型选择
  handleChange(value) {
    this.searchKey = value;
    console.log('searchKey'+this.searchKey)
  }

  //点击搜索
  searchClass(value) {
    if(value == "") {
      Modal.error({
        content: "搜索内容不能为空！",
        okText : '确定'
      });
      return;
    }
    this.turnStatus = "SEARCH";//把翻页状态置为搜索
    this.state.pagination.current = 1;//当前页置为第一页
    this.setState({pagination : this.state.pagination});
    this.searchContent = value;
    console.log('serarchContent',this.searchContent)
    this.getSearchData();
  }

  //选择某一行
  onSelectChange(selectedRowKeys) {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render(){
    const { getFieldDecorator } = this.props.form;

    const columns = [{
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    }, {
      title: '科目',
      dataIndex: 'subject',
      key: 'subject',
    }, {
      title: '学年',
      dataIndex: 'year',
      key: 'year',
    },{
      title: '成绩',
      dataIndex: 'score',
      key: 'score',
    }];

    //行选择
    const rowSelection = {
      selectedRowKeys : this.state.selectedRowKeys,
      
      onChange: this.onSelectChange.bind(this),
    };

    let localeObj = {
      emptyText: '暂无数据'
    }
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

    //班级信息
    let classArr = [];
    if(this.props.classinfo.classArr) {
      classArr = this.props.classinfo.classArr.map((item)=>{
        return (
          <Option value={item.classId} key={item.classId}>{item.className}</Option>
        )
      })
    }

    return(
      <div>
        <BreadcrumbCustom pathList={['个人中心','查询成绩']}></BreadcrumbCustom>
        <div className="class-manage-content">
          <Row>
            <Col span={24}>
              <Search
                className="f-r"
                placeholder="请输入关键字"
                onSearch={this.searchClass.bind(this)}
                enterButton
                style={{ width: 200 }}
              />
              <Select className="f-r m-r-20" defaultValue="1" style={{ width: 120 }} onChange={this.handleChange.bind(this)}>
                <Option value="1">姓名</Option>
                <Option value="3">班级</Option>
                <Option value="2">学号</Option>
              </Select>
            </Col>
          </Row>
          <div className="m-t-20">
            <Table
              // rowSelection={rowSelection}
              columns={columns}
              dataSource={this.state.data}
              pagination={this.state.pagination}
              locale={localeObj}
              onChange={this.handleTableChange.bind(this)}
            />
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
    return {
        classinfo: state.classinfo
    }
}

export default connect(
    mapStateToProps
)(Form.create()(QueryStudent))
