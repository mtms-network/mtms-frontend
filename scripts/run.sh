#!/bin/bash

echo '[INFO] - Start app'


chmod +x /app/scripts/.env

while read LINE; do if [[ $LINE == "API_"*  ||  $LINE == "REACT_APP"* ]]; then export $LINE; fi; done < /app/scripts/.env

sh /app/scripts/getEnv.sh


echo '[INFO] - Config nginx'
envsubst '${API_URL}' </etc/nginx/conf.d/nginx.conf.template >/etc/nginx/conf.d/default.conf

nginx -t
nginx -g "daemon off;"
