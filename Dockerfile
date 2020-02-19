FROM alpine:edge
RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx youtube-dl aria2
COPY . .
RUN chmod +x cda_dl-docker.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]

