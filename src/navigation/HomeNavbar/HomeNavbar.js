import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass.svg';

function HomeNavbar() {
    return (
        <div className="home-navbar">
            <Link to="/home" className="home-navbar-logo"><PerfectGiftLogo/></Link>
            <div className="navigation-links">
                <Link to="/home" className="link"><MagnifyGlass/> Find Gift</Link>
                <Link to="/profile" className="link">My Profile</Link>
                <Link to="/" className="link">Sign Out</Link>
            </div>
        </div>
    );
}

export default HomeNavbar;