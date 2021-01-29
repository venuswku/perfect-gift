import React from 'react';
import { Link } from 'react-router-dom';
import './Sign_In.css';
import Navbar from '../../navigation/LogoNavbar/LogoNavbar';
import SignInImage from '../../images/sign_in_image.png';

function Sign_In() {
    return (
        <div className="SignIn">
            <Navbar/>
            <div className="signInContent">
                <img src={SignInImage} className="signInPic" alt="connect with others" />
                <div className="signInForm">
                    <p className="signInTitle">Sign In</p>
                    <p className="signInBenefits">Get personalized gift suggestions and share your own gift wishlist!</p>
                    <form className="userInfo">
                        <label for='username' className='signInLabel'>Username</label>
                        <input type='text' name='username' className='signInTextbox'></input>
                        <label for='password' className='signInLabel'>Password</label>
                        <input type='text' name='password' className='signInTextbox'></input>
                        <br/>
                        <div className="createAccountOrContinue">
                            <div className="firstTime">
                                Is this your first time?
                                <Link to="/create_account" className="create">Create an account</Link>
                            </div>
                            <input type='submit' value='Continue' className='continue'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Sign_In;