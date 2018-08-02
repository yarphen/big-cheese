# Big Cheese API

[![CircleCI](https://circleci.com/gh/yarphen/big-cheese.svg?style=svg)](https://circleci.com/gh/yarphen/big-cheese)

Big Cheese API is backend core for some platform that allows to offer some goods with some price and then change, reject or accept these offers. This is test project.

# How to use?
You can:
  - Clone manually, install node_modules, pass own environemnt variables (with .envrc file etc)
  - ... or just build it with docker

How many scripts the project contains?
  - main script for starting simply / for starting with forever (can be run with `npm start` / `npm run forever`)
  - few tests for users/auth and for deals/messages (can be run with `npm test`)
  - ESLint script (can be run with `npm run lint`)

## Usage with docker

Here is sample deploy script for dockerized app:

```
docker stop my-big-cheese 
docker rm my-big-cheese
docker build -t yarphen/big-cheese --no-cache git@github.com:yarphen/big-cheese.git#${1:master}
docker run -d --name=my-big-cheese \
-p 8888:8888 \
-e PORT="8888" \
-e DB_HOST="postgres.example.com" \
-e DB_PORT="5432" \
-e DB_NAME="mydb" \
-e DB_USERNAME="postgres" \
-e DB_PASSWORD="your_password" \
-e JWT_SECRET="bla-bla-bla" \
-e DB_TEST_HOST="test-postgres.example.com" \
-e DB_TEST_PORT="5432" \
-e DB_TEST_NAME="postgres" \
-e DB_TEST_USERNAME="postgres" \
-e DB_TEST_PASSWORD="your_password" \
-e JWT_TEST_SECRET="test-bla-bla-bla" \
-e SMTP_HOST="smtp.gmail.com" \
-e SMTP_PORT="587" \
-e SMTP_USER="example@gmail.com" \
-e SMTP_PASS="bla-bla-bla" \
-e SMTP_FROM="example@gmail.com" \
-e SMTP_SECURE="false" \
--restart=always yarphen/big-cheese
```

Be aware to make different dbs for test suites and production. 

### Tests

After deploying with previous shell script, you can run automated tests with following command:

`docker exec -it my-big-cheese npm test`, where my-big-cheese is chosen container name.

### Evironment

`PORT` - sets the port to run the API


`DB_HOST` - sets the **prod** host of postgres db connection

`DB_PORT` - sets the **prod** port of postgres db connection

`DB_NAME` - sets the **prod** name of postgres db connection

`DB_USERNAME` - sets the **prod** username for postgres db connection

`DB_PASSWORD` - sets the **prod** password for postgres db connection


`DB_TEST_HOST` - sets the **test** host of postgres db connection

`DB_TEST_PORT` - sets the **test** port of postgres db connection

`DB_TEST_NAME` - sets the **test** name of postgres db connection

`DB_TEST_USERNAME` - sets the **test** username for postgres db connection

`DB_TEST_PASSWORD` - sets the **test** password for postgres db connection


`JWT_SECRET` - sets the **prod** jwt secret for making Json Web Tokens.

`JWT_TEST_SECRET` - sets the **test** jwt secret for making Json Web Tokens.


`SMTP_HOST` - sets the host of smtp server to send reset pass email

`SMTP_PORT` - sets the port of smtp server to send reset pass email

`SMTP_USER` - sets the username for smtp server to send reset pass email

`SMTP_PASS` - sets the password for smtp server to send reset pass email

`SMTP_SECURE` - sets the **secure** flag for smtp server connection