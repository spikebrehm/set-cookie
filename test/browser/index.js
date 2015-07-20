var isoCookie = require('../../');
var readValue;

isoCookie.setCookie('thisIsA', 'cookie in a browser!', {
  expires: new Date(2020, 1, 1)
});

console.log(document.cookie);

readValue = isoCookie.getCookie('thisIsA');

console.log(readValue);
