#!/bin/sh

docker build -t anselbrandt/express-sqlite:latest .
docker push anselbrandt/express-sqlite:latest
ssh root@anselbrandt.dev << HERE
dokku apps:create express-sqlite
dokku domains:set express-sqlite anselbrandt.dev
dokku proxy:ports-set express-sqlite http:80:8080
dokku certs:add express-sqlite < cert-key.tar
docker pull anselbrandt/express-sqlite:latest
docker tag anselbrandt/express-sqlite:latest dokku/express-sqlite
dokku tags:deploy express-sqlite
docker system prune -a
y
HERE

exit 0
