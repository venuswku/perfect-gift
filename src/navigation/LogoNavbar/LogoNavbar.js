import React from 'react';
import { NavLink } from 'react-router-dom';
import './LogoNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';

function LogoNavbar() {
    return (
        <div className="logoNavbar">
            <NavLink exact to="/"><PerfectGiftLogo className="logoNavbarLogo"/></NavLink>
        </div>
    );
}

export default LogoNavbar;