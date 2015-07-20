(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./lib/getter":2,"./lib/setter":3,"cookie":4}],2:[function(require,module,exports){
/**
 * Cookie getter for browser environment.
 */
module.exports = function getter(cookieName, _) {
  return document.cookie;
};

},{}],3:[function(require,module,exports){
/**
 * Cookie setter for browser environment.
 */

module.exports = function setter(cookieStr, _) {
  document.cookie = cookieStr;
};

},{}],4:[function(require,module,exports){
/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * MIT Licensed
 */

/**
 * Module exports.
 * @public
 */

exports.parse = parse;
exports.serialize = serialize;

/**
 * Module variables.
 * @private
 */

var decode = decodeURIComponent;
var encode = encodeURIComponent;

/**
 * Parse a cookie header.
 *
 * Parse the given cookie header string into an object
 * The object has the various cookies as keys(names) => values
 *
 * @param {string} str
 * @param {object} [options]
 * @return {string}
 * @public
 */

function parse(str, options) {
  var obj = {}
  var opt = options || {};
  var pairs = str.split(/; */);
  var dec = opt.decode || decode;

  pairs.forEach(function(pair) {
    var eq_idx = pair.indexOf('=')

    // skip things that don't look like key=value
    if (eq_idx < 0) {
      return;
    }

    var key = pair.substr(0, eq_idx).trim()
    var val = pair.substr(++eq_idx, pair.length).trim();

    // quoted values
    if ('"' == val[0]) {
      val = val.slice(1, -1);
    }

    // only assign once
    if (undefined == obj[key]) {
      obj[key] = tryDecode(val, dec);
    }
  });

  return obj;
}

/**
 * Serialize data into a cookie header.
 *
 * Serialize the a name value pair into a cookie string suitable for
 * http headers. An optional options object specified cookie parameters.
 *
 * serialize('foo', 'bar', { httpOnly: true })
 *   => "foo=bar; httpOnly"
 *
 * @param {string} name
 * @param {string} val
 * @param {object} [options]
 * @return {string}
 * @public
 */

function serialize(name, val, options) {
  var opt = options || {};
  var enc = opt.encode || encode;
  var pairs = [name + '=' + enc(val)];

  if (null != opt.maxAge) {
    var maxAge = opt.maxAge - 0;
    if (isNaN(maxAge)) throw new Error('maxAge should be a Number');
    pairs.push('Max-Age=' + maxAge);
  }

  if (opt.domain) pairs.push('Domain=' + opt.domain);
  if (opt.path) pairs.push('Path=' + opt.path);
  if (opt.expires) pairs.push('Expires=' + opt.expires.toUTCString());
  if (opt.httpOnly) pairs.push('HttpOnly');
  if (opt.secure) pairs.push('Secure');

  return pairs.join('; ');
}

/**
 * Try decoding a string using a decoding function.
 *
 * @param {string} str
 * @param {function} decode
 * @private
 */

function tryDecode(str, decode) {
  try {
    return decode(str);
  } catch (e) {
    return str;
  }
}

},{}],5:[function(require,module,exports){
var isoCookie = require('../../');
var readValue;

isoCookie.setCookie('thisIsA', 'cookie in a browser!', {
  expires: new Date(2020, 1, 1)
});

console.log(document.cookie);

readValue = isoCookie.getCookie('thisIsA');

console.log(readValue);

},{"../../":1}]},{},[5])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9hbHVubnkvZGV2L3NldC1jb29raWUvbm9kZV9tb2R1bGVzL2Jyb3dzZXJpZnkvbm9kZV9tb2R1bGVzL2Jyb3dzZXItcGFjay9fcHJlbHVkZS5qcyIsIi9Vc2Vycy9hbHVubnkvZGV2L3NldC1jb29raWUvaW5kZXguanMiLCIvVXNlcnMvYWx1bm55L2Rldi9zZXQtY29va2llL2xpYi9nZXR0ZXIvY2xpZW50LmpzIiwiL1VzZXJzL2FsdW5ueS9kZXYvc2V0LWNvb2tpZS9saWIvc2V0dGVyL2NsaWVudC5qcyIsIi9Vc2Vycy9hbHVubnkvZGV2L3NldC1jb29raWUvbm9kZV9tb2R1bGVzL2Nvb2tpZS9pbmRleC5qcyIsIi9Vc2Vycy9hbHVubnkvZGV2L3NldC1jb29raWUvdGVzdC9icm93c2VyL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKX12YXIgZj1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwoZi5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxmLGYuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIGNvb2tpZSA9IHJlcXVpcmUoJ2Nvb2tpZScpO1xudmFyIGdldHRlciA9IHJlcXVpcmUoJy4vbGliL2dldHRlcicpO1xudmFyIHNldHRlciA9IHJlcXVpcmUoJy4vbGliL3NldHRlcicpO1xuXG5mdW5jdGlvbiBnZXRDb29raWUobmFtZSwgb3B0aW9ucykge1xuICB2YXIgY29va2llU291cmNlID0gZ2V0dGVyKG5hbWUsIG9wdGlvbnMpO1xuICB2YXIgcGFyc2VkQ29va2llTWFwO1xuXG4gIGlmIChjb29raWVTb3VyY2UpIHtcbiAgICBwYXJzZWRDb29raWVNYXAgPSBjb29raWUucGFyc2UoY29va2llU291cmNlKTtcbiAgICByZXR1cm4gcGFyc2VkQ29va2llTWFwW25hbWVdO1xuICB9XG59XG5cbmZ1bmN0aW9uIHNldENvb2tpZShuYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICB2YXIgY29va2llU3RyID0gY29va2llLnNlcmlhbGl6ZShuYW1lLCB2YWx1ZSwgb3B0aW9ucyk7XG4gIHNldHRlcihjb29raWVTdHIsIG9wdGlvbnMpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGdldENvb2tpZTogZ2V0Q29va2llLFxuICBzZXRDb29raWU6IHNldENvb2tpZVxufTtcbiIsIi8qKlxuICogQ29va2llIGdldHRlciBmb3IgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBnZXR0ZXIoY29va2llTmFtZSwgXykge1xuICByZXR1cm4gZG9jdW1lbnQuY29va2llO1xufTtcbiIsIi8qKlxuICogQ29va2llIHNldHRlciBmb3IgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHNldHRlcihjb29raWVTdHIsIF8pIHtcbiAgZG9jdW1lbnQuY29va2llID0gY29va2llU3RyO1xufTtcbiIsIi8qIVxyXG4gKiBjb29raWVcclxuICogQ29weXJpZ2h0KGMpIDIwMTItMjAxNCBSb21hbiBTaHR5bG1hblxyXG4gKiBNSVQgTGljZW5zZWRcclxuICovXHJcblxyXG4vKipcclxuICogTW9kdWxlIGV4cG9ydHMuXHJcbiAqIEBwdWJsaWNcclxuICovXHJcblxyXG5leHBvcnRzLnBhcnNlID0gcGFyc2U7XHJcbmV4cG9ydHMuc2VyaWFsaXplID0gc2VyaWFsaXplO1xyXG5cclxuLyoqXHJcbiAqIE1vZHVsZSB2YXJpYWJsZXMuXHJcbiAqIEBwcml2YXRlXHJcbiAqL1xyXG5cclxudmFyIGRlY29kZSA9IGRlY29kZVVSSUNvbXBvbmVudDtcclxudmFyIGVuY29kZSA9IGVuY29kZVVSSUNvbXBvbmVudDtcclxuXHJcbi8qKlxyXG4gKiBQYXJzZSBhIGNvb2tpZSBoZWFkZXIuXHJcbiAqXHJcbiAqIFBhcnNlIHRoZSBnaXZlbiBjb29raWUgaGVhZGVyIHN0cmluZyBpbnRvIGFuIG9iamVjdFxyXG4gKiBUaGUgb2JqZWN0IGhhcyB0aGUgdmFyaW91cyBjb29raWVzIGFzIGtleXMobmFtZXMpID0+IHZhbHVlc1xyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7b2JqZWN0fSBbb3B0aW9uc11cclxuICogQHJldHVybiB7c3RyaW5nfVxyXG4gKiBAcHVibGljXHJcbiAqL1xyXG5cclxuZnVuY3Rpb24gcGFyc2Uoc3RyLCBvcHRpb25zKSB7XHJcbiAgdmFyIG9iaiA9IHt9XHJcbiAgdmFyIG9wdCA9IG9wdGlvbnMgfHwge307XHJcbiAgdmFyIHBhaXJzID0gc3RyLnNwbGl0KC87ICovKTtcclxuICB2YXIgZGVjID0gb3B0LmRlY29kZSB8fCBkZWNvZGU7XHJcblxyXG4gIHBhaXJzLmZvckVhY2goZnVuY3Rpb24ocGFpcikge1xyXG4gICAgdmFyIGVxX2lkeCA9IHBhaXIuaW5kZXhPZignPScpXHJcblxyXG4gICAgLy8gc2tpcCB0aGluZ3MgdGhhdCBkb24ndCBsb29rIGxpa2Uga2V5PXZhbHVlXHJcbiAgICBpZiAoZXFfaWR4IDwgMCkge1xyXG4gICAgICByZXR1cm47XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIGtleSA9IHBhaXIuc3Vic3RyKDAsIGVxX2lkeCkudHJpbSgpXHJcbiAgICB2YXIgdmFsID0gcGFpci5zdWJzdHIoKytlcV9pZHgsIHBhaXIubGVuZ3RoKS50cmltKCk7XHJcblxyXG4gICAgLy8gcXVvdGVkIHZhbHVlc1xyXG4gICAgaWYgKCdcIicgPT0gdmFsWzBdKSB7XHJcbiAgICAgIHZhbCA9IHZhbC5zbGljZSgxLCAtMSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gb25seSBhc3NpZ24gb25jZVxyXG4gICAgaWYgKHVuZGVmaW5lZCA9PSBvYmpba2V5XSkge1xyXG4gICAgICBvYmpba2V5XSA9IHRyeURlY29kZSh2YWwsIGRlYyk7XHJcbiAgICB9XHJcbiAgfSk7XHJcblxyXG4gIHJldHVybiBvYmo7XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBTZXJpYWxpemUgZGF0YSBpbnRvIGEgY29va2llIGhlYWRlci5cclxuICpcclxuICogU2VyaWFsaXplIHRoZSBhIG5hbWUgdmFsdWUgcGFpciBpbnRvIGEgY29va2llIHN0cmluZyBzdWl0YWJsZSBmb3JcclxuICogaHR0cCBoZWFkZXJzLiBBbiBvcHRpb25hbCBvcHRpb25zIG9iamVjdCBzcGVjaWZpZWQgY29va2llIHBhcmFtZXRlcnMuXHJcbiAqXHJcbiAqIHNlcmlhbGl6ZSgnZm9vJywgJ2JhcicsIHsgaHR0cE9ubHk6IHRydWUgfSlcclxuICogICA9PiBcImZvbz1iYXI7IGh0dHBPbmx5XCJcclxuICpcclxuICogQHBhcmFtIHtzdHJpbmd9IG5hbWVcclxuICogQHBhcmFtIHtzdHJpbmd9IHZhbFxyXG4gKiBAcGFyYW0ge29iamVjdH0gW29wdGlvbnNdXHJcbiAqIEByZXR1cm4ge3N0cmluZ31cclxuICogQHB1YmxpY1xyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHNlcmlhbGl6ZShuYW1lLCB2YWwsIG9wdGlvbnMpIHtcclxuICB2YXIgb3B0ID0gb3B0aW9ucyB8fCB7fTtcclxuICB2YXIgZW5jID0gb3B0LmVuY29kZSB8fCBlbmNvZGU7XHJcbiAgdmFyIHBhaXJzID0gW25hbWUgKyAnPScgKyBlbmModmFsKV07XHJcblxyXG4gIGlmIChudWxsICE9IG9wdC5tYXhBZ2UpIHtcclxuICAgIHZhciBtYXhBZ2UgPSBvcHQubWF4QWdlIC0gMDtcclxuICAgIGlmIChpc05hTihtYXhBZ2UpKSB0aHJvdyBuZXcgRXJyb3IoJ21heEFnZSBzaG91bGQgYmUgYSBOdW1iZXInKTtcclxuICAgIHBhaXJzLnB1c2goJ01heC1BZ2U9JyArIG1heEFnZSk7XHJcbiAgfVxyXG5cclxuICBpZiAob3B0LmRvbWFpbikgcGFpcnMucHVzaCgnRG9tYWluPScgKyBvcHQuZG9tYWluKTtcclxuICBpZiAob3B0LnBhdGgpIHBhaXJzLnB1c2goJ1BhdGg9JyArIG9wdC5wYXRoKTtcclxuICBpZiAob3B0LmV4cGlyZXMpIHBhaXJzLnB1c2goJ0V4cGlyZXM9JyArIG9wdC5leHBpcmVzLnRvVVRDU3RyaW5nKCkpO1xyXG4gIGlmIChvcHQuaHR0cE9ubHkpIHBhaXJzLnB1c2goJ0h0dHBPbmx5Jyk7XHJcbiAgaWYgKG9wdC5zZWN1cmUpIHBhaXJzLnB1c2goJ1NlY3VyZScpO1xyXG5cclxuICByZXR1cm4gcGFpcnMuam9pbignOyAnKTtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRyeSBkZWNvZGluZyBhIHN0cmluZyB1c2luZyBhIGRlY29kaW5nIGZ1bmN0aW9uLlxyXG4gKlxyXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyXHJcbiAqIEBwYXJhbSB7ZnVuY3Rpb259IGRlY29kZVxyXG4gKiBAcHJpdmF0ZVxyXG4gKi9cclxuXHJcbmZ1bmN0aW9uIHRyeURlY29kZShzdHIsIGRlY29kZSkge1xyXG4gIHRyeSB7XHJcbiAgICByZXR1cm4gZGVjb2RlKHN0cik7XHJcbiAgfSBjYXRjaCAoZSkge1xyXG4gICAgcmV0dXJuIHN0cjtcclxuICB9XHJcbn1cclxuIiwidmFyIGlzb0Nvb2tpZSA9IHJlcXVpcmUoJy4uLy4uLycpO1xudmFyIHJlYWRWYWx1ZTtcblxuaXNvQ29va2llLnNldENvb2tpZSgndGhpc0lzQScsICdjb29raWUgaW4gYSBicm93c2VyIScsIHtcbiAgZXhwaXJlczogbmV3IERhdGUoMjAyMCwgMSwgMSlcbn0pO1xuXG5jb25zb2xlLmxvZyhkb2N1bWVudC5jb29raWUpO1xuXG5yZWFkVmFsdWUgPSBpc29Db29raWUuZ2V0Q29va2llKCd0aGlzSXNBJyk7XG5cbmNvbnNvbGUubG9nKHJlYWRWYWx1ZSk7XG4iXX0=
