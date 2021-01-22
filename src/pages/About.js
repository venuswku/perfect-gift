import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function About() {
    return (
        <div className="App">
            <header className="App-header">
                <div class="split right">
                    <p className="row"><Link to="/mission">Mission &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/about">About Us &nbsp; &nbsp;</Link></p>
                    <p className="row"><Link to="/login">Sign In &nbsp; &nbsp;</Link></p>
                </div>
                <h1>Contact Me</h1>
                <p>You can reach me via email: <strong>hello@example.com</strong></p>
            </header>
        </div>
    );
}

export default About;