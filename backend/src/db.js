const { Pool } = require('pg');
const connectionString = 'postgres://dmdchhfx:h109rWA_vyG-KSBgRK96McXPR7sCC8Mk@ziggy.db.elephantsql.com:5432/dmdchhfx'
const pool = new Pool({connectionString});

// Returns one user and its data or all users and their data, used in getUsers
exports.selectUsers = async (username) => {
    let select = 'SELECT username, userpassword, firstname, lastname, useremail, avatar, showavatar FROM giftuser';
    if (username) {
        select += ` WHERE username = $1`;
    }
    const query = {
        text: select,
        values: [username ? `${username}` : []],
    };
    const { rows } = await pool.query(query);
    const allUsers = [];
    for (const row of rows) {
        allUsers.push({ username: row.username, userpassword: row.userpassword, firstname: row.firstname, lastname: row.lastname, useremail: row.useremail, avatar: row.avatar, showavatar: row.showavatar });
    }
    return allUsers;
};

// Returns one user and its data or all users and their data by the user's email
exports.selectUsersEmail = async (useremail) => {
    let select = 'SELECT username, userpassword, firstname, lastname, useremail, avatar, showavatar FROM giftuser';
    if (useremail) {
        select += ` WHERE useremail = $1`;
    }
    const query = {
        text: select,
        values: [useremail ? `${useremail}` : []],
    };
    const { rows } = await pool.query(query);
    const allUsers = [];
    for (const row of rows) {
        allUsers.push({ username: row.username, userpassword: row.userpassword, firstname: row.firstname, lastname: row.lastname, useremail: row.useremail, avatar: row.avatar, showavatar: row.showavatar });
    }
    return allUsers;
};


// Inserts user data in giftusers table.
exports.insertUser = async (username, userpassword, firstname, lastname, useremail, avatar, showavatar) => {
    console.log('db.js: insertUsers called');
    let insert = `INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES('${username}', '${userpassword}', '${firstname}', '${lastname}', '${useremail}', '${avatar}', '${showavatar}')`;
    // console.log(insert);

    pool.query(insert, (err, res) => {
        if (err) {
            console.log("db.js: insertUsers: error!")
            console.error(err);
            return;
        }
        console.log("db.js: insertUsers: user info inserted into giftusers table!");
    });
    return;
}

// Update the current username with the new username the user changed
exports.updateUsername = async (username) => {
    let splitArrayUsername = username.split(" ");
    let oldUser = splitArrayUsername[0];
    // console.log(oldUser);
    let newUser = splitArrayUsername[1];
    // console.log(newUser);

    // update username for giftuser table and other tables with username as foreign key
    const updateUsername = `UPDATE giftuser SET username = '${newUser}' WHERE username = '${oldUser}'`;
    const q = await pool.query(updateUsername);
    
    console.log("db.js: updateUsername: new username updated in giftusers and questionnaireresponses table!");

    return;
};

// gift.js sends username to db.js. if username is found, it returns all parameters of that row
exports.selectQResponses = async (username) => {
    let select = `SELECT * FROM questionnaireresponses WHERE username = '${username}'`;
    console.log('db.js: selectQResponse: start selectQResponse');
    console.log(select);
    try {
        const result = await pool.query(select);
        console.log(result.rowCount);
        console.log(result.rows[0]);
        if (result) {
            console.log('db.js: selectQResponse: finish selectQResponse');
            return result.rows[0];
        }
    } catch (err) {
        console.log(err.stack)
        return;
    }
};

// Inserts questionnaire responses in questionnaireresponses table.
exports.insertQResponses = async (username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) => {
    console.log('db.js: insertQResponses called');
    let insert = `INSERT INTO questionnaireresponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) VALUES('${username}', '${outdooractivity}', '${place}', '${store}', '${musicgenre}', '${musician}', '${band}', '${indooractivity}', '${movietvshow}', '${videogame}', '${sport}', '${sportsteam}', '${exercise}')`;
    // console.log(insert);
    pool.query(insert, (err, res) => {
        if (err) {
            console.log("db.js: error!")
            console.error(err);
            return;
        }
        console.log("db.js: insertQResponse: responses inserted into questionnaireresponses table!");
        return;
    });   
}

// Updates questionnaire responses in questionnaireresponses table.
exports.updateQResponses = async (username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) => {
    console.log('db.js: updateQResponses called');

    let update = 'UPDATE questionnaireresponses ';
    update += `SET outdooractivity = '${outdooractivity}', place = '${place}', store = '${store}', musicgenre = '${musicgenre}', musician = '${musician}', band = '${band}', indooractivity = '${indooractivity}', movietvshow = '${movietvshow}', videogame = '${videogame}', sport = '${sport}', sportsteam = '${sportsteam}', exercise = '${exercise}' `;
    update += `WHERE username = '${username}'`;
    // console.log(update);

    pool.query(update, (err, res) => {
        if (err) {
            console.log("db.js: error!")
            console.error(err);
            return;
        }
        console.log("db.js: updateQResponse: responses updated in questionnaireresponses table!");
        return;
    });
}

// Empties string for the interest column in questionnaire responses.
exports.deleteQResponse = async (username, questionnairetopic) => {
    console.log('db.js: deleteQResponses called');
    const remove = `UPDATE questionnaireresponses SET ${questionnairetopic} = '' WHERE username = '${username}'`;
    // console.log(remove);

    pool.query(remove, (err, res) => {
        if (err) {
            console.log("db.js: deleteQResponse error!")
            console.error(err);
            return;
        }
        console.log("db.js: deleteQResponse: response deleted in questionnaireresponses table!");
        return;
    });
}

// Returns one user and its data or all users and their data, used in getUsers
exports.authenticateUser = async (username) => {
    let select = 'SELECT username, userpassword FROM giftuser';
    if (username) {
        select += ` WHERE username = $1`;
    }
    const query = {
        text: select,
        values: [username ? `${username}` : []],
    };
    const { rows } = await pool.query(query);
    const allUsers = [];
    for (const row of rows) {
        allUsers.push({ username: row.username, userpassword: row.userpassword, firstname: row.firstname, lastname: row.lastname, useremail: row.useremail, avatar: row.avatar, showavatar: row.showavatar });
    }
    return allUsers;
};

exports.storeUserWishlistGift = async (username, WLG) => {
    try {
        console.log(username,WLG)
        let noDuplicateWLG = `SELECT * FROM wishlist WHERE username='${username}' AND gift='${WLG}'`
        const queryResult = await pool.query(noDuplicateWLG);
        console.log("----------")
        console.log(queryResult.rows)
        console.log("----------")
        console.log
        if(queryResult.rows.length !== 1) {
            console.log("DATABASE [SUCCESS]: The wishlist gift is not in our table. Thus, we will store it now...")
            let insertWLG = `INSERT INTO wishlist(username, gift) VALUES('${username}', '${WLG}')`
            const successful_store = await pool.query(insertWLG)
            console.log('DATABASE [SUCCESS]: We have successfully stored the WLG into our database.')
            return "Success";
        } else {
            console.log("DATABASE [WARNING]: The wishlist gift we are trying to insert already exists in the database.")
            return "Warning"
        }
        
    }

    catch(error) {
        console.log("DATABASE [ERROR]: There was an error when trying to call the function to query the wishlist.")
        console.log(error)
        return "Error"
    }
}

exports.selectWishlist = async (username) => {
    try {

        let getWL = `SELECT gift FROM wishlist WHERE username = '${username}'`
        const WL_QUERY = await pool.query(getWL)
        console.log(WL_QUERY)
        console.log("DATABASE [SUCCESS]: Retrieved wishlist")
        
        // for([k,v] of Object.entries({WL_QUERY.rows[0]})){
        //     console.log(k,v)
        // }
        let gifts = {'gift': []}
        for(let i = 0; i < WL_QUERY.rows.length; i++) {
            console.log(WL_QUERY.rows[i]['gift'])
           gifts['gift'].push(WL_QUERY.rows[i]['gift'])
        }
        //console.log(gifts)
            
        return gifts
       //return 1;
    }

    catch(err) {

        console.log("DATABASE [ERROR]: Could not get wishlist")
        console.log(err)
        return 2;
    }

}

// Removes wishlist item from the database
exports.removeWishlistItem = async (user, item) => {
    try{
    let QUERY_DELETE = `DELETE FROM wishlist WHERE username = '${user}' AND gift = '${item}'`
    const QUERY_DELETE_RESULT = await pool.query(QUERY_DELETE)
    
    return "Success"
    }

    catch {
        console.log("Bad")
        return "Failure"
    }
}