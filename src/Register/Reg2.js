import React, { Component } from 'react';
import Input from '../Input/input';
import './Reg.css';
class Reg2 extends Component {

    state = {
        RegForm: {
            Institute: {
                label: 'Institute',
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

            course: {
                label: 'Course',
                elementType: 'Input',
                elementConfig: {
                    type: 'text',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            percentage: {
                label: 'Percentage/CGPA',
                elementType: 'Input',
                elementConfig: {
                    type: 'Text',
                },
                value: '',
                validation: {
                    required: true,
                    regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/
                },
                valid: false,
                touched: false
            },
            startDate: {
                label: 'Start Date',
                elementType: 'Input',
                elementConfig: {
                    type: 'Date',
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false
            },
            endDate: {
                label: 'End Date',
                elementType: 'Input',
                elementConfig: {
                    type: 'Date',
                },
                value: '',
                validation: {
                    required: true,
                    checkDate:true
                },
                valid: false,
                touched: false
            },
        },

        Reg2Data: [],
        isFormValid: false,
    }
	    checkValidity = (value, rules) => {
        let isValid = true;
    if(rules.checkDate){
            if(value && this.state.RegForm.startDate)
            {
                if(value < this.state.RegForm.startDate.value){
                    this.setState({message: 'End date should be greater than start date..'})
                }
                else{
                    this.setState({message:''})
                }

            }
        }
        return isValid
    }

    dataHandler = () => {

        //update Reg2, reset Regform for touched and other things, set state
        let formData = {}
        for (let formElement in this.state.RegForm) {
            formData[formElement] = this.state.RegForm[formElement].value;
        }
        const updatedRegForm = {
            ...this.state.RegForm
        }
        const updatedReg2Data = [
            ...this.state.Reg2Data
        ]
        //only need to update this because inputChangeHandler updates RegForm
        //also, in case of adding more education, push added education in object
        updatedReg2Data.push(formData)

        localStorage.setItem('Reg2', JSON.stringify(updatedReg2Data))

        //reset RegForm
        for (let inputId in updatedRegForm) {
            updatedRegForm[inputId].value = '';
            updatedRegForm[inputId].valid = false;
            updatedRegForm[inputId].touched = false;
        }
        this.setState({ RegForm: updatedRegForm, Reg2Data: updatedReg2Data, isFormValid: false })
    }

   registerUser = () => {
            this.dataHandler()
            alert('Registered Successfully...')
            const Reg1 = JSON.parse(localStorage.getItem('Reg1'))
            const Reg2 = JSON.parse(localStorage.getItem('Reg2'))
            var email = Reg1['email'];
            var password = Reg1['password'];

            //update users
            let localUser = JSON.parse(localStorage.getItem('users'));
            if (localUser) {
                localUser.push({ email: email, password: password });
                localStorage.setItem('users', JSON.stringify(localUser));
            } else {
                localStorage.setItem('users', JSON.stringify([{ email: email, password: password }]));
            }
            //update userInfo
            let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (localUserInfo) {
                localUserInfo.push({ Reg1: Reg1, Reg2: Reg2 });
                localStorage.setItem('userInfo', JSON.stringify(localUserInfo));
            } else {
                localStorage.setItem('userInfo', JSON.stringify([{ Reg1: Reg1, Reg2: Reg2 }]));
            }
            //clear temporary data
            localStorage.removeItem('Reg1')
            localStorage.removeItem('Reg2')
            this.props.history.push('/')
    }
    inputChangeHandler = (event, inputId) => {
        const updatedRegForm = {
            ...this.state.RegForm
        }
        const updatedFormElement = {
            ...updatedRegForm[inputId]
        }
            updatedFormElement.value = event.target.value;

        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updatedRegForm[inputId] = updatedFormElement

        let isFormValid = true
        for (let inputId in updatedRegForm) {
            isFormValid = updatedRegForm[inputId].valid && isFormValid
        }

        this.setState({ RegForm: updatedRegForm, isFormValid: isFormValid })
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
            <form id='Reg2'>
                <h1>Educational Information</h1>
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
                <button onClick={()=>{this.props.history.push('/Register')}}>Previous</button>
                <button disabled={!this.state.isFormValid} onClick={this.dataHandler}>Add More</button>
                <button disabled={!this.state.isFormValid} onClick={this.registerUser}>Register</button>
            </form>
        )

        return (
            <div className='Reg'>
                {form}

            </div>);
    }
}

export default Reg2;