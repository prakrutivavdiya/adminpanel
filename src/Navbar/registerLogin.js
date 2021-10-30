import React from 'react';
import { NavLink } from 'react-router-dom';
import './navbar.css';

const RegisterLogin = () =>{
    return(
        <span className='btn-grp'>
            <NavLink to='/Login' className='btn'>Login</NavLink>
            <NavLink to='/Register'className='btn'>Register</NavLink>
        </span>
    )
}

export default RegisterLogin;