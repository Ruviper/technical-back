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

// Routes
router.get('/', endPointAndDateConsole, (req, res) => {
  usersService.find()
    .then(users => res.json(users))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });;
});

router.post('/', endPointAndDateConsole, (req, res) => {
  const { body } = req;
  usersService.create(body)
    .then(user => res.json(user))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.put('/:id', endPointAndDateConsole, (req, res) => {
  const { params: { id } } = req;
  const { body } = req;
  usersService
    .update(id, body)
    .then(updatedUser => res.json(updatedUser))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

router.delete('/:id', endPointAndDateConsole, (req, res) => {
  const { params: { id } } = req;
  usersService.deleteById({ id })
    .then(deleteResponse => res.json(deleteResponse))
    .catch((err) => {
      console.error(err);
      res.status(400).json(err);
    });
});

module.exports = router;
