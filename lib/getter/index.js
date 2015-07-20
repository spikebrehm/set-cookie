/**
 * Cookie getter for Node.js environment.
 */
module.exports = function getter(cookieName, options) {
  var req = options && options.req,
      parsedCookieHeader;
  if (!req) throw new Error('Must specify `req` when setting cookie.');

  return req.headers.cookie;
};
