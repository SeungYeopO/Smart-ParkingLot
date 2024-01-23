FROM node:20

WORKDIR /usr/src/app

#WORKDIR /app

# ADD ./package.json /usr/src/app/package.json

COPY ./package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 3000

CMD ["npm", "start"]