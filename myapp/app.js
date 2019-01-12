var createError = require('http-errors');
var express = require('express');
var favicon = require('serve-favicon');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var router = require('./routes');
var token = require('./lib/token');
var expressSession = require('express-session');
var bodyParser_post = require('body-parser');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');

// app.use(session({
//   secret: 'asadlfkj!@#!@#dfgasdg',
//   resave: false,
//   saveUninitialized: true,
//   store:new FileStore()
// }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://localhost'],
    credentials: true,
  }),
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser_post.urlencoded({ extended: false }));
app.use(bodyParser_post.json());

app.use(cookieParser());
// app.use(express.session({
//   key: 'sid', // 세션키
//   secret: 'secret', // 비밀키
//   cookie: {
//     maxAge: 3000 * 60 * 60 // 쿠키 유효기간 3시간
//   }
// }));
app.use(token.jwtMiddleware);
app.use('/api', router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  console.log('@@@@@@@에러핸들러 입장@@@@@@@@@');
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send('error');
});

module.exports = app;
