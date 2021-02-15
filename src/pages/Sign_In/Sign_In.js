import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Sign_In.css';
import Navbar from '../../navigation/LogoNavbar/LogoNavbar';
import SignInImage from '../../images/sign_in_image.png';

axios.defaults.withCredentials = true;

class Sign_In extends Component {
    constructor(props) {
        super(props)
        //These are the items that we will be able to send to the server
        this.state = {
          username:'',
          password:'',
          wrongPassword:"",
        }
      }

      //Used to make sure text box value is the same as the one in this.state
  changeHandler = (e) =>{
    this.setState({[e.target.name]: e.target.value})
  }
  
  componentDidMount() {
    axios.get('http://localhost:3010/v0/authenticate', this.state) //The port of the server
    .then(res => {
        if (res.data[0].username !== ""){
          this.props.history.push('/profile')
        }
    }).catch(res => {
        console.log(res)
    })
  }

  // This is called when you press the submit button,
  // The react app sends all its data in this.state to the server
  // and the server can process it however it wants to (query, store, etc)
  submitHandler = (e) => {
    e.preventDefault()
    console.log(this.state)
    console.log("We are submitting a user to either autheticate, or create")
    axios.post('http://localhost:3010/v0/authenticate', this.state)
    .then(response => {
      if (response.data === ""){
        console.log("Not Logged In")
        this.setState({wrongPassword: "The password/username combination you entered is incorrect. Try again."})
      }
      else {
        console.log("Logged In")
        this.props.history.push('/profile')
      }
    })
    .catch(error => {
      console.log(error)
      console.log("You inputted a wrong username/password combination")
    })
  }

  wrongPassword
    
    render() {
    const {username, password} = this.state
    return (
        <div className="SignIn">
            <Navbar/>
            <div className="signInContent">
                <img src={SignInImage} className="signInPic" alt="connect with others" />
                <div className="signInForm">
                    <p className="signInTitle">Sign In</p>
                    <p className="signInBenefits">Get personalized gift suggestions and share your own gift wishlist!</p>
                    <form className="userInfo" onSubmit={this.submitHandler}>
                      <div className="wrongPassword">{this.state.wrongPassword}</div>
                        <div className="usernamePassword">
                            <label htmlFor='username' className='signInLabel'>Username</label>
                            <input type='text' name='username' value={username} className='signInTextbox' onChange={this.changeHandler}></input>
                        </div>
                        <div className="usernamePassword">
                            <label htmlFor='password' className='signInLabel'>Password</label>
                            <input type='password' name='password' value={password} className='signInTextbox' onChange={this.changeHandler}></input>
                        </div>
                        <div className="createAccountOrContinue">
                            <div className="firstTime">
                                Is this your first time?
                                <Link to="/create_account" className="create">Create an account</Link>
                            </div>
                            <input type='submit' value='Continue' className='continue'></input>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
    }
}

export default Sign_In;