import giveGift from './homepage_image.JPG';
import React from 'react';
import './App.css';
// import { NavLink, Switch, Route } from 'react-router-dom'
function App() {
  return (
    <div className="App">
      <header className="App-header">

        <div>
          {/* for homepage? description */}
          <div class="split left">
            <div class="centered">
              <p className="blueText">Simple and Swift, we are <strong>Perfect Gift</strong></p>
              {/* <p className="blueText">Simple and Swift, we are</p>
              <strong className="blueText">Perfect Gift</strong> */}
              <body>Surprise your family, friends, and loved ones with ideal gifts from their wishlist.</body>
              <button type="button">Get Started!</button>
            </div>
          </div>

          {/* give a gift pic on the right */} 
          <div class="split right">
            <div class="centered">
              <img src={giveGift} alt="give a Gift" className="giveGiftPic"/>
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
