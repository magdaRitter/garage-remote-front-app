FROM node:latest

WORKDIR /opt/garage-remote-front-app

COPY package*.json ./

RUN npm install
RUN npm install concurrently
RUN npm install nodemon --save-dev
 
COPY . .
 
EXPOSE 3000
EXPOSE 5000
 
CMD [ "npm", "start" ]