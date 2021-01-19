import logo from './logo.svg';
import giveGift from './images/homepage_image.png';
import loginImage from './images/login_image.png';
import React from 'react';
import './App.css';

import { NavLink, Switch, Route, Link } from 'react-router-dom';

const App = () => (
  <div className='app'>
    <h1>React Router Demo</h1>
    <Main />
  </div>
);

// import { NavLink, Switch, Route } from 'react-router-dom'
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

function Mission() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="split right">
          <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
          <Link to="/about"><p className="row">About Us</p>{' '}</Link>
          <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
        </div>
      <h1>About Us</h1>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
      <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p> 
      </header>
    </div>
  );
}

function About() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="split right">
          <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
          <Link to="/about"><p className="row">About Us</p>{' '}</Link>
          <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
        </div>
      <h1>Contact Me</h1>
      <p>You can reach me via email: <strong>hello@example.com</strong></p>
      </header>
    </div>
  );
}

function Login() {
  return (
    <div className="App">
      <header className="App-header">
        <div class="split right">
          <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
          <Link to="/about"><p className="row">About Us</p>{' '}</Link>
          <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
        </div>
        <div class="split left">
            <img src={loginImage} alt="connect with others" className='giveGiftPic' />
        </div>
      <h1>Sign In</h1>
      <p>Get personalized gift suggestions and share your own gift wishlist!</p>
      </header>
    </div>
  );
}

const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/mission' component={Mission}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/login' component={Login}></Route>
  </Switch>
);

export default App;
