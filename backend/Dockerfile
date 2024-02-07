FROM node:20

WORKDIR /usr/src/app

COPY ./package*.json ./

RUN npm install

COPY . .

FROM builder AS gcc

RUN apt-get update && apt-get install -y gcc g++

FROM gcc AS final

EXPOSE 3001

CMD ["npm", "start"]