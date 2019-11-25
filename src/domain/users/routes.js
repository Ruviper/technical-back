// Dependencies
const express = require('express');

// DB Connector
const db = require('../../db');

// Services
const createUsersService = require('./service');
const usersService = createUsersService({ db });

const router = express.Router();

// Middlewares
const { endPointAndDateConsole } = require('../../middlewares/endPointAndDate');
const { isAuthenticated } = require('../../middlewares/isAuthenticated');

// Routes
router.get('/', [endPointAndDateConsole, isAuthenticated], (req, res, next) => {
  usersService.find()
    .then(users => res.json(users))
    .catch((err) => {
      err.status = 400;
      next(err);
    });
});

router.post('/', [endPointAndDateConsole, isAuthenticated], (req, res, next) => {
  const { body } = req;
  usersService.create(body)
    .then(user => res.json(user))
    .catch((err) => {
      err.status = 400;
      next(err);
    });
});

router.put('/:id', [endPointAndDateConsole, isAuthenticated], (req, res, next) => {
  const { params: { id } } = req;
  const { body } = req;
  usersService
    .update(id, body)
    .then(updatedUser => res.json(updatedUser))
    .catch((err) => {
      err.status = 400;
      next(err);
    });
});

router.delete('/:id', [endPointAndDateConsole, isAuthenticated], (req, res, next) => {
  const { params: { id } } = req;
  usersService.deleteById({ id })
    .then(deleteResponse => res.json(deleteResponse))
    .catch((err) => {
      err.status = 400;
      next(err);
    });
});

module.exports = router;
