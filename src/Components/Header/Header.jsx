import React from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";
import styles from "../../styles";

function Header() {

    const navigate = useNavigate();
    const username = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : 'Username';


    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };

    const location = useLocation().pathname;

    return (
        <header className='w-full px-8 py-3 flex items-center justify-between border-b border-[rgba(51,51,51,0.2)]'>
            <div className='header-left flex'>
                <Link to='/' className="font-bold text-xl">LAFARANDOLE</Link>
            </div>
            <div className='flex text-lg items-center'>
                {location !== '/sales-mode' && <NavLink to='/sales-mode' className={`${styles.redButton} text-base`}>Sales Mode</NavLink>}
                <p className="mx-4">{username}</p>
                <i className="fa-solid fa-arrow-right-from-bracket" onClick={logout}></i>
            </div>
        </header>
    )
}

export default Header;
