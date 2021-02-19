const express = require('express');
const cors = require('cors');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const path = require('path');
const OpenApiValidator = require('express-openapi-validator');
const gift = require('./gift');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const proxy = require('http-proxy-middleware')

// Used for letting the frontend communicate with the server
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));

//Used for cookie session
app.use(cookieParser());
app.use(bodyParser.urlencoded( {extended: true}));
app.use(session({
  key : "userId",
  secret: "hello",
  resave: false,
  saveUninitialized: false,
  cookie : {
    expires : 1800000 // Found out that this is in miliseconds. Currently rounds about 30 minutes.
  }
}))

//Json stuff. Not too sure
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const apiSpec = path.join(__dirname, '../api/openapi.yaml');

const apidoc = yaml.safeLoad(fs.readFileSync(apiSpec, 'utf8'));
app.use('/v0/api-docs', swaggerUi.serve, swaggerUi.setup(apidoc));

app.use(
  OpenApiValidator.middleware({
    apiSpec: apiSpec,
    validateRequests: true,
    validateResponses: true,
  }),
);

app.get('/v0/giftuser', gift.getUsers);

app.post('/v0/postuser', gift.postUser);

app.put('/v0/giftuser/:username', gift.putUser);

app.get('/v0/getqresponse/:username', gift.getQResponse); //openapi.yaml --> app.js --> gift.js --> db.js

app.get('/v0/getwishlist/:username', gift.getwishlist);

// Saves user responses from interest questionnaire on Create Account page.
app.post('/v0/postqresponse', gift.postQResponse);

// Puts changes for questionnaire responses from Profile page's Edit Interests popup.
app.put('/v0/putqresponse/:username', gift.putQResponse);

// "Removes" (in reality, empties string) for the corresponding questionnaire topic in the questionnaire table.
app.put('/v0/removeqresponse/:username/:questionnairetopic', gift.removeQResponse);

// This authenticates and authorizes a user to be able to log in.
app.post('/v0/authenticate', gift.login);

//This check if the user has the authorization to be on the website
app.get('/v0/authenticate', gift.checkLogin);

// Logs out a user
app.get('/v0/logout', gift.logout);

// Gets the user's wishlist
app.get('/v0/getUserWishlist', gift.getUserWishlist);

// Uses eBay API to get gift suggestions.
app.get('/v0/giftapi/:searchby', gift.giftapi);

//Stores the wishlist gift into our database
app.post('/v0/storeWLGift', gift.storeWLGift);

// Deletes the generic item (wishlist/questionnaire)
app.delete('/v0/deleteItem', gift.deleteItem);

app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
