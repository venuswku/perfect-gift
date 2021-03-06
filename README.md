# Installation Guide

## Local Development

Make sure you have Node package manager and Node.js installed (<https://www.npmjs.com/get-npm>).

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

The FrontEnd (client-side) code is continuously deployed whenever a commit is pushed to the `frontend-aws_amplify` branch via AWS amplify (<https://aws.amazon.com/amplify/>).

The Backend (server) code is manually deployed by uploading the zipped contents of ./perfect-gift/backend/ from the `backend-aws_elastic_beanstalk` branch (do not include the node_modules folder, package-lock.json, and .gitignore) to AWS Elastic Beanstalk (<https://aws.amazon.com/elasticbeanstalk/>).

While the perfect-gift project is deployed via AWS, it can be reached at (<https://aws-frontend.d3i4pwwftbhh87.amplifyapp.com/>).

## Heroku

Our frontend is also automatically deployed whenever a commit is pushed to our `frontend-heroku` branch via Heroku at https://theperfectgift.herokuapp.com/!

Any commits to the `backend-heroku` branch will automatically deployed to our backend via Heroku at https://perfectgift-backend.herokuapp.com/v0/api-docs/.

It might take around 30 seconds to fully load if it has not been accessed in a while.
