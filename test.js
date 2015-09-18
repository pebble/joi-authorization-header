'use strict';

var assert = require('assert');
var Joi = require('joi');
var joiAuthHeader = require('./');

describe('joi-authorization-header', function() {
  it('exports a function', function(done) {
    assert.equal('function', typeof joiAuthHeader);
    done();
  });

  it('expects to receive a Joi module', function(done) {
    assert.throws(joiAuthHeader, /must pass Joi/);
    done();
  });

  it('returns a validator function', function(done) {
    var fn = joiAuthHeader(Joi);
    assert.equal('function', typeof fn);
    done();
  });

  it('rejects when authorization header is missing', function(done) {
    var schema = joiAuthHeader(Joi)();
    var res = Joi.validate({ authorizations: '0'.repeat(64) }, schema);
    assert(res.error, 'allowed "authorization" header to be missing');
    done();
  });

  it('requires 64 characters of \w-.~+/ with or without [Bb]earer', function(done) {
    var schema = joiAuthHeader(Joi)();

    var tests = [
      { val: '0'.repeat(63), pass: false },
      { val: '0'.repeat(63) + '^', pass: false },
      { val: '0'.repeat(62) + ' a', pass: false },
      { val: '^'.repeat(64), pass: false },
      { val: ' ' + '0'.repeat(63), pass: false },
      { val: '-.~+/' + '0'.repeat(59), pass: true },
    ];

    ;['Bearer ', 'bearer ', ''].forEach(function(prefix) {
      tests.forEach(function(test) {
        var val = prefix + test.val;
        var res = Joi.validate({ authorization: val }, schema);
        assert(test.pass === !res.error, res.error);
      });
    });

    done();
  });
});
