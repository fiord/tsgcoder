require('dotenv').config();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
var debug = require('debug');
var http = require('http');
var methodOverride = require('method-override');
var session = require('express-session');

var auth = require('./passport');
var passport = auth.passport;

var api = require('./routes/api');
var tester = require('./routes/tester');

var code_executer = require('./lib/docker');

var port = process.env.PORT || 3000;
var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride('_method'));

// passport-twitter
app.use(passport.initialize());
app.use(passport.session());
app.use(session({secret: 'fiord'}));

// routing
app.use('/_api/', api);
app.use('/test/', tester);
app.use(express.static(path.join(__dirname, 'build')));
app.get('/auth/twitter', passport.authenticate('twitter'));
app.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// catch 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.server.get('env') === 'development' ? err: {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req, res) => {
  return handle(req, res);
});

app.listen(port, err => {
  if (err) throw err;
  console.log(`> Ready on http://localhost:${port}`);
});

module.exports = app;

setInterval(() => {
  code_executer.exec();
}, 5000);
