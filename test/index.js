'use strict';

var assert = require('assert');
var Joi = require('joi');
var joiAuthHeader = require('../');

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

  it('requires the `min` argument', function(done) {
    assert.throws(function() {
      joiAuthHeader(Joi)();
    }, /`min` must be a number/);
    done();
  });

  describe('when `max` is not present', function() {
    it('requires token string length to match `min`', function(done) {
      var schema = joiAuthHeader(Joi)(3);

      [
        { val: '00', pass: false },
        { val: '000', pass: true },
        { val: '0000', pass: false },
        { val: 'Bearer 00', pass: false },
        { val: 'bearer 000', pass: true },
        { val: 'bearer 0000', pass: false }
      ].forEach(function(test) {
        var res = Joi.validate({ authorization: test.val }, schema);
        assert.equal(test.pass, !res.error);
      });

      done();
    });
  });

  it('requires `min` to be a number', function(done) {
    [function() {}, {}, [], null, undefined, 'h'].forEach(function(thing) {
      assert.throws(function() {
        joiAuthHeader(Joi)(thing);
      }, /`min` must be a number/);
    });

    done();
  });

  describe('when `max` is present', function() {
    it('requires `max` to be a number', function(done) {
      [function() {}, {}, [], null, undefined, 'h'].forEach(function(thing) {
        assert.throws(function() {
          joiAuthHeader(Joi)(4, thing);
        }, /`max` must be a number/);
      });

      done();
    });

    it('requires value to match \w-.~+/ with or without [Bb]earer', function(done) {
      var schema = joiAuthHeader(Joi)(5);

      var tests = [
        { val: '0000^', pass: false },
        { val: '000 a', pass: false },
        { val: ' 0000', pass: false },
        { val: '0000 ', pass: false },
        { val: '-.~+/', pass: true }
      ];

      ['Bearer ', 'bearer ', ''].forEach(function(prefix) {
        tests.forEach(function(test) {
          var val = prefix + test.val;
          var res = Joi.validate({ authorization: val }, schema);
          assert(test.pass === !res.error, res.error);
        });
      });

      done();
    });

    it('requires string length to be at most `max` and at least `min` length',
    function(done) {
      var schema = joiAuthHeader(Joi)(2, 3);

      [
        { val: '0', pass: false },
        { val: '00', pass: true },
        { val: '000', pass: true },
        { val: '0000', pass: false },
        { val: 'bearer 0', pass: false },
        { val: 'bearer 00', pass: true },
        { val: 'bearer 000', pass: true },
        { val: 'bearer 0000', pass: false }
      ].forEach(function(test) {
        var res = Joi.validate({ authorization: test.val }, schema);
        assert.equal(test.pass, !res.error);
      });

      done();
    });
  });

  it('rejects when authorization header is missing', function(done) {
    var schema = joiAuthHeader(Joi)(64);
    var res = Joi.validate({ authorizations: '0'.repeat(64) }, schema);
    assert(res.error, 'allowed "authorization" header to be missing');
    done();
  });
});
