import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import PerfectGiftLogo from '../images/website_logo.svg';

function Mission() {
    return (
        <div className="App">
            <header className="App-header">
                <div class="split left">
                    <Link to="/"><img src={PerfectGiftLogo} alt="Logo" /></Link>
                </div>
                <div class="split right">
                    <p className="row"><Link to="/mission">Mission &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/about">About Us &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/login">Sign In &nbsp; &nbsp;</Link></p>
                </div>
                <h1>About Us</h1>
                <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
                <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
            </header>
        </div>
    );
}

export default Mission;