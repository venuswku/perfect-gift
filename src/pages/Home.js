import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import giveGift from '../images/homepage_image.png';
import { ReactComponent as PerfectGiftLogo } from '../images/website_logo.svg';


function Home() {
    return (
        <div className="App">
            <header className="App-header">
                {/* for the top buttons */}
                <div class="split right">
                    <Link to="/mission"><p className="row">Mission &nbsp; &nbsp;</p></Link>
                    <Link to="/about"><p className="row">About Us &nbsp; &nbsp;</p></Link>
                    <Link to="/login"><p className="row">Sign In &nbsp; &nbsp;</p></Link>

                    {/* dat pic */}
                    <div class="centered">
                        <img src={giveGift} alt="give a Gift" className='giveGiftPic' />
                        {/* <img src="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" alt="Give a Gift"></img> */}
                        {/* <a href="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" target="_blank" rel="noreferrer">Logo - Gift Giving Icon Png @seekpng.com</a> */}
                    </div>
                </div>
                <PerfectGiftLogo className="logo" />
                <div>
                    {/* for homepage? description */}
                    <div class="split left">
                        <div class="centered">
                            <p className="blueText">Simple and Swift, we are <br></br><strong>Perfect Gift</strong></p>
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



export default Home;