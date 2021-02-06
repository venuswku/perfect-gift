import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Navbar from '../../navigation/LandingNavbar/LandingNavbar';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import giveGift from '../../images/landing_image.png';

function Landing() {
    return (
        <div className="Landing">
            <Navbar/>
            <div className="landingContent">
                <div className="about">
                    <p className="catchphrase">Simple and Swift, choose</p>
                    <div className="perfectGift"><PerfectGiftLogo className="logoHomepage" /><p className="exclamation">!</p></div>
                    <p className="description">Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</p>
                    <Link to="/sign_in"><button className='getStarted'>Get Started!</button></Link>
                </div>
                <img className="giveGiftPic" src={giveGift} alt="give great gifts" />
            </div>
        </div>
    );
}

export default Landing;