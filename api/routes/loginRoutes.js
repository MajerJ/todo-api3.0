'use strict';
module.exports = function(app) {
  var userList = require('../controllers/loginController');

  app.route('/login')
    .get(userList.create_a_user)
    .post(userList.load_a_user);
};