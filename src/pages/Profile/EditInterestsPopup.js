import React, { Component } from 'react';
import axios from 'axios';

import './EditInterestsPopup.css';
import '../../pages/Create_Account/Create_Account.css';

import indoors1Image from '../../images/create_account_indoors1.svg';
import indoors2Image from '../../images/create_account_indoors2.svg';

import outdoors1Image from '../../images/create_account_outdoors1.svg';
import outdoors2Image from '../../images/create_account_outdoors2.svg';

import sports1Image from '../../images/create_account_sports1.svg';
import sports2Image from '../../images/create_account_sports2.svg';

import music1Image from '../../images/create_account_music1.svg';
import music2Image from '../../images/create_account_music2.svg';

class EditQuestionnaireResponsesPopup extends Component {
    
    constructor(props) {
        super(props)
        // items that we will be able to send to the server
        this.state = {
            username: this.props.userInfo.username,
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
        }
    }

    // load user's original questionnaire responses
    componentDidMount() {
        axios.get(`http://localhost:3010/v0/getqresponse/${this.state.username}`, this.state)
        .then(res => {
            this.setState({ outdooractivity: res.data[0].outdooractivity });
            this.setState({ place: res.data[0].place });
            this.setState({ store: res.data[0].store });
            this.setState({ musicgenre: res.data[0].musicgenre });
            this.setState({ musician: res.data[0].musician });
            this.setState({ band: res.data[0].band });
            this.setState({ indooractivity: res.data[0].indooractivity });
            this.setState({ movietvshow: res.data[0].movietvshow });
            this.setState({ videogame: res.data[0].videogame });
            this.setState({ sport: res.data[0].sport });
            this.setState({ sportsteam: res.data[0].sportsteam });
            this.setState({ exercise: res.data[0].exercise });
        }).catch(res => {
            console.log(res);
        })
    }

    // if questionnaire field is changed, update appropriately
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // closes popup
    closePopup = () => {
        this.props.toggle();
    };

    // closes popup and saves changes to questionnaire responses
    saveChanges = () => {
        this.props.toggle();
        axios.put('http://localhost:3010/v0/putqresponse/' + this.state.username, [this.state])
        .then(response => {
            console.log('EditInterestsPopup.js: success updating qr');
            console.log(response);
            // refresh profile page to see user changes
            window.location.reload();
        })
        .catch(error => {
            console.log("EditInterestsPopup.js: failed updating qr");
            console.log(this.state);
            console.log(error);
        });
    };

    render() {
        // store input values locally into the following values
        const { outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise } = this.state;

        return (
            <div className="EditInterestsPopup">
                <div className="questionnairePopupBackground" onClick={this.closePopup}></div>
                <div className="questionnairePopupContent">
                    <span className="close" onClick={this.closePopup}>&times;</span>
                    <div className="updateInterestsTitle">Edit your Interests</div>
                    <p className="updateInterestsInstructions">Make sure to save your changes at the bottom of this popup!</p>
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
                    <input type='submit' value='Save' className='saveQuestionnaireChanges' onClick={this.saveChanges} ></input>
                </div>
            </div>
        );
    }
}
export default EditQuestionnaireResponsesPopup;