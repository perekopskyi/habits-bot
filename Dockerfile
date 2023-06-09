FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN npm install --save-dev @tsconfig/node16

COPY . .

RUN npm run build

COPY ./src/locales ./dist/locales