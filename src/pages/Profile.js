import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'; 
import './Profile.css';
import PerfectGiftLogo from '../images/website_logo.svg';
// import { ReactComponent as PerfectGiftLogo } from '../images/website_logo.svg';


function Profile() {
    return (
        <div className="App">
            <div className="App-header">
                <Link to="/"><img src={PerfectGiftLogo} alt="Logo" class='logo' /></Link>
                {/* navigation bar */}
                <div class='split right'>
                    <div class="row Nav-link">Find Gift &nbsp; &nbsp;</div>
                    <div class="row Nav-link">My Profile &nbsp; &nbsp;</div>
                    <div class="row Nav-link">Sign Out &nbsp; &nbsp;</div>
                </div>
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