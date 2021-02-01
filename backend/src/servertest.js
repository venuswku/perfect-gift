// For getting access to DB
//const {Client} = require('pg') 

//To make a server
const express = require('express'); 
const app = express();

//To encrypt passwords
//const bcrypt = require('bcrypt');

//Not being used
//const path = require('path');

//Very important, this allows for our react app to interact with our server
//Without it, the react app and server won't be able to communicate (unless you do a build approach)
const cors = require('cors')
app.use(cors())
app.use(express.json())

//This gets the information from the server's root directory
app.get('/', (req, res) => {
  console.log("here")
  res.send("express here")
})

//TODO:Try and catch
//This lets the user post to the login page and potentially sign in
app.post('/authenticate', (req,res) => {
  console.log("We are going to authenticate the request that the frontend has given us")
  console.log("The frontend has give us:")
  console.log(req.body.username, req.body.password)
  
})

//Used for server to keep running
app.listen(3001, () => {
    console.log("Perfect gift server is up")
})
