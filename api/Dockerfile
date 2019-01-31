FROM node:alpine

RUN npm install -g ts-node typescript nodemon

ENV TERM xterm-256color
ENV TZ=Europe/Bucharest

WORKDIR /app

CMD npm i; npm run start:dev
