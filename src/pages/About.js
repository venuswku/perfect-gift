import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function About() {
    return (
        <div className="App">
            <header className="App-header">
                <div class="split right">
                    <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
                    <Link to="/about"><p className="row">About Us</p>{' '}</Link>
                    <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
                </div>
                <h1>Contact Me</h1>
                <p>You can reach me via email: <strong>hello@example.com</strong></p>
            </header>
        </div>
    );
}

export default About;