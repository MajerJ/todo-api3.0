'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
    Q = require('q'),   
    User = mongoose.model('Users');

var mongodbUrl = 'mongodb://admin:admin@ds155509.mlab.com:55509/heroku_47d6mk9g';

exports.localReg = function (username, password) {
var deferred = Q.defer();
mongoose.connect(mongodbUrl, {useMongoClient: true});

User.findOne({username: username})
  .then(function (result) {
    if (null != result) {
      console.log("USERNAME ALREADY EXISTS:", result.username);
      deferred.resolve(false);
    }
    else  {
      var hash = bcrypt.hashSync(password, 8);      
      var new_user = new User({username: username, password: hash});
      console.log("CREATING USER:", new_user);
      new_user.save(function () {
        mongoose.connection.close();
        deferred.resolve(new_user);
      });
    }
  });
return deferred.promise;
};

exports.localAuth = function (username, password) {
var deferred = Q.defer();
mongoose.connect(mongodbUrl, {useMongoClient: true});

User.findOne({'username' : username})
  .then(function (result) {
    if (null == result) {
      console.log("USERNAME NOT FOUND:", username);
      deferred.resolve(false);
    }
    else {
      var hash = result.password;
      console.log("FOUND USER: " + result.username);
      if (bcrypt.compareSync(password, hash)) {
        deferred.resolve(result);
      } else {
        console.log("AUTHENTICATION FAILED");
        deferred.resolve(false);
      }
    }
    mongoose.connection.close();
  });

return deferred.promise;
};

exports.logout = function(req, res) {
  var name = req.user.username;
  console.log("LOGGIN OUT " + req.user.username)
  req.logout();
  res.send('You have successfully been logged out, ' + name + '!');
};

exports.sr = function(req, res) {
  res.send(req.user);
};

exports.fr = function(req, res){
  res.send(req.session.error);      
};
