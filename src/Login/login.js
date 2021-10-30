import React, { Component } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import Input from '../Input/input';
import './login.css';
class Login extends Component {
    state = {
        loginForm: {
            emailid: {
                label: 'Email Id',
                elementType: 'Input',
                elementConfig: {
                    type: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/
                },
                valid: false,
                touched: false
            },
            password: {
                label: 'Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'password',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },


        },
        IsFormValid: false,
        message:null
    }
    

    dataHandler = (event) => {
        event.preventDefault()

        const email = this.state.loginForm['emailid'].value;
        const password = this.state.loginForm['password'].value;
        let bothValid = false;
        let notRegistered=true;
        let wrongPassword=false;
        let userdata = JSON.parse(localStorage.getItem('users'));
        if (userdata) {
            for (let u = 0; u < userdata.length; u++) {
                //is it stored in local storage
                if (email === userdata[u].email) {
                    notRegistered=false;
                    if(password === userdata[u].password){
                        bothValid=true;
                        break;
                    }
                    else{
                        wrongPassword=true;
                        break;
                    }

                }
                 
            }
        }
        if (bothValid) {
            this.props.login()
            localStorage.setItem('activeuser',email);
            this.setState({message:null});
            alert('Successfully Logged In...');
            this.props.history.push('/');
        }
        else {
            if(notRegistered){
                this.setState({message:"EmailId not registered.."});

            }
            if(wrongPassword){
                this.setState({message:"wrong password.."});
            }
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
            if (rules.regex) {
                isValid = rules.regex.test(value) && isValid;
            }
        }
        return isValid;
    }

    inputChangeHandler = (event, inputId) => {
        const updatedLoginForm = {
            ...this.state.loginForm
        }
        const updatedFormElement = {
            ...updatedLoginForm[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedLoginForm[inputId] = updatedFormElement

        let IsFormValid = true
        for (let inputId in updatedLoginForm) {
            IsFormValid = updatedLoginForm[inputId].valid && IsFormValid
        }

        this.setState({ loginForm: updatedLoginForm, IsFormValid: IsFormValid,message:null });
        
    }

    render() {

        let formElements = [];
        for (let key in this.state.loginForm) {
            formElements.push({
                id: key,
                config: this.state.loginForm[key]
            })
        }

        let form = (
            <form>
                <h1 className='Login-title'>Log In</h1>

                {
                    formElements.map(element => (
                        <Input
                            key={element.id}
                            elementType={element.config.elementType}
                            label={element.config.label}
                            elementConfig={element.config.elementConfig}
                            value={element.config.value}
                            invalid={!element.config.valid}
                            touched={element.config.touched}
                            changed={(event) => this.inputChangeHandler(event, element.id)} />
                    ))
                }
                <button className='Login-btn' onClick={this.dataHandler} disabled={!this.state.IsFormValid}>Login</button>
                <div style={{color:'red'}}>{this.state.message}</div>
                <div className='Login-links'>
                    <NavLink to='/'>Forgot password</NavLink>
                    <NavLink to='/Register'>Register</NavLink>
                </div>
            </form>
        )

        return (
            <div className='Login-container'>
                {form}
            </div>);
    }
}

export default withRouter(Login);