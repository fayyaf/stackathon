/*

This seed file is only a placeholder. It should be expanded and altered
to fit the development of your application.

It uses the same file the server uses to establish
the database connection:
--- server/db/index.js

The name of the database used is set in your environment files:
--- server/env/*

This seed file has a safety check to see if you already have users
in the database. If you are developing multiple applications with the
fsg scaffolding, keep in mind that fsg always uses the same database
name in the environment files.

*/

var chalk = require('chalk');
var db = require('./server/db');
var User = db.model('user');
var Card = db.model('card');
var Promise = require('sequelize').Promise;

var seedUsers = function () {

    var users = [
        {
            email: 'testing@fsa.com',
            password: 'password',
            firstName: 'grace',
            lastName: 'hopper',
            age: '04/24/1884',
            location: 'New York, NY'
        },
        {
            email: 'obama@gmail.com',
            password: 'potus',
            firstName: 'barack',
            lastName: 'obama',
            age: '11/11/1946',
            location: 'The White House'
        }
    ];

    var creatingUsers = users.map(function (userObj) {
        return User.create(userObj);
    });

    return Promise.all(creatingUsers);
};

var seedCards = function () {

    var cards = [
        {
            description: 'description',
            facebook: 'grace',
            pintrest: 'hopper',
            instagram: 'gh',
            twitter: 'New York, NY',
            snapchat: 'ghost',
            userId: 2
        },
        {
            description: 'potus',
            facebook: 'barack',
            pintrest: 'obama',
            instagram: 'potus',
            twitter: 'The White House',
            snapchat: 'ghost',
            userId: 1
        }
    ];

    var creatingCards = cards.map(function (cardObj) {
        return Card.create(cardObj);
    });

    return Promise.all(creatingCards);
};

db.sync({ force: true })
    .then(function () {
        return seedUsers();
    })
    .then(function() {
        return seedCards();
    })
    .then(function () {
        console.log(chalk.green('Seed successful!'));
        process.exit(0);
    })
    .catch(function (err) {
        console.error(err);
        process.exit(1);
    });
