import React from 'react'
import BreadcrumbCustom from '@components/BreadcrumbCustom'

import {Row,Col,Select,Input,Table, Icon, Divider,Button,Card,Tag,Modal} from 'antd'
const Option = Select.Option;
const Search = Input.Search;

import {Link} from 'react-router-dom'
import {withRouter} from "react-router-dom";

import ReadingCard from './subpage/reading_card'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class ReadingPaper extends React.Component {
  constructor(){
    super()
    this.state = {
      fillInList : [],
      shortAnswerList : [],
      programList : [],
      auto_score:''
    }
    this.gapscorelist = [];
    this.shoscorelist = [];
    this.proscorelist = [];
    this.totalScore = 0;
  }

  getStuAnswer(stuId){
    httpServer({
      method:'post',
      url : URL.get_stu_answer
    },{
      className : 'GetQuestionStuAnswerImpl',
      stuId : stuId,
    })
    .then((res)=>{
      let respDate = res.data.data;
      let fillInList =[];
      let shortAnswerList=[];
      let programList=[];
      for(let i=0;i<respDate.length;i++) {
        if(respDate[i].question_type == '2') { //填空题
          fillInList.push(respDate[i]);
        }
        else if(respDate[i].question_type == '3') { //简答题
          shortAnswerList.push(respDate[i]);
        }
        else if(respDate[i].question_type == '4') {//编程题
          programList.push(respDate[i]);
        }
      }
      this.gapscorelist.length = fillInList.length;
      this.shoscorelist.length = shortAnswerList.length;
      this.proscorelist.length = programList.length;
      this.setState({
        fillInList : fillInList,
        shortAnswerList : shortAnswerList,
        programList : programList,
      })
    })
  }

  //老师打分框框改变
  scoreChange(type,i,value){
    console.log('type'+type)
    if(type == '2') { //填空题
      this.gapscorelist[i] = value;
    }
    else if(type == '3') { //简答题
      this.shoscorelist[i] = value;
    }
    else if(type == '4') {//编程题
      this.proscorelist[i] = value;
    }
  }

  //提交
  submitScore(){

    //总分
    let totalScore = 0;
    let flag = false;
    console.log('gapscoreList'+this.gapscorelist)
    for(let i = 0;i<this.gapscorelist.length;i++) {
      if(typeof this.gapscorelist[i] == "undefined") {
        flag = true;
        this.gapscorelist[i] = 0;
      }
      totalScore += parseInt(this.gapscorelist[i]);
    }

    for(let i = 0;i<this.shoscorelist.length;i++) {
      if(typeof this.shoscorelist[i] == "undefined") {
        flag = true;
        this.shoscorelist[i] = 0;
      }
      totalScore += parseInt(this.shoscorelist[i]);
    }

    for(let i = 0;i<this.proscorelist.length;i++) {
      if(typeof this.proscorelist[i] == "undefined") {
        flag = true;
        this.proscorelist[i] = 0;
      }
      totalScore += parseInt(this.proscorelist[i]);
    }

    // if(flag) {
    //   Modal.warning({
    //     title: '您有题目还没有评分，请评分后再提交',
    //     okText : '确定'
    //   });
    //   return;
    // }
    console.log('auto_score'+typeof this.state.auto_score)
    httpServer({
      method:'post',
      url : URL.submit_score
    },{
      username:localStorage.userName,
      classId : this.props.match.params.classId,
      stuId :this.props.match.params.stuId,
      gapscorelist : this.gapscorelist,
      shoscorelist : this.shoscorelist,
      proscorelist : this.proscorelist,
      totalScore : totalScore+parseInt(this.state.auto_score),
      updateType : 2,
    })
    .then((res)=>{
      this.props.history.push(`/main/paper_manage/scoring/all_papers/${this.props.match.params.paperId}/${this.props.match.params.classId}/${this.props.match.params.instId}`);
    })

  }

  componentWillMount(){
    // this.props.match.params.paperId}/${this.props.match.params.classId}
    console.log('instId'+this.props.match.params.stuId)
    this.getStuAnswer(this.props.match.params.stuId);
    httpServer({
      method:'post',
      url : URL.auto_read
    },{
      stuId:this.props.match.params.stuId
    }) .then((res)=>{
        console.log('reshrerh'+JSON.stringify(res))
        let auto_score = parseInt(res.data.auto_score)
        console.log('auto_score'+auto_score)
        this.setState({auto_score,auto_score})
    })
  }

  render(){
    return(
      <div>
        <BreadcrumbCustom pathList={['试卷管理','在线阅卷','所有试卷','正在阅卷']}></BreadcrumbCustom>
        <div className="reading-paper-content">
          <Row>
            <Button type="primary" className="f-r m-b-20"><Link to={`/main/paper_manage/scoring/all_papers/${this.props.match.params.paperId}/${this.props.match.params.classId}`}><Icon type="left" />返回</Link></Button>
          </Row>
          <div className="paper">
            <div className="m-b-20">
              <ReadingCard title="填空题" scoreChange={this.scoreChange.bind(this)} questionList={this.state.fillInList}></ReadingCard>
            </div>
            <div className="m-b-20">
              <ReadingCard title="简答题" scoreChange={this.scoreChange.bind(this)} questionList={this.state.shortAnswerList}></ReadingCard>
            </div>
            <ReadingCard title="程序题" scoreChange={this.scoreChange.bind(this)} questionList={this.state.programList}></ReadingCard>
            <div className="m-t-20 clearfix">
              <Button type="primary" className="f-r" onClick={this.submitScore.bind(this)}>提交</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ReadingPaper);
