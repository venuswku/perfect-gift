import React, { Component } from 'react';
import axios from 'axios';
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

class Create_Account extends Component {

    // hold the variables
    constructor(props) {
        super(props)
        // items that we will be able to send to the server
        this.state = {
            firstname: '',
            lastname: '',
            username: '',
            useremail: '',
            userpassword: '',
            avatar: '',
            showavatar: false,
            outdooractivity: '',
            place: '',
            store: '',
            musicgenre: '',
            musician: '',
            band: '',
            indooractivity: '',
            movietvshow: '',
            videogame: '',
            sport: '',
            sportsteam: '',
            exercise: '',
            createdAccount: false,
        }
    }

    // if changed, update appropriately
    changeHandler = (e) => {
        var interest = (e.target.value).trim();     // get rid of any unnecessary whitespace characters
        this.setState({ [e.target.name]: interest });
    }

    // createAccount is called when user clicks "Continue" at bottom of page -> sends questionnaire responses to backend
    createAccount = (e) => {
        e.preventDefault()
        console.log('Create_Account.js: createAccount called');
        console.log(this.state);
        console.log(e.target.elements.verifypassword.value);
        if (e.target.elements.userpassword.value === e.target.elements.verifypassword.value) {
            axios.get('http://localhost:3010/v0/giftuser?username=' + this.state.username)
                .then(response => {
                    if (response.data.length === 0) {
                        axios.get(('http://localhost:3010/v0/giftuser?useremail=' + this.state.useremail).replace('@', '%40'))
                            .then(response => {
                                if (response.data.length === 0) {
                                    axios.post('http://localhost:3010/v0/postuser', [this.state])
                                        .then(response => {
                                            console.log('Create_Account.js: success for users');
                                            console.log(response);
                                            axios.post('http://localhost:3010/v0/postqresponse', [this.state])
                                                .then(response => {
                                                    console.log('Create_Account.js: success for qr');
                                                    console.log(response);
                                                    axios.post('http://localhost:3010/v0/authenticate', this.state)
                                                        .then(response => {
                                                            console.log("Logged in after creating account");
                                                            console.log(response);
                                                            this.props.history.push('/profile');
                                                        })
                                                        .catch(error => {
                                                            console.log("Create_Account.js: failed signing in for first time");
                                                            console.log(error);
                                                        });
                                                })
                                                .catch(error => {
                                                    console.log("Create_Account.js: failed for qr");
                                                    console.log(this.state);
                                                    console.log(error);
                                                });
                                        })
                                        .catch(error => {
                                            console.log("Create_Account.js: failed for users");
                                            console.log(this.state);
                                            console.log(error);
                                        });
                                } else {
                                    window.alert("Email already taken!")
                                }
                            });
                    } else {
                        window.alert("Username already taken!")
                    }
                });
        } else {
            window.alert("Passwords do not match!")
        }
    };
    
    render() {
        // store input values locally into the following values
        const { firstname, lastname, username, useremail, userpassword, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise } = this.state;
        return (
            <div className="CreateAccount">
                <LogoNavbar />
                <div className="createAccountContent">
                    <p className="createAccountTitle">Create an Account</p>
                    <img className='createAccountPic' src={createAccountImage} alt="the gifters" />
                    <form className="userForm" onSubmit={this.createAccount}>
                        <table className="userInfo">
                            <tbody>
                                <tr>
                                    <td><label htmlFor='firstname' className='blueText'>First Name</label></td>
                                    <td><input aria-label="firstname" type='text' onChange={this.changeHandler} value={firstname} name='firstname' className='caTextbox' required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='lastname' className='blueText'>Last Name</label></td>
                                    <td><input type='text' onChange={this.changeHandler} value={lastname} name='lastname' className='caTextbox' required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='email' className='blueText'>Email</label></td>
                                    <td><input type='email' onChange={this.changeHandler} value={useremail} name='useremail' className='caTextbox' required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='username' className='blueText'>Username</label></td>
                                    <td><input type='text' onChange={this.changeHandler} value={username} name='username' className='caTextbox' required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='password' className='blueText'>Password</label></td>
                                    <td><input type='password' onChange={this.changeHandler} value={userpassword} name='userpassword' className='caTextbox' required /></td>
                                </tr>
                                <tr>
                                    <td><label htmlFor='verifypassword' className='blueText'>Retype Password</label></td>
                                    <td><input type='password' name='verifypassword' className='caTextbox' required></input></td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="createAccountInstructions">Please take your time to answer our interest questions below.* <br /> We will take note and share them with other gifters on your profile!</p>
                        <p className="sideNote">* The following questions are just some suggestions, so feel free to put anything that interests you.</p>
                        <table className="questionnaire">
                            <tbody>
                                <tr>
                                    <td>
                                        <div className='interest indoors'>
                                            <p className="blueText interestTopic"><img src={indoors1Image} alt="food" />&nbsp;&nbsp;Indoors&nbsp;&nbsp;<img src={indoors2Image} alt="camera" /></p>
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={indooractivity}
                                                name='indooractivity'
                                                className='caTextbox'
                                                placeholder='Favorite indoor activity?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={movietvshow}
                                                name='movietvshow'
                                                className='caTextbox'
                                                placeholder='Favorite movie/TV show?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={videogame}
                                                name='videogame'
                                                className='caTextbox'
                                                placeholder='Favorite video game?'
                                            />
                                            <br />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='interest outdoors'>
                                            <p className="blueText interestTopic"><img src={outdoors1Image} alt="amusement park" />&nbsp;&nbsp;Outdoors&nbsp;&nbsp;<img src={outdoors2Image} alt="tree" /></p>
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={outdooractivity}
                                                name='outdooractivity'
                                                className='caTextbox'
                                                placeholder='Favorite outdoor activity?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={place}
                                                name='place'
                                                className='caTextbox'
                                                placeholder='Favorite place to visit?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={store}
                                                name='store'
                                                className='caTextbox'
                                                placeholder='Favorite store?'
                                            />
                                            <br />
                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <div className='interest sports'>
                                            <p className="blueText interestTopic"><img src={sports1Image} alt="weightlifter" />&nbsp;&nbsp;Sports&nbsp;&nbsp;<img src={sports2Image} alt="basketball" /></p>
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={sport}
                                                name='sport'
                                                className='caTextbox'
                                                placeholder='Favorite sport?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={sportsteam}
                                                name='sportsteam'
                                                className='caTextbox'
                                                placeholder='Favorite sports team?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={exercise}
                                                name='exercise'
                                                className='caTextbox'
                                                placeholder='Favorite exercise?'
                                            />
                                            <br />
                                        </div>
                                    </td>
                                    <td>
                                        <div className='interest music'>
                                            <p className="blueText interestTopic"><img src={music1Image} alt="keyboard" />&nbsp;&nbsp;Music&nbsp;&nbsp;<img src={music2Image} alt="music note" /></p>
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={musicgenre}
                                                name='musicgenre'
                                                className='caTextbox'
                                                placeholder='Favorite genre?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={musician}
                                                name='musician'
                                                className='caTextbox'
                                                placeholder='Favorite musician?'
                                            />
                                            <br />
                                            <input
                                                type='text'
                                                onChange={this.changeHandler}
                                                value={band}
                                                name='band'
                                                className='caTextbox'
                                                placeholder='Favorite band?'
                                            />
                                            <br />
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <p className="createAccountInstructions">It's completely okay if you don't have answers for all of them! <br /> Empty fields won't be included in your profile, and you can edit these interests anytime!</p><br />
                        <input aria-label='submitButton' type='submit' value='Continue' className='createAccountSubmit' ></input>
                    </form>
                </div>
            </div>
        );
    }
}

export default Create_Account;