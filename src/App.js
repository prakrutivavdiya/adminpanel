import { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar/navbar';
import Login from './Login/login';
import Reg1 from './Register/Reg1';
import NewReg2 from './Register/NewReg2';
//import Reg2 from './Register/Reg2';
import PersonalInfo from './UserInfo/personalInfo';
import EduInfo from './UserInfo/eduInfo';
import TablePersonalInfo from './UserInfo/tablePersonalInfo';
import TableEduInfo from './UserInfo/tableEduInfo';
import ChangePassword from './ChangePassword/changePassword';
class App extends Component {
  state = {
    login : false
  }

  loginHandler = () =>{
    this.setState({login:true})
  }

  logoutHandler = () =>{
    localStorage.removeItem('activeuser')
    this.setState({login:false})
    alert('Successfully logged out..')
  }

  componentDidMount(){
    //set user and userInfo arrays if not there
    if(!localStorage.getItem('users')){
      localStorage.setItem('users','[]')
    }
    if(!localStorage.getItem('userInfo')){
      localStorage.setItem('userInfo','[]')
    }
  }
  
  render() {
    let message
      if(this.state.login === true){
        message = <h3>Logged in as {localStorage.getItem('activeuser')}</h3>
      }
      else{
        message = null
      }

    return (
      <BrowserRouter>
        <div>
          <Navbar login={this.state.login} logOut={this.logoutHandler} loginMessage={message}/>
          
          <Switch>
            <Route path='/Login' render={() => <Login login={this.loginHandler} />} />
            <Route path='/Register' component={Reg1} />
            <Route path='/Register-step2' component={NewReg2} />
            <Route path='/personalDetails' component={PersonalInfo}/>
            <Route path='/educationalDetails' component={EduInfo}/>
            <Route path='/educationalDetails2' component={TableEduInfo}/>
            <Route path='/personalDetails2' component={TablePersonalInfo}/>
            <Route path='/changePassword' component={ChangePassword}/>

          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
