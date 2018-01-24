# ClaudiaJs-API

Use [Claudia.js](https://claudiajs.com/) and [Claudia API Builder](https://claudiajs.com/claudia-api-builder.html) to create and deploy an AWS API Gateway that makes use of Lambda functions to query data from a database (inside or outside AWS). It also use JWT for user authentication.

The system is prepared to work with a single master user (username and password set on enviroment vars), but it would be very easy to add a register method to create new users and check it against the database.

### Configuration
Make sure that claudia.js is correctly installed and configured following [these instructions](https://claudiajs.com/tutorials/installing.html)
##### AWS IAM User credentials
The easiest way is to have a file in your home dir with the credentials stored (username, access key ID and secret access key):
_**/home/{USER}/.aws/credentials**_
```
[claudia]
aws_access_key_id = XXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXX
```

You can also use ENV VARS to pass these values.

**NOTE:** If you're using the _Docker_ option to deploy the app, just put your AWS credentias in the [aws-credentials](aws-credentials) file.

##### Configuration
Just put the config values to connect to the database (host, database, user and password) in the file [config-env.json](config-env.json), as well as the following values:

- *MYSQL_HOST*: database host (default: "danigarcia-dev.com")
- *MYSQL_PORT*: database port (default: "10004")
- *MYSQL_DB*: database  (default: "stats")
- *MYSQL_USER*: database user (default: "stats")
- *MYSQL_PWD*: database pwd for user (default: "stats")
- *MASTER_USER*: username for the user that will be allowed to login (default: "stats")
- *MASTER_PWD*: password for the user (default: "st4ts")
- *SESSION_DURATION*: session duration for the JWT (default: "86400" )
- *SESSION_SECRET*: secrete key fot the JWT tokens generation

### Create, Update && Release

The easiest way is to run the [deploy-api-gateway.sh](deploy-api-gateway.sh) script. It will check if a *claudia.json* file already exists in order to create or update/release the API.

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
