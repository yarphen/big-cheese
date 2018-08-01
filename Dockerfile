FROM node:9.9.0

WORKDIR /usr/src/app

COPY package*.json /usr/src/app/

RUN npm install

COPY . /usr/src/app/

RUN chmod +x /usr/src/app/tests

RUN ln -s /usr/src/app/tests /usr/bin/tests

EXPOSE 8888

CMD [ "npm", "run", "forever" ]