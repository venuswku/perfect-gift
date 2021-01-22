import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Login.css';
import loginImage from '../images/login_image.png';
import PerfectGiftLogo from '../images/website_logo.svg';


function Login() {
    return (
        <div className="App">
            <header className="App-header">
                {/* right half of the screen */}
                <div class="split right">
                    <p className="row"><Link to="/mission">Mission &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/about">About Us &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/login">Sign In &nbsp; &nbsp;</Link></p>
                    <div class="centered">
                        <div class="box">
                            <h2 class="blueText">Sign In</h2>
                            <h5>Get personalized gift suggestions and share your own gift wishlist!</h5>
                            
                            <form>
                                <label for='username' class='loginFont'>Username:</label> 
                                <input type='text' name='username'></input> <br></br>
                                <label for='password' class='loginFont'>Password:</label> <br></br>
                                <input type='text' name='password' class='loginTextbox'></input> <br></br> <br></br>
                                 <br></br>
                            </form>
                            <div class='split left'>new user?</div>
                            <div class='split right'><input type='submit' value='Submit'></input></div>
                        
                                
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