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

  }

  handleSubmit(event) {
    console.log("Frontend: We are going to request to store the wishlist gift.");
    event.preventDefault();
    axios.post("http://localhost:3010/v0/storeWLGift", [this.state])
    .then(response => {
      console.log('===================')
      console.log("Frontend: We have successfully stored the wishlist gift into our database.")
      console.log(this.props)
      console.log(response)
      console.log(this.state.WLGiftToStore)
      //this.setState({wlresponse: newParent})
      this.props.updateWishlist(this.state.WLGiftToStore)
      console.log('===================')
    }).catch(error => {
      console.log("There was an error when trying to store the wishlist gift into the database")
      console.log(error)
    })
  }

  handleChange(event) {
    console.log("Frontend: Handling change");
    this.setState({
      WLGiftToStore: event.target.value
    });
    event.preventDefault();
  }

  render() {
    return (
      <div className="wishlist">
        <p className="addWishlistItemTitle">What item would you want as a gift?</p>
        <form onSubmit={this.handleSubmit}>
          <span>
            <input type="text" value ={this.WLGiftToStore} placeholder="Enter wishlist item here" onChange={this.handleChange} className="wishlistItemInputBox"/>
          </span>
        </form>
      </div>
    );
  }
}

export default AddToWishlistPopup;
