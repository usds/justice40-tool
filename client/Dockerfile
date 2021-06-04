FROM node:14 AS build

# This will henceforth be our app directory
WORKDIR /usr/src/app

# Copy both package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy App source
COPY . . 

EXPOSE 8000
CMD [ "npm", "start" ]

# RUN npm build
# FROM scratch AS bin
# COPY --from=build ./public /