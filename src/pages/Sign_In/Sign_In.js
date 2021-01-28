import React from 'react';
import { Link } from 'react-router-dom';
import './Sign_In.css';
import Navbar from '../../navigation/LogoNavbar/LogoNavbar';
import SignInImage from '../../images/sign_in_image.png';

function Sign_In() {
    return (
        <div className="SignIn">
            <Navbar/>
            <div class="signInContent">
                <img src={SignInImage} className="signInPic" alt="connect with others" />
                <div class="signInForm">
                    <p class="signInTitle">Sign In</p>
                    <p class="signInBenefits">Get personalized gift suggestions and share your own gift wishlist!</p>
                    <form>
                        <div className="signInField">
                            <label for='username' class='signInLabel'>Username</label>
                            <input type='text' name='username' class='signInTextbox'></input>
                        </div>
                        <div className="signInField">
                            <label for='password' class='signInLabel'>Password</label>
                            <input type='text' name='password' class='signInTextbox'></input>
                        </div>
                        <br/>
                        <div className="createAccountOrContinue">
                            <div className="firstTime">
                                Is this your first time?
                                <Link to="/create_account" className="create">Create an account</Link>
                            </div>
                            <input type='submit' value='Continue' class='continue'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_In;