FROM alpine

MAINTAINER fiord hyogaglacier@gmail.com

RUN apk update
RUN apk add --no-cache \
  "gcc=8.2.0-r2" \
  "g++=8.2.0-r2" \
  "python2=2.7.15-r3" \
  "python3=3.6.8-r1" \
  "ruby=2.5.3-r1"

RUN rm -rf /var/cache/apk/*
RUN adduser -h home/fiord -D fiord
