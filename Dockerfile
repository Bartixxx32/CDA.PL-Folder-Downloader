FROM ubuntu:latest
RUN apt update
RUN apt install lynx youtube-dl -y
COPY . .
RUN chmod +x cda_dl-docker.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
