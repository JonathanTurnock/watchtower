FROM ubuntu:22.04
ENV WC__DATABASE=/var/lib/db.sqlite

COPY ./build/watchtower-linux /usr/local/bin/watchtower

RUN chmod +x /usr/local/bin/watchtower

VOLUME /var/lib

ENTRYPOINT ["/usr/local/bin/watchtower"]
