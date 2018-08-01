FROM node:9.9.0

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

EXPOSE 8888

CMD [ "npm", "run", "forever" ]