import React, { Fragment } from "react";
//import axios from 'axios';
import "./AddToWishlistPopup.css";

// Class to make a screen popup when the user
// clicks the "+" icon when they want to add a wishlist item
class AddToWishlistPopup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleSubmit(event) {
    console.log("Done");
    event.preventDefault();
  }

  handleChange(event) {
    console.log("Frontend: Handling change");
    event.preventDefault();
  }

  render() {
    return (
      <Fragment>
        <section className="wishlist">
          <p className='cool-red'>Search below to add a new item to your wishlist</p>

          <form onSubmit={this.handleSubmit}>
            <label>
              <input type="text" placeholder="Enter wishlist item here" onChange={this.handleChange}></input>
              
            </label>
          </form>
        </section>
      </Fragment>
    );
  }
}

export default AddToWishlistPopup;
