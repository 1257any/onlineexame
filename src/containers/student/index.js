import React from 'react'
import { Menu, Icon, Button } from 'antd';
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

//actions
import * as subjectinfoActions from '../../actions/subjectinfo'
import * as classinfoActions from '../../actions/classinfo'

//路由组件
import { Route,Link,Switch  } from 'react-router-dom';

//头部条
import HeaderBar from '../main/header_bar'
//默认页面
import homepage from './homepage/index.js';
//个人中心
import onlineexam from './onlineexam/index.js';
//修改密码
import changepwd from './changepwd/index.js';

import httpServer from '@components/httpServer.js'
import * as URL from '@components/interfaceURL.js'

class Student extends React.Component {
	constructor(){
		super();
		this.state = {
			defaultOpenKeys : [],//菜单默认打开项
			defaultSelectedKeys : [],//菜单默认选择项
			openKeys: [],//菜单打开项
			roleSet : '',
		}
		this.rootSubmenuKeys = ['q_checkin', 'student_manage','teacher_manage','paper_manage','personal_center','class_manage'];
	}

	//根据路由判断 用户选择了菜单中的哪一项
	whoIsChecked(){
		if(this.props.location.pathname.indexOf('/student/onlineexame') != -1) {//试题录入
			this.setState({defaultOpenKeys : ['onlineexam']})
			this.setState({openKeys : ['onlineexam']})
			let arr = this.props.location.pathname.split('/');
			let str = arr[arr.length-2] + '_' + arr[arr.length-1];
			this.setState({defaultSelectedKeys : [str]})
		}
		else if(this.props.location.pathname.indexOf('/student/changepwd') != -1) {//个人中心  
			this.setState({defaultOpenKeys : ['changepwd']})
			this.setState({openKeys : ['changepwd']})
			let arr = this.props.location.pathname.split('/');
			let str = arr[arr.length-1];
			this.setState({defaultSelectedKeys : [str]})
		}
	}

	componentWillMount(){
		//判断用户是否已经登录
		if(!localStorage.getItem("userName")) {
			this.props.history.push('/login');//跳转至登录页
		}

		this.setState({roleSet : localStorage.getItem("roleSet")})

		//获取科目信息
		httpServer({
			method : 'get',
			url : URL.subject_info,
		},{
			className : 'SubjectInfoServiceImpl'
		})
		.then((res)=>{
			this.setState({subjectArr : res.data.data})
			//状态存储
			this.props.subjectinfoActions.setSubjectInfo({
				subjectArr: this.state.subjectArr
			})
		})

		//获取班级信息
		httpServer({
      method : 'get',
      url : URL.get_class_info
    },{
      className : 'ClassServiceImpl',
      type : 5
    })
    .then((res)=>{
			//状态存储
			this.props.classinfoActions.setClassInfo({
				classArr: res.data.data
			})
    })

		//菜单选择情况
		this.whoIsChecked();
	}

	//点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
  onOpenChange(openKeys) {
    const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);
    if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      this.setState({ openKeys });
    } else {
      this.setState({
        openKeys: latestOpenKey ? [latestOpenKey] : [],
      });
    }
  }

	render(){

		return(
			<div>
				<div id="leftMenu">
					{/* <img className="logo" src="/sxt_exam/lqw/images/logo.jpg"/> */}
					<img className="logo" src={require("@assets/images/logo.jpg")}/>
					<div>
		        <Menu
		          mode="inline"
							defaultOpenKeys={this.state.defaultOpenKeys}
							defaultSelectedKeys={this.state.defaultSelectedKeys}
							openKeys={this.state.openKeys}
        			onOpenChange={this.onOpenChange.bind(this)}
		        >
							<Menu.Item key="online-exam">
								<Link to="/student/onlineexam" >
			                    <Icon type="profile" />
			                    <span>在线考试</span>
								</Link>
		                   </Menu.Item>
							<SubMenu key="student_manage" title={<span><Icon type="usergroup-add" /><span>个人中心</span></span>}>
									<Menu.Item key="changepwd"><Link to="/student/changepwd">修改密码</Link></Menu.Item>
							</SubMenu>
		        </Menu>
		      </div>
				</div>
				<div id="rightWrap">
					<HeaderBar></HeaderBar>
					<div className="right-box">
						<Switch>
							 {/* 默认首页 */}
6
							 <Route path="/student/homepage" component={homepage}/>

              {/* 在线考试 */}
              <Route path="/student/onlineexam" component={onlineexam}/>
						
							{/* 个人中心 */}
							<Route path="/student/changepwd" component={changepwd}/>
                            

						</Switch>
               </div>
				</div>
			</div>
		)
	}
}

function mapStateToProps(state) {
    return {
        subjectinfo: state.subjectinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        subjectinfoActions: bindActionCreators(subjectinfoActions, dispatch),
				classinfoActions: bindActionCreators(classinfoActions, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Student)
