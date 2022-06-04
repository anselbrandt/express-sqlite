#!/bin/sh

docker build -t anselbrandt/express-sqlite:latest .
docker push anselbrandt/express-sqlite:latest
ssh root@anselbrandt.dev << HERE
docker pull anselbrandt/express-sqlite:latest
docker tag anselbrandt/express-sqlite:latest dokku/express-sqlite
dokku tags:deploy express-sqlite
docker system prune -a
y
HERE

exit 0