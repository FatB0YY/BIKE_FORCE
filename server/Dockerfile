FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig.json ./
COPY nodemon.json ./
COPY error-dev.log ./
COPY error-prod.log ./
COPY error-prod.log ./

RUN npm install 

COPY . .