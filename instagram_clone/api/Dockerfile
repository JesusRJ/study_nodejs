FROM node:alpine

LABEL instaapi.version="1.0.0" \
      instaapi.release-date="2018-03-27" \
      vendor="Unisys Corp." \
      maintener="Jesus"

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]