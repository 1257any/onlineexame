import React from 'react'

import {Row,Col,Input, Icon, Divider,Button,Card,Tag,InputNumber} from 'antd'

export default class ReadingCard extends React.Component {
  constructor(){
    super()
    this.state = {
      type : 0, //1 填空题  5 简答题 6 编程题
      index:0
    }
  }

  componentWillMount(){
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.questionList[0]) {
        this.setState({type : nextProps.questionList[0].question_type})
    }

  }

  //老师打分框框改变
  scoreChange(i,value){
    this.props.scoreChange(this.state.type,i,value);
  }

  render(){

    let questionList = [];
    this.props.questionList.forEach((item,i)=>{
      console.log("quetionlist"+this.props.questionList)
      questionList.push(
        <div className="question-single" key={i}>
          <Tag>第{i+1}题</Tag>
          <div className="content">
            {item.question}
          </div>
          <div className="content">
            <div className="bold">学生答案：</div>
            <div>{item.answer}</div>
          </div>
          <div className="clearfix">
            <span className="f-r">得分：<InputNumber min={0} size="small" style={{width:100}} onChange={this.scoreChange.bind(this,i)}/></span>
          </div>
          {i == this.props.questionList.length-1 ? "" : <Divider dashed="true"/>}
        </div>
      )
      // this.setState({index:this.state.index+1})
    })


    return(
      <Card title={this.props.title} bordered={false} style={{ width: '100%' }}>
        {questionList}
      </Card>
    )
  }
}
