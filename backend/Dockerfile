FROM node:20
FROM gcc:latest

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 3001

CMD ["npm", "start"]