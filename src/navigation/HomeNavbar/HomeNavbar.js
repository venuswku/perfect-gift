import React, {Component} from 'react';
import { NavLink, withRouter } from 'react-router-dom';
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
      submitHandler = (e) => {
        e.preventDefault()
        console.log(this.state)
        console.log("We are signing out")
        axios.get('http://localhost:3010/v0/logout', this.state)
        .then(response => {
          if (response.data === "Successfully logged out"){
            console.log("Successfully signed out")
            this.props.history.push('/')
          }
          else {
            console.log("Error: Logging out failed")
            this.props.history.push('/')
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
            <NavLink to="/home" className="homeNavbarLogo"><PerfectGiftLogo/></NavLink>
            <div className="navigationLinks">
              <NavLink to="/home" className="link" activeClassName="activeLink"><MagnifyGlass className="magnifyGlass"/> Find Gift</NavLink>
              <NavLink to="/profile" className="link" activeClassName="activeLink">My Profile</NavLink>
              <NavLink exact to="/" className="signOutLink" onClick={this.submitHandler}>Sign Out</NavLink>
            </div>
        </div>
    );
    }
}

export default withRouter(HomeNavbar); // withRouter(Component) makes it so that nested components can use the this.props.history property.