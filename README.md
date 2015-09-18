
# joi-authorization-header

A request authorization header validator for Joi.

[![Build Status](https://travis-ci.org/pebble/joi-authorization-header.svg?branch=master)](https://travis-ci.org/pebble/joi-authorization-header)

## use

`joi-authorization-header` validates an object contains an
"authorization" property whose value is a string of the specified length, optionally
prefixed with "Bearer " or "bearer ". It's used just like you'd use
any other `Joi` type.

```js
var Joi = require('joi');
Joi.authHeader = require('joi-authorization-header')(Joi);
Joi.validate(request.headers, Joi.authHeader(64));
```

## specifying value length

You must specify the length requirements of your authorization header value
or an Error will be thrown. It's easiest to explain by showing some examples:

```js
var Joi = require('joi');
Joi.authHeader = require('joi-authorization-header')(Joi);

Joi.authHeader(64);    // header must be exactly 64 characters in length
Joi.authHeader(2, 20); // header must be between 2 and 20 characters in length (inclusive)
```

The length validators do not include the optional "Bearer " value prefix.

```js
// Joi.validate({ authorization: "Bearer 1234" }, Joi.authHeader(4)) // pass
// Joi.validate({ authorization: "Bearer 234" }, Joi.authHeader(4))  // fail
// Joi.validate({ authorization: "1234" }, Joi.authHeader(4)) // pass
// Joi.validate({ authorization: "234" }, Joi.authHeader(4))  // fail
```

### Installation

```
npm install joi-authorization-header --save
```

### Development

#### running tests

- `npm test`

## Sponsored by

[Pebble Technology!](https://getpebble.com)

## License

[MIT](https://github.com/pebble/joi-authorization-header/blob/master/LICENSE)
