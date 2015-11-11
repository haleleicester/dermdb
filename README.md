# Dermatology Database (dermdb)

An API for tracking changes in skin conditions.

### Installation Instructions

First Clone:
```
git clone https://github.com/haleleicester/dermdb
```

Install bower:
```
npm i bower -g
```

Install bower components:
```
bower i
```

Install node modules
```
npm i
```

### Run The Server

```
node bin/www
```

Find the server [here](http://localhost:3000).

### API Documentation

#### Error Responses

```js
{ [AuthError]
  status: 'invalidPassword',
  statusCode: 401,
  data: { message: 'Invalid Password',
    description: 'Password is too common!',
    code: 'E_INVALID_PASSWORD' 
  } 
}
```

### Contributors
* [Sam Mills](https://github.com/hunchmun) (therealhenchman@gmail.com)

Copyright (C) HALE 2015. Licensed under MIT & GPL2
