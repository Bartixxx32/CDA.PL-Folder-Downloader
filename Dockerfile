FROM alpine:edge AS BUILD_IMAGE
RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache nodejs npm curl g++ make python3
COPY cda_dl-docker.sh .
COPY cdadl.js . 
COPY package.json .
COPY bridge.sh .
RUN chmod +x cda_dl-docker.sh
RUN chmod +x bridge.sh
RUN npm install
RUN npm prune --production

FROM alpine:edge
RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx nodejs screen
COPY --from=BUILD_IMAGE node_modules ./node_modules
COPY --from=BUILD_IMAGE cda_dl-docker.sh ./cda_dl-docker.sh
COPY --from=BUILD_IMAGE cdadl.js ./cdadl.js
COPY --from=BUILD_IMAGE bridge.sh ./bridge.sh
RUN chmod +x cda_dl-docker.sh
RUN chmod +x bridge.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
