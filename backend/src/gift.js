const db = require('./db');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// gets a single user or all of the users from the giftusers table
exports.getUsers = async (req, res) => {
    // If a username is passed into query param (name of query is username, in openapi.yaml)
    if (req.query.username) {
        // Get the single user's data if the user is selected
        const oneUser = await db.selectUsers(req.query.username);
        if (oneUser) {
            res.status(200).json(oneUser);
        } else {
            res.status(404).send();
        }
    } else { // get all users from database if none are passed into parameter
        const allUsers = await db.selectUsers([]);
        res.status(200).json(allUsers);
    }
};

exports.getQResponse = async (req, res) => {
    // app.js passes username to gift.js
    if (req.query.username) {
        // gift.js sends username to db.js. 
        const oneUser = await db.selectQResponses(req.query.username);
        // if db.js returns q response, send 200 and the response attached
        if (oneUser) {
            res.status(200).json(oneUser);
        } else {
            res.status(404).send();
        }
    }
    //if no info found, sends []
};

exports.postQResponse = async (req, res) => {
    console.log('gift.js: postQResponse called');

    // get user input from Create Account page
    const username = req.body.username;
    const outdooractivity = req.body.outdooractivity;
    const place = req.body.place;
    const store = req.body.store;
    const musicgenre = req.body.musicgenre;
    const musician = req.body.musician;
    const band = req.body.band;
    const indooractivity = req.body.indooractivity;
    const movietvshow = req.body.movietvshow;
    const videogame = req.body.videogame;
    const sport = req.body.sport;
    const sportsteam = req.body.sportsteam;
    const exercise = req.body.exercise;

    // insert questionnaire responses in questionnareresponses table
    db.insertQResponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise);

    // check if post request was successful
    if (username) {
        const userResponses = await db.selectQResponses(username);
        console.log("successful input");
        res.status(200).json("Gifter's questionnaire responses are stored!", userResponses);
    }
    else {
        console.log("failz");
        res.status(404).send();
    }
};

// Checks if login credentials are valid
exports.login = async (req, res) => {
    console.log("We are going to authenticate the request that the frontend has given us")
    console.log("The frontend has given us:")
    try {
        console.log(req.body.username, req.body.password)
        const oneUser = await db.authenticateUser(req.body.username);
        const stored_pass = oneUser[0]['userpassword'];
        console.log(oneUser)
        console.log(stored_pass)
    
        // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        //     console.log(hash);
        // });
    
        if (stored_pass.length > 0) {
    
            bcrypt.compare(req.body.password, stored_pass, (err, result) => {
                if (result){
                    console.log("AUTHENTICATED")
                    req.session.user = oneUser[0]['username']
                    console.log(req.session.user)
                    res.send(oneUser[0]['username']);
                } else{
                    // Send JWT or Cookie
                    console.log("NOT AUTHENTICATED")
                    res.send("");
                }
            })
        } else {
            console.log("Result too small")
            res.send("");
        }
    }catch {
        console.log("There was an error")
        res.send("");
    } 
    
};

// This function check is the user has a cookie.
// If they do, they are allowed to be on the website
// Else, they will be redirected to the login page (done in the frontend)
// Note to self: Make sure to remove the password when sending back the data to frontend
exports.checkLogin = async (req, res) => {
        console.log("Recieved Request")
        console.log(req.body.user)

        console.log(req.session.user)
        if (req.session.user){
          console.log("Enters IF")
          const userInfo = await db.selectUsers(req.session.user)
          const firstName = userInfo[0]['firstname']
          const lastName = userInfo[0]['lastname']
          console.log("bug below")
          console.log(firstName)
          console.log(lastName)
          console.log("bug above")
          console.log(userInfo)
          res.send([{ username: req.session.user, userpassword: "null", firstname: firstName, lastname: lastName, useremail: "null@null.com", avatar: "null", showavatar: false }])
        } else {
          res.send([{ username: "", userpassword: "null", firstname: "null", lastname: "null", useremail: "null@null.com", avatar: "null", showavatar: false }])
        }
      
};


exports.logout = async (req,res) => {
    console.log("The server has receive your logout request.")
    console.log("We are going to authenticate the request that the frontend has given us")
    
    try {
        console.log("The frontend has given us:")
        //console.log(req.body.username, req.body.password)
        //const oneUser = await db.authenticateUser(req.body.username);
        const stored_pass = oneUser[0]['userpassword'];
        console.log(oneUser)
        console.log(stored_pass)
    
        // bcrypt.hash(req.body.password, saltRounds, function(err, hash) {
        //     console.log(hash);
        // });
    
        if (stored_pass.length > 0) {
    
            bcrypt.compare(req.body.password, stored_pass, (err, result) => {
                if (result){
                    console.log("AUTHENTICATED")
                    req.session.user = oneUser[0]['username']
                    console.log(req.session.user)
                    res.send(oneUser[0]['username']);
                } else{
                    // Send JWT or Cookie
                    console.log("NOT AUTHENTICATED")
                    res.send("");
                }
            })
        } else {
            console.log("Result too small")
            res.send("");
        }
    }catch {
        console.log("There was an error")
        res.send("");
    } 
};
