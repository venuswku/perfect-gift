import giveGift from './homepage_image.JPG';
import React from 'react';
import './App.css';

import { NavLink, Switch, Route } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <h1>React Router Demo</h1>
    <Navigation />
    <Main />
  </div>
);


// import { NavLink, Switch, Route } from 'react-router-dom'
function Home() {
  return (
    <div className="App">
      <header className="App-header">
        {/* for the top buttons */}
        <div>
          <div class="split right">
            <p>Mission</p>
            <p>About Us</p>
            <p>Sign In</p>
          </div>
        </div>

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

function About() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>About Me</h1>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p> 
      </header>
    </div>
  );
}


function Contact() {
  return (
    <div className="App">
      <header className="App-header">
      <h1>Contact Me</h1>
      <p>You can reach me via email: <strong>hello@example.com</strong></p>
      </header>
    </div>
  );
}

const Navigation = () => (
  <nav>
    <ul>
      <li><NavLink to='/'>Home</NavLink></li>
      <li><NavLink to='/about'>About</NavLink></li>
      <li><NavLink to='/contact'>Contact</NavLink></li>
    </ul>
  </nav>
);

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/contact' component={Contact}></Route>
  </Switch>
);

export default App;
