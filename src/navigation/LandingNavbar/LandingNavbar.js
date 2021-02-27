import React from 'react';
import { NavLink } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
    return (
        <div className="landingNavbar">
            {/* <p className="link">Mission</p>
            <p className="link">About Us</p> */}
            <NavLink to="/sign_in" className="link" activeClassName="activeLink">Sign In</NavLink>
        </div>
    );
}

export default LandingNavbar;