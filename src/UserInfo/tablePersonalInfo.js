import MyAux from '../MyAux/myAux';
import {NavLink} from 'react-router-dom';
import './tablePersonalInfo.css';
const TablePersonalInfo=()=>{
    let localUserInfo = JSON.parse(localStorage.getItem('userInfo'));
    let table=localUserInfo.map((user,i) => 
        (
            <MyAux key={i}>
                <tr> 
                    <td>{user.Reg1.firstname+" "+user.Reg1.lastname}</td>                
                    <td>{user.Reg1.gender}</td>
                    <td>{user.Reg1.email}</td>                  
                    <td>{user.Reg1.phone}</td>
                </tr>
                </MyAux>
        ))
            return(
                <div>
                    <NavLink to='/personalDetails' className="switch-format">View card format</NavLink>
                    <table className='personalTable'>
                        <tr>
                            <th>Name</th><th>Gender</th><th>Email</th><th>Phone</th>
                        </tr>
                    {table}
                    </table>
                </div>
            )

}
export default TablePersonalInfo;