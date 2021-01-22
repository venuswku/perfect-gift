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
                    <p className="row"><Link to="/mission">Mission &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/about">About Us &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/login">Sign In &nbsp; &nbsp;</Link></p>

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
                            <p className="blueText">Simple and Swift, we're <br></br><strong>Perfect Gift</strong></p>
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