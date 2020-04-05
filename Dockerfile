FROM pandoc/latex
RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx make zip pandoc python git aria2
RUN git clone https://github.com/divadsn/youtube-dl.git -b cda
WORKDIR youtube-dl
RUN make
RUN make install
COPY cda_dl-docker.sh .
RUN chmod +x cda_dl-docker.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]
