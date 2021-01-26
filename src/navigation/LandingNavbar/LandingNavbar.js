import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
    return (
        <div className="landing-navbar">
            <p className="scroll-links">Mission</p>
            <p className="scroll-links">About Us</p>
            <p><Link exact to="/sign_in">Sign In</Link></p>
        </div>
    );
}

export default LandingNavbar;