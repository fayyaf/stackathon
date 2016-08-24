'use strict';

var router = require('express').Router();
var Card = require('../../../db/models/card');
var _ = require('lodash');
module.exports = router;

router.get('/', function(req, res, next) {
	Card.findAll({})
	.then(function(cards) {
		res.json(cards);
	});
});

router.get('/:id', function(req, res, next) {
	Card.findById(req.params.id)
	.then(function(card) {
		res.send(card);
	});
});

router.post('/', function(req, res, next) {
	Card.create(req.body)
	.then(function(card) {
		res.status(201).json(card);
	})
	.catch(next);
});

