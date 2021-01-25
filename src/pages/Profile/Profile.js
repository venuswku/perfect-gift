import React from 'react';
import '../../App.css'; 
import './Profile.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';

function Profile() {
    return (
        <div className="App">
            <Navbar/>
            <div className="App-header">
                {/* profile pic/header thing */}
                {/* find a better profile pic thing. maybe actual image? */}
                <p className='header-image'>Rounded rectangle</p>
                <h3>Marvin Steward</h3>
                <div class='offset'>
                    <div>
                        <span class='topicFont'>Username &nbsp;</span>
                        <span>marvinS &nbsp;</span>
                        <span>edit</span>
                    </div>
                    {/* replace words with rounded rectangle */}
                    <div>
                        <span class='topicFont'>Interests &nbsp;</span>
                        <span>topic1 &nbsp;</span>
                        <span>topic2 &nbsp;</span>
                        <span>topic3 &nbsp;</span>
                    </div>
                    {/* prob do a list instead. <ui>? */}
                    <div>
                        <span class='topicFont'>Wishlist &nbsp;  </span>
                        <span>hockey stick &nbsp;</span>
                        <span>hockey shin guard &nbsp;</span>
                        <span>Harry Potter wand &nbsp;</span>
                        
                    </div>  
                </div>
                
                
                
                

            </div>
        </div>
        
    );
}
export default Profile;