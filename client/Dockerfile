FROM node:14

WORKDIR /client

# the copy the whole source folder
# except folders on .dockerignore
COPY . .

# install tha packages
RUN npm install

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start"]
