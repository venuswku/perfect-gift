import React from "react";
import axios from 'axios';
import "./AddToWishlistPopup.css";

// Class to make a screen popup when the user
// clicks the "+" icon when they want to add a wishlist item
class AddToWishlistPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      WLGiftToStore: ''
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUndo = this.handleUndo.bind(this);
  }

  handleSubmit(event) {
    // Only add item to wishlist if it has at least 1 non-whitespace character.
    if (((/\S/.test(this.state.WLGiftToStore))) && (this.state.WLGiftToStore !== "")) {
      // Check if wishlist item is spelled correctly (make sure it's an actual item that can be searched on eBay).
      axios.get(`http://localhost:3010/v0/giftapi/searchgift?searchTopics[]=${this.state.WLGiftToStore}`, this.state)
        .then(res => {
          console.log(res);
          if (res.data !== "Failed") {
            console.log(`AddToWishlistPopup.js: ${this.state.WLGiftToStore} is a searchable gift on eBay!`);
            // Store wishlist item to backend.
            console.log("Frontend: We are going to request to store the wishlist gift.");
              event.preventDefault();
              axios.post("http://localhost:3010/v0/storeWLGift", [this.state])
              .then(response => {
                console.log('===================')
                console.log("Frontend: We have successfully stored the wishlist gift into our database.")
                // console.log(this.props)
                console.log(response)
                // console.log(this.state.WLGiftToStore)
                this.props.updateWishlist(this.state.WLGiftToStore);
                console.log('===================')
              }).catch(error => {
                console.log("There was an error when trying to store the wishlist gift into the database")
                console.log(error)
              });
          } else {
            console.log(`AddToWishlistPopup.js: ${this.state.WLGiftToStore} is NOT searchable on eBay!`);
            // tell user that wishlist item that they're trying to add isn't searchable
            alert(`Hello ${this.props.firstname}! You are getting this error message because the item that you want to add to your wishlist isn't searchable on eBay. To fix this, you can either: 1. Check if there is a typo in one of your wishlist items. 2. Make sure the wishlist item is the full name of the item or else eBay cannot find the item correctly.`);
          }
        }).catch(res => {
          console.log("AddToWishlistPopup.js: call to eBay API failed");
          console.log(res);
        })
    }
    // Close popup for adding a wishlist item.
    this.props.toggle();
  }

  handleChange(event) {
    console.log("Frontend: Handling change");
    this.setState({
      WLGiftToStore: (event.target.value).trim(),
    });
    event.preventDefault();
  }

  handleUndo() {
    this.props.toggle();
  }

  render() {
    return (
      <div className="wishlistItemPopup">
        <p className="addWishlistItemTitle">What item would you want as a gift?</p>
        <form onSubmit={this.handleSubmit}>
          <span>
            <input type="text" value={this.WLGiftToStore} placeholder="Enter wishlist item here" onChange={this.handleChange} className="wishlistItemInputBox"/>
          </span>
        </form>
        <div className="saveUndoButtons">
          <button onClick={this.handleSubmit} className="usernameButton">Save</button>
          <button onClick={this.handleUndo} className="usernameButton">Undo</button>
        </div>
      </div>
    );
  }
}

export default AddToWishlistPopup;
