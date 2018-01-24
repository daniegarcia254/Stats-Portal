FROM dgarcia254/ubuntu-sencha:6.5.1.240

LABEL maintaner "Daniel Garcia - daniegarcia254@gmail.com"

# Create directories
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/server
RUN mkdir -p /usr/src/app/client

# BACKEND
WORKDIR /usr/src/app/server

ADD server/package.json ./
RUN npm install

COPY server/ /usr/src/app/server/
RUN mkdir -p /root/.aws
COPY server/aws-credentials /root/.aws/credentials

# Update && Deploy API Gateway
RUN /bin/bash deploy-api-gateway.sh

# FRONTEND
WORKDIR /usr/src/app/client

COPY client/ /usr/src/app/client/
RUN cp -r /tmp/ext-6.5.1 .
RUN mv ext-6.5.1 ext
RUN /bin/bash replace_server_uri.sh ../server/api-url.json
RUN rm ../server/api-url.json
RUN /root/bin/Sencha/Cmd/sencha-6.5.1.240 app build
RUN cp -r build/production/PortalStats /var/www/html/stats-portal

#Start service
CMD ["/usr/sbin/apache2ctl","-D","FOREGROUND"]
