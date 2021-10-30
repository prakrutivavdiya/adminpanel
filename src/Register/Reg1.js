import React, { Component } from 'react';
import Input from '../Input/input';
import './Reg.css';
class Reg1 extends Component {

    state = {
        RegForm: {
            firstname: {
                label: 'First Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            lastname: {
                label: 'Last Name',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            gender: {
                label: 'Gender',
                elementType: 'Select',
                elementConfig: {
                    options: [
                        { value: 'male', displayValue: 'Male' },
                        { value: 'female', displayValue: 'female' },
                        { value: 'other', displayValue: 'other' },
                    ]
                },
                value: 'male',
                validation: {
                    required: false
                },
                valid: true,
                touched: false
            },
            email: {
                label: 'Email',
                elementType: 'Input',
                elementConfig: {
                    type: 'Email',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([a-zA-Z0-9_.-]+)@([a-zA-Z0-9_.-]+)\.([a-zA-Z]){2,7}$/,
                    uniqueCheck:true
                    
                },
                valid: false,
                touched: false
            },
            phone: {
                label: 'Phone',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                defaultValue: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){7,12}$/
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
                    regex: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
                    strongPasswordCheck:true
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                label: 'Confirm password',
                elementType: 'Input',
                elementConfig: {
                    type: 'password',
                },
                value: '',
                validation: {
                    passwordCheck:true,
                    required: true
                },
                valid: false,
                touched: false
            },


        },
        IsFormValid: false
    }
   

    dataHandler = (event) => {
        event.preventDefault()
        const formData = {};
        for (let formElement in this.state.RegForm) {
            formData[formElement] = this.state.RegForm[formElement].value;
        }
        localStorage.setItem('Reg1', JSON.stringify(formData))
        this.props.history.push('/Register-step2');

    }

    checkValidity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.regex) {
            isValid = rules.regex.test(value) && isValid;
        }
        if(rules.strongPasswordCheck)
        {
            if(!isValid) 
                this.setState({message:'Password should contain minimum eight characters, at least one uppercase letter, one lowercase letter and one number'});
            else
                this.setState({message:''})
        }
        if(rules.passwordCheck)
        {   let confirmPassword=value;
            let password=this.state.RegForm['password'].value;
            if (confirmPassword.trim() === '' || password !== confirmPassword) {
                isValid=false;
            }
        }
        if(rules.uniqueCheck)
        {
            let users=JSON.parse(localStorage.getItem('users'));
            if (users) {
                for (let u = 0; u < users.length; u++) {
                    //is it stored in local storage
                    if (value === users[u].email) {
                        isValid=false;
                        this.setState({message:'A user exists with this email id..Try login or register with another email Id'});
                        break;
                    }
                    else{
                        this.setState({message:''});
                    }
                    
                }
            }
            
        }
        
        return isValid
    }

    inputChangeHandler = (event, inputId) => {
        const updatedReg1 = {
            ...this.state.RegForm
        }
        const updatedFormElement = {
            ...updatedReg1[inputId]
        }

        updatedFormElement.value = event.target.value;
        updatedReg1[inputId] = updatedFormElement
        updatedFormElement.touched = true;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        let IsFormValid = true
        for (let inputId in updatedReg1) {

            IsFormValid = updatedReg1[inputId].valid && IsFormValid
        }

        this.setState({ RegForm: updatedReg1, IsFormValid: IsFormValid })
    }
     //for previous functionality
    componentDidMount() {
        let oldReg1 = JSON.parse(localStorage.getItem('Reg1'))
        if (oldReg1) {

            const updatedReg1 = {
                ...this.state.RegForm
            }
            for (let inputId in updatedReg1) {
                updatedReg1[inputId].value = oldReg1[inputId]
                updatedReg1[inputId].touched = true
                updatedReg1[inputId].valid = true
            }

            this.setState({ RegForm: updatedReg1, IsFormValid: true })
        }
        else{
            document.getElementById('Reg1').reset()
        }
    }
    render() {

        let formElements = [];
        for (let key in this.state.RegForm) {
            formElements.push({
                id: key,
                config: this.state.RegForm[key]
            })
        }

        let form = (
            <form id='Reg1'>
                <h1>Personal Information</h1>
                <p style={{color:'red'}}>{this.state.message}</p>
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
                <button disabled={!this.state.IsFormValid} onClick={this.dataHandler}>Next</button>
            </form>
        )

        return (
            <div className='Reg'>
                {form}
            </div>);
    }
}

export default Reg1;