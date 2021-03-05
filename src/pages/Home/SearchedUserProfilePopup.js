import React, { Component } from 'react';
import axios from 'axios';
import './SearchedUserProfilePopup.css';
import '../Profile/Profile.css';
import { ReactComponent as GiftBullet } from '../../images/gift_bullet_point.svg';

class SearchedUserProfilePopup extends Component {
    
    /* Parent component (Home.js) passed the following properties through this.props:
        - toggle: makes popup open/close
        - searchedUser: username of user to display profile for
    */

   constructor(props) {
        super(props);

        this.state = {
            name: '',
            username: this.props.searchedUser,
            useremail: '',

            indooractivity: '',
            place: '',
            sportsteam: '',
            musicgenre: '',
            movietvshow: '',
            outdooractivity: '',
            sport: '',
            musician: '',
            videogame: '',
            store: '',
            exercise: '',
            band: '',
        };
    }

    componentDidMount() { 
        // Get searched user's name and username.
        axios.get(`http://localhost:3010/v0/giftuser?username=${this.props.searchedUser}`, this.state)
            .then(res => {
                console.log("Got searched user's info");
                console.log(res.data);
                if (res.data[0].username !== "") {
                    console.log(res.data[0].username);
                    const userFullName = res.data[0].firstname + " " + res.data[0].lastname;
                    this.setState({ name: userFullName });
                    this.setState({ useremail: res.data[0].useremail });
                    
                    // Get user's questionnaire responses and store them in this.state.
                    console.log('doing get q response', res.data[0].username);
                    axios.get(`http://localhost:3010/v0/getqresponse/${this.state.username}`, [this.state])
                        .then(res => {
                            console.log('successful get q response');
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

                            // Get user's wishlist items.
                            axios.get(`http://localhost:3010/v0/getwishlist/${this.state.username}`, [this.state])
                            .then(res => {
                                console.log("Frontend [SUCCESS]: We have received the user's wishlist")
                                console.log(res.data)
                                console.log(res.data[0].gift)
                                this.setState({wlresponse: res.data[0].gift})
                                console.log(this.state.wlresponse)
                            })
                            .catch(err => {
                                console.log("Frontend [ERROR]: Retrieving wishlist was unsuccessful.")
                                console.log(err)
                                this.setState({
                                    
                                });
                            })
                        })
                        .catch(err => {
                            console.log('failed get q response');
                            console.log(err);
                        });
                }

            }).catch(res => {
                console.log("SearchedUserProfilePopup: Can't find user!");
                console.log(res);
            })
    }

    render() {
        // Displays questionnaire responses.
        const displayQResponses = [];
        const questionnaireTopics = ['outdooractivity', 'place', 'store', 'musicgenre', 'musician', 'band', 'indooractivity', 'movietvshow', 'videogame', 'sport', 'sportsteam', 'exercise'];
        Object.entries(this.state).map(([qTopic, qResponse]) => {
            // console.log(qTopic, ":", qResponse);
            // only display non-empty questionnaire responses that contain at least 1 non-whitespace character
            if ((/\S/.test(qResponse)) && (questionnaireTopics.indexOf(qTopic) > -1)) {
                let color = '';
                if (qTopic === 'outdooractivity' || qTopic === 'place' || qTopic === 'store') {
                    color = 'textBubble outdoors';
                }
                else if (qTopic === 'musicgenre' || qTopic === 'musician' || qTopic === 'band') {
                    color = 'textBubble music';
                }
                else if (qTopic === 'indooractivity' || qTopic === 'movietvshow' || qTopic === 'videogame') {
                    color = 'textBubble indoors';
                }
                else if (qTopic === 'sport' || qTopic === 'sportsteam' || qTopic === 'exercise') {
                    color = 'textBubble sports';
                }
                displayQResponses.push(
                    <div className={color} key={qTopic}>{qResponse}</div>
                );
            }
            return displayQResponses;
        });

        // Displays wishlist items.
        const wl_response = this.state.wlresponse;
        const displaywishlist = [];
        for (let i in wl_response) {
            displaywishlist.push(<span className="wishlistItem" key={wl_response[i]}><GiftBullet/>&nbsp;&nbsp;{wl_response[i]}</span>);
        }
        
        return (
            <div className="SearchedUserProfilePopup">
                <div className="profilePopupBackground" onClick={this.props.toggle}></div>
                <div className="profilePopupContent">
                    <span className="closeProfilePopup" onClick={this.props.toggle}>&times;</span>
                    <div className="popupProfileInfo">
                        <div className="searchedUserName">{this.state.name}</div>
                        <br></br>
                        {/* username */}
                        <div className="userInfoWrapper">
                            <span className='topicFont'>Username &nbsp; </span>
                            <span className="profileUserInfo">{this.state.username}</span>
                        </div>
                        <br></br>
                        {/* user's email */}
                        <div className="userInfoWrapper">
                            <span className='topicFont'>Email &nbsp; </span>
                            <div className="profileUserInfo">{this.state.useremail}</div>
                        </div>
                        <br></br>
                        {/* interests/questionnaire responses */}
                        <div>
                            <span className='topicFont'>Interests</span>
                            <div className="interestBubblesWrapper">{displayQResponses}</div>
                        </div>
                        <br></br>
                        {/* wishlist */}
                        <div className="wishlistWrapper">
                            <span className='topicFont'>Wishlist</span>
                            <div className="list">{displaywishlist}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SearchedUserProfilePopup;