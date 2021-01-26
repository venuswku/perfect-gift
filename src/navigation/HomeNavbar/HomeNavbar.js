import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass.svg';

function HomeNavbar() {
    return (
        <div className="home-navbar">
            <Link exact to="/home" className="home-navbar-logo"><PerfectGiftLogo/></Link>
            <div className="navigation-links">
                <Link exact to="/home" className="link"><MagnifyGlass/> Find Gift</Link>
                <Link exact to="/profile" className="link">My Profile</Link>
                <Link exact to="/" className="link">Sign Out</Link>
            </div>
        </div>
    );
}

export default HomeNavbar;