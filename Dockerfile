FROM node:9.9.0

WORKDIR /usr/src/app

RUN npm install

COPY . /usr/src/app/

EXPOSE 8080

CMD [ "npm", "run", "forever" ]