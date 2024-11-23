FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json


RUN npm cache clean --force && npm install --legacy-peer-deps

COPY . .

EXPOSE 5000

CMD [ "node", "index.js", "npm","start","dev","redis-server" ]
