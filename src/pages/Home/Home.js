import React from 'react';
import './Home.css';
import Navbar from '../../navigation/HomeNavbar/HomeNavbar';
import HomeImage from '../../images/create_account_image.png';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass_grey.svg';


// This contains the greeting and image
function Greeting() {
    return (
        <div>
            <p className = "greeting">
                    Hello, Marvin!
                </p>

                <p className="greeting dg">
                    What gifts are you looking for today?
                </p>

                <img src ={HomeImage} alt="the gifters" className="homePic"/>          
        </div>
    );
}

function SearchBar () {
    return (
        <div className="search-bar">  
                    
        <p className='search-background'></p>
        <MagnifyGlass className="search-background mag"/>
        {/* <p className='search-background inner center-text'>Search for username</p> */}
        {/*<p className='search-background inner centered'>Search for username</p> */}
        <input type="search" className='search-background inner centered' placeholder="Search by username"></input>
        <p className='search-background inner drop-down'>Search by...</p>
        <button className="search-background inner drop-down search-button click"></button>

    </div>
    );
}

function Home() {
    return (
        <div className="Home">
            <Navbar />
            
            <div className="home">
            </div>

            <div className="greeting">
                    <Greeting />
                    <SearchBar />
            </div>
        </div>
    );
}

export default Home;