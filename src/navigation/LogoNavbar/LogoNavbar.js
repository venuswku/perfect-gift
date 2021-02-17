import React from 'react';
import { Link } from 'react-router-dom';
import './LogoNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';

function LogoNavbar() {
    return (
        <div className="logoNavbar">
            <Link to="/"><PerfectGiftLogo className="logoNavbarLogo" /></Link>
        </div>
    );
}

export default LogoNavbar;