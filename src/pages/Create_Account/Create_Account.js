import React from 'react';
import '../../App.css';
import './Create_Account.css';
import LogoNavbar from '../../navigation/LogoNavbar/LogoNavbar';
import createAccountImage from '../../images/create_account_image.png';

function Create_Account() {
    return (
        <div className="App">
            <LogoNavbar/>
            <header className="create_account-header">
                <form>
                    <div className='cacentered'>
                        <p className="blueText">Create an Account </p>
                        <img src={createAccountImage} alt="the gifters" className='createAccountPic' />

                        <div className='casplit right lalign'>
                            <input type='text' name='first_name' className='loginTextbox'></input>
                            <br />
                            <input type='text' name='last_name' className='loginTextbox'></input>
                            <br />
                            <input type='text' name='email' className='loginTextbox'></input>
                            <br />
                            <input type='text' name='username' className='loginTextbox'></input>
                            <br />
                            <input type='text' name='password' className='loginTextbox'></input>
                            <br />
                            <input type='text' name='verify_password' className='loginTextbox'></input>
                        </div>
                        <div className='casplit left ralign'>
                            <label for='first_name' className='blueText'>First Name</label>
                            <br />
                            <label for='last_name' className='blueText'>Last Name</label>
                            <br/>
                            <label for='email' className='blueText'>Email</label>
                            <br/>
                            <label for='username' className='blueText'>Username</label>
                            <br/>
                            <label for='password' className='blueText'>Password</label>
                            <br/>
                            <label for='verify_password' className='blueText'>Retype Password</label>
                        <br/>
                        </div>
                        
                        <p>Please take your time to answer our interest questions below. <br /> We will take note and share them with other gifters on your profile!</p>

                        <div className='casplit right'>
                            <div className='box outdoors'>
                                <p className="blueText">Outdoors</p>
                                <input type='text' name='outdoor_activity' className='loginTextbox' placeholder='Favorite outdoor activity?'></input>
                                <br/>
                                <input type='text' name='outdoor_place' className='loginTextbox' placeholder='Favorite place to visit?'></input>
                                <br/>
                                <input type='text' name='outdoor_store' className='loginTextbox' placeholder='Favorite store?'></input>
                                <br/>
                            </div>
                            <br />
                            <div className='box music'>
                                <p className="blueText">Music</p>
                                <input type='text' name='music_genre' className='loginTextbox' placeholder='Favorite genre?'></input>
                                <br/>
                                <input type='text' name='music_musician' className='loginTextbox' placeholder='Favorite musician?'></input>
                                <br/>
                                <input type='text' name='music_band' className='loginTextbox' placeholder='Favorite band?'></input>
                                <br/>
                            </div>
                        </div>

                        <div className='casplit left'>
                            <div className='box indoors'>
                                <p className="blueText">Indoors</p>
                                <input type='text' name='indoor_activity' className='loginTextbox' placeholder='Favorite indoor activity?'></input>
                                <br/>
                                <input type='text' name='indoor_media' className='loginTextbox' placeholder='Favorite movie/TV show?'></input>
                                <br/>
                                <input type='text' name='indoor_game' className='loginTextbox' placeholder='Favorite game'></input>
                                <br/>
                            </div>
                            <br />
                            <div className='box sports'>
                                <p className="blueText">Sports</p>
                                <input type='text' name='sport_sport' className='loginTextbox' placeholder='Favorite sport?'></input>
                                <br/>
                                <input type='text' name='sport_team' className='loginTextbox' placeholder='Favorite sports team?'></input>
                                <br/>
                                <input type='text' name='sport_exercise' className='loginTextbox' placeholder='Favorite exercise?'></input>
                                <br/>
                            </div>
                        </div>
                        <div className="cacenterd">
                            <p>It's completely okay if you don't have answers for all of them! <br /> Empty fields won't be included in your profile.</p>
                            <input type='submit' value='Continue' className='casubmit'></input>
                        </div>
                    </div>
                </form>



            </header>
        </div>
    );
}

export default Create_Account;