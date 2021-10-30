import './eduInfo.css';
import MyAux from '../MyAux/myAux';
import {NavLink} from 'react-router-dom';
import Modal from 'react-modal';
import React,{Component} from 'react';
class EduInfo extends Component{
    state={
        showModal:false
    }

    editRecord=(event,userIndex,eduIndex)=>{
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        let user=localUserInfo[userIndex];
        let edu=user.Reg2[eduIndex];
        this.setState({edu});
        this.setState({ showModal: true,userIndex:userIndex,eduIndex:eduIndex });
        
    }
    deleteRecord=(event,userIndex,eduIndex)=>{
        let isConfirm=window.confirm('Delete this eduction record?');
        if(isConfirm)
        {
        let values = JSON.parse(localStorage.getItem('userInfo'));
        let user=values[userIndex];

        user.Reg2.splice(eduIndex,1);
        values[userIndex]=user;
        localStorage.setItem('userInfo', JSON.stringify(values))
        this.props.history.push('/educationalDetails')
         }
    }
    submitChanges=()=>{
        let values = JSON.parse(localStorage.getItem('userInfo'));
        let user=values[this.state.userIndex];
        user.Reg2[this.state.eduIndex]=this.state.edu;
        values[this.state.userIndex]=user;
        localStorage.setItem('userInfo',JSON.stringify(values));
        this.setState({showModal:false})
        alert('successfully changed..');
        this.props.history.push('/educationalDetails');
        }
    handleModalChange=(event)=>{
        let edu=this.state.edu;
        edu[event.target.name]=event.target.value;
        this.setState({edu:edu})
        
    }
    render(){
        let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
        let mymodal=(
            <Modal 
                        isOpen={this.state.showModal}
                        contentLabel="Modal"
                    >
                        <form onSubmit={this.submitChanges} >
                        <table style={{width:'90%',border:'none',boxShadow:'none'}}>
                            <tr>
                                <th>Institute:</th> 
                                <td><input type="text" name='institute' value={this.state.edu?this.state.edu.institute:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                            </tr>
                            <tr>
                                <th>Course:</th> 
                                <td><input type="text" name='course' value={this.state.edu?this.state.edu.course:''} onChange={(event)=>this.handleModalChange(event)} required/></td>
                            </tr>
                            <tr>
                                <th>Percentage/CGPA:</th> 
                                <td><input type="text" name='percentage' value={this.state.edu?this.state.edu.percentage:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                            </tr>
                            <tr>
                                <th>Start Date:</th> 
                                <td><input type="date" name='startDate' value={this.state.edu?this.state.edu.startDate:''} onChange={(event)=>this.handleModalChange(event)} required/></td>
                            </tr>
                            <tr>
                                <th>End Date:</th> 
                                <td><input type="date" name='endDate' value={this.state.edu?this.state.edu.endDate:''} onChange={(event)=>this.handleModalChange(event)} required /></td>
                            </tr>
                            <tr>
                                <td></td>
                                <td>
                                <button type="submit">submit</button>
                                </td>
                            </tr>
                        </table>
                        
                        </form>
                        
                    </Modal>

        );

    //table binds each education info separately
    let table=localUserInfo.map(user =>
        (user.Reg2.map((education,i)=>
            (
                <MyAux key={i}>
                    <tr><td colSpan='2'><hr/></td></tr>
                    <tr>
                        <th>Institute:</th>
                        <td>{education.institute}</td>
                    </tr>
                    <tr>
                        <th>Course:</th>
                        <td>{education.course}</td>
                    </tr>
                    <tr>
                        <th>Percentage:</th>
                        <td>{education.percentage}</td>
                    </tr>
                    <tr>
                        <th>Start Date:</th>
                        <td>{education.startDate}</td>
                    </tr>
                    <tr>
                        <th>End Date:</th>
                        <td>{education.endDate}</td>
                    </tr>
                    <tr>
                        <td style={{position:'relative',left:'400px', display:'flex'}}>
                            <button className='greenButton' onClick={(event)=>this.editRecord(event,localUserInfo.indexOf(user),user.Reg2.indexOf(education))} name='edit'>Edit</button>
                            <button className='redButton'onClick={(event)=>this.deleteRecord(event,localUserInfo.indexOf(user),user.Reg2.indexOf(education))} name='delete'>Delete</button>
                        </td>
                    </tr>
                    
                    </MyAux>
            ))))
            //Info brings info of same person together in one table
            let personalInfo=JSON.parse(localStorage.getItem('userInfo'));
           let Info=table.map(
               //bring name from same index as person from Reg1
                person=>(
                    <table>
                    <tr>
                        <th>Name:</th>
                        <td>{personalInfo[table.indexOf(person)].Reg1['firstname']+' '+personalInfo[table.indexOf(person)].Reg1['lastname']}</td>
                    </tr>
                        {person}
                        {mymodal}
                    </table>
                )
            )
            return(
                <div>
                    <NavLink to='/EducationalDetails2' className="switch-format">View table format</NavLink>
                    {mymodal}
                    {Info}
                </div>
            );

    }
    
}
export default EduInfo;