import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './SignIn.css';
import loginImage from '../images/login_image.png';
import PerfectGiftLogo from '../images/website_logo.svg';


function Login() {
    return (
        <div className="App">
            <header className="App-header">
                {/* right half of the screen */}
                <div class="split right">
                    <div class="centered">
                        <div class="box">
                            <h2 class="blueText">Sign In</h2>
                            <h5>Get personalized gift suggestions and share your own gift wishlist!</h5>
                            
                                <form>
                                    <label for='username' class='loginFont'>Username:</label>
                                    <input type='text' name='username' class='loginTextbox'></input>
                                    <label for='password' class='loginFont'>Password:</label>
                                    <input type='text' name='password' class='loginTextbox'></input>
                                    <br/>
                                    <Link to="/create_account">New User? &emsp;</Link>
                                    <input type='submit' value='Submit'></input>
                                </form>




                        </div>

                    </div>
                </div>
                {/* logo + login image */}

                <div class="split left">
                    {/* <PerfectGiftLogo className="logo" /> */}
                    <Link to="/"><img src={PerfectGiftLogo} alt="Logo" /></Link>
                    <div class="centered">
                        <img src={loginImage} alt="connect with others" className='loginPic' />
                    </div>
                </div>

            </header>
        </div>
    );
}

export default Login;