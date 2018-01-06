'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    username: {
        type: Object,
        required: 'Enter user name'
    },
    password: {
        type: Object,
        required: 'Enter password'
    },    
});

module.exports = mongoose.model('Users', UserSchema);