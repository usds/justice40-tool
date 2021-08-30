FROM node:14

WORKDIR /client

# first install tha packages
COPY package.json .
RUN npm update
RUN npm install

# the copy the whole source folder
COPY . .

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start"]
