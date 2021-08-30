FROM node:14

# Set working directory like 'cd' command, any subsequent instructions in this docker file, will start from 
# this working directory
WORKDIR /client

# Copy the package.json and package_lock.json files from local to the docker image / container
COPY package*.json ./

# install all packages as a layer in the docker image / container
RUN npm install

# copy all local files from the working directory to the docker image/container however we must use 
# dockerignore to ignore node_modules so that the image can use what what was just installed from the above
# step.
COPY . .

ENV PORT=6000

EXPOSE 6000

CMD [ "npm", "start"]
