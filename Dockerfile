FROM node:latest

WORKDIR /opt/garage-remote-front-app

COPY package*.json ./

RUN npm install
 
COPY . .
 
EXPOSE 3000
 
CMD [ "npm", "start" ]