FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app
RUN apk --no-cache add git
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install && mv node_modules ../
RUN npm install --global gatsby-cli
COPY . .
EXPOSE 8000
CMD ["npm", "start"]
