'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var NotesSchema = new Schema({
    note: {
        type: Object
    },
    taskId: {
        type: Object,
        required: ''
    }
});

module.exports = mongoose.model('Notes', NotesSchema);