FROM node:20

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

FROM gcc:latest AS gcc

FROM gcc AS final

EXPOSE 3001

CMD ["npm", "start"]