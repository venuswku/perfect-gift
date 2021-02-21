import React from "react";
import "./Home.css";
import Navbar from "../../navigation/HomeNavbar/HomeNavbar";
import HomeImage from "../../images/create_account_image.png";
import { ReactComponent as MagnifyGlass } from "../../images/magnify_glass.svg";
// import { ReactComponent as Hockey } from "../../images/hockey.svg";
// import { ReactComponent as Heart } from "../../images/heart.svg";
import axios from 'axios';
// import { FormLabel } from "react-bootstrap";

//axios.defaults.withCredentials = true; //Might need this
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "Search by...",
      placeholderText: "Select a way to search",
      typedInput: "",
      user: "",
      // array containing user's interests (used to search for gifts in eBay API)
      usernameInterests: [],
      // object containing gift suggestions (response returned by eBay API)
      gifts: {},
      wishlist: {}
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUserInput = this.handleUserInput.bind(this);
  }

  /*When the drop down is changed, the placeholder and dropdown items are changed also */
  handleChange(event) {
    this.setState({

      //placeholder: event.target.value,
      placeholderText: event.target.value,
      value: event.target.value
    });
  }

  // This function updates the state (typedInput) everytime a user enters a key
  handleUserInput(event) {
    console.log("The user has entered more keys, updating state")
    this.setState({
      typedInput: event.target.value
    })
  }


  /* When the user hits enter, it will send the string to the server. */
  handleSubmit(event) {
    const { value, typedInput } = this.state
    let serverPath = "http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/giftapi";
    console.log("Frontend: We are going to submit your search request to the server")

    try {

      // If the input the user input was not empty
      if (typedInput !== "") {
        console.log(`Frontend: You have entered: "${typedInput}"`)

        // If the user is searching for a username
        if (value === "Search by username") {
          let queryString = '/searchusername?'
          console.log(`Frontend: We will fetch the interests for the username:"${typedInput}"`)
          // Getting typed user's interests.
          axios.get(`http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/getQResponse/${typedInput}`)
            .then(res => {
              // Parsing the response
              console.log(`Frontend: We have recevied "users" list of interests. We will now parse them`)
              let qList = res.data[0]
              let tempUserInterests = []
              for (let [k, v] of Object.entries(qList)) {
                console.log(k, v)
                if (v !== '' && k !== "username") {
                  tempUserInterests.push(v)
                  queryString += `searchTopics[]=${v}&`
                }
              }
              queryString = queryString.slice(0, -1)
              console.log(queryString)
              serverPath += queryString
              //console.log(serverPath)

              // Calling axios based on the user's select choice (username or gift)
              console.log(`Frontend: The server we are connecting to is: ${serverPath}`)
              axios.get(serverPath, this.state)
                .then(res => {
                  console.log(`Frontend: We have recevied a gift suggestion for "${typedInput}"`)
                  console.log(res)
                  // store returned gift suggestions in our state
                  this.setState({ gifts: res.data[0] });
////////
        //The user is searching using the "Search by wishlist" option
          console.log("Now that we have gotten the user's questionnaire response, we will Search by wishlist")
          let queryString_WL = '/searchusername?'
          console.log(`Frontend: We will fetch the wishlist for the username:"${typedInput}"`)
          // Getting typed user's interests.
          axios.get(`http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/getwishlist/${typedInput}`)
            .then(res => {
              // Parsing the response
              serverPath = "http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/giftapi";
              console.log("----------------")
              console.log(`Frontend: We have recevied "users" wishlist. We will now parse them`)
              let qList = res.data[0].gift
              console.log(qList);
              console.log("----------------")
              for (let i in qList) {
                  queryString_WL += `searchTopics[]=${qList[i]}&`

              }
              queryString_WL = queryString_WL.slice(0, -1)
              console.log(queryString_WL)
              serverPath += queryString_WL
              console.log(serverPath)

              // Calling axios based on the user's select choice (username or gift)
              console.log(`Frontend: The server we are connecting to is: ${serverPath}`)
              axios.get(serverPath, this.state)
                .then(res => {
                  console.log(`Frontend: We have recevied a gift suggestion for "${typedInput}"`)
                  console.log(res)
                  // store returned gift suggestions in our state
                  this.setState({ wishlist: res.data[0] });
                  console.log(serverPath)
                }).catch(res => {
                  console.log(res)
                  console.log("Frontend: There was an error when trying to search the gift: INSERT GIFT HERE")
                })
            }).catch(res => {
              console.log(res)
              console.log("Frontend: There was an error when trying to search the user you typed.")
            })
        

////////
                }).catch(res => {
                  console.log(res)
                  console.log("Frontend: There was an error when trying to search the gift: INSERT GIFT HERE")
                })



            }).catch(res => {
              console.log(res)
              console.log("Frontend: There was an error when trying to search the user you typed.")
            })
        }

        // If the user is either using the "Search for a gift" or "Search by..." option
        else if(value === "Search for a gift"){
        // else if (value === "Search for a gift") {
          console.log(`Frontend: We will search for the gift:"${typedInput}"`);
          serverPath += `/searchgift?searchTopics[]=${typedInput}`;
          console.log(serverPath);
          // Calling axios based on the user's select choice (username or gift)
          console.log(`Frontend: The server we are connecting to is: ${serverPath}`)
          axios.get(serverPath, this.state)
            .then(res => {
              console.log(`Frontend: We have recevied a gift suggestion for "${typedInput}"`)
              console.log(res)
              // store returned gift suggestions in our state
              this.setState({ gifts: res.data[0] });
            }).catch(res => {
              console.log(res)
              console.log("Frontend: There was an error when trying to search the gift: INSERT GIFT HERE")
            })
        }
 
      }

      // The user did not input anything
      else {
        throw new Error("No user input")
      }

    }

    // The frontend had an internal error
    catch {
      console.log("Frontend: There was an error when trying to parse your typed input. Try again")
    }
    //alert("Frontend: Successful test");
    event.preventDefault();
  }

  componentDidMount() {
    console.log(this.state)

    axios.get('http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/authenticate', this.state) //The port of the server
      .then(res => {
        if (res.data[0].username !== "") {
          this.setState({
            user: res.data[0].firstname
          })
          console.log(`Your name is: ${this.state.user}`)
        } else {
          this.props.history.push('/sign_in')
        }
      }).catch(res => {
        console.log(res)
      })
  }

  /*Renders the whole Home page */
  render() {
    const { placeholderText, typedInput } = this.state;

    // display each gift returned by eBay API
    const displayGiftSuggestions = [];
    let i = 0
    for (const searchTopic in this.state.gifts) {
      console.log(searchTopic)
      if (i === 0) {
        displayGiftSuggestions.push(<div>Gift Suggestions</div>)
      }
      i++;
      if (searchTopic !== "searchby" && searchTopic !== "typedInput") {
        const giftName = this.state.gifts[searchTopic][0];
        const giftPic = this.state.gifts[searchTopic][1];
        const picText = `picture of ${giftName}`;
        const giftLink = this.state.gifts[searchTopic][2];
        const relatedInterest = this.state.gifts[searchTopic][3];   // empty string if user searched by gift

        displayGiftSuggestions.push(
          <div className="giftSuggestionWrapper" key={giftName}>
            <div className="giftImgBackground"><img src={giftPic} alt={picText} className="gift-img"/></div>
            <div className="giftInfo">
              <a href={giftLink} className="giftName blue varela">{giftName}</a>
              <div className="moreGiftInfo">
                {relatedInterest !== ""
                ? <div className="interestInfo grey gothic">
                    <p className="interestLabel">Interest</p>
                    <p className="giftInterestTopic">{relatedInterest}</p>
                  </div>
                : null}
              </div>
            </div>
          </div>
        );
      }
    }

    // display each wishlist item returned by eBay API
    const displayWishlistSuggestions = [];
    let j = 0
    for (const searchTopic in this.state.wishlist) {
      console.log(searchTopic)
      if (j === 0) {
        displayWishlistSuggestions.push(<div>Wishlist Suggestions</div>)
      }
      j++;
      if (searchTopic !== "searchby" && searchTopic !== "typedInput") {
        const giftName = this.state.wishlist[searchTopic][0];
        const giftPic = this.state.wishlist[searchTopic][1];
        const picText = `picture of ${giftName}`;
        const giftLink = this.state.wishlist[searchTopic][2];
        const relatedInterest = this.state.wishlist[searchTopic][3];   // empty string if user searched by gift

        displayWishlistSuggestions.push(
          <div className="giftSuggestionWrapper" key={giftName}>
            <div className="giftImgBackground"><img src={giftPic} alt={picText} className="gift-img"/></div>
            <div className="giftInfo">
              <a href={giftLink} className="giftName blue varela">{giftName}</a>
              <div className="moreGiftInfo">
                {relatedInterest !== ""
                ? <div className="interestInfo grey gothic">
                    <p className="interestLabel">Interest</p>
                    <p className="giftInterestTopic">{relatedInterest}</p>
                  </div>
                : null}
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="Home">
        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta> */}
        <Navbar />
        <div className="homeContent">
          {/*The greeting and picture*/}
          <header className="homeGreeting">
            <p className="hello blue varela flexItem">Hello, {this.state.user}!</p>
            <p className="blue gothic flexItem">What gift are you looking for today?</p>
            <img
              src={HomeImage}
              alt="the gifters"
              className="homePic"
            />
          </header>
          {/*The searchbar and dropdown*/}
          <form className="homeSearchbarBackground" onSubmit={this.handleSubmit}>
            <label className="dropDown smallText">
              <select
                value={this.state.value}
                onChange={this.handleChange}
                className="homeSelect varela blue"
              >
                <option className="homeOption" value="Select a way to search">&nbsp;Search by...</option>
                <option className="homeOption" value="Search by username">&nbsp;Username</option>
                <option className="homeOption" value="Search for a gift">&nbsp;Gift</option>
                <option className="homeOption" value="Search by wishlist">&nbsp;Wishlist</option>
              </select>
            </label>
            <div className="searchbar">
              <input
                type="text"
                className="searchInput gothic"
                placeholder={placeholderText}
                value={typedInput}
                name="typedInput"
                onChange={this.handleUserInput}
              />
              <div className="searchButton" onClick={this.handleSubmit}><MagnifyGlass className="searchButtonIcon"/></div>
            </div>
          </form>
          {/*The gift suggestion*/}
          {displayGiftSuggestions}
          {displayWishlistSuggestions}
          {/* <div className="gift-main">
            <p className="gift-name blue varela">Hockey Stick</p>
            <div className="gift-background">
              <Hockey className="gift-img" />
            </div>
            <div className="gift-right">
              <p className="gift-interest-text grey gothic">Interest</p>
              <p className="gift-interest-topic grey gothic">Hockey</p>
              <Heart className="gift-heart-pic" />
              <p className="gift-wishlist-text grey varela small-text">Wishlist item</p>
            </div>
          </div> */}
        </div>
      </div>
    );
  }
}

export default Home;
