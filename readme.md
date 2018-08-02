# Big Cheese API

[![CircleCI](https://circleci.com/gh/yarphen/big-cheese.svg?style=svg)](https://circleci.com/gh/yarphen/big-cheese)

Big Cheese API is backend core for some platform that allows to offer some goods with some price and then change, reject or accept these offers. This is test project.

# How to use?

## Auth API

### **SIGNUP**

* **URL**: `/auth/signup`
* **METHOD**: `POST`
* **DESCRIPTION**: Creates new account
* **SAMPLE REQUEST**:
```
{
	"password": "abc",
	"email": "example@gmail.com",
	"name": "Test Test",
	"about": "XXX"
}
```
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "example@gmail.com",
    "name": "Test Test",
    "about": "XXX",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:17:35.679Z"
}
```
```
{
  "error": "User with this email already exists"
}
```

### **LOGIN**

* **URL**: `/auth/login`
* **METHOD**: `POST`
* **DESCRIPTION**: Allows you to log in and get your auth token. After getting token use it for bearer Authorization.
* **SAMPLE REQUEST**:
```
{
	"password": "abc",
	"email": "example@gmail.com"
}
```
* **SAMPLE RESPONSES**:
```
{
    "user": {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z",
        "hash": "6ed2bf5ce8c7bb7d279ecafcc57498c10e20a4a9889d86afb961426fce40d5b0d2104f4132bb99abee23b7ebe617940393ee70b6e7ce0b1462c57f2b94039000"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjQsImVtYWlsIjoiZXhhbXBsZUBnbWFpbC5jb20iLCJuYW1lIjoiVGVzdCBUZXN0IiwiYWJvdXQiOiJYWFgiLCJjcmVhdGVkQXQiOiIyMDE4LTA4LTAyVDA5OjEzOjQxLjMxNloiLCJ1cGRhdGVkQXQiOiIyMDE4LTA4LTAyVDA5OjE3OjM1LjY3OVoiLCJoYXNoIjoiNmVkMmJmNWNlOGM3YmI3ZDI3OWVjYWZjYzU3NDk4YzEwZTIwYTRhOTg4OWQ4NmFmYjk2MTQyNmZjZTQwZDViMGQyMTA0ZjQxMzJiYjk5YWJlZTIzYjdlYmU2MTc5NDAzOTNlZTcwYjZlN2NlMGIxNDYyYzU3ZjJiOTQwMzkwMDAiLCJpYXQiOjE1MzMyMDE1MTB9.cQB4v2O-4VrwxadgUzyMDea9xii0JwD1wWR3Cd6TDCM"
}
```
```
{
    "message": "Login failed"
}
```

### **RESET PASSWORD**

* **URL**: `/auth/reset`
* **METHOD**: `POST`
* **DESCRIPTION**: Resets your password if you provide correct email and sends it to your email.
* **SAMPLE REQUEST**:
```
{
	"email": "example@gmail.com"
}
```
* **SAMPLE RESPONSES**:
```
{
    "message": "Check your email, please"
}
```

### **VERIFY YOU ARE LOGGED IN**

* **URL**: `/auth/verify`
* **METHOD**: `POST`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Retrieves your user if you are logged in
* **SAMPLE RESPONSES**:
```
{
    "user": {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    }
}
```

## User API

### **USER SEARCH**

* **URL**: `/users?name=<name>&email=<email>`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Retrieves list of users by params. Maximum is 10. You should specify at least one param: email or name.
* **SAMPLE RESPONSES**:
```
[
    {
        "userId": 4,
        "email": "example@gmail.com",
        "name": "Test Test",
        "about": "XXX",
        "createdAt": "2018-08-02T09:13:41.316Z",
        "updatedAt": "2018-08-02T09:17:35.679Z"
    }
]
```

### **GET USER BY ID**

* **URL**: `/users/:id`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Gets user by id
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "example@gmail.com",
    "name": "Test Test",
    "about": "XXX",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:17:35.679Z"
}
```

### **PROFILE UPDATE**

* **URL**: `/users/:id`
* **METHOD**: `PATCH`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Updates specified fields of your profile if you set non-empty values to them. Allows to change your password: for this you should specify `password` and `passwordConfirm` both. They should match.
* **SAMPLE REQUEST**:
```
{
    "email": "mynewemail@gmail.com",
    "name": "MyNewName",
    "about": "I'm agent 007",
    "password": "MySuperCryptoPasswordBlaBlaBla",
    "passwordConfirm": "MySuperCryptoPasswordBlaBlaBla"
}
```
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "mynewemail@gmail.com",
    "name": "MyNewName",
    "about": "I'm agent 007",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:43:14.758Z"
}
```
```
{
    "error": "Passwords do not match"
}
```

## User API

### **USER DEALS LIST**

* **URL**: `/deals`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Gets all deals where the user is a buyer or a seller
* **SAMPLE RESPONSES**:
```
{
    "userId": 4,
    "email": "mynewemail@gmail.com",
    "name": "MyNewName",
    "about": "I'm agent 007",
    "createdAt": "2018-08-02T09:13:41.316Z",
    "updatedAt": "2018-08-02T09:43:14.758Z"
}
```
```
{
    "error": "Passwords do not match"
}
```

### **CREATE NEW DEAL**

* **URL**: `/deals`
* **METHOD**: `POST`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Gets deal details
* **SAMPLE REQUEST**:
```
{
    "buyerId": 1,
    "text": "I have something for you",
    "price": 100
}
```
* **SAMPLE RESPONSES**:
```
{
    "message": {
        "messageId": 6,
        "text": "I have something for you",
        "price": 100,
        "direction": 1,
        "dealId": 5,
        "updatedAt": "2018-08-02T09:53:39.207Z",
        "createdAt": "2018-08-02T09:53:39.207Z"
    },
    "deal": {
        "status": 0,
        "dealId": 5,
        "sellerId": 4,
        "buyerId": 1,
        "price": 100,
        "updatedAt": "2018-08-02T09:53:39.186Z",
        "createdAt": "2018-08-02T09:53:39.186Z"
    }
}
```
```
{
    "error": "Could not set negative price"
}
```
```
{
    "error": "notNull Violation: Message.price cannot be null"
}
```

### **GET DEAL DETAILS AND MESSAGES**

* **URL**: `/deals/:id`
* **METHOD**: `GET`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Gets deal details. Returns 'No such deal' message if you do not have access to it or it does not exist.
* **SAMPLE RESPONSES**:
```
{
    "deal": {
        "dealId": 5,
        "sellerId": 4,
        "buyerId": 1,
        "price": 100,
        "status": 0,
        "createdAt": "2018-08-02T09:53:39.186Z",
        "updatedAt": "2018-08-02T09:53:39.186Z"
    },
    "messages": [
        {
            "messageId": 6,
            "direction": 1,
            "text": "I have something for you",
            "price": 100,
            "dealId": 5,
            "createdAt": "2018-08-02T09:53:39.207Z",
            "updatedAt": "2018-08-02T09:53:39.207Z"
        }
    ]
}
```
```
{
    "error": "No such deal"
}
```

### **POST NEW MESSAGE TO DEAL**

* **URL**: `/deals/:id`
* **METHOD**: `POST`
* **NEEDS AUTHORIZATION**
* **DESCRIPTION**: Posts new message to the deal. If you agree same price or -1 as price, the deal will be closed. Notice that you should wait for initial response from buyer to post your messages after creating a deal.
* **SAMPLE REQUEST**:
```
{
    "text": "I'm joking. It costs much more",
    "price": 1000
}
```
* **SAMPLE RESPONSES**:
```
{
    "messageId": 10,
    "text": "I'm joking. It costs much more",
    "price": 1000,
    "direction": 1,
    "dealId": 5,
    "updatedAt": "2018-08-02T10:06:24.131Z",
    "createdAt": "2018-08-02T10:06:24.131Z"
}
```
```
{
    "error": "Wait for partner response"
}
```
```
{
    "error": "No such deal"
}
```
```
{
    "error": "The deal is closed"
}
```

# How to run?
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