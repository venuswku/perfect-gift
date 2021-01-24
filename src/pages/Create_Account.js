import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Create_Account.css';
import createAccountImage from '../images/create_account_image.png';
import PerfectGiftLogo from '../images/website_logo.svg';


function Create_Account() {
    return (
        <div className="App">
            <header className="create_account-header">
                {/* right half of the screen */}     
                <div class="split right">
                    <p className="row"><Link to="/mission">Mission &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/about">About Us &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/login">Sign In &nbsp; &nbsp;</Link></p>

                </div>

                <div class="split left">
                    <Link to="/"><img src={PerfectGiftLogo} alt="Logo" /></Link>
                </div>
                
                <form>
                    <div class='centered'>
                        <p className="blueText">Create an Account </p>
                        <img src={createAccountImage} alt="the gifters" className='createAccountPic' />
                        <label for='first_name' class='loginFont'>First Name</label>
                        <input type='text' name='first_name' class='loginTextbox'></input>
                        <br />
                        <label for='last_name' class='loginFont'>Last Name</label>
                        <input type='text' name='last_name' class='loginTextbox'></input>
                        <br/>
                        <label for='email' class='loginFont'>Email</label>
                        <input type='text' name='email' class='loginTextbox'></input>
                        <br/>
                        <label for='username' class='loginFont'>Username</label>
                        <input type='text' name='username' class='loginTextbox'></input>
                        <br/>
                        <label for='password' class='loginFont'>Password</label>
                        <input type='text' name='password' class='loginTextbox'></input>
                        <br/>
                        <label for='verify_password' class='loginFont'>Retype Password</label>
                        <input type='text' name='verify_password' class='loginTextbox'></input>
                        <br/>
                        <input type='submit' value='Submit'></input>
                        </div>
                </form>



            </header>
        </div>
    );
}

export default Create_Account;