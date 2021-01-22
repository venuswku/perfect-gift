import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Login.css';
import loginImage from '../images/login_image.png';
import { ReactComponent as PerfectGiftLogo } from '../images/website_logo.svg';



function Login() {
    return (
        <div className="App">
            <header className="App-header">
                {/* right half of the screen */}
                <div class="split right">
                    {/* navigation bar */}
                    <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
                    <Link to="/about"><p className="row">About Us</p>{' '}</Link>
                    <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
                    {/* login box */}
                    <div class="centered">
                        <div class="box">
                            <h2 class="blueText">Sign In</h2>
                            <h5>Get personalized gift suggestions and share your own gift wishlist!</h5>
                            <form>
                                <label for='username'>Username:</label> <br></br>
                                <input type='text' name='username'></input> <br></br>
                                <label for='password'>Password:</label> <br></br>
                                <input type='text' name='password'></input> <br></br> <br></br>
                                <input type='submit' value='Submit'></input> <br></br> 
                            </form>
                        </div>
                        
                    </div>
                </div>
                {/* logo + login image */}
                <PerfectGiftLogo className="logo" />
                <div class="split left">
                    <div class="centered">
                        <img src={loginImage} alt="connect with others" className='loginPic' />
                    </div>
                </div>
                
            </header>
        </div>
    );
}

export default Login;