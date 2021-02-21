require('dotenv').config();
const app = require('./app.js');

app.listen(3010, () => {
    console.log(`Server Running on port 3010`);
    console.log('API Testing UI: http://perfectgiftbackend-env-5.eba-qzfmpbfn.us-west-1.elasticbeanstalk.com/v0/api-docs/');
});
