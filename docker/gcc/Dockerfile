FROM alpine
MAINTAINER fiord hyoga_quasar@yahoo.co.jp 
RUN apk update
RUN apk add --no-cache \
  "gcc" \
  "g++" \
  "python2" \
  "python3" \
  "ruby"
COPY entrypoint.sh /tmp/entrypoint.sh
RUN chmod 755 /tmp/entrypoint.sh

RUN rm -rf /var/cache/apk/*
RUN adduser -h home/test -D test
# ENTRYPOINT ["/tmp/entrypoint.sh"]
