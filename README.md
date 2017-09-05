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

[See here](claudiajs-api/).
    
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
