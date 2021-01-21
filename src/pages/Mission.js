import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

function Mission() {
    return (
        <div className="App">
            <header className="App-header">
                <div class="split right">
                    <Link to="/mission"><p className="row">Mission</p> {' '}</Link>
                    <Link to="/about"><p className="row">About Us</p>{' '}</Link>
                    <Link to="/login"><p className="row">Sign In</p>{' '}</Link>
                </div>
                <h1>About Us</h1>
                <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
                <p>Ipsum dolor dolorem consectetur est velit fugiat. Dolorem provident corporis fuga saepe distinctio ipsam? Et quos harum excepturi dolorum molestias?</p>
            </header>
        </div>
    );
}

export default Mission;