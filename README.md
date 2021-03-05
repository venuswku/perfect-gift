# Installation Guide

## Local Development

Make sure you have Node package manager and Node.js installed (<https://www.npmjs.com/get-npm>)

After cloning the repository, navigate to ./perfect-gift/ and run:

### `npm install`

followed by:

### `npm run`

This starts the client-side frontend of the project.

Next, navigate to ./perfect-gift/backend/ and run:

### `npm install`

followed by:

### `npm run`

This starts the backend server for the project.

## Amazon Web Services

The FrontEnd (client-side) code is continuosly deployed whenever a commit is pushed to the AWS-frontend branch via AWS amplify (<https://aws.amazon.com/amplify/>)

The Backend (server) code is manually deployed by uploading the zipped contents of ./perfect-gift/backend/ (do not include the node_modules folder) to AWS Elastic Beanstalk. (<https://aws.amazon.com/elasticbeanstalk/>)

While perfect-gift project is deployed via AWS, it can be reached at (<https://aws-frontend.d3i4pwwftbhh87.amplifyapp.com/>)
