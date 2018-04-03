FROM node:alpine

LABEL instaclone.version="1.0.0" \
      instaclone.release-date="2018-03-27" \
      vendor="Unisys Corp." \
      maintener="Jesus"

WORKDIR /usr/src/app

COPY . .

RUN npm install

EXPOSE 8080

# Exemplo usando o entrypoint: mais dificil de sobrescrever
# ENTRYPOINT ["npm"]

CMD [ "npm", "start" ]