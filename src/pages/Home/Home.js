import React from "react";
import axios from 'axios';
import "./Home.css";
import Navbar from "../../navigation/HomeNavbar/HomeNavbar";
import SearchedUserProfilePopup from "./SearchedUserProfilePopup";
import HomeImage from "../../images/create_account_image.png";
import { ReactComponent as MagnifyGlass } from "../../images/magnify_glass.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
import NoUser from  "../../images/no_user.png";
import NoGift from "../../images/no_gift.png";

//axios.defaults.withCredentials = true; //Might need this
class Home extends React.Component {

  // Constructor
  constructor(props) {
    super(props);

    // Holds the state of the component Home.js.
    this.state = {
      value: "Select a way to search", // Value of the dropdown (e.g., gift, user/email)
      placeholderText: "Select a way to search", // Placeholder for search bar
      typedInput: "", // Contains the text that the user has typed
      user: "", // Name of the signed in user
      usernameInterests: [], // array containing searched user's interests (used to compare if wishlist item is related to an interest)
      gifts: {}, // object containing gift suggestions (response returned by eBay API)
      wishlist: {}, // Object containing wishlist suggestions (reponse returned by eBay API)
      loading: false, // Determines if the search bar is loading a search request
      noSearchByMethodChosen: false, // Determines whether to show reminder for user to choose a "Search by" method first
      noSearchbarInput: false, // Determines whether to show reminder for user to input something into searchbar
      displayNonExistentUserMessage: false, // Determines whether to tell user that searched username/email doesn't belong to a user on Perfect Gift
      displayBadGiftSearchMessage: false, // Determines whether to tell user that the gift they searched had no gift suggestions
      displayViewProfileButton: false, // Shows button to allow user to open searched user's profile when its value is true
      displayProfile: false,  // Determines whether to open or close popup for showing searched user's profile
      searchedUsername: "", // If user searched by username/email, this contains the username of who they searched
    };

    // Binding to make sure functions work.
    this.handleDropdownChange = this.handleDropdownChange.bind(this);
    this.handleSearchbarInput = this.handleSearchbarInput.bind(this);
    this.handleSearchbarSubmit = this.handleSearchbarSubmit.bind(this);
    this.handleUsernameSearch = this.handleUsernameSearch.bind(this);
    this.toggleProfilePopup = this.toggleProfilePopup.bind(this);
  }

  /* When the drop down is changed,
  the placeholder and dropdown items are changed also. */
  handleDropdownChange(event) {
    this.setState({
      placeholderText: event.target.value,
      value: event.target.value
    });
  }

  /* Updates the state (typedInput) everytime a user enters a key in the search bar. */
  handleSearchbarInput(event) {
    console.log("The user has entered (or removed) more keys, updating state")
    this.setState({
      typedInput: event.target.value
    })
  }

  /* When the user hits enter, it will send the typed string (typedInput) to the server. */
  handleSearchbarSubmit(event) {
    console.log("Frontend: We are going to submit your search request to the server")
    var { value, typedInput } = this.state;
    this.setState({
      gifts: {},
      wishlist: {},
      noSearchByMethodChosen: false,
      noSearchbarInput: false,
      displayNonExistentUserMessage: false,
      displayBadGiftSearchMessage: false,
      displayViewProfileButton: false,
    });
    let serverPath = "http://localhost:3010/v0/giftapi"; // Main URL of where we will send our this.state info to

    try {
      // If the user didn't select a way to search
      // show reminder to tell user to  choose a way to search.
      if (value === "Select a way to search") {
        this.setState({ loading: false, noSearchByMethodChosen: true });

        // if user didn't search anything in search bar, show reminder to input something in search bar as well
        if (typedInput === "") {
          this.setState({ noSearchbarInput: true });
          throw new Error("No search method or user input");
        }
      }

      // Else if the user has typed something and chose a method to search
      else if (value !== "Select a way to search" && typedInput !== "") {
        // Setting the loading state to true (causes the loading animation to show up)
        this.setState({ loading: true });
        console.log(`Frontend: You have entered: "${typedInput}"`);

        // If the user is searching for a username
        if (value === "Search by username/email") {
          console.log(`Frontend: We will fetch the interests for the username:"${typedInput}"`);

          // Detect if typed input is an email.
          const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          const isEmail = re.test(typedInput);

          // If an email, lookup username before proceeding and set typed_input equal to username.
          if (isEmail) {
            console.log("Hey you entered an email!");
            axios.get(('http://localhost:3010/v0/giftuser?useremail=' + typedInput).replace('@', '%40')).then(
              res => {
                console.log(res.data.length)
                if (res.data.length !== 0) {
                  typedInput = res.data[0]['username'];
                  this.setState({ searchedUsername: res.data[0]['username'] });
                  this.handleUsernameSearch(typedInput);
                } else {
                  //no username is found for the email give. stop loading animation and display error message
                  console.log("couldn't find email. try again")
                  this.setState({ loading: false, displayNonExistentUserMessage: true });
                }
              }
            );
          } else {
            // Else search normally by username.
            this.setState({ searchedUsername: typedInput });
            this.handleUsernameSearch(typedInput);
          }
        }

        // If the user is using the "Search for a gift" option
        else if (value === "Search for a gift") {
          console.log(`Frontend: We will search for the gift:"${typedInput}"`);
          serverPath += `/searchgift?searchTopics[]=${typedInput}`;
          console.log(serverPath);
          // Calling axios based on the user's select choice (username or gift)
          console.log(`Frontend: The server we are connecting to is: ${serverPath}`);
          axios.get(serverPath, this.state)
            .then(res => {
              console.log(`Frontend: We have recevied a gift suggestion for "${typedInput}"`);
              console.log(res);
              if (res.data === "Failed") {
                // tell user if the gift they searched for had no results from eBay API
                this.setState({ displayBadGiftSearchMessage: true });
              }
              else {
                // store returned gift suggestions in our state
                this.setState({ gifts: res.data[0] });
              }
              this.setState({ loading: false });
            }).catch(res => {
              console.log(res);
              console.log("Frontend: There was an error when trying to search the gift");
            })
        }
      }

      // Else there's no input in searchbar, but the user chose a search method
      else {
        this.setState({ loading: false, noSearchByMethodChosen: false, noSearchbarInput: true });
        throw new Error("No user input");
      }
    }

    // The frontend had an internal error
    catch {
      console.log("Frontend: There was an error when trying to parse your typed input. Try again")
    }
    //alert("Frontend: Successful test");
    event.preventDefault();
  }

  /* Handles searching by either email or username. */
  handleUsernameSearch(typedInput){
    let serverPath = "http://localhost:3010/v0/giftapi"; // Main URL of where we will send our this.state info to
    let queryString = '/searchusername?'; // Will be used to concatanate more queries and attach to the main string (serverPath)
    this.setState({ displayNonExistentUserMessage: false });

    // GET Request to get the "typed user's" interests.
    axios.get(`http://localhost:3010/v0/getQResponse/${typedInput}`)
    .then(res => {

      // Parsing the response
      console.log(`Frontend: We have recevied "users" list of interests. We will now parse them`);
      let qList = res.data[0];
      let tempUserInterests = [];
      console.log("result of getQResponse:", this.state.usernameInterests);
      for (let [qResponseTopic, qResponseInterest] of Object.entries(qList)) {
        console.log(qResponseTopic, qResponseInterest)
        // qResponseTopic is the name of the column of qr table
        if (qResponseInterest !== '' && qResponseTopic !== "username") {
          tempUserInterests.push(qResponseInterest)
          // Add the qResponseTopic to this search query for better gift suggestions.
          if (qResponseTopic === 'outdooractivity') {
            qResponseTopic = ' outdoors';
          }
          else if (qResponseTopic === 'musicgenre') {
            qResponseTopic = ' music';
          }
          else if (qResponseTopic === 'indooractivity') {
            qResponseTopic = ' indoors';
          }
          else if (qResponseTopic === 'movietvshow') {
            qResponseTopic = ' entertainment';
          }
          else if (qResponseTopic === 'videogame') {
            qResponseTopic = ' video game';
          }
          else if (qResponseTopic === 'sportsteam') {
            qResponseTopic = ' sports team';
          }
          else {
            qResponseTopic = '';
          }
          queryString += `searchTopics[]=${qResponseInterest}${qResponseTopic}&`
          // queryString += `searchTopics[]=${qResponseInterest}&`
        }
      }
      // this.state.userInterests just has questionnaire responses (e.g. ["Taeyeon", "YouTube"])
      this.setState({ usernameInterests: tempUserInterests });
      queryString = queryString.slice(0, -1);
      console.log(queryString);
      serverPath += queryString;
      console.log(serverPath);

      // Calling axios based on the user's select choice (username/email or gift)
      console.log(`Frontend: The server we are connecting to is: ${serverPath}`);
      axios.get(serverPath, this.state)
        .then(res => {
          console.log(`Frontend: We have received interest gift suggestions for "${typedInput}"`);
          console.log(res);
          // store returned gift suggestions in our state
          // & display button for allowing user to see the searched user's profile
          this.setState({ gifts: res.data[0], loading: false, displayViewProfileButton: true });

          //The user is searching using the "Search by wishlist" option
          console.log("Now that we have gotten the user's questionnaire response, we will Search by wishlist");
          let queryString_WL = '/searchusername?';
          console.log(`Frontend: We will fetch the wishlist for the username:"${typedInput}"`);
          // Getting typed user's interests.
          axios.get(`http://localhost:3010/v0/getwishlist/${typedInput}`)
            .then(res => {
              // Parsing the response
              serverPath = "http://localhost:3010/v0/giftapi";
              console.log("----------------");
              console.log(`Frontend: We have recevied "users" wishlist. We will now parse them`);
              let qList = res.data[0].gift;
              console.log(qList);
              console.log("----------------");
              for (let i in qList) {
                  queryString_WL += `searchTopics[]=${qList[i]}&`;
              }
              queryString_WL = queryString_WL.slice(0, -1);
              console.log(queryString_WL);
              serverPath += queryString_WL;
              console.log(serverPath);

              // Calling axios based on the user's select choice (username or gift)
              console.log(`Frontend: The server we are connecting to is: ${serverPath}`)
              axios.get(serverPath, this.state)
                .then(res => {
                  console.log(`Frontend: We have received a wishlist gift suggestion for "${typedInput}"`);
                  console.log(res);
                  // store returned gift suggestions in our state
                  this.setState({ wishlist: res.data[0] });
                  console.log(serverPath);
                }).catch(res => {
                  console.log(res);
                  console.log("Frontend: There was an error when trying to search the gift");
                })
            }).catch(res => {
              console.log(res);
              console.log("Frontend: There was an error when trying to search the user you typed.");
              this.setState({ displayNonExistentUserMessage: true, loading: false });
            })

        }).catch(res => {
          console.log(res);
          console.log("Frontend: There was an error when trying to search the gift.");
        })
    }).catch(res => {
      console.log(res);
      console.log("Frontend: There was an error when trying to search the user you typed.");
      this.setState({ displayNonExistentUserMessage: true, loading: false });
    });
  }

  /* Opens or closes popup for showing searched user's profile. */
  toggleProfilePopup() {
    this.setState({ displayProfile: !this.state.displayProfile });
  };

  componentDidMount() {
    console.log(this.state)

    axios.get('http://localhost:3010/v0/authenticate', this.state) //The port of the server
      .then(res => {
        if (res.data[0].username !== "") {
          this.setState({ user: res.data[0].firstname });
          console.log(`Your name is: ${this.state.user}`);
        } else {
          this.props.history.push('/sign_in');
        }
      }).catch(res => {
        console.log(res);
      })

    // Get most watched items (automatically displays before user searches for anything).
    // http://svcs.ebay.com/MerchandisingService?OPERATION-NAME=getMostWatchedItems&SERVICE-NAME=MerchandisingService&SERVICE-VERSION=1.1.0&CONSUMER-ID=VenusKu-PerfectG-PRD-7b1a5ba56-51f91256&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&maxResults=5
  }

  // Function to show interest based on wishlist item.
  findInterest(wishlistItem) {
    console.log(`usernameinterests are: ${this.state.usernameInterests}`);
    console.log(`usernameinterests length is: ${this.state.usernameInterests[0]}`);
    for(var index = 0; index < this.state.usernameInterests.length; index++){
      if ((wishlistItem === undefined) || this.state.usernameInterests[index] === undefined) {
        alert(`Hello ${this.state.user}! You are getting this error message because eBay could not find gift suggestions for the searched user's wishlist item. eBay cannot find the item correctly because: 1. There is a typo in one of their wishlist items. 2. Their wishlist item is not the full name of the item.`);
        return;
      }
      if (this.state.usernameInterests[index].toUpperCase().includes(wishlistItem.toUpperCase()) || wishlistItem.toUpperCase().includes(this.state.usernameInterests[index].toUpperCase())) {
        console.log(`this.state.usernameInterests[index] is: ${this.state.usernameInterests[index]}`);
        return this.state.usernameInterests[index];
      }
    }
    return "";
  }

  /* Renders the whole Home page. */
  render() {
    const { placeholderText, typedInput } = this.state;

    const errorMessage_user =
      <div className="giftSuggestionWrapper">
        <div className="giftImgBackground">
          <img
            src={NoUser}
            alt="nonexistent user"
            className="homePic"
          />
        </div>
        <div className="giftInfo">
          <div className="giftName blue varela error">Error</div>
          <div className="moreGiftInfo">
            <div className="giftWishlistText grey gothic">This user does not exist!<br/>Please make sure you spelled the user's username/email correctly.</div>
          </div>
        </div>
      </div>;

    const errorMessage_gift =
    <div className="giftSuggestionWrapper">
      <div className="giftImgBackground">
        <img
          src={NoGift}
          alt="no gift suggestion"
          className="homePic"
        />
      </div>
      <div className="giftInfo">
        <div className="giftName blue varela error">Error</div>
        <div className="moreGiftInfo">
          <div className="giftWishlistText grey gothic">The gift you searched for has no gift suggestions!<br/>Please make sure you spelled the gift correctly.</div>
        </div>
      </div>
    </div>;

    /* If searching by gift or based on a user's interests, display each gift suggestion returned by the eBay API. */
    const displayGiftSuggestions = [];
    for (const searchTopic in this.state.gifts) {
      console.log(searchTopic)
      if (searchTopic !== "searchby" && searchTopic !== "typedInput") {
        const giftName = this.state.gifts[searchTopic][0];
        const giftPic = this.state.gifts[searchTopic][1];
        const picText = `picture of ${giftName}`;
        const giftLink = this.state.gifts[searchTopic][2];
        const relatedInterest = this.state.gifts[searchTopic][3];   // empty string if user searched by gift
        console.log(`relatedInterest in questionnaire response is: ${relatedInterest}`);

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

    /* Displays each wishlist item's gift suggestion returned by the eBay API. */
    const displayWishlistSuggestions = [];
    for (const gift in this.state.wishlist) {
      console.log(gift);
      if (gift !== "searchby" && gift !== "typedInput") {
        const giftName = this.state.wishlist[gift][0];
        const giftPic = this.state.wishlist[gift][1];
        const picText = `picture of ${giftName}`;
        const giftLink = this.state.wishlist[gift][2];
        const wishlistItem = this.state.wishlist[gift][3];
        // call findInterest to figure out if gift suggestion matches an interest (returns a string containing the interest, else empty string if there's no related interest)
        const relatedInterest = this.findInterest(wishlistItem);
        console.log(`relatedInterest in wishlists is: ${relatedInterest}`);

        displayWishlistSuggestions.push(
          <div className="giftSuggestionWrapper" key={giftName}>
            <div className="giftImgBackground"><img src={giftPic} alt={picText} className="gift-img"/></div>
            <div className="giftInfo">
              <a href={giftLink} className="giftName blue varela">{giftName}</a>
              <div className="moreGiftInfo">
                {relatedInterest !== ""
                  ? <div className="interestInfo grey gothic" style={{ display: relatedInterest }}>
                    <p className="interestLabel">Interest</p>
                    <p className="giftInterestTopic">{relatedInterest}</p>
                  </div>
                : null}
                <div className="wishlistInfo">
                  <Heart className="giftHeartPic"/>
                  <div className="giftWishlistText grey gothic">Wishlist Item</div>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }

    return (
      <div className="Home">
        <Navbar/>
        <div className="homeContent">
          
          {/* Greeting and Picture */}
          <header className="homeGreeting">
            <p className="hello blue varela flexItem">Hello, {this.state.user}!</p>
            <p className="blue gothic flexItem">What gift are you looking for today?</p>
            <img
              src={HomeImage}
              alt="the gifters"
              className="homePic"
            />
          </header>
          {/* Searchbar and Dropdown */}
          <form className="homeSearchbarBackground" onSubmit={this.handleSearchbarSubmit}>
            <label className="dropDown smallText">
              <select
                value={this.state.value}
                onChange={this.handleDropdownChange}
                className="homeSelect varela blue"
              >
                <option className="homeOption" value="Select a way to search">&nbsp;Search by...</option>
                <option className="homeOption" value="Search by username/email">&nbsp;Username/Email</option>
                <option className="homeOption" value="Search for a gift">&nbsp;Gift</option>
              </select>
            </label>
            <div className="searchbar">
              <input
                type="text"
                className="searchInput gothic"
                placeholder={placeholderText}
                value={typedInput}
                name="typedInput"
                onChange={this.handleSearchbarInput}
              />
              <div className="searchButton" onClick={this.handleSearchbarSubmit}><MagnifyGlass className="searchButtonIcon"/></div>
            </div>
          </form>
          {/* Error Messages */}
          <div className="reminderWrapper">
            {this.state.noSearchByMethodChosen ? <p className="reminder">Please select a way to search in the dropdown menu above.</p> : null}
            {this.state.noSearchbarInput ? <p className="reminder">Don't forget to input what you're searching in the search bar!</p> : null}
          </div>
          {this.state.displayNonExistentUserMessage ? errorMessage_user : null}
          {this.state.displayBadGiftSearchMessage ? errorMessage_gift : null}
          {/* View Searched User's Profile */}
          {this.state.displayViewProfileButton ? <button className="viewProfile" onClick={this.toggleProfilePopup}>View {this.state.searchedUsername}&#39;s Profile</button> : null}
          {this.state.displayProfile ? <SearchedUserProfilePopup toggle={this.toggleProfilePopup} searchedUser={this.state.searchedUsername}/> : null}
          {/* Gift Suggestions */}
          {displayGiftSuggestions}
          {displayWishlistSuggestions}
          <div className="loading">{this.state.loading ? <><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></>: null}</div>
        </div>
      </div>
    );
  }
}

export default Home;
