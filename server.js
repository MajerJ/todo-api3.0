var express = require('express'),
    app = express(),
    logger = require('morgan'),
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Task = require('./api/models/todoModel'),
    Login = require('./api/models/loginModel'),
    Note = require('./api/models/notesModel'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    methodOverride = require('method-override'),
    cors = require('cors'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    session = require('express-session'),
    funct = require('./api/controllers/loginController');

//=====EXPRESS=====
app.options('*', cors());
app.use(express.static('public'));
app.use(logger('combined')),
app.use(cookieParser()),
app.use(methodOverride('X-HTTP-Method-Override')),
app.use(session({secret: 'trefl', saveUninitialized: true, resave: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {  
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

//=====PASSPORT=====
passport.use('local-signin', new LocalStrategy(
  {passReqToCallback : true},
  function(req, username, password, done) {
    funct.localAuth(username, password)
    .then(function (user) {
      if (user) {
        console.log("LOGGED IN AS: " + user.username);
        req.session.success = 'You are successfully logged in ' + user.username + '!';
        return done(null, user);
      }
      if (!user) {
        console.log("COULD NOT LOG IN");
        req.session.error = {'error': 'Incorrect username or password, please try again.'}; 
        return done(null, false);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

passport.use('local-signup', new LocalStrategy(
  {passReqToCallback : true},
  function(req, username, password, done) {
    funct.localReg(username, password)
    .then(function (user) {
      if (user) {
        console.log("REGISTERED: " + user.username);
        req.session.success = 'You are successfully registered and logged in ' + user.username + '!';
        return done(null, user);
      }
      if (!user) {
        console.log("COULD NOT REGISTER");
        req.session.error = {'error': 'Username already in use, please try a different one.'}; 
        return done(null, false);
      }
    })
    .fail(function (err){
      console.log(err.body);
    });
  }
));

passport.serializeUser(function(user, done) {
  console.log("serializing " + user.username);
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  console.log("deserializing " + obj);
  done(null, obj);
});

//=====ROUTES=====
var routes = require('./api/routes/todoRoutes');
routes(app);

//=====PORT=====
app.listen(port);

console.log('todo RESTful API server started on: ' + port);

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
  });