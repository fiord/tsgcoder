FROM alpine

MAINTAINER fiord hyogaglacier@gmail.com

RUN apk add --no-cache gcc g++ python python3\
  && rm -rf /var/cache/apk/* \
  && adduser -h home/fiord -D fiord \
  && touch /var/log/dmesg
