import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './changePassword.css';
import Input from '../Input/input'
class changePassword extends Component {
    state = {
        Form: {
            oldPassword: {
                label: 'Old Password',
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
            newPassword: {
                label: 'New Password',
                elementType: 'Input',
                elementConfig: {
                    type: 'password',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
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

        const oldPwd = this.state.Form['oldPassword'].value;
        const newPwd = this.state.Form['newPassword'].value;
        let users = JSON.parse(localStorage.getItem('users'));
        let userInfo=JSON.parse(localStorage.getItem('userInfo'));
        let activeuser=localStorage.getItem('activeuser');
        let index=-1;
        if (users) {
            for (let u = 0; u < users.length; u++) {
                    if(activeuser === users[u].email && oldPwd===users[u].password){
                        index=u;
                        break;
                    }
                }
        }
        if (index===-1) {
            this.setState({message:"wrong password.."});
            
        }
        else {
            if(newPwd)
            {
                if(newPwd!==oldPwd){
                    users[index].password=newPwd;
                    localStorage.setItem('users', JSON.stringify(users));
                    userInfo[index].Reg1.password=newPwd;
                    localStorage.setItem('userInfo', JSON.stringify(userInfo));

                    this.setState({message:null});
                    alert('Password changed successfully...');
                    this.props.history.push('/');
                }
                else{
                    this.setState({message:'New and old passwords can\'t be same..'})
                }
                
            }
        }
    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.regex) {
            isValid = rules.regex.test(value) && isValid;
        }
        return isValid;
    }

    inputChangeHandler = (event, inputId) => {
        const updatedForm = {
            ...this.state.Form
        }
        const updatedFormElement = {
            ...updatedForm[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedForm[inputId] = updatedFormElement

        let IsFormValid = true
        for (let inputId in updatedForm) {
            IsFormValid = updatedForm[inputId].valid && IsFormValid
        }

        this.setState({ Form: updatedForm, IsFormValid: IsFormValid,message:null });
        
    }

    render() {

        let formElements = [];
        for (let key in this.state.Form) {
            formElements.push({
                id: key,
                config: this.state.Form[key]
            })
        }

        let form = (
            <form>
                <h1 className='Login-title'>Change Password</h1>

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
                <p style={{color:'grey'}}>* Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number</p>
                <button className='Login-btn' onClick={this.dataHandler} disabled={!this.state.IsFormValid}>Confirm</button>
                <div style={{color:'red'}}>{this.state.message}</div>
                <div className='Login-links'>
                    <NavLink to='/'>cancel</NavLink>
                </div>
            </form>
        )

        return (
            <div className='Login-container'>
                {form}
            </div>);
    }
}

export default changePassword;