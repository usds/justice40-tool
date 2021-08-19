FROM node:14

WORKDIR /app

COPY package*.json ./

RUN yarn install --network-concurrency 2

COPY . .

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start"]