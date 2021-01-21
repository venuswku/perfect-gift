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
                    <div class="centered">
                        {/* <h1>Sign In</h1>
                        <p>Get personalized gift suggestions and share your own gift wishlist!</p> */}
                        <form>
                            <label for='username'>Username:</label> <br></br>
                            <input type='text' name='username'></input> <br></br>
                            <label for='password'>Password:</label> <br></br>
                            <input type='text' name='password'></input> <br></br> <br></br>
                            <input type='submit' value='Submit'></input> <br></br> 
                        </form>
                    </div>
                    
                </div>
                <div class="split left">
                    <img src={loginImage} alt="connect with others" className='giveGiftPic' />
                </div>
                
            </header>
        </div>
    );
}

export default Login;