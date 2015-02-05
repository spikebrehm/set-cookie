var express = require('express');
var morgan = require('morgan');
var app = express();
var setCookie = require('../..');

// Logger.
app.use(morgan('dev'));

app.use(function(req, res, next) {
  setCookie('example_cookie', 'A cool value!', {
    expires: new Date(2020, 1, 1),
    res: res,
  });
  res.type('html').send('<html><body>Hello there! Check out the cookies.</body></html>');
});

app.listen(process.env.PORT || 3030);
