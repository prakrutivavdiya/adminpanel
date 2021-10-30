import './personalInfo.css';
import {NavLink} from 'react-router-dom';
const PersonalInfo=()=>{
    let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    let table=localUserInfo.map(user => 
        (
            <table key={new Date()}>
                <tr>
                    <th>Name:</th>
                    <td>{user.Reg1.firstname+" "+user.Reg1.lastname}</td>
                </tr>
                <tr>
                    <th>Gender:</th>
                    <td>{user.Reg1.gender}</td>
                </tr>
                <tr>
                    <th>Email:</th>
                    <td>{user.Reg1.email}</td>
                </tr>
                <tr>
                    <th>Phone:</th>
                    <td>{user.Reg1.phone}</td>
                </tr>
            </table>
        ))
            return(
                <div>
                    <NavLink to='/personalDetails2' className="switch-format">View table format</NavLink>
                    {table}
                </div>
            )

}
export default PersonalInfo;