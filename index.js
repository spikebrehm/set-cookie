var cookie = require('cookie');
var getter = require('./lib/getter');
var setter = require('./lib/setter');

function getCookie(name, options) {
  var cookieSource = getter(name, options);
  var parsedCookieMap;

  if (cookieSource) {
    parsedCookieMap = cookie.parse(cookieSource);
    return parsedCookieMap[name];
  }
}

function setCookie(name, value, options) {
  var cookieStr = cookie.serialize(name, value, options);
  setter(cookieStr, options);
};

module.exports = {
  getCookie: getCookie,
  setCookie: setCookie
};
