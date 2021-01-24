import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Mission from "./pages/Mission";
import Profile from "./pages/Profile";

const App = () => (
  <div className='app'>
    <h1>React Router Demo</h1>
    <Main />
  </div>
);

//give each page a url
const Main = () => (
  <Switch>
    <Route exact path='/' component={Home}></Route>
    <Route exact path='/mission' component={Mission}></Route>
    <Route exact path='/about' component={About}></Route>
    <Route exact path='/login' component={Login}></Route>
    <Route exact path='/profile' component={Profile}></Route>
  </Switch>
);

export default App;
