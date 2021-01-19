import logo from './logo.svg';
import giveGift from './homepage_image.JPG';
import React from 'react';
import './App.css';
// import { NavLink, Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* for the top buttons */}
        <div>
          <div class="split right">
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn More
            </a>
            <p>About Us</p>
            <p>Sign In</p>
          </div>
        </div>

        <div>
          {/* for homepage? description */}
          <div class="split left">
            <div class="centered">
              <p className="blueText">Simple and Swift, we are</p>
              <strong className="blueText">Perfect Gift</strong>
              <body>Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</body>
              <button type="button">Get Started!</button>
            </div>
          </div>
          {/* dat pic */} 
          <div class="split right">
            <div class="centered">
              <img src={logo} className="App-logo" alt="logo" />
              <img src={giveGift} alt="give a Gift" />
              {/* <img src="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" alt="Give a Gift"></img> */}
              {/* <a href="https://www.seekpng.com/ipng/u2t4i1o0w7u2u2q8_logo-gift-giving-icon-png/" target="_blank" rel="noreferrer">Logo - Gift Giving Icon Png @seekpng.com</a> */}
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


export default App;
