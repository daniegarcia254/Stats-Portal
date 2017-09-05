# Stats Portal

Responisve web portal with:
- Login screen
- Main screen with graph and grid of user statistics

The portal has been developed using [Ext JS 6.5.1](http://docs.sencha.com/extjs/6.5.1/) on the front-end and with [Claudia.js](https://claudiajs.com/) in the backend. The user will be able to login in the portal and see some user statistics represented in a graph and a grid.

## Configuration

#### Docker && Database

- _**[docker-compose.yml](docker-compose.yml)**_:
    - Web app default port (Apache Server): 10001
    - Database default port: 10004
    
- _**[mysql-environment.yml](mysql-environment.yml)**_: database configuration where the user stats will be stored
    - MYSQL_ROOT_PASSWORD   --> MySQL Server ROOT user default password
    - MYSQL_USER            --> MySQL username (default "stats")
    - MYSQL_PASSWORD        --> MySQL username (default "stats")
    - MYSQL_DATABASE        --> MySQL username (default "stats")
    
- _**[claudiajs-api/db-dump](claudiajs-api/db-dump)**_: data to create and populate the users' statistics database

#### Back-end

##### AWS Credentials
To allow the deploy of the backend with _ClaudiaJS_ you will need and AWS account correctly configured. Make sure that claudia.js is correctly installed and configured following these [instructions](https://claudiajs.com/tutorials/installing.html).

Once you have everything configured, just put your AWS user credentials in the [claudia-js/aws-credentials](claudia-js/aws-credentials) file with the following format:
```
[username]
aws_access_key_id = XXXXXXXXXXXXXXX
aws_secret_access_key = XXXXXXXXXXXXXXXX
```

##### Other
Just put the config values to connect to the database (host, database, user and password) in the file [claudia-js/config-env.json](claudia-js/config-env.json), as well as the following values:

MYSQL_HOST: database host (default: "danigarcia-dev.com")
MYSQL_PORT: database port (default: "10004")
MYSQL_DB: database (default: "stats")
MYSQL_USER: database user (default: "stats")
MYSQL_PWD: database pwd for user (default: "stats")
MASTER_USER: username for the user that will be allowed to login (default: "stats")
MASTER_PWD: password for the user (default: "st4ts")
SESSION_DURATION: session duration for the JWT (default: "86400" )
SESSION_SECRET: secrete key fot the JWT tokens generation.
    
#### Front-end

The front-end needs no configuration

## Installation

The easiest way to build and deploy the application is by using _Docker_:
```
docker-compose up && docker-compose build;
```
The _Docker_ container will already include all the necessary requirements: _Sencha CMD 6.5.1_, _Ext JS 6.5.1_, _NodeJS_, _Apache Server_.

Two containers will be created:
- *stats_portal*: where the web application will be available through Apache Server
- *stats_db*: where the database will be hosted

**NOTE**: the backend, with _ClaudiaJS_, will be deployed in a _AWS API Gateway_.
