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

exports.login = async (req, res) => {
    console.log("We are going to authenticate the request that the frontend has given us")
    console.log("The frontend has given us:")
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
                req.session.user = oneUser[0]
                console.log(req.session.user)
                res.status(200).send();
            } else{
                // Send JWT or Cookie
                console.log("NOT AUTHENTICATED")
                res.status(500).send();
            }
        })
    } else {
        console.log("Result too small")
        res.status(500).send();
    }
};