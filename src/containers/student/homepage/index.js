import React from 'react'
import { Card,Icon, Divider } from 'antd';
import { Link  } from 'react-router-dom';


export default class Homepage extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }
  render(){
    return(
        <div className="container">
                <h1>考试须知</h1>
                <div className = "content">
                    <p>一、考试为在线考试系统，有时间限制</p>
                    <p>二、考试期间不得离开考试页面，否则离开两次将自动交卷</p>
                    <p>一、考试请独立思考，不得与他人交谈</p>
                    <p>一、若还没开考，请耐心等待</p>
                </div>
        </div>
    )
  }
}
