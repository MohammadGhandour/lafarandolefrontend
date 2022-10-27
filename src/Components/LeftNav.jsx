import React, { useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import "./LeftNav.css";
import useWindowDimensions from '../Hooks/useWindowDimensions';

function LeftNav({ openNavbar, setOpenNavbar }) {

    const { width } = useWindowDimensions();
    const backdropRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (width > 992) {
            setOpenNavbar(false);
        }
    }, [width, setOpenNavbar]);

    function outsideClickCloseNav(e) {
        if (backdropRef.current === e.target) {
            setOpenNavbar(false);
        }
    };

    useEffect(() => {
        setOpenNavbar(false);
    }, [location, setOpenNavbar])

    return (
        <div className={openNavbar ? 'backdrop' : ''} ref={backdropRef} onClick={outsideClickCloseNav}>
            <nav className={openNavbar && width < 992 ? 'mobile-nav' : ''}>
                <ul className='flex-column-start'>
                    <i className="fa-solid fa-arrow-left nav-link" onClick={() => navigate(-1)}></i>
                    <NavLink to='/statistics' className='nav-link'>
                        <i className="fa-solid fa-gauge icon-margin-right"></i>Dashboard
                    </NavLink>
                    <NavLink to='/' className='nav-link'>
                        <i className="fa-solid fa-shirt icon-margin-right"></i>Products
                    </NavLink>
                    <NavLink to='/all-sales' className='nav-link'>
                        <i className="fa-solid fa-money-bill-wave icon-margin-right"></i>Sales
                    </NavLink>
                    <NavLink to='/expenses' className='nav-link mobile-link'>
                        <i className="fa-solid fa-coins icon-margin-right"></i>Expenses
                    </NavLink>
                    <NavLink to='/all-customers' className='nav-link'>
                        <i className="fa-solid fa-users icon-margin-right"></i>Customers
                    </NavLink>
                    <NavLink to='/all-users' className='nav-link'>
                        <i className="fa-solid fa-unlock icon-margin-right"></i>Users
                    </NavLink>
                    <NavLink to='/price-mode' className='nav-link mobile-link'>
                        <i className="fa-solid fa-barcode icon-margin-right"></i>Price Mode
                    </NavLink>
                    <NavLink to='/sales-mode' className='nav-link mobile-link'>
                        <i className="fa-solid fa-cash-register icon-margin-right"></i>Sales Mode
                    </NavLink>
                </ul>
            </nav>
        </div>
    )
}

export default LeftNav