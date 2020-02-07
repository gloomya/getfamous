var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var fileupload = require('express-fileupload');

var indexRouter = require('./routes/index');
var aboutRouter = require('./routes/about');
var privacyRouter = require('./routes/privacy');
var regRouter = require('./routes/register');
var loginRouter = require('./routes/login');
var logoutRouter = require('./routes/logout');
var forgotRouter = require('./routes/forgot');
var profileRouter = require('./routes/profile');
var setupRouter = require('./routes/setup');
var updateRouter = require('./routes/update');
var contactRouter = require('./routes/contact');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({secret: 'something'}));
app.use(fileupload());

app.use('/', indexRouter);
app.use('/about', aboutRouter);
app.use('/privacy', privacyRouter);
app.use('/register', regRouter);
app.use('/login', loginRouter);
app.use('/logout', logoutRouter);
app.use('/forgot', forgotRouter);
app.use('/profile', profileRouter);
app.use('/setup', setupRouter);
app.use('/update', updateRouter);
app.use('/contact', contactRouter);
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

module.exports = app;
