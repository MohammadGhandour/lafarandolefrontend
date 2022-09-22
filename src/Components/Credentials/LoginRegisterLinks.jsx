import React from 'react'
import { Link } from 'react-router-dom';

function LoginRegisterLinks({ active }) {
    return (
        <div className='credentials-links-wrapper'>
            <Link to='/'
                className={active === 'login' ? 'active-credential-link credential-link' : 'credential-link inactive-credential-link'}>
                Login
            </Link>
            <Link to='/register'
                className={active === 'register' ? 'active-credential-link credential-link' : 'credential-link inactive-credential-link'}>
                Register
            </Link>
        </div>
    )
}

export default LoginRegisterLinks;
