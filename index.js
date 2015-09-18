'use strict';

var assert = require('assert');

module.exports = function joiAuthHeader(Joi) {
  assert(Joi && Joi.isJoi, 'you must pass Joi as an argument');

  return function joiAuthorizationHeader() {
    return Joi.object({
      authorization: Joi.string().required().regex(/^([Bb]earer )?[\w-.~+\/]{64}$/)
    }).options({
      allowUnknown: true
    });
  };
};
