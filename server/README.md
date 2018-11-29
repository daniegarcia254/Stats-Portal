# ClaudiaJs-API

Use [Claudia.js](https://claudiajs.com/) and [Claudia API Builder](https://claudiajs.com/claudia-api-builder.html) to create and deploy an AWS API Gateway that makes use of Lambda functions to query data from a database (inside or outside AWS). It also use JWT for user authentication.

The system is prepared to work with a single master user (username and password set on enviroment vars), but it would be very easy to add a register method to create new users and check it against the database.

### Configuration
Refer to [Service configuration](https://github.com/daniegarcia254/Stats-Portal/tree/heroku-master#server)

### Create, Update && Release

The easiest way is to run the [deploy-api-gateway.sh](deploy-api-gateway.sh) script through the Heroku dyno worker.
It will check if a *claudia.json* file already exists in order to create or update/release the API.

Of course, you can run these commands separately:

#### Create
Create the initial lambda function and the API Gateway that makes use of it. (dev version)
```
npm run create
```

### Update
Deploy a new version of the Lambda function using project files, update any associated web APIs. (dev version)
```
npm run update
```

### Release
Updates the lambda alias/api stage to point to the production version
```
npm run release
```
