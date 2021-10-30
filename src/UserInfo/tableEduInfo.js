import './tableEduInfo.css';
import MyAux from '../MyAux/myAux';
import {NavLink} from 'react-router-dom';
import delete2 from './delete2.jpg';
import edit2 from './edit.png';
import React,{Component} from 'react';
import Modal from 'react-modal';

class TableEduInfo extends Component{
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
        this.props.history.push('/educationalDetails2')
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
        this.props.history.push('/educationalDetails2');
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
            let names=localUserInfo.map(
                (person=>(person.Reg1['firstname']+' '+person.Reg1['lastname']))
            )
        let info=localUserInfo.map(user =>
        (user.Reg2.map((education,i)=>
            
                (
                    <MyAux key={i}>
                            <tr>
                            <td>{(user.Reg2.indexOf(education)===0)?names[localUserInfo.indexOf(user)]:''}</td>
                            <td>{education.institute}</td>
                            <td>{education.course}</td>
                            <td>{education.percentage}</td>
                            <td>{education.startDate}</td>
                            <td>{education.endDate}</td>
                            <td >
                                <button className='Button' style={{width:'40%',padding:'0',borderRadius:'50%'}} onClick={(event)=>this.editRecord(event,localUserInfo.indexOf(user),user.Reg2.indexOf(education))} name='edit'><img src={edit2} style={{width:'100%',margin:'0',borderRadius:'50%'}} alt='edit button'></img></button>
                                <button className='Button' style={{width:'40%',padding:'0',borderRadius:'50%'}} onClick={(event)=>this.deleteRecord(event,localUserInfo.indexOf(user),user.Reg2.indexOf(education))} name='delete'><img src={delete2} style={{width:'100%',margin:'0',borderRadius:'50%'}} alt='delete button'></img></button>
                            </td>
                            </tr>

                    </MyAux>
                )
            
            )))
            
           
            return(
                <div>
                    <NavLink to='/EducationalDetails' className="switch-format">View card format</NavLink>
                    {mymodal}
                    <table className='eduTable' key={new Date()}>
                        <tr>
                        <th>Name</th><th>Institute</th><th>Course</th><th>Percentage</th><th>Start Date</th><th>End Date</th><th>Actions</th>
                        </tr>
                        {info}
                    </table>
                </div>
            );

    }
    

}
export default TableEduInfo;