import React from 'react';
import { Link } from 'react-router-dom';
import './LogoNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';

function LogoNavbar() {
    return (
        <div className="logo-navbar">
            <Link exact to="/"><PerfectGiftLogo className="logo-navbar-logo" /></Link>
        </div>
    );
}

export default LogoNavbar;