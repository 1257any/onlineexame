
import React from 'react'

import { Radio, Row, Col, Input, Icon, Divider, Button, Card, Tag, InputNumber, Checkbox } from 'antd'
import RadioGroup from 'antd/lib/radio/group'
import BreadcrumbCustom from '@components/BreadcrumbCustom'
import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'
const CheckboxGroup = Checkbox.Group;
const { TextArea } = Input;
import './index.css'
// const RadioGroup = Radio.Group;

export default class creact_paper extends React.Component {
  constructor() {
    super()
    this.state = {
      allQuestion: [],
      questionTypeList: ['单选题', '多选题', '判断题', '填空题', '程序题'],
      currentQuestion: {},
      index: 0,//当前项的下标,
      radio_value: '',
      Checkbox_values: '',
      TF_values: '',
      fill_valuse: '',
      endTime: '2019-5-2 22:59:00',
      answer: [],
      hour: '',
      min: '',
      sec: '',
      paper_id: '',
      stu_id: ''
    }
  }


  //考试倒计时
  timer() {
    console.log('test')
    let tfunctjion = window.setInterval(() => {
      let timeLast = new Date(this.state.endTime).getTime() - new Date().getTime();
      // console.log("timeLast" + timeLast);
      // console.log('hour'+this.state.e)
      let hour = parseInt(timeLast / (1000 * 60 * 60));
      let min = parseInt((timeLast % (1000 * 60 * 60)) / (1000 * 60));
      let sec = parseInt(((timeLast % (1000 * 60 * 60)) % (1000 * 60)) / 1000);
      // console.log('hour'+hour);
      let Nhour = hour < 10 ? '0' + hour : hour;
      this.setState({ hour: Nhour });
      // console.log('sethour'+this.state.hour)
      let Nmin = min < 10 ? '0' + min : min;
      this.setState({ min: Nmin });
      // console.log('sethour'+this.state.min)
      let Nsec = sec < 10 ? '0' + sec : sec;
      this.setState({ sec: Nsec });
      if (this.state.hour == 0 && this.state.min == 0 && this.state.sec == 0) {
        window.clearInterval(tfunctjion);
        this.submitPaper();
      }
    }, 1000)
  }
  componentWillMount() {
    let username = localStorage.userName;
    httpServer({
      method: 'post',
      url: URL.get_question
    }, {
        username: username
      })
      .then((res) => {
        console.log("questionres" + JSON.stringify(res.data.allquestion[0]))
        this.setState({
          allQuestion: res.data.allquestion,
          currentQuestion: res.data.allquestion[0],
          endTime: res.data.endtime,
          paper_id: res.data.paper_exam_id,
          stu_id: res.data.stu_id
        })
        console.log('stest' + JSON.stringify(this.state.currentQuestion))
      })
    // this.state.currentQuestion = this.state.allQuestion[0];
    this.timer();
  }

  // 点击下一题
  clickNext() {
    // console.log('curindex' + this.state.index + 'total' + this.state.allQuestion.length);
    if (this.state.index < this.state.allQuestion.length - 1) {
      this.setState({ currentQuestion: this.state.allQuestion[this.state.index + 1] })
      this.setState({ index: this.state.index + 1 })
    }

  };
  //单选题
  OR_Change(e) {
    // console.log("OR_values" + JSON.stringify(e))
    // console.log("test");

    console.log('radio_value' + this.state.radio_value)
    let index = this.state.index;
    let answer_OR = {};
    answer_OR.answer = e.target.value;
    answer_OR.qusetion_id = this.state.allQuestion[index].id;
    answer_OR.content = this.state.allQuestion[index].question;
    answer_OR.question_type = this.state.allQuestion[index].question_type;
    answer_OR.paper_id = this.state.paper_id;
    answer_OR.stu_id = this.state.stu_id;
    console.log("answer_OR" + JSON.stringify(answer_OR))
    this.setState(
      {
        answer: [...this.state.answer, answer_OR],
        radio_value: e.target.value
      }, () => {
        console.log("answer" + JSON.stringify(this.state.answer));
        // console.log('加载完成')
      }
    )
    // console.log('answer'+JSON.stringify(this.state.answer))
  };
  //复选框
  MR_onChange(e) {
    let answer_OR = {};
    let choice_values = ['A', 'B', 'C', 'D', 'C'];
      answer_OR.answer = '';
    e.map((e_item, eindex) => {
      this.state.currentQuestion.choice.map((item, index) => {
        if (item == e_item) {
          answer_OR.answer = choice_values[index] + answer_OR.answer
        }
      })
    })

    let index = this.state.index;
    answer_OR.qusetion_id = this.state.allQuestion[index].id;
    answer_OR.content = this.state.allQuestion[index].question;
    answer_OR.question_type = this.state.allQuestion[index].question_type;
    answer_OR.paper_id = this.state.paper_id;
    answer_OR.stu_id = this.state.stu_id;
    this.setState(
      {
        answer: [...this.state.answer, answer_OR]
      }, () => {
        console.log("MR_values" + JSON.stringify(this.state.answer));
        // console.log('加载完成')
      }
    )

    // this.setState({ Checkbox_values: e })
  }
  //判断题
  TF_onChange(e) {
    console.log("TF_values" + JSON.stringify(e));
    let index = this.state.index;
    let answer_OR = {};
    answer_OR.answer = e.target.value;
    answer_OR.qusetion_id = this.state.allQuestion[index].id;
    answer_OR.content = this.state.allQuestion[index].question;
    answer_OR.question_type = this.state.allQuestion[index].question_type;
    answer_OR.paper_id = this.state.paper_id;
    answer_OR.stu_id = this.state.stu_id;
    this.setState(
      {
        answer: [...this.state.answer, answer_OR]
      }, () => {
        console.log("answer" + JSON.stringify(this.state.answer));
        // console.log('加载完成')
      }
    )
    this.setState({ TF_values: e.target.value })
  }
  //填空题
  Fill_onchange(e) {
    // console.log("fill_values"+JSON.stringify(e));
    let index = this.state.index;
    let answer_OR = {};
    answer_OR.answer = e.target.value;
    answer_OR.qusetion_id = this.state.allQuestion[index].id;
    answer_OR.content = this.state.allQuestion[index].question;
    answer_OR.question_type = this.state.allQuestion[index].question_type;
    answer_OR.paper_id = this.state.paper_id;
    answer_OR.stu_id = this.state.stu_id;
    this.setState(
      {
        answer: [...this.state.answer, answer_OR]
      }, () => {
        console.log("answer" + JSON.stringify(this.state.answer));
        // console.log('加载完成')
      }
    )
    this.setState({ fill_valuse: e.target.value })
  }
  //程序题
  Pro_change(e) {
    let index = this.state.index;
    let answer_OR = {};
    answer_OR.answer = e.target.value;
    answer_OR.qusetion_id = this.state.allQuestion[index].id;
    answer_OR.content = this.state.allQuestion[index].question;
    answer_OR.question_type = this.state.allQuestion[index].question_type;
    answer_OR.paper_id = this.state.paper_id;
    answer_OR.stu_id = this.state.stu_id;
    this.setState(
      {
        answer: [...this.state.answer, answer_OR]
      }, () => {
        console.log("answer" + JSON.stringify(this.state.answer));
        // console.log('加载完成')
      }
    )
    console.log("pro_values" + e.target.value)
  }
  //提交试卷
  submitPaper() {
    // console.log(("answer"+JSON.stringify(this.state.state)),
    httpServer({
      method: 'post',
      url: URL.paper_answer
    }, {
        answer: JSON.stringify(this.state.answer),
      })
      .then((res) => {
        this.setState({
          // allQuestion: res.data,
          // currentQuestion: res.data[0],
        })

      })
  }
  //获得单选框
  get_radio(radioData) {
    let radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    let RadioG = [];
    let radio_value = ['A', 'B', 'C', "D"]
    radioData.map((item, index) => {
      RadioG.push(<Radio key={radio_value[index]} style={radioStyle} value={radio_value[index]}>{item}</Radio>)
    })
    return RadioG;
  }

  get_question() {
    if (this.state.index <= this.state.allQuestion.length - 1) {
      let question = this.state.currentQuestion;
      // console.log('question'+JSON.stringify(question))
      switch (question.question_type) {
        //单选题
        case '0':
          return (<div>
            <div>{question.question}</div>
            <RadioGroup onChange={this.OR_Change.bind(this)} value={this.state.radio_value} >
              {this.get_radio(question.choice)}
            </RadioGroup>
          </div>)
          break;
        //多选题
        case '1':
          return (
            <div className='check'>
              <div>{question.question}</div>
              <CheckboxGroup options={question.choice} onChange={this.MR_onChange.bind(this)} />
            </div>
          )

          break;
        //判断题
        case '2':
          return (<div>
            <div>{question.question}</div>
            <RadioGroup onChange={this.TF_onChange.bind(this)} value={this.state.TF_values}>
              <Radio value={0}>正确</Radio>
              <Radio value={1}>错误</Radio>
            </RadioGroup>
          </div>);
          break;
        //填空题
        case '3':
          return (<div>
            <div>{question.question}</div>
            <Input placeholder='请输入正确答案' onBlur={this.Fill_onchange.bind(this)} />
          </div>);
          break;
        //程序题
        case '4':
          return (<div>
            <div>{question.question}</div>
            <TextArea onBlur={this.Pro_change.bind(this)} />
          </div>);
          break;
        default:
          return (
            <div>试卷已经做完，请交卷</div>);

      }
    } else {
      return (
        <div>试卷已经做完请提交，谢谢</div>
      )
    }
  }
  render() {
    let { index, questionTypeList, currentQuestion } = this.state
    return (
      <div>
        <div><Icon type="clock-circle" /><span>{this.state.hour}:{this.state.min}:{this.state.sec}</span><Button onClick={this.submitPaper.bind(this)} type="primary" className='submit_btn'>交卷</Button></div>
        <Card className='cardPart' title={`第${index + 1}题   (${questionTypeList[currentQuestion.question_type]})`} bordered={false} style={{ width: '100%' }}>
          {this.get_question()}
          <Button onClick={this.clickNext.bind(this)} type="primary" block className='next_btn'>下一题</Button>
        </Card>
      </div>

    )
  }
}

