import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./Header.css";

function Header({ openNavbar, setOpenNavbar }) {

    const navigate = useNavigate();
    const username = localStorage.getItem('username') ? JSON.parse(localStorage.getItem('username')) : 'Username';

    function toggleNavbar() {
        setOpenNavbar(!openNavbar);
    };

    function logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        navigate('/');
        window.location.reload();
    };

    const location = useLocation().pathname;

    return (
        <header className='header flex'>
            <div className='header-container flex-between'>
                <div className='header-left flex'>
                    <i className="fa-solid fa-bars icon-margin-right" onClick={toggleNavbar}></i>
                    <h2 className='header-logo'>LAFARANDOLE</h2>
                </div>
                <div className='username-logout-wrapper flex'>
                    {location !== '/price-mode' &&
                        <NavLink to='/price-mode' className='header-btn price-mode-link'>Price Mode</NavLink>
                    }
                    {location !== '/sales-mode' &&
                        <NavLink to='/sales-mode' className='header-btn sales-mode-link'>Sales Mode</NavLink>
                    }
                    <p className='username'>{username}</p>
                    <i className="fa-solid fa-arrow-right-from-bracket icon-margin-left" onClick={logout}></i>
                </div>
            </div>
        </header>
    )
}

export default Header;
