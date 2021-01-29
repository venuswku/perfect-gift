import React from 'react';
import '../../App.css';
import './Create_Account.css';
import LogoNavbar from '../../navigation/LogoNavbar/LogoNavbar';
import createAccountImage from '../../images/create_account_image.png';

import indoors1Image from '../../images/create_account_indoors1.svg';
import indoors2Image from '../../images/create_account_indoors2.svg';

import outdoors1Image from '../../images/create_account_outdoors1.svg';
import outdoors2Image from '../../images/create_account_outdoors2.svg';

import sports1Image from '../../images/create_account_sports1.svg';
import sports2Image from '../../images/create_account_sports2.svg';

import music1Image from '../../images/create_account_music1.svg';
import music2Image from '../../images/create_account_music2.svg';

function Create_Account() {
    return (
        <div className="App">
            <LogoNavbar/>
            <header className="create_account-header">
                <form>
                    <div className='cacentered'>
                        <p className="blueText">Create an Account </p>
                        <img src={createAccountImage} alt="the gifters" className='createAccountPic' />
                            <table>
                                <tr>
                                    <td>
                                        <label for='first_name' className='blueText'>First Name</label>
                                    </td>
                                    <td>
                                        <input type='text' name='first_name' className='caTextbox' required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='last_name' className='blueText'>Last Name</label>
                                    </td>
                                    <td>
                                        <input type='text' name='last_name' className='caTextbox' required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='email' className='blueText'>Email</label>
                                    </td>
                                    <td>
                                        <input type='email' name='email' className='caTextbox' required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='username' className='blueText'>Username</label>
                                    </td>
                                    <td>
                                        <input type='text' name='username' className='caTextbox' required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='password' className='blueText'>Password</label>
                                    </td>
                                    <td>
                                        <input type='password' name='password' className='caTextbox' required></input>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='verify_password' className='blueText'>Retype Password</label>
                                    </td>
                                    <td>
                                        <input type='password' name='verify_password' className='caTextbox' required></input>
                                    </td>
                                </tr>
                            </table>
                        
                        <p>Please take your time to answer our interest questions below. <br /> We will take note and share them with other gifters on your profile!</p>
                        <table>
                            <tr>
                                <td>
                                    <div className='cabox indoors'>
                                    <p className="blueText"><img src={indoors1Image} alt="food" className='createAccountPic'/>&nbsp;&nbsp;Indoors&nbsp;&nbsp;<img src={indoors2Image} alt="camera" className='createAccountPic'/></p>
                                    <input type='text' name='indoor_activity' className='caTextbox' placeholder='Favorite indoor activity?'></input>
                                    <br/>
                                    <input type='text' name='indoor_media' className='caTextbox' placeholder='Favorite movie/TV show?'></input>
                                    <br/>
                                    <input type='text' name='indoor_game' className='caTextbox' placeholder='Favorite game'></input>
                                    <br/>
                                    </div>
                                </td>
                                <td>
                                    <div className='cabox outdoors'>
                                    <p className="blueText"><img src={outdoors1Image} alt="amusement park" className='createAccountPic'/>&nbsp;&nbsp;Outdoors&nbsp;&nbsp;<img src={outdoors2Image} alt="tree" className='createAccountPic'/></p>
                                    <input type='text' name='outdoor_activity' className='caTextbox' placeholder='Favorite outdoor activity?'></input>
                                    <br/>
                                    <input type='text' name='outdoor_place' className='caTextbox' placeholder='Favorite place to visit?'></input>
                                    <br/>
                                    <input type='text' name='outdoor_store' className='caTextbox' placeholder='Favorite store?'></input>
                                    <br/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='cabox sports'>
                                    <p className="blueText"><img src={sports1Image} alt="weightlifter" className='createAccountPic'/>&nbsp;&nbsp;Sports&nbsp;&nbsp;<img src={sports2Image} alt="basketball" className='createAccountPic'/></p>
                                    <input type='text' name='sport_sport' className='caTextbox' placeholder='Favorite sport?'></input>
                                    <br/>
                                    <input type='text' name='sport_team' className='caTextbox' placeholder='Favorite sports team?'></input>
                                    <br/>
                                    <input type='text' name='sport_exercise' className='caTextbox' placeholder='Favorite exercise?'></input>
                                    <br/>
                                    </div>
                                </td>
                                <td>
                                <div className='cabox music'>
                                <p className="blueText"><img src={music1Image} alt="keyboard" className='createAccountPic'/>&nbsp;&nbsp;Music&nbsp;&nbsp;<img src={music2Image} alt="music note" className='createAccountPic'/></p>
                                <input type='text' name='music_genre' className='caTextbox' placeholder='Favorite genre?'></input>
                                <br/>
                                <input type='text' name='music_musician' className='caTextbox' placeholder='Favorite musician?'></input>
                                <br/>
                                <input type='text' name='music_band' className='caTextbox' placeholder='Favorite band?'></input>
                                <br/>
                            </div>
                                </td>
                            </tr>
                        </table>
                        <div className="cacenterd">
                            <p>It's completely okay if you don't have answers for all of them! <br /> Empty fields won't be included in your profile.</p>
                            <br />
                            <input type='submit' value='Continue' className='casubmit'></input>
                        </div>
                    </div>
                </form>



            </header>
        </div>
    );
}

export default Create_Account;