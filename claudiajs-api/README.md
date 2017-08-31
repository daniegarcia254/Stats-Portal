# claudiajs-apibuilder-aws

Use (Claudia.js)[https://claudiajs.com/] and (Claudia API Builder)[https://claudiajs.com/claudia-api-builder.html] to create and deploy an AWS API Gateway that makes use of Lambda functions to query data from a database (inside or outside AWS). It also use JWT for user authentication.

The system is prepared to work with a single master user (username and password set on enviroment vars), but it would be very easy to add a register method to create new users and check it against the database.

### Configuration
Make sure that claudia.js is correctly installed and configured following (these instructions)[https://claudiajs.com/tutorials/installing.html]
##### AWS IAM User credentials
The easiest way is to have a file in your home dir with the credentials stored (username, access key ID and secret access key):
_**/home/{USER}/.aws/credentials**_
```
[claudia]
aws_access_key_id = XXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXX
```

You can also use ENV VARS to pass these values.

##### Database connection configuration
Just put the config values to connect to the database (host, database, user and password) in the file (config-env.json)[config-env.json]

### Create
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
