import React from 'react';
import { Link } from 'react-router-dom';
import './LandingNavbar.css';

function LandingNavbar() {
    return (
        <div className="landing-navbar">
            <p className="link">Mission</p>
            <p className="link">About Us</p>
            <Link exact to="/sign_in" className="link">Sign In</Link>
        </div>
    );
}

export default LandingNavbar;