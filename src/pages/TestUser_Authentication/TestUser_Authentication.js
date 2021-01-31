import React, {Component} from 'react';
import axios from "axios";

class TestUser_Authentication extends Component{
constructor(props) {
  super(props)

  //These are the items that we will be able to send to the server
  this.state = {
    //users: []
    username:'',
    password:'',
    //title: '',
    //body: '',
  }
}


//This function runs when the DOM is rendered.
//So when the user goes to this page, we can fetch data from
//the database and display it to the webpage.
//Need to work on authentication first
/*
componentDidMount() {
  fetch('http://localhost:3000/users') //The port of the server
  .then(response => response.json())
  .then(res => {
    if (res && res.data) {
      console.log(res.data)
      this.setState({users: [...this.state.users, ...res.data]})
    }
  })
}
*/

//Used to make sure text box value is the same as the one in this.state
changeHandler = (e) =>{
  this.setState({[e.target.name]: e.target.value})
}

// This is called when you press the submit button,
// The react app sends all its data in this.state to the server
// and the server can process it however it wants to (query, store, etc)
submitHandler = (e) => {
  e.preventDefault()
  console.log(this.state)
  console.log("We are submitting a user to either autheticate, or create")
  axios.post('http://localhost:3001/authenticate', this.state)
  .then(response => {
    console.log(response)
  })
  .catch(error => {
    console.log(error)
  })
}

  render() {
    const {username, password} = this.state
  return (
    <div className="UserAuth">
        <form onSubmit={this.submitHandler}>
          <input 
          type="text"
          name="username"
          value={username}
          placeholder="Enter username"
          onChange={this.changeHandler}/>
          <input 
          type="text"
          name="password"
          value={password}
          placeholder="Enter password"
          onChange={this.changeHandler}/>
        <button type="submit">Submit</button>
        </form>
    </div>
  );
  }
}

export default TestUser_Authentication;
