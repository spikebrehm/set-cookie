/**
 * Cookie getter for browser environment.
 */
module.exports = function getter(cookieName, _) {
  return document.cookie;
};
