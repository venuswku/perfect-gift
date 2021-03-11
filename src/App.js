import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from "./pages/Landing/Landing"
import Home from "./pages/Home/Home";
import Sign_In from "./pages/Sign_In/Sign_In";
import Profile from "./pages/Profile/Profile";
import Create_Account from "./pages/Create_Account/Create_Account";
import { ReactComponent as LogoSticker } from "./images/logo_sticker.svg";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/sign_in' component={Sign_In}></Route>
      <Route exact path='/create_account' component={Create_Account}></Route>
      <Route exact path='/profile' component={Profile}></Route>
      <Route exact path='/home' component={Home}></Route>
    </Switch>
    <div className="deviceMessage">
      <LogoSticker className="logoSticker"/><br/>
      Sorry, our current release of Perfect Gift is not compatible with tablets or mobile devices.<br/>
      Please use a laptop or desktop to access our website!
    </div>
  </div>
);

export default App;
