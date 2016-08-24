'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');

var db = require('../_db');

module.exports = db.define('card', {
	description: {
		type: Sequelize.STRING,
		defaultValue: 'Lorem Ipsem'
	},
	facebook: {
		type: Sequelize.STRING,
		defaultValue: 'fb'
	},
	pintrest:  {
		type: Sequelize.STRING,
		defaultValue: 'p'
	},
    instagram: {
        type: Sequelize.STRING,
        defaultValue: 'i'
    },
    twitter: {
        type: Sequelize.STRING,
        defaultValue: 't'
    },
    snapchat: {
        type: Sequelize.STRING,
        defaultValue: 's'
    }
});

