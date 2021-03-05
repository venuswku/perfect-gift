import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import EditInterestsPopup from './EditInterestsPopup';
import AddToWishlistPopup from './AddToWishlistPopup';
import DeleteWishlistItem from './DeleteWishlistItem';
import { ReactComponent as EditButton } from '../../images/edit_button.svg';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import { ReactComponent as AddButton } from '../../images/add_button.svg';
import { ReactComponent as ProfilePic } from '../../images/profile_pic.svg';
import { ReactComponent as GiftBullet } from '../../images/gift_bullet_point.svg';

axios.defaults.withCredentials = true;

class Profile extends Component {

    constructor(props) {
        super(props);

        // Here we initialize our components state
        this.state = {
            showForm: false,
            name: '',
            username: '',
            newUsername: '',
            firstname: '',
            lastname: '',
            useremail: '',
            mode: 'view',

            showQuestionnairePopup: false,
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
    
            wishlist: [],
            showWishlistPopup: false,
            wlresponse: [],
        };

        /* Binding functions allows it to access component attributes (e.g. this.props, this.state). */
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.toggleQuestionnairePopup = this.toggleQuestionnairePopup.bind(this);
        this.handleInterestChange = this.handleInterestChange.bind(this);
        this.deleteInterest = this.deleteInterest.bind(this);
        this.togglePopupWL = this.togglePopupWL.bind(this);
        this.updateWL = this.updateWL.bind(this);
        this.deleteWLItem = this.deleteWLItem.bind(this);
    }

    handleUsernameChange(e) {
        this.setState({ newUsername: e.target.value });
    }

    handleEdit() {
        this.setState({ mode: 'edit' });
    }
    
    handleSave() {
        // don't save new username if it's empty or has a space in it (set it back to original username)
        if (this.state.newUsername === "" || this.state.newUsername.split(" ").length !== 1) {
            this.setState({ newUsername: this.state.username, mode: 'view' });
        }
        // save new username
        else {
            console.log("USERNAME", this.state.username);
            console.log("NEW USERNAME", this.state.newUsername);
            axios.put(`http://localhost:3010/v0/giftuser/${this.state.username}`, [this.state])
                .then(res => {
                    console.log('Frontend: updated username successfully in profile');
                    console.log(res.data);
                    console.log('Frontend: updated username successfully in profile');

                })
                .catch(res => {
                    console.log("Frontend: failed for updating username in profile");
                    console.log(res);
                })
            this.setState({ username: this.state.newUsername, mode: 'view' });
        }
    }

    // show/hide textbox to edit username
    renderInputField() {
        if (this.state.mode === 'view') {
            return this.state.username;
        } else {
            // display newUsername as user is editing it
            return (
                <span>
                    <input
                        onChange={this.handleUsernameChange}
                        value={this.state.newUsername}
                        className='editUsernameTextbox'
                    />
                </span>
            );
        }
    }

    // Shows edit or save & undo button for modifying username.
    renderButton() {
        if (this.state.mode === 'view') {
            return (
                <EditButton onClick={this.handleEdit} className="editButton"/>
            );
        } else {
            return (
                <div className="saveUndoButtons">
                    <button onClick={this.handleSave} className="usernameButton">
                        Save
                    </button>
                    <button onClick={this.handleSave} className="usernameButton">
                        Undo
                    </button>
                </div>
            );
        }
    }
    
    /* Opens or closes popup for editing questionnaire responses (Interests section). */
    toggleQuestionnairePopup() {
        this.setState({ showQuestionnairePopup: !this.state.showQuestionnairePopup });
    };

    /* Updates (in this.state) user's questionnaire responses in Interests section. */
    handleInterestChange = (e) => {
        var newInterest = (e.target.value).trim();     // get rid of any unnecessary whitespace characters
        this.setState({ [e.target.name]: newInterest });
    }

    /* Deletes (empties) questionnaire response from Interests section. */
    deleteInterest(questionnaireTopic) {
        console.log("remove", questionnaireTopic, "for", this.state.username);
        axios.put(`http://localhost:3010/v0/removeqresponse/${this.state.username}/${questionnaireTopic}`, [this.state])
        .then(response => {
            console.log('Profile.js: success deleting qr');
            console.log(response);
            // call get request again to see new changes
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
                })
                .catch(err => {
                    console.log('failed get q response');
                    console.log(err);
                });
        })
        .catch(error => {
            console.log("Profile.js: failed deleting qr");
            console.log(this.state);
            console.log(error);
        });
    }

    /* Opens or closes popup for adding to your wishlist (Wishlist secion). */
    togglePopupWL = () => {
        this.setState({ showWishlistPopup: !this.state.showWishlistPopup });
    };

    // Updates the wishlist to show new item
    updateWL(new_item) {
        //console.log(old_wlresponse)
        let old_wlresponse = this.state.wlresponse
        //console.log(old_wlresponse)
        //let new_wlreponse = old_wlresponse.push(new_item)
        old_wlresponse.push(new_item)
        this.setState({wlresponse : old_wlresponse})
    }

    // Deletes an item from the wishlist in the frontend UI
    deleteWLItem(removed_item) {
        let old_wlresponse = this.state.wlresponse;
        let new1 = old_wlresponse.filter(e => e !== removed_item);
        console.log('..............................')
        console.log(old_wlresponse)
        console.log('..............................')
        this.setState({wlresponse: new1})
    }
    
    componentDidMount() {
        // Authenticate user when they reach profile page.
        axios.get('http://localhost:3010/v0/authenticate', this.state)
            .then(res => {
                console.log("Got a response with GET")
                console.log(res.data)
                if (res.data[0].username !== "") {
                    console.log(res.data[0].username);
                    const userFullName = res.data[0].firstname + " " + res.data[0].lastname;
                    this.setState({ name: userFullName });
                    this.setState({ username: res.data[0].username });
                    this.setState({ newUsername: res.data[0].username });
                    this.setState({ firstname: res.data[0].firstname });
                    this.setState({ lastname: res.data[0].lastname });
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
                } else {
                    this.props.history.push('/sign_in')
                    console.log("Redirected to sign in page")
                }

            }).catch(res => {
                console.log(res)
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
                    <div onClick={() => this.deleteInterest(qTopic)} className={color} key={qTopic}>
                        {qResponse} &nbsp;<DeleteButton className="delete"/>
                    </div>
                );
            }
            return displayQResponses;
        });

        // Displays wishlist items.
        const wl_response = this.state.wlresponse;
        const displaywishlist = [];
        for (let i in wl_response) {
            displaywishlist.push(<span className="wishlistItem" key={wl_response[i]}><GiftBullet/>&nbsp;&nbsp;{wl_response[i]}&nbsp;&nbsp;<DeleteWishlistItem username={this.state.username} info={wl_response[i]} deleteWLItem={this.deleteWLItem}/></span>);
        }

        return (
            <div className="Profile">
                <Navbar />
                {this.state.showQuestionnairePopup ? <EditInterestsPopup toggle={this.toggleQuestionnairePopup} userInfo={this.state} editInterest={this.handleInterestChange} /> : null} 
                <div className='profileContent'>
                    {/* profile background + pic */}
                    <div className='profilePicBackground'>
                        <ProfilePic />
                    </div>
                    <div className='profileInfo'>
                        <div className='name'>{this.state.name}</div>
                        <br></br>
                        {/* username */}
                        <div className="userInfoWrapper">
                            <span className='topicFont'>Username &nbsp; </span>
                            <span className="profileUserInfo">{this.renderInputField()} &nbsp; {this.renderButton()}</span>
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
                            <span className='topicFont'>Interests &nbsp; </span>
                            <EditButton className='editButton' onClick={this.toggleQuestionnairePopup}/>
                            <div className="interestBubblesWrapper">{displayQResponses}</div>
                        </div>
                        <br></br>
                        {/* wishlist */}
                        <div className="wishlistWrapper">
                            <span className='topicFont'>Wishlist</span>
                            <div className="list">{displaywishlist}</div>
                            {this.state.showWishlistPopup ? <AddToWishlistPopup toggle={this.togglePopupWL} username={this.state.username} firstname={this.state.firstname} updateWishlist={this.updateWL}/> : null}
                            <span className='addToWishlist' onClick={this.togglePopupWL}><AddButton/>&nbsp;Add to wishlist</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Profile;