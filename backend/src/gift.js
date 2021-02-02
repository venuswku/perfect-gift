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