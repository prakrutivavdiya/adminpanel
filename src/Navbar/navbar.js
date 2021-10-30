import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import RegisterLogin from './registerLogin';
import LogOut from './logOut';
import logo from './logo.png';
import './navbar.css';

class Navbar extends Component {

    render() {
        
        let navButtons;
        let infoViewerButtons;
        let changePasswordLink;
        if(this.props.login === true){
            navButtons = <LogOut logout={this.props.logOut}/>
            infoViewerButtons=(
                <span className='btn-grp'>
                    <NavLink to='/personalDetails' className="btn">Personal Details</NavLink>
                    <NavLink to='/educationalDetails' className="btn">Educational Details</NavLink>
                </span>
            );
            changePasswordLink=<NavLink to='/changePassword' className="changePassword">Change Password</NavLink>
        }
        else{
            navButtons = <RegisterLogin/>
        }
        return (
            <nav className="navbar">
                <div>
                    <NavLink to='/'><img src={logo} className="nav-img" alt='logo'></img></NavLink>
                    <NavLink to='/' className="admin-link">Admin Panel</NavLink>
                    {navButtons}
                    <NavLink to='/' className='btn' style={{float:'right', marginTop:'11px'}}>Home</NavLink>
                    {infoViewerButtons}
                </div>
               <span>{changePasswordLink}</span>
               <span className="loggedInAs">{this.props.loginMessage}</span>
            </nav>
        )
    }
}

export default Navbar;