import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass.svg';
import axios from 'axios';
class HomeNavbar extends React.Component {
    constructor(props) {
        super(props)
        //These are the items that we will be able to send to the server
        this.state = {
            signOut: false
        }
      }

      submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        console.log("We are signing out")
        axios.post('http://localhost:3010/v0/signout', this.state)
        .then(response => {
          if (response.data === ""){
            console.log("Not Logged In")
            this.setState({wrongPassword: "The password/username combination you entered is incorrect. Try again"})
          }
          else {
            console.log("Logged In")
            this.props.history.push('/profile')
          }
        })
        .catch(error => {
          console.log(error)
          console.log("You inputted a wrong username/password combination")
        })
      }

    render() {
    return (
        <div className="home-navbar">
            <Link exact to="/home" className="home-navbar-logo" ><PerfectGiftLogo/></Link>
            <div className="navigation-links">
                <Link exact to="/home" className="link"><MagnifyGlass/> Find Gift</Link>
                <Link exact to="/profile" className="link">My Profile</Link>
                <Link exact to="/" className="link" onClick={this.submitHandler}>Sign Out</Link>
            </div>
        </div>
    );
    }
}

export default HomeNavbar;