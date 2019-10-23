require('dotenv').config();
var express = require('express');
var router = express.Router();
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

var controllers = require('./controllers');

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
// app.use(session({secret: 'fiord'}));
app.use(express.static(path.join(__dirname, 'build')));

// routing
router.get('/_api/users/', (req, res, next) => controllers.api_user_controller.get(req, res, next, passport));
router.get('/_api/users/:id(\\d+)', controllers.api_user_controller.show);
router.put('/_api/users/:id(\\d+)', controllers.api_user_controller.update);
router.delete('/_api/users/:id(\\d+)', controllers.api_user_controller.destroy);
router.get('/_api/problems', controllers.problems.list);
router.get('/_api/problems/:id(\\d+)', controllers.problems.detail);
router.get('/test/codes', (req, res, next) => controllers.code_tester.get(req, res, next, passport));
router.post('/test/test', (req, res, next) => controllers.code_tester.set(req, res, next, passport));
router.get('/test/code/:id(\\d+)', controllers.code_tester.detail);
router.get('/code/langs', controllers.code_tester.langs);
router.post('/problems/submit', (req, res, next) => controllers.problems.register(req, res, next, passport));

router.get('/auth/twitter', passport.authenticate('twitter'));
router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

router.get('/*', (req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use(router);

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
