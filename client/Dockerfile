FROM node:18-alpine

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json


RUN npm cache clean --force && npm install --legacy-peer-deps && npm install http-proxy-middleware

COPY . .

EXPOSE 3000

CMD ["npm","start","dev"]