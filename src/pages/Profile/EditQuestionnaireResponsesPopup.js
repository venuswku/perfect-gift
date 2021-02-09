import React, { Component } from 'react';
import './EditQuestionnaireResponsesPopup.css';
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
            username: '',
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

    // if questionnaire field is changed, update appropriately
    changeHandler = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    // closes popup
    closePopup = () => {
        this.props.toggle();
    };

    render() {
        // store input values locally into the following values
        const { username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise } = this.state;

        return (
            <div className="questionnairePopupBackground" onClick={this.closePopup}>
                <div className="questionnairePopupContent">
                    <span className="close" onClick={this.closePopup}>&times;</span>
                    <p className="createAccountInstructions">If you want to update your interests, edit them here!<br/>Scroll to the bottom to save your changes.</p>
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
                    <input type='submit' value='Save' className='saveQuestionnaireChanges' ></input>
                </div>
            </div>
        );
    }
}
export default EditQuestionnaireResponsesPopup;