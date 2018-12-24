var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var teamRouter = require('./routes/team');
var stdRouter = require('./routes/std');
var boardRouter = require('./routes/board');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use(express.cookieParser());
// app.use(express.session({
//   key: 'sid', // 세션키
//   secret: 'secret', // 비밀키
//   cookie: {
//     maxAge: 3000 * 60 * 60 // 쿠키 유효기간 3시간
//   }
// }));

app.use('/', indexRouter);
app.use('/team', teamRouter);
app.use('/std', stdRouter);
app.use('/board', boardRouter);

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

module.exports = app;
