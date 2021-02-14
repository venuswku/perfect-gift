import React from "react";
import "./Home.css";
import Navbar from "../../navigation/HomeNavbar/HomeNavbar";
import HomeImage from "../../images/create_account_image.png";
import { ReactComponent as MagnifyGlass } from "../../images/magnify_glass_grey.svg";
import { ReactComponent as Hockey } from "../../images/hockey.svg";
import { ReactComponent as Heart } from "../../images/heart.svg";
import axios from 'axios';
import { FormLabel } from "react-bootstrap";

//axios.defaults.withCredentials = true; //Might need this
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "Search by..",
                   placeholderText: "Select a way to search",
                   typedInput: "",
                   user: "",
                  // array containing user's interests (used to search for gifts in eBay API)
                   usernameInterests: [],
                  // object containing gift suggestions (response returned by eBay API)
                   gifts: {}
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


  // When the user hits enter, it will send the string to the server
  handleSubmit(event) {
    const {value, placeholderText, typedInput} = this.state
    let serverPath = "http://localhost:3010/v0/giftapi"
    console.log("Frontend: We are going to submit your search request to the server")

    try {
      
      // If the input the user input was not empty
      if(typedInput !=="") {
        console.log(`Frontend: You have entered: "${typedInput}"`)


          // Getting typed user's interests.
          axios.get(`http://localhost:3010/v0/getQResponse?typedInput=${typedInput}`)
          .then(res => {
              // If the user is searching for a username
              if(value === "Search for username") {
                let queryString = '/searchusername?'
                console.log(`Frontend: We will fetch the interests for the username:"${typedInput}"`)   
                
            // Parsing the response
            console.log(`Frontend: We have recevied "users" list of interests. We will now parse them`)    
            let qList= res.data[0]
            let tempUserInterests = []
            for(let [k,v] of Object.entries(qList)) {
              console.log(k, v)
              if(v !== '' && k !== "username") {
                tempUserInterests.push(v)
                queryString += `searchTopics[]=${v}&`
              }
              
            }
            queryString = queryString.slice(0,-1)
            console.log(queryString)
            serverPath += queryString
            //console.log(serverPath)

          }
                  // If the user is searching for a gift
        else if(value === "Search for a gift") {
          console.log(`Frontend: We will search for the gift:"${typedInput}"`)
          serverPath += `/searchgift?searchTopics[]=${typedInput}`
        } 
        
        // The user is searching using the "Search by" option
        else {
          throw new Error("FrontEnd Error")
        }
      

        // Calling axios based on the user's select choice (user or gift)
        console.log(`Frontend: The server we are connecting to is: ${serverPath}`)
        //while(serverPath === "http://localhost:3010/v0/giftapi?")
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
          }).catch(res => {     
              console.log(res)
              console.log("Frontend: There was an error when trying to search the user you typed.")       
            })
        
        


        
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
    
    axios.get('http://localhost:3010/v0/authenticate', this.state) //The port of the server
    .then(res => {
        if (res.data[0].username !== ""){
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
    const {value, placeholderText, typedInput, user} = this.state;

    // display each gift returned by eBay API
    const displayGiftSuggestions = [];
    for (const searchTopic in this.state.gifts) {
      if (searchTopic !== "searchby" && searchTopic !== "typedInput") {
        const giftName = this.state.gifts[searchTopic][0];
        const giftPic = this.state.gifts[searchTopic][1];
        const picText = `picture of ${giftName}`;
        const giftLink = this.state.gifts[searchTopic][2];
        const relatedInterest = this.state.gifts[searchTopic][3];   // empty string if user searched by gift

        displayGiftSuggestions.push(
          <div className="gift-main">
            <img src={giftPic} alt={picText}></img>
            <a href={giftLink} className="gift-name blue varela">{giftName}</a>
            {relatedInterest !== ""
              ? <div className ="gift-right">
                  <p className="gift-interest-text grey gothic">Interest</p>
                  <p className="gift-interest-topic grey gothic">{relatedInterest}</p>
                </div>
              : null
            }
          </div>
        );
      }
    }

    return (
      <div className="Home">
        <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
        <Navbar />
        <div className="home-parent">
          {/*The greeting and picture*/}
          <div className="home-main">
            <header className="home-greeting">
              <p className="blue varela flex-item ">Hello, {this.state.user}!</p>
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
                <form onSubmit={this.handleSubmit}>
                <input
                  type="text"
                  className="white-searchbar gothic home-input"
                  placeholder={placeholderText}
                  value={typedInput}
                  name="typedInput"
                  onChange={this.handleUserInput}
                ></input>                
                <MagnifyGlass className="mag" />                
                  <label className="dropDown1 small-text">     
                    <select
                      value={this.state.value} /////////////
                      onChange={this.handleChange}
                      className = "varela home-select"
                    >
                      <option className = "home-option" value="Select a way to search">Search by..</option>
                      <option className = "home-option" value="Search for username">Username</option>
                      <option className = "home-option" value="Search for a gift">Gift</option>
                    </select>
                  </label>
                  
                  </form>
              </div >
              {/*The gift suggestion*/}
              {displayGiftSuggestions}
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
