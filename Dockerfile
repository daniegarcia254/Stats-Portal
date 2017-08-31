FROM dgarcia254/ubuntu-sencha:6.5.1.240

LABEL maintaner "Daniel Garcia - daniegarcia254@gmail.com"

# Create directories
RUN mkdir -p /usr/src/app
RUN mkdir -p /usr/src/app/back
RUN mkdir -p /usr/src/app/front

# BACKEND
WORKDIR /usr/src/app/back

ADD claudiajs-api/package.json ./
RUN npm install

COPY claudiajs-api/ /usr/src/app/back/
RUN mkdir -p /root/.aws
COPY claudiajs-api/aws-credentials /root/.aws/credentials

# Update && Deploy API Gateway
RUN /bin/bash deploy-api-gateway.sh

# FRONTEND
WORKDIR /usr/src/app/front

COPY stats-portal-extjs/ /usr/src/app/front/
RUN cp -r /tmp/ext-6.5.1 .
RUN mv ext-6.5.1 ext
RUN /bin/bash replace_backend_uri.sh ../back/api-url.json
RUN rm ../back/api-url.json
RUN /root/bin/Sencha/Cmd/sencha-6.5.1.240 app build
RUN cp -r build/production/PortalStats /var/www/html/stats-portal

#Start service
CMD ["/usr/sbin/apache2ctl","-D","FOREGROUND"]
