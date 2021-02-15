import React, { Fragment } from "react";
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
      console.log("Frontend: We have successfully stored the wishlist gift into our database.")
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
      <Fragment>
        <section className="wishlist">
          <p className='cool-red'>Search below to add a new item to your wishlist</p>

          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" value ={this.WLGiftToStore} placeholder="Enter wishlist item here" onChange={this.handleChange}></input>
              
            </label>
          </form>
        </section>
      </Fragment>
    );
  }
}

export default AddToWishlistPopup;
