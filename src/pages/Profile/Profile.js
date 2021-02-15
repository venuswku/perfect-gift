import React, { Component } from 'react';
import axios from 'axios';
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import EditInterestsPopup from './EditInterestsPopup';
import AddToWishlistPopup from './AddToWishlistPopup';
import { ReactComponent as EditButton } from '../../images/edit_button.svg';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import { ReactComponent as AddButton } from '../../images/add_button.svg';
import { ReactComponent as ProfilePic } from '../../images/profile_pic.svg';

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
            wishlist: [],
            showQuestionnairePopup: false,
            qresponse: [],
            showWishlistPopup: false,
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    /* Opens or closes popup for editing questionnaire responses (Interests section). */
    togglePopup = () => {
        this.setState({
         showQuestionnairePopup: !this.state.showQuestionnairePopup
        });
    };

    /* Opens or closes popup for adding to your wishlist (Wishlist secion). */
    togglePopupWL = () => {
        this.setState({
         showWishlistPopup: !this.state.showWishlistPopup
        });
    };

    handleChange(e) {
        this.setState({ newUsername: e.target.value });
    }

    handleSave() {
        // don't save new username if it's empty (set it back to original username)
        if (this.state.newUsername === "") {
            this.setState({ username: this.state.username, mode: 'view' });
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

    handleEdit() {
        this.setState({ mode: 'edit' });
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
                        onChange={this.handleChange}
                        value={this.state.newUsername}
                        className='editTextbox'
                    />
                </span>
            );
        }
    }

    //show edit/save button
    renderButton() {
        if (this.state.mode === 'view') {
            return (
                <button onClick={this.handleEdit}>
                    <EditButton />
                </button>
            );
        } else {
            return (
                <button onClick={this.handleSave}>
                    Save
                </button>
            );
        }
    }

    displayQResponses() {
        console.log('qresponse length', this.state.qresponse.length);
        for (var i = 0; i < this.state.qresponse.length; i++){
            if (this.state.qresponse[i] !== '') {
                console.log('qresponse[', i, '] = ', this.state.qresponse[i]);
            }
        }
    }

    componentDidMount() {
        axios.get('http://localhost:3010/v0/authenticate', this.state) //The port of the server
            .then(res => {
                console.log("Got a response with GET")
                console.log(res.data)
                if (res.data[0].username !== "") {
                    console.log(res.data[0].username);
                    const userFullName = res.data[0].firstname + " " + res.data[0].lastname;
                    this.setState({ name: userFullName });
                    this.setState({ username: res.data[0].username });
                    this.setState({ newUsername: res.data[0].username });
                    this.setState({ firstName: res.data[0].firstname });
                    this.setState({ lastName: res.data[0].lastname });
                    this.setState({ useremail: res.data[0].useremail });
                    console.log('doing get q response', res.data[0].username);
                    axios.get(`http://localhost:3010/v0/getqresponse/${this.state.username}`, [this.state])
                        .then(res => {
                            console.log('successful get q response');
                            this.setState({
                                qresponse: [...this.state.qresponse, res.data[0].outdooractivity, res.data[0].place, res.data[0].store, res.data[0].musicgenre,
                                    res.data[0].musician, res.data[0].band, res.data[0].indooractivity, res.data[0].movietvshow, res.data[0].videogame,
                                    res.data[0].sport, res.data[0].sportsteam, res.data[0].exercise]
                            });
                            console.log('qresponse is: ', this.state.qresponse);
                        });
                        // .catch(res => {
                        //     console.log('failed get q response');
                        // });
                } else {
                    this.props.history.push('/sign_in')
                    console.log("Redirected to sign in page")
                }

            }).catch(res => {
                console.log(res)
            })

        // Making a get request to get the user's wishlist
        // axios.get('http://localhost:3010/v0/getUserWishlist', [this.state])
        //     .then(res => {
        //         console.log("Frontend: Gimme wishlist")
        //         console.log(res.data)

        //     }).catch(res => {
        //         console.log("Frontend: There was an error when trying to get a user's wishlist")
        //         console.log(res)
        //     })
    }

    render() {
        //this stuff is to display questionnaire responses
        const qresponse = this.state.qresponse;
        const displayresponse = [];
        for (const [index, value] of qresponse.entries()) {
            if (value !== '') {
                // console.log('index is ', index);
                var color = '';
                if (index === 0 || index === 1 || index === 2) {
                    color = 'textBubble indoors';
                } else if (index === 3 || index === 4 || index === 5) {
                    color = 'textBubble outdoors';
                } else if (index === 6 || index === 7 || index === 8) {
                    color = 'textBubble sports';
                } else if (index === 9 || index === 10 || index === 11) {
                    color = 'textBubble music';
                }
                displayresponse.push(<span className={color}>{value} &nbsp; <DeleteButton /></span>);
            }
        }

        return (
            <div className="Profile">
                
                <Navbar />
                
                {this.state.showQuestionnairePopup ? <EditInterestsPopup toggle={this.togglePopup} username={this.state.username} /> : null}
                <header className='profile-header'>
                    {/* profile background + pic */}
                    <div className='profile-background'>
                        <ProfilePic />
                    </div>
                    <div className='profile-info'>
                        <h3 className='profile-center'>{this.state.name}</h3>
                        <br></br>
                        {/* username */}
                        <div>
                            <span className='topicFont'>Username &nbsp; </span>
                            <span>{this.renderInputField()} &nbsp; {this.renderButton()}</span>
                        </div>
                        <br></br>
                        {/* interests/questionnaire responses */}
                        <div>
                            {displayresponse}
                            &nbsp;
                            <button className='editInterests' onClick={this.togglePopup}><EditButton/></button>
                        </div>
                        <br></br>
                        {/* wishlist */}
                        <div>
                            {this.state.showWishlistPopup ? <AddToWishlistPopup toggle={this.togglePopupWL} username={this.state.username} /> : null}
                            <span className='topicFont'>Wishlist</span>
                            <ul className='tab no-bullets'>
                                <li>hockey stick &nbsp; <DeleteButton /></li>
                                <li>hockey shin guard &nbsp; <DeleteButton /></li>
                                <li>Harry Potter wand &nbsp; <DeleteButton /></li>
                                <li>hockey stick &nbsp; <DeleteButton /></li>
                                <li>hockey shin guard &nbsp; <DeleteButton /></li>
                                <li>Harry Potter wand &nbsp; <DeleteButton /></li>
                                <li>hockey stick &nbsp; <DeleteButton /></li>
                                <li>hockey shin guard &nbsp; <DeleteButton /></li>
                                <li>Harry Potter wand &nbsp; <DeleteButton /></li>
                            </ul>
                            <br></br>
                            <span className='tab'> <AddButton  onClick={this.togglePopupWL} /> Add to wishlist</span>
                        </div>

                    </div>
                </header>
            </div>

        );
    }
}

export default Profile;