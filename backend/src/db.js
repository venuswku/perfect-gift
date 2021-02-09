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

// Inserts user data in giftusers table.
exports.insertUser = async (username, userpassword, firstname, lastname, useremail, avatar, showavatar) => {
    console.log('db.js: insertUsers called');
    let insert = `INSERT INTO giftuser(username, userpassword, firstname, lastname, useremail, avatar, showavatar) VALUES('${username}', '${userpassword}', '${firstname}', '${lastname}', '${useremail}', '${avatar}', '${showavatar}')`;
    // console.log(insert);
    // const { rows } = await pool.query(query);
    // if (rows.length == 1) {
    //     rows[0].userpassword = userpassword;
    // }

    pool.query(insert, (err, res) => {
        if (err) {
            console.log("db.js: insertUsers: error!")
            console.error(err);
            return;
        }
        console.log("db.js: insertUsers: user info inserted into giftusers table!");
    });
}

// gift.js sends username to db.js. if username is found, it returns all parameters of that row
exports.selectQResponses = async (username) => {
    let select = `SELECT * FROM questionnaireresponses WHERE username = '${username}'`;
    console.log('db.js: selectQResponse: ', select);
    const oneUser = [];
    pool.query(select, (err, res) => {
        if (err) {
            console.log("db.js: error!")
            console.error(err);
            return;
        }
        if (res) {
            console.log("db.js: selectQResponse: is chosen successfully!");
            // console.log(res);
            // console.log(res.rows[0].username);
            oneUser.push({
                username: res.rows[0].username,
                outdooractivity: res.rows[0].outdooractivity,
                place: res.rows[0].place,
                store: res.rows[0].store,
                musicgenre: res.rows[0].musicgenre,
                musician: res.rows[0].musician,
                band: res.rows[0].band,
                indooractivity: res.rows[0].indooractivity,
                movietvshow: res.rows[0].movietvshow,
                videogame: res.rows[0].videogame,
                sport: res.rows[0].sport,
                sportsteam: res.rows[0].sportsteam,
                exercise: res.rows[0].exercise
            });
            // console.log(oneUser);
            return oneUser;
        }
        
        // console.log(res);
    });
    // const row = await pool.query(select);
    // console.log("gift.js: getQResponse: ", row.username);
    // const { rows } = await pool.query(query);
    // console.log("roes", rows);
    // const allUsers = [];
    // for (const row of rows) {
    //     console.log(row.username);
    //     allUsers.push({ username: row.username, outdooractivity: row.outdooractivity, place: row.place, store: row.store, musicgenre: row.musicgenre, musician: row.musician, band: row.band, indooractivity: row.indooractivity, movietvshow: row.movietvshow, videogame: row.videogame, sport: row.sport, sportsteam: row.sportsteam, exercise: row.exercise });
    // }
    // console.log('db.js: selectQResponse: ', allUsers);
    // return allUsers;
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
        console.log("db.js: insertQResponse: responses inserted into questionnaireresponses table!");
    });
}

// exports.updateUsername = async (username, useremail) => {
//     const select = `UPDATE giftuser SET username = $1 WHERE useremail = $2`;
//     // eslint-disable-next-line max-len
//     // const select = `UPDATE mail SET mail = jsonb_set(mail, '{mail,star}', 'true') WHERE id = $1`;
//     const query = {
//         text: select,
//         values: [username],
//     };
//     const t = await pool.query(query);
//     return t;
// };

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
