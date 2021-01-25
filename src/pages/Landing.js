import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';
import '../App.css';
import Navbar from '../navigation/LandingNavbar/LandingNavbar';
import giveGift from '../images/homepage_image.png';
import { ReactComponent as PerfectGiftLogo } from '../images/website_logo.svg';

function Landing() {
    return (
        <div className="App">
            <Navbar/>
            <header className="App-header">
                <div class="split right">
                    {/* dat pic */}
                    <div class="centered">
                        <img src={giveGift} alt="give a Gift" className='giveGiftPic' />
                        {/* <img src="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" alt="Give a Gift"></img> */}
                        {/* <a href="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" target="_blank" rel="noreferrer">Logo - Gift Giving Icon Png @seekpng.com</a> */}
                    </div>
                </div>
                <div>
                    {/* for homepage? description */}
                    <div class="split left">
                        <div class="centered">
                            <p className="blueText">Simple and Swift, choose<br /> <PerfectGiftLogo className="logo_homepage" />!</p>
                            {/* <p className="blueText">Simple and Swift, we are</p>
              <strong className="blueText">Perfect Gift</strong> */}
                            <body>Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</body>
                            <Link to="/login"><button className='bigButton'>Get Started!</button></Link>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Landing;