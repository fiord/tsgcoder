FROM alpine

MAINTAINER fiord hyoga_quasar@yahoo.co.jp

RUN apk update
RUN apk add --no-cache \
  "gcc=8.3.0-r0" \
  "g++=8.3.0-r0" \
  "python2=2.7.16-r1" \
  "python3=3.7.5-r1" \
  "ruby=2.5.7-r0"

RUN rm -rf /var/cache/apk/*
RUN adduser -h home/fiord -D fiord
