#!/usr/local/bin/zsh

# date +%s | gsha256sum | base64 | head -c 96; >> .env

heroku create $1;
heroku addons:create papertrail:choklad --app $1;
heroku addons:create mongolab:sandbox --app $1;
heroku addons:create newrelic:wayne --app $1;
heroku config:set NEW_RELIC_APP_NAME=$1 --app $1;
heroku config:set NEW_RELIC_NO_CONFIG_FILE='true' --app $1;
while read i; do heroku config:set $i --app $1; done < .env;
heroku config:set NODE_ENV=production --app $1;
git push heroku master;
heroku logs --tail --app $1;
