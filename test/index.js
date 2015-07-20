var getCookie = require('../').getCookie;
var setCookie = require('../').setCookie;
var chai = require('chai');
var sinon = require('sinon');
var superagent = require('superagent');
var http = require('http');
var expect = chai.expect;
var port = 99999;

describe('set-cookie', function() {
  describe('Node setter', function() {
    it('throws when not passed `res`', function() {
      expect(function() {
        setCookie('myName', 'myValue', {path: '/foo'});
      }).to.throw(/res/);
    });

    it('does not throw when passed `res`', function() {
      var res = {
        setHeader: function() {}
      };

      expect(function() {
        setCookie('myName', 'myValue', {path: '/foo', res: res});
      }).to.not.throw();
    });

    it('calls `setHeader()` on `res`', sinon.test(function() {
      var res = {
        setHeader: this.spy()
      };

      var expectedStr = 'myName=myValue; Path=/foo';

      setCookie('myName', 'myValue', {path: '/foo', res: res});

      expect(res.setHeader.calledOnce).to.be.true;
      expect(res.setHeader.getCall(0).args[0]).to.eql('Set-Cookie');
      expect(res.setHeader.getCall(0).args[1]).to.eql(expectedStr);
    }));
  });

  describe('integration', function() {
    beforeEach(function(done) {
      this.server = http.createServer(function(req, res) {
        setCookie('didItWork', 'yes', {
          domain: '.cookie.com',
          res: res
        });

        res.end('OK\n');
      });

      this.server.listen(port, done);
    });

    afterEach(function(done) {
      this.server.close(done);
    });

    it('actually sets the cookie header', function(done) {
      var expectedStr = 'didItWork=yes; Domain=.cookie.com';

      superagent.
        get('http://localhost:' + port).
        end(function(res) {
          expect(res.headers['set-cookie'][0]).to.equal(expectedStr);
          done();
        });
    });
  });
});

describe('get-cookie', function() {
  describe('Node getter', function() {
    it('throws when not passed `req`', function() {
      expect(function() {
        getCookie('myName', {});
      }).to.throw(/req/);
    });

    it('returns undefined when passed `req` without a Cookie header', function() {
      var req = {
        headers: {}
      };

      var cookie = getCookie('myName', {req: req});
      expect(cookie).to.eql(undefined);
    });

    describe('when passed a Cookie header', function() {
      var req = {
        headers: {
          cookie: 'foo=bar%20baz; cat=meow; dog=ruff'
        }
      };

      it('returns undefined if the key is not present', function() {
        var cookie = getCookie('myName', {req: req});
        expect(cookie).to.eql(undefined);
      });

      it('returns the value if the key is present', function() {
        var cookie = getCookie('cat', {req: req});
        expect(cookie).to.eql('meow');
      });

      it('decodes the parsed value', function() {
        var cookie = getCookie('foo', {req: req});
        expect(cookie).to.eql('bar baz');
      });
    });
  });
});
