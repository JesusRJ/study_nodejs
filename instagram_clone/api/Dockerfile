FROM node:alpine

LABEL instaapi.version="1.0.0" \
      instaapi.release-date="2018-03-27" \
      vendor="Unisys Corp." \
      maintener="Jesus"

WORKDIR /usr/src/app

COPY . .

VOLUME /usr/src/app/uploads

RUN echo "--- Diretório de Upload de Imagens" >> /usr/src/app/uploads/READM.md

RUN npm install

EXPOSE 8080

CMD [ "npm", "start" ]