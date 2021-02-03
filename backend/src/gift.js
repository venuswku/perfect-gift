const db = require('./db');
const bcrypt = require("bcrypt");
const saltRounds = 10;

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
    // get input from Create Account page
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

    console.log('username entered:', username);
    // send response to post request
    db.query(
        "INSERT INTO questionnaireresponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        [username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise],
        (err, result) => {
            console.log(err);
        },
    );
    
    // check if post request was successful
    if (username) {
        const userResponses = await db.selectQResponses(username);
        res.status(200).json("Gifter's questionnaire responses are stored!", userResponses);
    }
    else {
        res.status(404).send();
    }
};

exports.login = async (req, res) => {
    console.log("We are going to authenticate the request that the frontend has given us")
    console.log("The frontend has given us:")
    console.log(req.body.username, req.body.password)
    var oneUser = false
    //res.status(200).send()

    // If a username is passed into query param (name of query is username, in openapi.yaml)
    if (req.body.username) {
        console.log("Entered IF")
        // Get the single user's data if the user is selected
        await bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            oneUser = await db.authenticateUser(req.body.username, hash);
            console.log(hash)
            //console.log(oneUser)
        })
        console.log("Exited DB function")
        if (oneUser) {
            console.log("One User True")
            res.status(200).json(oneUser);
        } else {
            console.log("One User False")
            console.log(oneUser)
            res.status(404).send();
        }
    }
}