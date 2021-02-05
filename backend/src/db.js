const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

// Returns one user and its data or all users and their data, used in getUsers
exports.selectUsers = async (username) => {
    let select = 'SELECT username, userpassword, firstname, lastname, useremail, avatar, showavatar FROM giftuser';
    if (username) {
        select += ` WHERE username ~* $1`;
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

// gift.js sends username to db.js. if username is found, it returns all parameters of that row
exports.selectQResponses = async (username) => {
    let select = 'SELECT * FROM questionnaireresponses';
    if (username) {
        select += ` WHERE username ~* $1`;
    }
    const query = {
        text: select,
        values: [username ? `${username}` : []],
    };
    const { rows } = await pool.query(query);
    const allUsers = [];
    for (const row of rows) {
        allUsers.push({ username: row.username, outdooractivity: row.outdooractivity, place: row.place, store: row.store, musicgenre: row.musicgenre, musician: row.musician, band: row.band, indooractivity: row.indooractivity, movietvshow: row.movietvshow, videogame: row.videogame, sport: row.sport, sportsteam: row.sportsteam, exercise: row.exercise });
    }
    return allUsers;
};

// Inserts questionnaire responses in questionnareresponses table.
exports.insertQResponses = async (username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) => {
    console.log('db.js: insertQResponses called');
    // let insert = 'INSERT INTO questionnaireresponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) VALUES('+username+', '+outdooractivity+', '+place+', '+store+', '+musicgenre+', '+musician+', '+band+', '+indooractivity+', '+movietvshow+', '+videogame+', '+sport+', '+sportsteam+', '+exercise+')';
    let insert = `INSERT INTO questionnaireresponses(username, outdooractivity, place, store, musicgenre, musician, band, indooractivity, movietvshow, videogame, sport, sportsteam, exercise) VALUES('${username}', '${outdooractivity}', '${place}', '${store}', '${musicgenre}', '${musician}', '${band}', '${indooractivity}', '${movietvshow}', '${videogame}', '${sport}', '${sportsteam}', '${exercise}')`;
    console.log(insert);
    pool.query(insert, (err, res) => {
        if (err) {
            console.log("db.js: error!")
            console.error(err);
            return;
        }
        console.log("db.js: responses inserted into questionnaireresponses table!");
    });
}


// Returns one user and its data or all users and their data, used in getUsers
exports.authenticateUser = async (username) => {
    let select = 'SELECT username, userpassword FROM giftuser';
    if (username) {
        select += ` WHERE username ~* $1`;
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

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
