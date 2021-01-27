import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import Landing from "./pages/Landing/Landing"
import Home from "./pages/Home/Home";
import Sign_In from "./pages/Sign_In/Sign_In";
import Profile from "./pages/Profile/Profile";
import Create_Account from "./pages/Create_Account/Create_Account";

const App = () => (
  <div className="App">
    <Switch>
      <Route exact path='/' component={Landing}></Route>
      <Route exact path='/sign_in' component={Sign_In}></Route>
      <Route exact path='/create_account' component={Create_Account}></Route>
      <Route exact path='/profile' component={Profile}></Route>
      <Route exact path='/home' component={Home}></Route>
    </Switch>
  </div>
);

export default App;
