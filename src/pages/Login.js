import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import loginImage from '../images/login_image.png';



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

export default Login;