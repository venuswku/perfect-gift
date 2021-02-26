import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import './HomeNavbar.css';
import { ReactComponent as PerfectGiftLogo } from '../../images/website_logo.svg';
import { ReactComponent as MagnifyGlass } from '../../images/magnify_glass.svg';
import axios from 'axios';


axios.defaults.withCredentials = true;
// Homebar component, Has the A
class HomeNavbar extends Component {
  constructor(props) {
    super(props)

    //These are the items that we will be able to send to the server
    // Can be sent as JSON or an array (depends on how you configure yaml)
    this.state = {
      signOut: false
    }

  }

  // When the sign out button is clicked
  // This function is called which sends this.state to the server
  // It sends the curren
  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    console.log("We are signing out")
    axios.get('https://backend-perfectgift.com/v0/logout', this.state)
      .then(response => {
        if (response.data === "Successfully logged out") {
          console.log("Successfully signed out")
          this.props.history.push('/')
        }
        else {
          console.log("Error: Logging out failed")
        }
      })
      .catch(error => {
        console.log(error)
        console.log("Retry to logout")
      })
  }

  render() {
    return (
      <div className="homeNavbar">
        <Link to="/home" className="homeNavbarLogo" ><PerfectGiftLogo /></Link>
        <div className="navigationLinks">
          <Link to="/home" className="link"><MagnifyGlass className="magnifyGlass" /> Find Gift</Link>
          <Link to="/profile" className="link">My Profile</Link>
          <Link to="/" className="link" onClick={this.submitHandler}>Sign Out</Link>
        </div>
      </div>
    );
  }
}

export default withRouter(HomeNavbar); // withRouter(Component) makes it so that nested components can use the this.props.history property.