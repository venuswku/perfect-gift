import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import './Create_Account.css';
import LogoNavbar from '../navigation/LogoNavbar/LogoNavbar';
import createAccountImage from '../images/create_account_image.png';

function Create_Account() {
    return (
        <div className="App">
            <LogoNavbar/>
            <header className="create_account-header">
                <form>
                    <div className='cacentered'>
                        <p className="blueText">Create an Account </p>
                        <img src={createAccountImage} alt="the gifters" className='createAccountPic' />

                        <label for='first_name' className='loginFont'>First Name</label>
                        <input type='text' name='first_name' className='loginTextbox'></input>
                        <br />
                        <label for='last_name' className='loginFont'>Last Name</label>
                        <input type='text' name='last_name' className='loginTextbox'></input>
                        <br/>
                        <label for='email' className='loginFont'>Email</label>
                        <input type='text' name='email' className='loginTextbox'></input>
                        <br/>
                        <label for='username' className='loginFont'>Username</label>
                        <input type='text' name='username' className='loginTextbox'></input>
                        <br/>
                        <label for='password' className='loginFont'>Password</label>
                        <input type='text' name='password' className='loginTextbox'></input>
                        <br/>
                        <label for='verify_password' className='loginFont'>Retype Password</label>
                        <input type='text' name='verify_password' className='loginTextbox'></input>
                        <br/>
                        <input type='submit' value='Submit'></input>

                        
                        <p>Please take your time to answer our interest questions below. <br /> We will take note and share them with other gifters on your profile!</p>

                        <p>It's completely okay if you don't have answers for all of them! <br /> Empty fields won't be included in your profile.</p>
                        <input type='submit' value='Continue' className='casubmit'></input>
                    </div>
                </form>



            </header>
        </div>
    );
}

export default Create_Account;