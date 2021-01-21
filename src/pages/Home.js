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
                    <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
                    <Link to="/about"><p className="row">About Us</p>{' '}</Link>
                    <Link to="/login"><p className="row">Sign In</p>{' '}</Link>

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
                            <button type="button">Get Started!</button>
                        </div>
                    </div>
                </div>

                {/* everything below is from example */}
                {/* 
          <p>
            Edit <code>src/App.js</code> and save to reload. Test: Sean was here. Can updaet by re
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a> */}
                {/* end of example */}
            </header>

        </div>
    );
}

export default Home;