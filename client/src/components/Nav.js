import React from 'react'
import {NavLink} from 'react-router-dom'
import Login from '@material-ui/icons/Person';
import Register from '@material-ui/icons/PermIdentity';

export default function Nav() {
    return (
        <div className='nav-main'>
            <NavLink className="nav-item" activeClassName='nav-item-active' exact to='/'><Login/><p>Login</p></NavLink>
            <NavLink className="nav-item" activeClassName='nav-item-active' to='/register'><Register/><p>Register</p></NavLink>
        </div>
    )
}
