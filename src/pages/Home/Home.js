import React from "react";
import "./Home.css";
import Navbar from "../../navigation/HomeNavbar/HomeNavbar";
import HomeImage from "../../images/create_account_image.png";
import { ReactComponent as MagnifyGlass } from "../../images/magnify_glass_grey.svg";
import { ReactComponent as Hockey } from "../../images/hockey.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
import axios from 'axios';
/* */
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Search by..",
                   search1: "Select a way to search"
                 };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /*When the drop down is changed, the placeholder and dropdown items are changed also */
  handleChange(event) {
    this.setState({ value: event.target.value,
                    placeholder: event.target.value,
                    search1: event.target.value
                  });
  }

  /* Not being used, but can be used in the future */
  handleSubmit(event) {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  }

  componentDidMount() {
    axios.get('http://localhost:3010/v0/authenticate', this.state) //The port of the server
    .then(res => {
        if (res.data[0].username !== ""){
          //PlaceHolders
        } else {
          this.props.history.push('/sign_in')
        }
    }).catch(res => {
        console.log(res)
    })
  }

  /*Renders the whole Home page */
  render() {
    return (
      <div className="Home">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Navbar />
        <div className="home-parent">
          {/*The greeting and picture*/}
          <div className="home-main">
            <header className="home-greeting">
              <p className="blue varela flex-item ">Hello Marvin!</p>
              <p className="blue gothic flex-item">
                What gift are you looking for today?
              </p>
              <img
                src={HomeImage}
                alt="the gifters"
                className="flex-item homePic"
              />
              {/*The searchbar and dropdown*/}
              <div className="home-searchbar-background">
                <p></p>
                <input
                  type="search"
                  className="white-searchbar gothic home-input"
                  placeholder={this.state.search1}
                ></input>
                <MagnifyGlass className="mag" />
                  <label className="dropDown1 small-text">     
                    <select
                      value={this.state.value}
                      onChange={this.handleChange}
                      className = "varela home-select"
                    >
                      <option className = "home-option" value="Select a way to search">Search by..</option>
                      <option className = "home-option" value="Search for username">Username</option>
                      <option className = "home-option" value="Search for a gift">Gift</option>
                    </select>
                  </label>
              </div >
              {/*The gift suggestion*/}
              <div className="gift-main">
                <p className="gift-name blue varela">Hockey Stick</p>            
                <div className="gift-background">
                    <Hockey className="gift-img"/>
                </div>
                <div className = "gift-right">
                    <p className="gift-interest-text grey gothic">Interest</p>
                    <p className="gift-interest-topic grey gothic">Hockey</p>
                    <Heart className="gift-heart-pic"/>
                    <p className="gift-wishlist-text grey varela small-text">Wishlist item</p>
                </div>
              </div>        
            </header>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
