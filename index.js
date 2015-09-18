'use strict';

var assert = require('assert');

module.exports = function joiAuthHeader(Joi) {
  assert(Joi && Joi.isJoi, 'you must pass Joi as an argument');

  return function joiAuthorizationHeader(min, max) {
    if (arguments.length === 1) {
      max = min;
    }

    assert.equal('number', typeof min, '`min` must be a number');
    assert.equal('number', typeof max, '`max` must be a number');

    var rgx = '^\(?:[Bb]earer \)?[\\w-.~+\/]{' + min + ',' + max + '}$';

    return Joi.object({
      authorization: Joi.string().required().regex(new RegExp(rgx))
    }).options({
      allowUnknown: true
    });
  };
};
