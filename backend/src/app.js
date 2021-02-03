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

// Used for letting the frontend communicate with the server
app.use(cors({
  origin: ["http://localhost:3000"],
  methods: ["GET", "POST"],
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
    expires : 60 * 60 * 24
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
app.get('/v0/getqresponse', gift.getQResponse); //openapi.yaml --> app.js --> gift.js --> db.js
//TODO:Try and catch
//This lets the user post to the login page and potentially sign in
app.post('/v0/authenticate', gift.login);


app.use((err, req, res, next) => {
  res.status(err.status).json({
    message: err.message,
    errors: err.errors,
    status: err.status,
  });
});

module.exports = app;
