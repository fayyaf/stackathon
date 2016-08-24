'use strict';
var db = require('./_db');
module.exports = db;

var User = require('./models/user');
var Card = require('./models/card');

User.hasOne(Card);
