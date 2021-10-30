import React,{Component} from 'react';

class NewReg2 extends Component {

      state = { 
          values: [],
          validations:{
            institute:{
                required:true,
            },
            course:{
                required:true,
            },
            percentage:{
                required:true,
                regex: /^([0-9]){1,2}(\.[0-9]{1,2})?$/
            },
            startDate:{
                required:true,
            },
            endDate:{
                required:true,
            }
          },
          isFormValid: false,
          message:''
      };
  
    createUI=()=>{
        let style={color:'white',backgroundColor:'#ff2f3c',fontSize:'large',fontWeight:'bold',position:'relative',left:'500px'}
       return this.state.values.map((el, i) => 
           <div key={i}>
            <table>
                <tr>
                    <th>Institute:</th> 
                    <td><input type="text" name='institute' value={el.institute?el.institute.value:''} onChange={this.handleChange.bind(this, i)}  /></td>
                </tr>
                <tr>
                    <th>Course:</th> 
                    <td><input type="text" name='course' value={el.course?el.course.value:''} onChange={this.handleChange.bind(this, i)} /></td>
                </tr>
                <tr>
                    <th>Percentage/CGPA:</th> 
                    <td><input type="text" name='percentage' value={el.percentage?el.percentage.value:''} onChange={this.handleChange.bind(this, i)} /></td>
                </tr>
                <tr>
                    <th>Start Date:</th> 
                    <td><input type="date" name='startDate' value={el.startDate?el.startDate.value:''} onChange={this.handleChange.bind(this, i)} /></td>
                </tr>
                <tr>
                    <th>End Date:</th> 
                    <td><input type="date" name='endDate' value={el.endDate?el.endDate.value:''} onChange={this.handleChange.bind(this, i)} /></td>
                </tr>
                <tr>
                    <td><input type='button' style={style} value='remove' onClick={this.removeClick.bind(this, i)}/></td>
                </tr>
            </table>
           </div>          
       )
    }
    checkValidity=(rules,value)=>{
        let valid=true;
        if(rules.required){
            if (value==='')
            valid=valid && false;
        }
        if(rules.regex)
        {
            valid=rules.regex.test(value) && valid;
        }
        return valid;
    }
    handleChange=(i, event)=> {
        let values = [...this.state.values];
        let valueOb=values[i];
        valueOb[event.target.name]={
            value: event.target.value,
            touched:false,
            valid:false
        };
        
        let validations=this.state.validations;
        let validation=validations[event.target.name];
        valueOb[event.target.name].touched=true;
        valueOb[event.target.name].valid=this.checkValidity(validation,event.target.value);
        if(event.target.name==='endDate'){
            if(event.target.value && valueOb['startDate'].value)
            {
                if(event.target.value < valueOb['startDate'].value){
                    this.setState({message: 'End date should be greater than start date..'})
                    valueOb[event.target.name].valid=valueOb[event.target.name].valid && false;
                }
                else{
                    this.setState({message:''})
                }

            }
        }
        values[i] = valueOb;
        this.setState({ 'values':values });
        //form validity assigning
        let isFormValid = true
        for (let j in values) {
            for(let ele in values[j]){
                isFormValid=isFormValid && values[j][ele].valid;
            }
           
        }
        this.setState({'isFormValid':isFormValid});       
    }
    
    addClick=()=>{
      this.setState(prevState => ({ values: [...prevState.values,
                                    {institute:{
                                        value:'',
                                        touched:false,
                                        valid:false
                                    },
                                    course:{
                                        value: '',
                                        touched:false,
                                        valid:false
                                    },
                                    percentage:{
                                        value: '',
                                        touched:false,
                                        valid:false
                                    },
                                    startDate:{
                                        value:'',
                                        touched:false,
                                        valid:false
                                    },
                                    endDate:{
                                        value: '',
                                        touched:false,
                                        valid:false
                                    }
                                }]}))
    }
    
    removeClick=(i)=>{
       let values = [...this.state.values];
       values.splice(i,1);
       this.setState({ 'values':values });
    }
  
    handleSubmit=(event)=> {
      event.preventDefault();
      alert('Registered Successfully...');
            const Reg2=[];
            const values=this.state.values;
            for(let i in values)
            {
                Reg2[i]={};
                for(let ele in values[i])
                    Reg2[i][ele]=values[i][ele].value;
            }

            const Reg1 = JSON.parse(localStorage.getItem('Reg1'))
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
            this.props.history.push('/')
      
    }
  
    render() {
        let style={backgroundColor:'#2ea0ff',border:'1.5px solid #1e90ef',fontWeight:'bold',fontSize:'large'}
      return (
        <form onSubmit={this.handleSubmit}>
                
                {this.createUI()}
                <p style={{color:'red',fontSize:'large',fontWeight:'bold',margin:'0 auto'}}>{this.state.message}</p>
                <span style={{display:'flex', width:'70%',margin:'10px auto'}}>
                    <input style={style} type='button' value='Previous' onClick={()=>{this.props.history.push('/Register')}}/>
                    <input style={style} type='button' value='Add Education' onClick={this.addClick.bind(this)}/>
                    <input style={style} type="submit" value="Submit" disabled={!this.state.isFormValid} />
                </span>
                    
            
        </form>
      );
    }
  }
  export default NewReg2;