import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
    return (
        <div className="landing-navbar">
            <p><Link exact to="/mission">Mission</Link></p>
            <p><Link exact to="/about">About Us</Link></p>
            <p><Link exact to="/sign_in">Sign In</Link></p>
        </div>
    );
}

export default LandingNavbar;