import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import Navbar from '../../navigation/LandingNavbar/LandingNavbar';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import giveGift from '../../images/landing_image.svg';

function Landing() {
    return (
        <div className="Landing">
            <Navbar/>
            <div class="first-impression">
                <div class="about">
                    <p className="catchphrase">Simple and Swift, choose<br /> <PerfectGiftLogo className="logo_homepage" />!</p>
                    <p className="description">Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</p>
                    <Link exact to="/sign_in"><button className='get-started'>Get Started!</button></Link>
                </div>
                <img className="giveGiftPic" src={giveGift} alt="give great gifts" />
            </div>
            {/* <div class="split right"> */}
                {/* dat pic */}
                {/* <div class="centered">
                    <img src={giveGift} alt="give a Gift" className='giveGiftPic' />
                </div>
            </div>
            <div> */}
                {/* description */}
                {/* <div class="split left">
                    <div class="centered">
                        <p className="blueText">Simple and Swift, choose<br /> <PerfectGiftLogo className="logo_homepage" />!</p>
                        <body>Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</body>
                        <Link exact to="/sign_in"><button className='bigButton'>Get Started!</button></Link>
                    </div>
                </div>
            </div> */}
        </div>
    );
}

export default Landing;