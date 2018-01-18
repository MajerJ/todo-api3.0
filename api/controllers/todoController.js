'use strict';

var mongoose = require('mongoose'),
    Task = mongoose.model('Tasks'),
    mongodbUrl = 'mongodb://localhost/Tododb';

exports.list_all_tasks = function(req, res) {
  mongoose.connect(mongodbUrl, {useMongoClient: true});
  if(req.isAuthenticated()) {
  Task.find({userId: req.params.userId}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  } else {
    res.json({message: 'Log in to see your task list!'})
  }
  mongoose.connection.close();
};

exports.create_a_task = function(req, res) {
  mongoose.connect(mongodbUrl, {useMongoClient: true});
  var new_task = new Task(req.body);
  new_task.save(function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  mongoose.connection.close();
};

exports.read_a_task = function(req, res) {
  mongoose.connect(mongodbUrl, {useMongoClient: true});
  if(req.isAuthenticated()) {
  Task.findById(req.params.taskId, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  } else {
    res.json({message: 'Log in to see your notes!'})
  }
  mongoose.connection.close();
};

exports.update_a_task = function(req, res) {
  mongoose.connect(mongodbUrl, {useMongoClient: true});
  Task.findOneAndUpdate({_id: req.params.taskId}, req.body, {new: true}, function(err, task) {
    if (err)
      res.send(err);
    res.json(task);
  });
  mongoose.connection.close();
};


exports.delete_a_task = function(req, res) {
  mongoose.connect(mongodbUrl, {useMongoClient: true});
  Task.remove({_id: req.params.taskId}, function(err, task) {
    if (err)
      res.send(err);
    res.json({ message: 'Task successfully deleted' });
  });
  mongoose.connection.close();
};