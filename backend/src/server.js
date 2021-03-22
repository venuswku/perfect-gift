require('dotenv').config();
const app = require('./app.js');

app.listen(3010, () => {
    console.log(`Server Running on port 3010`);
    console.log('API Testing UI: https://perfectgift-backend.herokuapp.com/v0/api-docs/');
});
