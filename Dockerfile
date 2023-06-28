FROM alpine:edge
WORKDIR /app
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx aria2 python3 py3-pip gcc ; rm -rf /var/cache/apk/*
RUN pip3 install yt-dlp
COPY cda_dl-docker.sh .
RUN chmod +x cda_dl-docker.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
