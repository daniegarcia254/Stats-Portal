web: vendor/bin/heroku-php-apache2 client/build/testing/PortalStats/
deployapigateway: cd server; npm install; mkdir /app/.aws; cp aws-credentials /app/.aws/credentials; chmod -R 644 /app/server/;bash deploy-api-gateway.sh