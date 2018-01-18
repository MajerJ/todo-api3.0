'use strict';

var mongoose = require('mongoose'),
    Note = mongoose.model('Notes'),
    mongodbUrl = 'mongodb://admin:admin@ds155509.mlab.com:55509/heroku_47d6mk9g';

exports.read_a_note = function(req, res) {
    mongoose.connect(mongodbUrl, {useMongoClient: true});
    if(req.isAuthenticated()) {
    Note.find({taskId: req.params.taskId}, function(err, task) {
        if (err)
          res.send(err);
        res.json(task);
    });
    } else {
        res.json({message: 'Log in to see your notes!'})
    }
    mongoose.connection.close();
};

exports.create_a_note = function(req, res) {
    mongoose.connect(mongodbUrl, {useMongoClient: true});
    var new_note = new Note(req.body);
    new_note.save(function(err, task) {
      if (err)
        res.send(err);
      res.json(task);
    });
    mongoose.connection.close();
  };

exports.delete_a_note = function(req, res) {
    mongoose.connect(mongodbUrl, {useMongoClient: true});
    Note.remove({taskId: req.params.taskId}, function(err, task) {
      if (err)
        res.send(err);
      res.json({ message: 'Notes successfully deleted' });
    });
    mongoose.connection.close();
};
