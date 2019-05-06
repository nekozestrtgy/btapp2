var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var session = require('cookie-session');

var indexRouter = require('./routes/index');
var loginRouter = require('./routes/login');
var usersRouter = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

var expiryDate = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)//180日
app.use(session({
  name: 'user_session',
  keys: ['key1', 'key2'],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'localhost',
    expires: expiryDate
  }
}));

var sessionCheck = function (req, res, next) {
  if (req.session.user_id) {
    console.log(req.session.user_id)
    next();
  } else {
    res.redirect('/login');
  }
};

app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', sessionCheck, usersRouter);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
