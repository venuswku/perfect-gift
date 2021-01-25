import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass.svg';

function HomeNavbar() {
    return (
        <div className="home-navbar">
            <Link exact to="/home"><PerfectGiftLogo className="home-navbar-logo" /></Link>
            <div className="links">
                <p><Link exact to="/home"><MagnifyGlass/> Find Gift</Link></p>
                <p><Link exact to="/profile">My Profile</Link></p>
                <p><Link exact to="/">Sign Out</Link></p>
            </div>
        </div>
    );
}

export default HomeNavbar;