FROM alpine:edge
RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx nodejs npm screen
COPY cda_dl-docker.sh .
COPY cdadl.js . 
COPY package.json .
COPY bridge.sh .
RUN npm install
RUN chmod +x cda_dl-docker.sh
RUN chmod +x bridge.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
