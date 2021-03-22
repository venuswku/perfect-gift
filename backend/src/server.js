require('dotenv').config();
const app = require('./app.js');
const PORT = process.env.PORT || 8080; // use either the host env var port (PORT) provided by Heroku or the local port (3010) on your machine

// Start server and listen on specified port.
app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`) // confirm server is running and log port to the console
});
