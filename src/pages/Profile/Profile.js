import React from 'react';
import '../../App.css'; 
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import { ReactComponent as EditButton } from '../../images/edit_button.svg';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import { ReactComponent as AddButton } from '../../images/add_button.svg';
import { ReactComponent as ProfilePic } from '../../images/profile_pic.svg';


function Profile() {
    return (
        <div className="App">
            <Navbar/>
            <header class='profile-header'>
                {/* profile background + pic */}
                <div class='profile-background'>
                    <ProfilePic/>
                </div>
                <div class='profile-info'>
                    <h3 class='profile-center'>Marvin Steep</h3>
                    <br />
                    {/* username */}
                    <div>
                        <span class='topicFont'>Username &nbsp; </span>
                        <span>msteep</span>
                        &nbsp;
                        <EditButton/>
                    </div>
                    <br />
                    {/* interests */}
                    <div>
                        <span class='topicFont'>Interests &nbsp; </span>
                        <span class='textBubble purple'>topic1 &nbsp; <DeleteButton /></span>
                        <span class='textBubble green'>topic2 &nbsp; <DeleteButton /></span>
                        <span class='textBubble red'>topic3 &nbsp; <DeleteButton /></span>
                        <span class='textBubble yellow'>topic4 &nbsp; <DeleteButton /></span>
                        <span class='textBubble teal'>topic5 &nbsp; <DeleteButton /></span>
                    </div>
                    <br />
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
                        <span class='tab'> <AddButton /> Add to wishlist</span>
                    </div>
                    
                </div>
            </header>
        </div>
        
    );
}
export default Profile;