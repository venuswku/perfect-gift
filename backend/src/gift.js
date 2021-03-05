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
        console.log('printing from inside getUsers function');
        // Get the single user's data if the user is selected
        const oneUser = await db.selectUsers(req.query.username);
        if (oneUser) {
            res.status(200).json(oneUser);
        } else {
            res.status(404).send();
        }
    }else if (req.query.useremail) {
        const oneUser = await db.selectUsersEmail(req.query.useremail);
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
exports.putUser = async (req, res) => {
    try {
        const oldUsername = req.params.username;
        if (oldUsername) {
            console.log("in putuser username is " + oldUsername);
            const newUsername = req.body[0].newUsername;

            // concat old and new usernames together to pass both of them into insertUser()
            let oldNewUsername = oldUsername + ' ' + newUsername;

            const updatedUser = await db.updateUsername(oldNewUsername);

            res.status(204).send();
            console.log("gift.js: putUser: Gifter's new username is updated!");
        }
    } catch {
        res.status(404).send();
        console.log("gift.js: putUser: user failz");
    }
};

/* Gets user's questionnaire responses/interests. */
exports.getQResponse = async (req, res) => {
    // app.js passes username to gift.js
    console.log('gift.js: getQResponse: backend');
    const username = req.params.username;
    console.log("gift.js: getQResponse for", username);

    if (username) {
        console.log('gift.js: getQResponse: in if statement');
        // gift.js sends username to db.js.
        const oneUser = await db.selectQResponses(username);
        console.log('gift.js getQResponse: ', oneUser);
        // if db.js returns q response, send 200 and the response attached
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
        const insertedResponses = await db.insertQResponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise);

        // check if post request was successful
        // if (insertedResponses) {
            // const userResponses = await db.selectQResponses(username);
            console.log("gift.js: postQResponse: Gifter's questionnaire responses are stored!");
            // res.status(201).json(userResponses);
            res.status(201).json([{username: username}]);
        // }
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

// "Removes" (in reality, empties string) for the corresponding questionnaire topic in the questionnaire table.
exports.removeQResponse = async (req, res) => {
    try {
        const username = req.params.username;
        const questionnaireTopic = req.params.questionnairetopic;
        console.log("gift.js: removeResponse for", username, "in", questionnaireTopic, "column");

        const remove = await db.deleteQResponse(username, questionnaireTopic);

        const userChanges = await db.selectQResponses(username);
        if (userChanges) {
            console.log("gift.js: removeQResponse: Gifter's questionnaire response is successfully deleted!");
            res.status(200).json([userChanges]);
            console.log("gift.js: removeQResponse: we are getting 200 OK");
        }
    }
    catch {
        console.log("gift.js: removeQResponse: qr failz");
        res.status(409).send();
    }
}

// Checks if login credentials are valid
exports.login = async (req, res) => {
    console.log("We are going to authenticate the request that the frontend has given us")
    console.log("The frontend has given us:")
    try {
        console.log(req.body.username, req.body.userpassword)
        const oneUser = await db.authenticateUser(req.body.username);
        const stored_pass = oneUser[0]['userpassword'];
        console.log(oneUser)
        console.log(stored_pass)

        if (stored_pass.length > 0) {

            bcrypt.compare(req.body.userpassword, stored_pass, (err, result) => {
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
 * Else, they will be redirected to the sign in page (done in the frontend).
 * Note to self: Make sure to remove the password when sending back the data to frontend.
*/
exports.checkLogin = async (req, res) => {
    console.log("Request: Check if user is logged in");
    console.log(req.session.user);
    if (req.session.user) {
        console.log("Enters IF")
        const userInfo = await db.selectUsers(req.session.user);
        const firstName = userInfo[0]['firstname'];
        const lastName = userInfo[0]['lastname'];
        const userName = userInfo[0]['username'];
        const userEmail = userInfo[0]['useremail'];
        console.log("bug below")
        console.log(firstName);
        console.log(lastName);
        console.log(userName);
        console.log("bug above")
        console.log(userInfo)
        res.send([{ username: req.session.user, userpassword: "null", firstname: firstName, lastname: lastName, useremail: userEmail, avatar: "null", showavatar: false }])
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

// This will return a gift suggestion(s) to the user
// It will send an array to the frontend that contains information about a gift in this format:
// giftSuggestions = [ [Gift name, Gift image, Gift redirect URL, Related interest (if user searched by username)], ... ,]
axios.defaults.withCredentials = true;
exports.giftapi = async (req, res) => {

    try {
        const searchMethod = req.params.searchby;
        console.log("User wants to search by", searchMethod);

        // We will store information about the gift suggestions in this array.
        let giftSuggestions = {}

        // We are iterating through the queries that the user has given us.
        for (const searchTopicsArray in req.query) {

            // If the query is actually an array a queries and not some other thing (Object prototype thingy)
            if (req.query.hasOwnProperty(searchTopicsArray)) {

                // go through each topic in the searched topics array
                let searchTopics = req.query[searchTopicsArray]
                console.log(searchTopics)
                for(let i in searchTopics) {
                    console.log(`Search topic ${i}: ${searchTopics[i]}`);
                    
                    // For each search topic, make API call to eBay to give us the image and link to the gift suggestion.
                    let apiCallLink = `https://open.api.ebay.com/shopping?version=515&appid=CarlosVi-PerfectG-PRD-26a7b2fae-e210886d&responseencoding=JSON&callname=FindItems&QueryKeywords=${searchTopics[i]}&itemSort=BestMatch`;
                    // const response = await axios.get(`https://open.api.ebay.com/shopping?version=515&appid=CarlosVi-PerfectG-PRD-26a7b2fae-e210886d&responseencoding=JSON&callname=FindProducts&QueryKeywords=${searchTopics[i]}&MaxEntries=1&ProductSort=Popularity`)
                    // ^ seems to give better results but maybe use it in the future

                    // return 10 gift suggestions if user used "Search by Gift" method
                    if (searchMethod === "searchgift") { apiCallLink = apiCallLink.concat("&MaxEntries=10"); }
                    // else return just 1 gift suggestion if "Search by Username/Email"
                    else { apiCallLink = apiCallLink.concat("&MaxEntries=1"); }
                    
                    // console.log(apiCallLink);
                    const response = await axios.get(apiCallLink);

                    // Store these results in variables and then store them in our giftSuggestions array
                    for (let itemNum = 0; itemNum < response.data.Item.length; itemNum++) {
                        console.log(response.data.Item[itemNum]);
                        const GIFT_INFO = [];
                        const GIFT_NAME = response.data.Item[itemNum].Title;
                        const GIFT_IMAGE_URL = response.data.Item[itemNum].GalleryURL;
                        const GIFT_URL_TO_GIFT = response.data.Item[itemNum].ViewItemURLForNaturalSearch;
                        let RELATED_INTEREST = "";
                        if (searchMethod === "searchusername") {
                            // remove the following additional keywords that we added to the search query (for better gift suggestions) -> seen in handleSearch() in Home.js
                            // so that RELATED_INTEREST contains exactly what user put for their interests
                            if ((searchTopics[i]).includes(' outdoors')) { RELATED_INTEREST = (searchTopics[i]).replace(' outdoors', ''); }
                            else if ((searchTopics[i]).includes(' music')) { RELATED_INTEREST = (searchTopics[i]).replace(' music', ''); }
                            else if ((searchTopics[i]).includes(' indoors')) { RELATED_INTEREST = (searchTopics[i]).replace(' indoors', ''); }
                            else if ((searchTopics[i]).includes(' entertainment')) { RELATED_INTEREST = (searchTopics[i]).replace(' entertainment', ''); }
                            else if ((searchTopics[i]).includes(' video game')) { RELATED_INTEREST = (searchTopics[i]).replace(' video game', ''); }
                            else if ((searchTopics[i]).includes(' sports team')) { RELATED_INTEREST = (searchTopics[i]).replace(' sports team', ''); }
                            else { RELATED_INTEREST = searchTopics[i]; }
                        }
                        console.log(GIFT_NAME);
                        console.log(GIFT_IMAGE_URL);
                        console.log(GIFT_URL_TO_GIFT);
                        GIFT_INFO.push(GIFT_NAME, GIFT_IMAGE_URL, GIFT_URL_TO_GIFT, RELATED_INTEREST);
                        giftSuggestions[GIFT_NAME] = GIFT_INFO;
                    }
                }
            }
        }

        // Sending all the data back to our frontend
        console.log("Server [SUCCESS]: We have processed all your gift suggestions");
        giftSuggestions['searchby'] = searchMethod;
        giftSuggestions['typedInput'] = "Success";
        console.log(giftSuggestions);
        res.send([giftSuggestions]);

        // let hardCode = {'taeyeon': [
        //                     "Taeyeon Purpose Postcard Set",
        //                     'https://thumbs2.ebaystatic.com/pict/1439383191738080_1.jpg',
        //                     'https://www.ebay.com/itm/Taeyeon-Purpose-Postcard-Set-/143938319173',
        //                     'taeyeon'
        //                 ],
        //                 'aws': [
        //                     'aws',
        //                     'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/1024px-Amazon_Web_Services_Logo.svg.png',
        //                     'https://en.wikipedia.org/wiki/Amazon_Web_Services',
        //                     'aws'
        //                 ],
        //                 typedInput: "Success",
        //                 searchby: "Success"
        //             }
        // res.send([hardCode]);
    }
    catch {
        console.log("Server [FAIL]: Your gift suggestion request was unsuccessful. ")
        res.send("Failed")
    }
}

exports.storeWLGift = async (req,res) => {
    try {
        console.log(req.body)
        const WL_Stored = await db.storeUserWishlistGift(req.session.user, req.body[0].WLGiftToStore)
        if(WL_Stored === "Success") {
            console.log("Server [SUCCESS]: Stored user wishlist gift in wishlist table")
            res.send("Success")
        }

        else if(WL_Stored === "Warning") {
            console.log("Server [WARNING]: The user is trying to insert a wishlist gift that is already in the table.")
        }

        else if(WL_Stored === "Failure") {
            console.log("Server [FAILURE]: Storing the new wishlist gives us an error")
        }
    }

    catch(error) {
        console.log("Server [FAILURE]: There was an error when storing the wishlist gift into the database.")
        console.log(error)
        res.send("Failure")
    }
}

exports.getwishlist = async (req,res) => {
    try {
        console.log('--------')
        console.log(req.params.username);
        console.log('-------')
        let wishlist_result = await db.selectWishlist(req.params.username) //FIX THIS IS A BUG CHANGE TO GET PARAM USER (I WILL FIX...MAYBE.....OK I WILL DONT WORRY ABOUT IT)
        console.log(wishlist_result)
        wishlist_result['username'] = req.session.user
        res.send([wishlist_result])
        console.log("Server [SUCCESS]: We retrieved the user's wishlist. Sending it back to the Frontend...")

    }

    catch {
        console.log("Server [ERROR]: We could not retrieve the user's wishlist")
    }
}

exports.deleteItem = async (req,res) => {
    try {
        let wishlist_delete_confirmation = await db.removeWishlistItem(req.session.user, req.query.item)
        console.log(req.query)
        console.log(req.query.item)
        res.send("Success");
    }

    catch {
        console.log("Fail");
        res.send("Failure");

    };

};