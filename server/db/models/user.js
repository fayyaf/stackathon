'use strict';

var crypto = require('crypto');
var _ = require('lodash');
var Sequelize = require('sequelize');
var Card = require('./card');

var db = require('../_db');

module.exports = db.define('user', {
	email: {
		type: Sequelize.STRING,
		validate: {
			isEmail: true
		}
	},
	password: {
		type: Sequelize.STRING
	},
	firstName: {
		type: Sequelize.STRING
	},
	lastName:  {
		type: Sequelize.STRING
	},
    age: {
        type: Sequelize.DATE
    },
    location: {
        type: Sequelize.TEXT
    },
	isAuthetnticated: {
		type: Sequelize.BOOLEAN,
		defaultValue: false
	},
	salt: {
		type: Sequelize.STRING
	}
}, {
    instanceMethods: {
        sanitize: function () {
            return _.omit(this.toJSON(), ['password', 'salt']);
        },
        correctPassword: function (candidatePassword) {
            return this.Model.encryptPassword(candidatePassword, this.salt) === this.password;
        }
    },
    classMethods: {
        generateSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },
        encryptPassword: function (plainText, salt) {
            var hash = crypto.createHash('sha1');
            hash.update(plainText);
            hash.update(salt);
            return hash.digest('hex');
        }
    },
        defaultScope: {
        include: [{
            model: db.model('card'),
        }]
    },
    hooks: {
        beforeValidate: function (user) {
            if (user.changed('password')) {
                user.salt = user.Model.generateSalt();
                user.password = user.Model.encryptPassword(user.password, user.salt);
            }
        }
    }
});
