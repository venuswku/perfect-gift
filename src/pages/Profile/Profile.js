import React from 'react';
import '../../App.css'; 
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import { ReactComponent as EditButton } from '../../images/edit_button.svg';
import { ReactComponent as DeleteButton } from '../../images/delete_button.svg';
import { ReactComponent as ProfilePic } from '../../images/profile_pic.svg';


function Profile() {
    return (
        <div className="App">
            <Navbar/>
            <div className="App-header">
                <div className='header-image'><ProfilePic/> </div>
                
                <br /> <br /> <br /> <br /> <br /> <br /> 
                
                <h3>Marvin Steward</h3>
                <br></br>
                <div class='offset'>
                    <div>
                        <span class='topicFont'>Username &nbsp;</span>
                        <span>marvinS &nbsp;</span>
                        <EditButton />
                    </div>
                    <br></br>
                    {/* replace words with rounded rectangle */}
                    <div>
                        <span class='topicFont'>Interests  &nbsp;</span>
                        <span class='textBubble teal'>topic1 &nbsp; <DeleteButton /></span> 
                        <span class='textBubble orange'>topic2 &nbsp; <DeleteButton /></span>
                        <span class='textBubble red'>topic3 &nbsp; <DeleteButton /></span>
                    </div>
                    <br></br>
                    {/* prob do a list instead. <ui>? */}
                    <div>
                        <span class='topicFont'>Wishlist &nbsp;  </span>
                        <span class='textBubble red'>hockey stick &nbsp; <DeleteButton /></span>
                        <span class='textBubble purple'>hockey shin guard &nbsp; <DeleteButton /></span>
                        <span class='textBubble green'>Harry Potter wand &nbsp; <DeleteButton /></span>
                        
                    </div>  
                </div>
               
            </div>
        </div>
        
    );
}
export default Profile;