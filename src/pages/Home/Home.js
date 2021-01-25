import React from 'react';
import './Home.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import HomeImage from '../../images/create_account_image.png';




function Home() {
    return (
        <div className="App">
            <Navbar />
            <div className="home">
            </div>
            <div className="greeting">
                <p className = "greeting">
                    Hello, Marvin!
                </p>
                <p className="greeting dg">
                    What gifts are you looking for today?
                </p>
            <img src ={HomeImage} alt="the gifters" className="homePic"/>
            <p className='search-background'>Rounded rectangle</p>
            <p className='search-background inner'>Search for username</p>
            </div>
        </div>
    );
}

export default Home;