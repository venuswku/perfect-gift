import React, { useState } from 'react';
import axios from 'axios';
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
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [outdoorActivity, setOutdoorActivity] = useState("");
    const [place, setPlace] = useState("");
    const [store, setStore] = useState("");
    const [musicGenre, setMusicGenre] = useState("");
    const [musician, setMusician] = useState("");
    const [band, setBand] = useState("");
    const [indoorActivity, setIndoorActivity] = useState("");
    const [movieTvShow, setMovieTvShow] = useState("");
    const [videoGame, setVideoGame] = useState("");
    const [sport, setSport] = useState("");
    const [sportsTeam, setSportsTeam] = useState("");
    const [exercise, setExercise] = useState("");
    
    // createAccount is called when user clicks "Continue" at bottom of page -> sends questionnaire responses to backend
    const createAccount = () => {
        console.log('createAccount called');
        // axios.post('http://localhost:3010/v0/postgiftuser', {
        //     username: username,
        //     userpassword: password,
        //     firstname: firstName,
        //     lastname: lastName,
        //     useremail: email,
        //     avatar,
        //     showavatar,
        // });
        axios.post('http://localhost:3010/v0/postqresponse', {
            username: username,
            outdooractivity: outdoorActivity,
            place: place,
            store:store,
            musicgenre: musicGenre,
            musician: musician,
            band: band,
            indooractivity: indoorActivity,
            movietvshow: movieTvShow,
            videogame: videoGame,
            sport: sport,
            sportsteam: sportsTeam,
            exercise: exercise
        }).then((response) => {
            console.log(response);
        }).catch((error) => {
            console.log(error);
        });
    };

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
                                        <input
                                            type='text'
                                            onChange={(e) => { setFirstName(e.target.value); }}
                                            value={firstName}
                                            name='first_name'
                                            className='caTextbox'
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='last_name' className='blueText'>Last Name</label>
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            onChange={(e) => { setLastName(e.target.value); }}
                                            value={lastName}
                                            name='last_name'
                                            className='caTextbox'
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='email' className='blueText'>Email</label>
                                    </td>
                                    <td>
                                        <input
                                            type='email'
                                            onChange={(e) => { setEmail(e.target.value); }}
                                            value={email}
                                            name='email'
                                            className='caTextbox'
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='username' className='blueText'>Username</label>
                                    </td>
                                    <td>
                                        <input
                                            type='text'
                                            onChange={(e) => { setUsername(e.target.value); }}
                                            value={username}
                                            name='username'
                                            className='caTextbox'
                                            required
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <label for='password' className='blueText'>Password</label>
                                    </td>
                                    <td>
                                        <input
                                            type='password'
                                            onChange={(e) => { setPassword(e.target.value); }}
                                            value={password}
                                            name='password'
                                            className='caTextbox'
                                            required
                                        />
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
                                    <input
                                        type='text'
                                        onChange={(e) => { setIndoorActivity(e.target.value); }}
                                        value={indoorActivity}
                                        name='indoor_activity'
                                        className='caTextbox'
                                        placeholder='Favorite indoor activity?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setMovieTvShow(e.target.value); }}
                                        value={movieTvShow}
                                        name='indoor_media'
                                        className='caTextbox'
                                        placeholder='Favorite movie/TV show?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setVideoGame(e.target.value); }}
                                        value={videoGame}
                                        name='indoor_game'
                                        className='caTextbox'
                                        placeholder='Favorite video game?'
                                    />
                                    <br/>
                                    </div>
                                </td>
                                <td>
                                    <div className='cabox outdoors'>
                                    <p className="blueText"><img src={outdoors1Image} alt="amusement park" className='createAccountPic'/>&nbsp;&nbsp;Outdoors&nbsp;&nbsp;<img src={outdoors2Image} alt="tree" className='createAccountPic'/></p>
                                    <input
                                        type='text'
                                        onChange={(e) => { setOutdoorActivity(e.target.value); }}
                                        value={outdoorActivity}
                                        name='outdoor_activity'
                                        className='caTextbox'
                                        placeholder='Favorite outdoor activity?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setPlace(e.target.value); }}
                                        value={place}
                                        name='outdoor_place'
                                        className='caTextbox'
                                        placeholder='Favorite place to visit?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setStore(e.target.value); }}
                                        value={store}
                                        name='outdoor_store'
                                        className='caTextbox'
                                        placeholder='Favorite store?'
                                    />
                                    <br/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div className='cabox sports'>
                                    <p className="blueText"><img src={sports1Image} alt="weightlifter" className='createAccountPic'/>&nbsp;&nbsp;Sports&nbsp;&nbsp;<img src={sports2Image} alt="basketball" className='createAccountPic'/></p>
                                    <input
                                        type='text'
                                        onChange={(e) => { setSport(e.target.value); }}
                                        value={sport}
                                        name='sport_sport'
                                        className='caTextbox'
                                        placeholder='Favorite sport?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setSportsTeam(e.target.value); }}
                                        value={sportsTeam}
                                        name='sport_team'
                                        className='caTextbox'
                                        placeholder='Favorite sports team?'
                                    />
                                    <br/>
                                    <input
                                        type='text'
                                        onChange={(e) => { setExercise(e.target.value); }}
                                        value={exercise}
                                        name='sport_exercise'
                                        className='caTextbox'
                                        placeholder='Favorite exercise?'
                                    />
                                    <br/>
                                    </div>
                                </td>
                                <td>
                                <div className='cabox music'>
                                <p className="blueText"><img src={music1Image} alt="keyboard" className='createAccountPic'/>&nbsp;&nbsp;Music&nbsp;&nbsp;<img src={music2Image} alt="music note" className='createAccountPic'/></p>
                                <input
                                    type='text'
                                    onChange={(e) => { setMusicGenre(e.target.value); }}
                                    value={musicGenre}
                                    name='music_genre'
                                    className='caTextbox'
                                    placeholder='Favorite genre?'
                                />
                                <br/>
                                <input
                                    type='text'
                                    onChange={(e) => { setMusician(e.target.value); }}
                                    value={musician}
                                    name='music_musician'
                                    className='caTextbox'
                                    placeholder='Favorite musician?'
                                />
                                <br/>
                                <input
                                    type='text'
                                    onChange={(e) => { setBand(e.target.value); }}
                                    value={band}
                                    name='music_band'
                                    className='caTextbox'
                                    placeholder='Favorite band?'
                                />
                                <br/>
                            </div>
                                </td>
                            </tr>
                        </table>
                        <div className="cacenterd">
                            <p>It's completely okay if you don't have answers for all of them! <br /> Empty fields won't be included in your profile.</p>
                            <br />
                            <input type='submit' value='Continue' className='casubmit' onClick={createAccount}></input>
                        </div>
                    </div>
                </form>



            </header>
        </div>
    );
}

export default Create_Account;