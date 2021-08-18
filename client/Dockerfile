FROM node:14

WORKDIR /app

# Todo: Attempting to install yarn to troubleshoot @trusswork warnings
RUN npm install yarn

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8000

EXPOSE 8000

CMD [ "npm", "start"]