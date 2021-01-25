import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from "./pages/Landing"
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Mission from "./pages/Mission";
import Profile from "./pages/Profile";
import Create_Account from "./pages/Create_Account";

const App = () => (
  <div className='app'>
    <Switch>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/mission' component={Mission}></Route>
      <Route exact path='/about' component={About}></Route>
      <Route exact path='/login' component={Login}></Route>
      <Route exact path='/home' component={Home}></Route>
      <Route exact path='/profile' component={Profile}></Route>
      <Route exact path='/create_account' component={Create_Account}></Route>
    </Switch>
  </div>
);

export default App;
