FROM node:14

WORKDIR /client

COPY package*.json ./

RUN npm install

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start"]
