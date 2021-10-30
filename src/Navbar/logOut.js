import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';


const LogOut = (props) =>{
    return(
    	<span className='btn-grp'>
        	<NavLink to='/' onClick={props.logout} className='btn'>Log Out</NavLink>
        </span>
    )
}

export default LogOut;