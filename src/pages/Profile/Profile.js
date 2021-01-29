import React, { Component } from 'react';
import '../../App.css';
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import { ReactComponent as EditButton } from '../../images/edit_button.svg';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import { ReactComponent as AddButton } from '../../images/add_button.svg';
import { ReactComponent as ProfilePic }  from '../../images/profile_pic.svg';

class Profile extends Component {

    constructor(props) {
        super(props);

        // Here we initialize our components state
        this.state = {
            showForm: false,
            name: 'Marvin Steep',
            username: 'msteep',
            editName: 'msteep',
            mode: 'view',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }

    handleChange(e) {
        this.setState({ editName: e.target.value });
    }

    handleSave() {
        this.setState({ username: this.state.editName, mode: 'view' });
    }

    handleEdit() {
        this.setState({ mode: 'edit' });
    }
    // show/hide textbox to edit username
    renderInputField() {
        if (this.state.mode === 'view') {
            return this.state.username;
        } else {
            return (
                <span>
                    <input
                        onChange={this.handleChange}
                        value={this.state.editName}
                        class='editTextbox'
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
    
    
    render() {
        return (
            <div className="App">
                <Navbar />
                <header class='profile-header'>
                    {/* profile background + pic */}
                    <div class='profile-background'>
                        <ProfilePic />
                    </div>
                    <div class='profile-info'>
                        <h3 class='profile-center'>{this.state.name}</h3>
                        <br></br>
                        {/* username */}
                        <div>
                            <span class='topicFont'>Username &nbsp; </span>
                            <span>{this.renderInputField()} &nbsp; {this.renderButton()}</span>
                            
                        </div>
                        <br></br>
                        {/* interests */}
                        <div>
                            <span class='topicFont'>Interests &nbsp; </span>
                            <span class='textBubble purple'>topic1 &nbsp; <DeleteButton /></span>
                            <span class='textBubble green'>topic2 &nbsp; <DeleteButton /></span>
                            <span class='textBubble red'>topic3 &nbsp; <DeleteButton /></span>
                            <span class='textBubble yellow'>topic4 &nbsp; <DeleteButton /></span>
                            <span class='textBubble teal'>topic5 &nbsp; <DeleteButton /></span>
                        </div>
                        <br></br>
                        {/* wishlist */}
                        <div>
                            <span class='topicFont'>Wishlist</span>
                            <ul class='tab no-bullets'>
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
                            <span class='tab'> <AddButton /> Add to wishlist</span>
                        </div>

                    </div>
                </header>
            </div>

        );
    }
}

export default Profile;