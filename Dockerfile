FROM alpine:edge AS BUILD_IMAGE
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache nodejs npm curl g++ make python3 bash
COPY package.json .
RUN npm install --only=production
RUN npm prune --production

FROM alpine:edge
WORKDIR /app
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx nodejs aria2 ; rm -rf /var/cache/apk/*
COPY --from=BUILD_IMAGE node_modules ./node_modules
COPY cda_dl-docker.sh .
COPY cdadl.js . 
COPY bridge.sh .
RUN chmod +x cda_dl-docker.sh
RUN chmod +x bridge.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
