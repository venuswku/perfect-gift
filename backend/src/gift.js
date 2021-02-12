const db = require('./db');
const bcrypt = require("bcrypt");
const saltRounds = 10;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const axios = require('axios');

/* Gets a single user or all of the users from the giftusers table. */
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
        res.status(200).json([allUsers]);
    }
};

/* Posts new user's login info. */
exports.postUser = async (req, res) => {
    try {
        console.log('gift.js: postUser called');

        // get user input from Create Account page
        const username = req.body[0].username;
        let userpassword = bcrypt.hashSync(req.body[0].userpassword, 10);
        const firstname = req.body[0].firstname;
        const lastname = req.body[0].lastname;
        const useremail = req.body[0].useremail;
        const avatar = req.body[0].avatar;
        const showavatar = req.body[0].showavatar;

        // insert questionnaire responses in questionnareresponses table
        db.insertUser(username, userpassword, firstname, lastname, useremail, avatar, showavatar);

        // check if post request was successful
        const userExists = await db.selectUsers(username);
        if (userExists) {
            console.log("gift.js: postUser: Gifter's user data are stored!");
            res.status(201).json(userExists);
            console.log("gift.js: postUser: we are getting 201 success");
        }
    } catch {
        console.log("gift.js: postUser: user failz");
        res.status(404).send();
    }
};

/* Puts user's updated login info. */
// exports.putUser = async (req, res) => {
//     if (req.query.username) {
//         // const newUsername = req.query.username;
//         const newUsername = req.body.username;
//         const email = req.body.useremail;
//         const user = await db.updateUsername(newUsername, email);
//         // const user = await db.updateUsername(req.query.username, req.body.username);
//         console.log("User data is" + user);
//         if (user.rowCount === 1) {
//             res.status(204).send();
//         } else {
//             res.status(404).send();
//         }
//     }
// };

/* Gets user's questionnaire responses/interests. */
exports.getQResponse = async (req, res) => {
    console.log('gift.js: getQResponse: start function');
    const username = req.session.user;
    if (username) {
        console.log('gift.js: getQResponse: in if statement');
        const oneUser = await db.selectQResponses(username);
        if (oneUser) {
            console.log('gift.js: getQResponse: oneUser is', [oneUser]);
            res.send([oneUser]);
            // res.status(200).json(oneUser);
        } else {
            console.log('gift.js: getQResponse: wasnt returned row');
            res.status(404).send();
        }
    }
    console.log('gift.js: getQResponse: end function');
};

/* Posts new user's questionnaire responses/interests. */
exports.postQResponse = async (req, res) => {
    try {
        console.log('gift.js: postQResponse: is called');

        // get user input from Create Account page
        const username = req.body[0].username;
        const outdooractivity = req.body[0].outdooractivity;
        const place = req.body[0].place;
        const store = req.body[0].store;
        const musicgenre = req.body[0].musicgenre;
        const musician = req.body[0].musician;
        const band = req.body[0].band;
        const indooractivity = req.body[0].indooractivity;
        const movietvshow = req.body[0].movietvshow;
        const videogame = req.body[0].videogame;
        const sport = req.body[0].sport;
        const sportsteam = req.body[0].sportsteam;
        const exercise = req.body[0].exercise;

        // insert questionnaire responses in questionnareresponses table
        const yesInsert = await db.insertQResponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise);

        // check if post request was successful
        if (yesInsert) {
            const userResponses = await db.selectQResponses(username);
            console.log("gift.js: postQResponse: Gifter's questionnaire responses are stored!");
            res.status(201).json(userResponses);
            console.log("gift.js: postQResponse: we are getting 201 success");
        }
    } catch {
        console.log("gift.js: postQResponse: qr failz");
        res.status(404).send();
    }
};

/* Puts user's updated questionnaire responses/interests. */
exports.putQResponse = async (req, res) => {
    try {
        // get username from route parameters
        const username = req.params.username;
        console.log("gift.js: putQResponse for", username);
        
        // get user changes from Edit Interests Popup
        const outdooractivity = req.body[0].outdooractivity;
        const place = req.body[0].place;
        const store = req.body[0].store;
        const musicgenre = req.body[0].musicgenre;
        const musician = req.body[0].musician;
        const band = req.body[0].band;
        const indooractivity = req.body[0].indooractivity;
        const movietvshow = req.body[0].movietvshow;
        const videogame = req.body[0].videogame;
        const sport = req.body[0].sport;
        const sportsteam = req.body[0].sportsteam;
        const exercise = req.body[0].exercise;

        // update questionnaire responses in questionnareresponses table
        const update = await db.updateQResponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise);

        // check if put request was successful
        const userChanges = await db.selectQResponses(username);
        if (userChanges) {
            console.log("gift.js: putQResponse: Gifter's questionnaire responses are successfully updated!");
            res.status(200).json([userChanges]);
            console.log("gift.js: putQResponse: we are getting 200 OK");
        }
    } catch {
        console.log("gift.js: putQResponse: qr failz");
        res.status(409).send();
    }
};

/* Checks if login credentials are valid. */
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
                if (result) {
                    console.log("AUTHENTICATED")
                    req.session.user = oneUser[0]['username']
                    console.log(req.session.user)
                    res.send(oneUser[0]['username']);
                } else {
                    // Send JWT or Cookie
                    console.log("NOT AUTHENTICATED")
                    res.send("");
                }
            })
        } else {
            console.log("Result too small")
            res.send("");
        }
    } catch {
        console.log("There was an error")
        res.send("");
    }

};

/*
 * This function check is the user has a cookie.
 * If they do, they are allowed to be on the website.
 * Else, they will be redirected to the login page (done in the frontend).
 * Note to self: Make sure to remove the password when sending back the data to frontend.
*/
exports.checkLogin = async (req, res) => {
    console.log("Request: Check if user is logged in");
    console.log(req.body.user);

    console.log(req.session.user);
    if (req.session.user) {
        console.log("Enters IF")
        const userInfo = await db.selectUsers(req.session.user);
        const firstName = userInfo[0]['firstname'];
        const lastName = userInfo[0]['lastname'];
        const userName = userInfo[0]['username'];
        console.log("bug below")
        console.log(firstName);
        console.log(lastName);
        console.log(userName);
        console.log("bug above")
        console.log(userInfo)
        res.send([{ username: req.session.user, userpassword: "null", firstname: firstName, lastname: lastName, useremail: "null@null.com", avatar: "null", showavatar: false }])
    } else {
        res.send([{ username: "", userpassword: "null", firstname: "null", lastname: "null", useremail: "null@null.com", avatar: "null", showavatar: false }])
    }

};

/* Logs out a user. */
exports.logout = async (req, res) => {
    console.log("Request: Logout")
    // Try to see if everything is working as expected
    try {

        console.log(req.session.user)
        if (req.session.user) { // Check to see if the user has a cookie
            req.session.user = "" //We delete the cookie from the user's computer
            res.send("Successfully logged out") //Sends the ok to the frontend that the cookie that lets a user stay logged in has been deleted
        } else {
            res.send("Error when deleting users cookies") // In deleting the cookie fails.
        }
    }
    // Otherwise, we catch an error and send it back to the frontend
    catch {
        console.log("There was an error")
        res.send("Failed to logout");
    }
};

/* Gets a user's wish list. */
// Temporarily postponed to work on gift API
exports.getUserWishlist = async (req, res) => {
    console.log("Server: I got your response to fetch the user's wishlist")
    try {
        console.log(`Server: The user I received from you is: ${req.session.user}`)
        if(req.session.user) {
            console.log(`Server: The user is : ${req.session.user}`)
            res.send("Approved")
        }
        else {
            console.log(`Server: The user you gave us is invalid`)
        }
    }
    catch {
        console.log(`Server: Sorry, something in the server has occured.`)
        res.send(`Server: User does not exist or isn't logged in; Failed to get wishlist from database`)
    }
}

// This will return a gift suggestion for the user
axios.defaults.withCredentials = true;
exports.giftapi = async (req, res) => {
    
    try {
        console.log(req.body.typedInput)
        console.log("------------------------")
        console.log("Server: You are trying to get a gift suggestion. We are going to process it now.")
        const response = await axios.get('https://open.api.ebay.com/shopping?version=515&appid=CarlosVi-PerfectG-PRD-26a7b2fae-e210886d&callname=FindItems&QueryKeywords=dog&itemSort=BestMatch', {}) //The port of the server
        console.log("Server: Your gift suggestion request was successful.")
        console.log(response.data)
        res.send("Successful")
    }
    catch {
        console.log("Server: Your gift suggestion request was unsuccessful. ")
        res.send("Failed")
    }
}
