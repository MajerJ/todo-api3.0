'use strict';
module.exports = function(app) {
  var todoList = require('../controllers/todoController'),
      userList = require('../controllers/loginController'),
      passport = require('passport');

  app.route('/tasks')
    .post(todoList.create_a_task);

  app.route('/tasks/:userId')
    .get(todoList.list_all_tasks);

  app.route('/tasks/:taskId')
    .get(todoList.read_a_task)
    .put(todoList.update_a_task)
    .delete(todoList.delete_a_task);

  app.route('/login')
    .post(passport.authenticate('local-signin', {
      successRedirect: '/sr',
      failureRedirect: '/fr'
    })
  );

  app.route('/logout')
    .get(userList.logout);
  
  app.route('/local-reg')
    .post(passport.authenticate('local-signup', {
      successRedirect: '/sr',
      failureRedirect: '/fr'
    })
  );

  app.route('/sr')
    .get(userList.sr);

  app.route('/fr')
    .get(userList.fr);
};