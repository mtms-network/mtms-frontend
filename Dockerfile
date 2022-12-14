# Stage 1, based on Node.js, to build and compile the react app
FROM node:12-alpine as build
RUN apk add --no-cache libc6-compat --virtual .builds-deps build-base python3
RUN mkdir -p /app
WORKDIR /app
COPY package*.json /app/
COPY ./ /app/

RUN npm install
RUN npm rebuild node-sass \
    && npm run build \
    && npm cache clean -f

# Stage 2, based on Nginx, to have only the compiled app, ready for production with Nginx
FROM nginx:1.17-alpine

RUN mkdir -p /app
WORKDIR /app

RUN apk add --update bash jq curl \
    && rm -rf /var/cache/apk/*

COPY --from=build /app/build/ /app/build

COPY ./scripts /app/scripts
COPY .env /app/scripts/.env
COPY ./nginx.conf.template /etc/nginx/conf.d/nginx.conf.template

RUN chmod +x /app/scripts/getEnv.sh \
    && chmod +x /app/scripts/run.sh

CMD ["/bin/bash", "-c", "/app/scripts/run.sh"]
