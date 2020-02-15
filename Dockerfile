# see hooks/build and hooks/.config
ARG BASE_IMAGE_PREFIX
FROM ${BASE_IMAGE_PREFIX}alpine:edge

# see hooks/post_checkout
ARG ARCH
COPY qemu-${ARCH}-static /usr/bin

RUN uname -ar > /uname.build
RUN echo "http://dl-4.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories
RUN apk update ; apk upgrade ; apk add --no-cache lynx youtube-dl aria2
COPY . .
RUN chmod +x cda_dl-docker.sh
ENTRYPOINT ["sh", "cda_dl-docker.sh"]

