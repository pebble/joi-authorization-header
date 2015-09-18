
# joi-authorization-header

A request authorization header validator for Joi.

[![Build Status](https://travis-ci.org/pebble/joi-authorization-header.svg?branch=master)](https://travis-ci.org/pebble/joi-authorization-header)

## use

`joi-authorization-header` validates an object contains an
"authorization" property whose value conforms to a 64 character string, optionally
prefixed with "Bearer " or "bearer ".

It's used just like you'd use any other `Joi` type.

```js
var Joi = require('joi');
Joi.authHeader = require('joi-authorization-header')(Joi);

Joi.validate(request.headers, Joi.authHeader());
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
