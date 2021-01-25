const { Pool } = require('pg');

const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: process.env.POSTGRES_DB,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
});

// Returns all of the users and all of their data, used in getUsers
exports.selectUsers = async (useremail) => {
    let select = 'SELECT firstname, lastname, useremail, username, userpassword, avatar, showavatar FROM giftuser';
};

console.log(`Connected to database '${process.env.POSTGRES_DB}'`);
