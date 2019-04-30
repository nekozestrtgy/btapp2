// パッケージの読み込み
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

// モジュールの読み込み
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var signupRouter = require('./routes/signup');

var app = express();

// viewファイルの設定
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//パッケージの使用設定
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 30 * 60 * 1000
  }
}));

// セッションチェックのmiddleware定義
var sessionCheck = function(req, res, next) {
  if (req.session.id) {
    next();
  } else {
    res.redirect('/login');
  }
};

// アプリケーション・レベルのmiddlewareをバインド
app.use('/signup', signupRouter);
app.use('/login', loginRouter);
app.use('/', sessionCheck, indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app; //appを再利用可能に
