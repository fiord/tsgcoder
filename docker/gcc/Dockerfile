FROM alpine

MAINTAINER fiord hyoga_quasar@yahoo.co.jp

RUN apk update
RUN apk add --no-cache \
  "gcc=9.2.0-r4" \
  "g++=9.2.0-r4" \
  "python2=2.7.16-r3" \
  "python3=3.8.2-r0" \
  "ruby=2.6.6-r2"

RUN rm -rf /var/cache/apk/*
RUN adduser -h home/fiord -D fiord
